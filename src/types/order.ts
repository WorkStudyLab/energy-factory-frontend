import type { ApiResponse, PageInfo } from "./product";

export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export type PaymentMethod = "CREDIT_CARD" | "BANK_TRANSFER" | "VIRTUAL_ACCOUNT" | "MOBILE";

export interface CreateOrderItem {
  productId: number;
  variantId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  recipientName: string;
  phoneNumber: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  orderItems: CreateOrderItem[];
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  variantId: number;
  variantName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Payment {
  id: number;
  orderId: number;
  orderNumber: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId: string;
  amount: number;
  paidAt: string;
}

export interface Order {
  id: number;
  userId: number;
  orderNumber: number;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  recipientName: string;
  phoneNumber: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  orderItems: OrderItem[];
  payment: Payment;
}

export interface OrderApiResponse {
  status: number;
  code: string;
  desc: string;
  data: Order;
}

export interface ConfirmPaymentRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface ConfirmPaymentApiResponse {
  status: number;
  code: string;
  desc: string;
  data: Payment;
}

export interface OrderListItem {
  id: number;
  orderNumber: number;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  recipientName: string;
  itemCount: number;
  representativeProductName: string;
}

export interface OrderListData {
  orders: OrderListItem[];
  pageInfo: PageInfo;
}

export type OrderListApiResponse = ApiResponse<OrderListData>;

export interface OrderListQueryParams {
  userId: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  pageable: {
    page: number;
    size: number;
  };
}
