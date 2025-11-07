# 주문 알림 기능 빠른 시작 가이드

## 구현 완료 사항

주문 알림 SSE(Server-Sent Events) 기능이 프론트엔드에 완전히 통합되었습니다.

### 주요 기능

- ✅ 실시간 SSE 연결 자동 관리 (로그인/로그아웃 시)
- ✅ 4가지 알림 타입 지원 (주문 확인, 배송 시작, 배송 완료, 주문 취소)
- ✅ 브라우저 알림 표시
- ✅ 읽음/읽지 않음 상태 관리
- ✅ localStorage에 알림 영구 저장
- ✅ 헤더에 읽지 않은 알림 개수 표시
- ✅ 자동 재연결 (최대 5회)

## 테스트 방법

### 1. 개발 서버 실행

```bash
npm run dev
```

### 2. 로그인

로그인 후 SSE 연결이 자동으로 시작됩니다.

### 3. 테스트 페이지 접속

```
http://localhost:5173/test/notification
```

### 4. 테스트 시나리오

1. **알림 권한 요청** 버튼 클릭하여 브라우저 알림 허용
2. **테스트 알림 생성** 버튼들을 클릭하여 다양한 알림 생성
3. 헤더의 **종 아이콘** 클릭하여 알림 목록 확인
4. 알림 클릭하여 읽음 처리
5. 페이지 새로고침 후 알림이 유지되는지 확인

## Chrome DevTools에서 SSE 확인

1. 개발자 도구 열기 (F12)
2. **Network** 탭 선택
3. Filter를 **EventStream**으로 설정
4. `/api/notifications/stream` 연결 확인
5. **EventStream** 탭에서 실시간 메시지 확인

## 백엔드 연동

백엔드에서 다음과 같이 SSE 이벤트를 전송하면 됩니다:

```javascript
// 연결 성공 이벤트
event: connect
data: SSE 연결 성공

// 알림 이벤트
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

## 실제 사용 예시

헤더 컴포넌트에 이미 통합되어 있으므로 별도 작업 불필요합니다:

```tsx
// Header.tsx에서 자동으로 실시간 알림 개수 표시
<Bell className="h-5 w-5" />
{unreadCount > 0 && (
  <Badge>{unreadCount > 99 ? "99+" : unreadCount}</Badge>
)}
```

## 파일 구조

```
src/
├── types/notification.ts                     # 타입 정의
├── stores/useNotificationStore.ts            # 상태 관리
├── hooks/useOrderNotifications.ts            # SSE 훅
├── components/
│   ├── providers/NotificationProvider.tsx    # 전역 연결 관리
│   ├── ui/notification-popover.tsx           # UI 컴포넌트
│   └── layout/Header.tsx                     # 헤더 통합
└── pages/test/NotificationTestPage.tsx       # 테스트 페이지
```

## 환경 변수

`.env` 파일에서 API URL 설정:

```env
VITE_API_BASE_URL=https://energy-factory.kr
# 로컬 개발용
# VITE_API_BASE_URL=http://localhost:8080
```

## 상세 문서

더 자세한 내용은 `NOTIFICATION_IMPLEMENTATION.md` 파일을 참고하세요.

## 문제 해결

### SSE 연결이 안 되는 경우

- 로그인 상태 확인
- 백엔드 서버 실행 확인
- 개발자 도구 콘솔에서 에러 확인

### 브라우저 알림이 표시되지 않는 경우

- 브라우저 알림 권한 확인
- 테스트 페이지에서 "알림 권한 요청" 버튼 클릭

---

**빌드 상태**: ✅ 정상 (TypeScript 컴파일 완료)
