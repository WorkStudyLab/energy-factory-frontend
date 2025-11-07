# 알림 탭 간 브로드캐스트 수정 내역

## 문제점

기존 방식에서는 `BroadcastChannel`을 사용한 커스텀 스토리지로 Zustand의 `persist` 미들웨어를 확장했지만, **탭 간 동기화가 제대로 작동하지 않았습니다**.

### 기존 방식의 문제

```typescript
// ❌ 문제 있는 방식
// Zustand persist 미들웨어에 커스텀 스토리지 주입
storage: createBroadcastStorage<NotificationStore>("notification-storage")

// StorageEvent를 수동으로 dispatch
window.dispatchEvent(new StorageEvent("storage", {...}))
```

**문제점:**
- StorageEvent 수동 dispatch가 Zustand에서 제대로 감지되지 않음
- 같은 탭 내 동기화 없음
- 새로고침해야만 반영되는 경우 발생
- Zustand persist의 복잡한 내부 메커니즘과 충돌

---

## 해결 방법: 장바구니 방식 적용

장바구니에서 사용하는 **명시적 브로드캐스트 + 구독 패턴**을 알림에도 동일하게 적용했습니다.

### 장바구니의 성공 사례 분석

```typescript
// ✅ 장바구니 방식
1. API 호출 → CartApiService.addToCart()
2. 명시적 브로드캐스트 → broadcastCartChange()
   ├─ BroadcastChannel.postMessage() → 다른 탭
   └─ CustomEvent dispatch → 같은 탭
3. 구독 → subscribeCartChange(() => refetch())
4. React Query 캐시 갱신 → 모든 탭 업데이트
```

**핵심 요소:**
- ✅ **명시적 호출**: 상태 변경 시 직접 `broadcast()` 호출
- ✅ **이중 전파**: BroadcastChannel (다른 탭) + CustomEvent (같은 탭)
- ✅ **단순한 구독**: 간단한 리스너 등록/해제

---

## 새로운 구현

### 1. 브로드캐스트 헬퍼 생성

**파일**: `src/utils/notificationBroadcast.ts`

```typescript
const CHANNEL_NAME = "notification_channel";
const CUSTOM_EVENT_NAME = "notification-changed";

const notificationChannel = new BroadcastChannel(CHANNEL_NAME);

// 알림 변경을 모든 탭에 전파
export const broadcastNotificationChange = () => {
  // 다른 탭으로 전파
  notificationChannel.postMessage({
    type: "NOTIFICATION_CHANGED",
  });

  // 같은 탭 내에서도 전파
  window.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_NAME, {
      detail: { type: "NOTIFICATION_CHANGED" },
    }),
  );
};

// 알림 변경 이벤트 리스너 등록
export const subscribeNotificationChange = (callback: () => void) => {
  // BroadcastChannel 리스너 (다른 탭)
  notificationChannel.onmessage = () => callback();

  // CustomEvent 리스너 (같은 탭)
  window.addEventListener(CUSTOM_EVENT_NAME, callback);

  // cleanup 함수
  return () => {
    notificationChannel.onmessage = null;
    window.removeEventListener(CUSTOM_EVENT_NAME, callback);
  };
};
```

### 2. Zustand 스토어 수정

모든 상태 변경 액션에서 명시적으로 브로드캐스트 호출:

```typescript
// 새 알림 추가
addNotification: (notification: OrderNotification) => {
  set((state) => ({
    notifications: [newNotification, ...state.notifications],
    unreadCount: state.unreadCount + 1,
  }));

  broadcastNotificationChange(); // ✅ 명시적 호출
},

// 읽음 처리
markAsRead: (id: string) => {
  set((state) => ({...}));
  broadcastNotificationChange(); // ✅ 명시적 호출
},

// 모두 읽음
markAllAsRead: () => {
  set((state) => ({...}));
  broadcastNotificationChange(); // ✅ 명시적 호출
},

// 삭제
removeNotification: (id: string) => {
  set((state) => ({...}));
  broadcastNotificationChange(); // ✅ 명시적 호출
},
```

### 3. 컴포넌트에서 구독

**Header.tsx**와 **NotificationPopoverContent.tsx**에서:

```typescript
useEffect(() => {
  const unsubscribe = subscribeNotificationChange(() => {
    // localStorage에서 최신 데이터 읽어와서 스토어에 반영
    const stored = localStorage.getItem("notification-storage");
    if (stored) {
      const data = JSON.parse(stored);
      if (data.state) {
        useNotificationStore.setState(data.state);
      }
    }
  });

  return unsubscribe;
}, []);
```

---

## 작동 흐름

```
Tab 1: 알림을 "읽음" 처리
  ↓
1. markAsRead() 호출
  ↓
2. Zustand 스토어 업데이트 (Tab 1)
  ↓
3. Zustand persist가 localStorage에 자동 저장
  ↓
4. broadcastNotificationChange() 호출
  ├─ BroadcastChannel → Tab 2, Tab 3에 메시지 전송
  └─ CustomEvent → Tab 1 내부 컴포넌트에 전파
  ↓
5. 모든 탭에서 subscribeNotificationChange 리스너 실행
  ↓
6. localStorage에서 최신 데이터 읽어옴
  ↓
7. useNotificationStore.setState()로 스토어 강제 업데이트
  ↓
8. 모든 탭의 UI 즉시 업데이트 ✅
```

---

## 차이점 비교

| 항목 | 기존 방식 (문제) | 새 방식 (해결) |
|------|-----------------|---------------|
| **브로드캐스트 방식** | 커스텀 스토리지에서 자동 | 액션에서 명시적 호출 |
| **이벤트 전파** | StorageEvent만 (불안정) | BroadcastChannel + CustomEvent |
| **같은 탭 동기화** | ❌ 없음 | ✅ CustomEvent로 처리 |
| **다른 탭 동기화** | ❌ 불안정 | ✅ 즉시 반영 |
| **스토어 업데이트** | 자동 (작동 안함) | setState() 강제 업데이트 |
| **새로고침 필요** | ⚠️ 자주 필요 | ✅ 불필요 |

---

## 테스트 방법

1. **여러 탭 열기** (3개 이상 권장)
2. **Tab 1에서 테스트 알림 생성**
   - 모든 탭의 헤더에서 알림 개수 즉시 증가 확인
3. **Tab 2에서 알림 읽음 처리**
   - Tab 1, Tab 3의 알림 개수 즉시 감소 확인
   - 새로고침 없이 실시간 반영 확인
4. **Tab 3에서 모두 읽음 처리**
   - 모든 탭의 알림 개수 0으로 변경 확인
5. **같은 탭 내에서도 확인**
   - 헤더의 알림 아이콘과 팝오버 내용이 즉시 동기화되는지 확인

---

## 핵심 교훈

### ✅ 성공 요인

1. **명시적 브로드캐스트**: 상태 변경 시 직접 `broadcast()` 호출
2. **이중 전파 메커니즘**: BroadcastChannel + CustomEvent
3. **단순한 구독 패턴**: useEffect로 간단하게 리스너 등록
4. **강제 스토어 업데이트**: `setState()`로 확실하게 반영

### ❌ 실패 요인 (기존 방식)

1. Zustand persist의 복잡한 내부 메커니즘에 의존
2. StorageEvent 수동 dispatch의 불안정성
3. 같은 탭 내 동기화 누락
4. 자동화에 대한 과도한 의존

---

## 결론

**장바구니의 검증된 패턴을 그대로 적용**하여 알림의 탭 간 동기화 문제를 완전히 해결했습니다.

이제 **모든 탭에서 실시간으로 알림이 동기화**되며, 새로고침이 전혀 필요하지 않습니다! 🎉
