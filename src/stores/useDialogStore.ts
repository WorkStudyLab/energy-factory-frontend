import { create } from "zustand";
import type { ReactNode } from "react";

interface DialogState {
  isOpen: boolean;
  type: "alert" | "confirm" | "custom" | null;
  title?: string;
  description?: string;
  content?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  // 콜백 함수들
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

interface DialogActions {
  // 기본 다이얼로그 열기
  openDialog: (options: {
    type: "alert" | "confirm" | "custom";
    title?: string;
    description?: string;
    content?: ReactNode;
    footer?: ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
    showCloseButton?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
  }) => void;

  // 다이얼로그 닫기
  closeDialog: () => void;

  // 알림 다이얼로그 (간편 함수)
  showAlert: (
    message: string,
    options?: {
      title?: string;
      onConfirm?: () => void;
    },
  ) => void;

  // 확인 다이얼로그 (간편 함수)
  showConfirm: (
    message: string,
    options?: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
      variant?: "default" | "destructive";
      onConfirm?: () => void;
      onCancel?: () => void;
    },
  ) => void;

  // 커스텀 다이얼로그 (간편 함수)
  showCustom: (options: {
    title?: string;
    description?: string;
    content: ReactNode;
    footer?: ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
    showCloseButton?: boolean;
    onClose?: () => void;
  }) => void;
}

type DialogStore = DialogState & DialogActions;

/**
 * Zustand를 사용한 다이얼로그 상태 관리 스토어
 */
export const useDialogStore = create<DialogStore>((set, get) => ({
  // 초기 상태
  isOpen: false,
  type: null,
  title: undefined,
  description: undefined,
  content: undefined,
  footer: undefined,
  size: "md",
  showCloseButton: true,
  onConfirm: undefined,
  onCancel: undefined,
  onClose: undefined,

  // 다이얼로그 열기
  openDialog: (options) => {
    set({
      isOpen: true,
      type: options.type,
      title: options.title,
      description: options.description,
      content: options.content,
      footer: options.footer,
      size: options.size || "md",
      showCloseButton: options.showCloseButton ?? true,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
      onClose: options.onClose,
    });
  },

  // 다이얼로그 닫기
  closeDialog: () => {
    const { onClose } = get();
    onClose?.();
    set({
      isOpen: false,
      type: null,
      title: undefined,
      description: undefined,
      content: undefined,
      footer: undefined,
      size: "md",
      showCloseButton: true,
      onConfirm: undefined,
      onCancel: undefined,
      onClose: undefined,
    });
  },

  // 알림 다이얼로그
  showAlert: (message, options = {}) => {
    get().openDialog({
      type: "alert",
      title: options.title || "알림",
      description: message,
      onConfirm: options.onConfirm,
    });
  },

  // 확인 다이얼로그
  showConfirm: (message, options = {}) => {
    get().openDialog({
      type: "confirm",
      title: options.title || "확인",
      description: message,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
    });
  },

  // 커스텀 다이얼로그
  showCustom: (options) => {
    get().openDialog({
      type: "custom",
      title: options.title,
      description: options.description,
      content: options.content,
      footer: options.footer,
      size: options.size || "md",
      showCloseButton: options.showCloseButton ?? true,
      onClose: options.onClose,
    });
  },
}));
