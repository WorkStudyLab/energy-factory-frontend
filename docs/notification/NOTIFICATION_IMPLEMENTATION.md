# 주문 알림 SSE 구현 가이드

## 개요

Server-Sent Events(SSE)를 사용하여 실시간 주문 알림 기능을 구현했습니다.

## 구현된 기능

### 1. 핵심 파일

```
src/
├── types/notification.ts                     # 알림 타입 정의
├── stores/useNotificationStore.ts            # 알림 상태 관리 (Zustand)
├── hooks/useOrderNotifications.ts            # SSE 연결 및 알림 수신 훅
├── components/
│   ├── providers/NotificationProvider.tsx    # 앱 전역 SSE 연결 관리
│   ├── ui/notification-popover.tsx           # 알림 UI 컴포넌트
│   └── layout/Header.tsx                     # 헤더 (알림 버튼 포함)
└── pages/test/NotificationTestPage.tsx       # 테스트 페이지
```

### 2. 주요 기능

#### ✅ SSE 연결 관리
- 로그인 시 자동 연결
- 로그아웃 시 자동 해제
- 연결 실패 시 자동 재연결 (최대 5회)
- 연결 상태 추적 (connecting, connected, disconnected, error)

#### ✅ 실시간 알림 수신
- 4가지 알림 타입 지원:
  - `ORDER_CONFIRMED` - 주문 확인
  - `ORDER_SHIPPED` - 배송 시작
  - `ORDER_DELIVERED` - 배송 완료
  - `ORDER_CANCELLED` - 주문 취소

#### ✅ 브라우저 알림
- 브라우저 알림 권한 요청
- 새 알림 수신 시 브라우저 알림 표시
- 알림 클릭 시 주문 상세 페이지로 이동 (TODO)

#### ✅ 알림 상태 관리
- 읽음/읽지 않음 상태 관리
- 읽지 않은 알림 개수 카운트
- localStorage에 알림 영구 저장
- 개별/전체 읽음 처리
- 알림 삭제 기능

#### ✅ UI 컴포넌트
- 헤더의 종 아이콘에 읽지 않은 알림 개수 표시
- 팝오버로 알림 목록 표시
- 알림 클릭 시 읽음 처리
- 상대 시간 표시 ("3분 전", "2시간 전" 등)

## 사용 방법

### 1. 기본 사용

앱이 시작되면 자동으로 SSE 연결이 관리됩니다.

```tsx
// App.tsx에 이미 통합되어 있음
<NotificationProvider>
  <Router>
    {/* 앱 콘텐츠 */}
  </Router>
</NotificationProvider>
```

### 2. 알림 스토어 사용

```tsx
import { useNotificationStore } from "@/stores/useNotificationStore";

function MyComponent() {
  const {
    notifications,      // 모든 알림 목록
    unreadCount,        // 읽지 않은 알림 개수
    connectionStatus,   // SSE 연결 상태
    markAsRead,         // 특정 알림 읽음 처리
    markAllAsRead,      // 모든 알림 읽음 처리
    clearNotifications, // 모든 알림 삭제
  } = useNotificationStore();

  return (
    <div>
      <p>읽지 않은 알림: {unreadCount}개</p>
      {/* ... */}
    </div>
  );
}
```

### 3. 커스텀 훅 직접 사용 (고급)

```tsx
import { useOrderNotifications } from "@/hooks/useOrderNotifications";

function MyComponent() {
  useOrderNotifications({
    enableBrowserNotification: true,
    onNotificationReceived: (notification) => {
      console.log("새 알림:", notification);
      // 커스텀 로직 추가
    },
  });

  return <div>내 컴포넌트</div>;
}
```

### 4. 브라우저 알림 권한 요청

```tsx
import { requestNotificationPermission } from "@/hooks/useOrderNotifications";

async function handleEnableNotifications() {
  const permission = await requestNotificationPermission();

  if (permission === "granted") {
    console.log("알림 권한 허용됨");
  } else {
    console.log("알림 권한 거부됨");
  }
}
```

## 테스트

### 1. 테스트 페이지 접속

```
http://localhost:5173/test/notification
```

로그인 후 위 URL로 접속하면 알림 기능을 테스트할 수 있습니다.

### 2. 테스트 시나리오

1. **SSE 연결 확인**
   - 로그인 후 테스트 페이지 접속
   - 연결 상태가 "🟢 연결됨"으로 표시되는지 확인
   - 개발자 도구 콘솔에서 연결 로그 확인

2. **브라우저 알림 권한 요청**
   - "알림 권한 요청" 버튼 클릭
   - 브라우저 알림 허용
   - "브라우저 알림 테스트" 버튼으로 테스트

3. **테스트 알림 생성**
   - 각 버튼을 클릭하여 다양한 유형의 알림 생성
   - 헤더의 종 아이콘에 알림 개수가 표시되는지 확인
   - 브라우저 알림이 표시되는지 확인

4. **알림 관리**
   - 헤더의 종 아이콘 클릭하여 알림 목록 확인
   - 개별 알림 클릭하여 읽음 처리
   - "모두 읽음" 버튼으로 전체 읽음 처리
   - 페이지 새로고침 후 알림이 유지되는지 확인 (localStorage)

### 3. Chrome DevTools에서 SSE 확인

1. 개발자 도구 열기 (F12)
2. Network 탭 선택
3. Filter를 "EventStream"으로 설정
4. `/api/notifications/stream` 연결 확인
5. EventStream 탭에서 실시간 메시지 확인

## API 명세

### SSE 엔드포인트

```
GET /api/notifications/stream
```

**요청**
- 인증: 필수 (쿠키)
- Content-Type: text/event-stream

**응답 이벤트**

1. 연결 성공
```
event: connect
data: SSE 연결 성공
```

2. 알림 수신
```
event: notification
data: {
  "type": "ORDER_CONFIRMED",
  "title": "주문 확인",
  "message": "주문번호 1234567890번이 확인되었습니다.",
  "orderId": 1,
  "orderNumber": 1234567890,
  "timestamp": "2025-11-07T09:21:00"
}
```

## 환경 변수

`.env` 파일에서 API 기본 URL 설정:

```env
VITE_API_BASE_URL=https://energy-factory.kr
# 또는 로컬 개발용
# VITE_API_BASE_URL=http://localhost:8080
```

SSE 엔드포인트는 `{VITE_API_BASE_URL}/api/notifications/stream`로 자동 구성됩니다.

## 주요 기술 스택

- **React** - UI 프레임워크
- **TypeScript** - 타입 안정성
- **Zustand** - 상태 관리 (persist 미들웨어로 localStorage 연동)
- **EventSource API** - SSE 연결
- **Notification API** - 브라우저 알림

## 트러블슈팅

### 1. SSE 연결이 안 되는 경우

**증상**: 연결 상태가 계속 "연결 중..." 또는 "에러"로 표시

**해결 방법**:
- 로그인 상태 확인
- 백엔드 서버가 실행 중인지 확인
- 백엔드의 `/api/notifications/stream` 엔드포인트가 구현되어 있는지 확인
- CORS 설정 확인 (`withCredentials: true` 필요)
- 개발자 도구 콘솔에서 에러 로그 확인

### 2. 브라우저 알림이 표시되지 않는 경우

**증상**: 알림이 수신되지만 브라우저 알림이 표시되지 않음

**해결 방법**:
- 브라우저 알림 권한 확인 (테스트 페이지에서 권한 요청)
- 브라우저 설정에서 알림이 차단되지 않았는지 확인
- HTTPS 환경인지 확인 (일부 브라우저는 HTTPS에서만 알림 지원)

### 3. 알림이 localStorage에 저장되지 않는 경우

**증상**: 페이지 새로고침 시 알림이 사라짐

**해결 방법**:
- 브라우저의 localStorage가 활성화되어 있는지 확인
- 시크릿 모드가 아닌지 확인
- 브라우저 콘솔에서 `localStorage.getItem('notification-storage')` 확인

### 4. 재연결이 계속 실패하는 경우

**증상**: "최대 재연결 시도 횟수 초과" 메시지

**해결 방법**:
- 백엔드 서버 상태 확인
- 네트워크 연결 확인
- 페이지 새로고침하여 재연결 카운터 초기화

## 향후 개선 사항

- [ ] 주문 상세 페이지 라우팅 구현
- [ ] 알림 필터링 기능 (읽음/읽지 않음, 알림 타입별)
- [ ] 알림 검색 기능
- [ ] 알림 페이지네이션
- [ ] 알림 삭제 시 확인 다이얼로그
- [ ] 알림 음성 설정 (선택적 알림음)
- [ ] 알림 우선순위 지정
- [ ] 알림 그룹화 (같은 주문의 여러 알림을 그룹으로 표시)

## 참고 자료

- [Server-Sent Events (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [EventSource API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
- [Notification API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
