# 결제 완료 시 알림 기능

## 구현 내용

결제가 완료되면 자동으로 **"주문 확인"** 알림이 생성됩니다.

### 작동 흐름

```
1. 사용자가 결제 완료
   ↓
2. usePaymentSuccess 훅에서 PaymentApiService.completePayment() 호출
   ↓
3. 결제 완료 성공 시 addNotification() 호출
   ↓
4. 알림 생성 → localStorage 저장 → 브로드캐스트
   ↓
5. 모든 탭에서 즉시 알림 표시
   ├─ 헤더의 종 아이콘에 개수 표시
   ├─ 팝오버에서 알림 내용 확인 가능
   └─ 브라우저 알림 (권한 허용 시)
```

## 수정된 파일

**`src/features/order/hooks/usePaymentSuccess.ts`**

```typescript
// 결제 완료 후 알림 추가
const result = await PaymentApiService.completePayment(paymentData);

addNotification({
  type: "ORDER_CONFIRMED",
  title: "주문이 확인되었습니다",
  message: `주문번호 ${result.orderNumber}번 결제가 완료되었습니다. 빠르게 배송해드리겠습니다!`,
  orderId: result.orderId || 0,
  orderNumber: result.orderNumber,
  timestamp: new Date().toISOString(),
});
```

## 알림 내용

### 주문 확인 알림 (ORDER_CONFIRMED)

- **제목**: "주문이 확인되었습니다"
- **내용**: "주문번호 {주문번호}번 결제가 완료되었습니다. 빠르게 배송해드리겠습니다!"
- **아이콘**: 📦 (파란색 Package 아이콘)

## 테스트 방법

### 실제 결제 테스트

1. 장바구니에 상품 추가
2. 결제 진행
3. 결제 완료 페이지 이동 시 자동으로 알림 생성
4. 헤더의 종 아이콘 확인 → 개수 증가
5. 종 아이콘 클릭 → 알림 내용 확인

### 시뮬레이션 테스트

테스트 페이지에서 다양한 주문 상태 알림 시뮬레이션:

```
http://localhost:5173/test/notification
```

**테스트 가능한 알림 타입:**
1. ✅ **주문 확인** (ORDER_CONFIRMED) - 결제 완료 시
2. 🚚 **배송 시작** (ORDER_SHIPPED) - 상품 발송 시
3. ✅ **배송 완료** (ORDER_DELIVERED) - 배송 완료 시
4. ❌ **주문 취소** (ORDER_CANCELLED) - 주문 취소 시

## 다중 탭 동기화

결제 완료 알림도 **모든 탭에서 실시간 동기화**됩니다:

- Tab 1에서 결제 완료 → Tab 2, Tab 3에서도 즉시 알림 표시
- 한 탭에서 읽음 처리 → 다른 탭에서도 즉시 반영
- 새로고침 불필요

## 향후 확장

백엔드에서 SSE로 실시간 알림을 보내면 자동으로 처리됩니다:

### 배송 시작 알림
```json
{
  "type": "ORDER_SHIPPED",
  "title": "배송이 시작되었습니다",
  "message": "주문번호 {주문번호}번 상품이 배송을 시작했습니다.",
  "orderId": 123,
  "orderNumber": 1234567890,
  "timestamp": "2025-11-07T10:30:00"
}
```

### 배송 완료 알림
```json
{
  "type": "ORDER_DELIVERED",
  "title": "배송이 완료되었습니다",
  "message": "주문번호 {주문번호}번 상품이 배송 완료되었습니다.",
  "orderId": 123,
  "orderNumber": 1234567890,
  "timestamp": "2025-11-08T14:00:00"
}
```

### 주문 취소 알림
```json
{
  "type": "ORDER_CANCELLED",
  "title": "주문이 취소되었습니다",
  "message": "주문번호 {주문번호}번이 취소되었습니다. 환불은 2-3일 내에 완료됩니다.",
  "orderId": 123,
  "orderNumber": 1234567890,
  "timestamp": "2025-11-07T15:00:00"
}
```

## 주의사항

현재 구현에서는 `result.orderId`가 API 응답에 포함되어 있지 않아 `0`으로 설정했습니다.

백엔드 API 응답에 `orderId` 필드가 추가되면 다음과 같이 수정:

```typescript
// TODO 제거 후
orderId: result.orderId, // API에서 제공하는 실제 orderId 사용
```

---

**빌드 상태**: ✅ 성공

이제 결제 완료 시 자동으로 알림이 생성되며, 모든 탭에서 실시간으로 확인할 수 있습니다! 🎉
