import { useDialogStore } from "@/stores/useDialogStore";

/**
 * 편리한 다이얼로그 헬퍼 함수들 (Zustand 기반)
 */
export const useDialogHelpers = () => {
  const { showAlert, showConfirm, showCustom } = useDialogStore();

  /**
   * 알림 다이얼로그 (문구만 바꿀 수 있음)
   */
  const alert = (
    message: string,
    options?: {
      title?: string;
      onConfirm?: () => void;
    },
  ) => {
    showAlert(message, options);
  };

  /**
   * 확인 다이얼로그 (문구만 바꿀 수 있음)
   */
  const confirm = (
    message: string,
    options?: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
      variant?: "default" | "destructive";
      onConfirm?: () => void;
      onCancel?: () => void;
    },
  ) => {
    showConfirm(message, options);
  };

  /**
   * 커스텀 다이얼로그
   */
  const custom = (options: {
    title?: string;
    description?: string;
    content: React.ReactNode;
    footer?: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
    showCloseButton?: boolean;
    onClose?: () => void;
  }) => {
    showCustom(options);
  };

  return {
    alert,
    confirm,
    custom,
  };
};

// Promise 기반 다이얼로그는 현재 구현되지 않음
// 필요시 useDialogStore를 사용하여 구현 가능
