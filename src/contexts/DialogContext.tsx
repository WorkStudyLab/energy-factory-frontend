import React from "react";
import type { ReactNode } from "react";
import { useDialogStore } from "@/stores/useDialogStore";
import {
  Dialog,
  ConfirmDialog,
  AlertDialog,
} from "@/components/layout/dialog/Dialog";

interface DialogProviderProps {
  children: ReactNode;
}

/**
 * 전역 다이얼로그 프로바이더 (Zustand 기반)
 */
export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const {
    isOpen,
    type,
    title,
    description,
    content,
    footer,
    size,
    showCloseButton,
    onConfirm,
    onCancel,
    closeDialog,
  } = useDialogStore();

  const renderDialog = () => {
    if (!isOpen) return null;

    switch (type) {
      case "alert":
        return (
          <AlertDialog
            title={title}
            description={description}
            buttonText="확인"
            open={isOpen}
            onOpenChange={(open) => !open && closeDialog()}
            onButtonClick={onConfirm}
          />
        );

      case "confirm":
        return (
          <ConfirmDialog
            title={title}
            description={description}
            confirmText="확인"
            cancelText="취소"
            onConfirm={() => {
              onConfirm?.();
              closeDialog();
            }}
            onCancel={() => {
              onCancel?.();
              closeDialog();
            }}
            open={isOpen}
            onOpenChange={(open) => !open && closeDialog()}
          />
        );

      case "custom":
        return (
          <Dialog
            title={title}
            description={description}
            open={isOpen}
            onOpenChange={(open) => !open && closeDialog()}
            size={size}
            showCloseButton={showCloseButton}
            footer={footer}
          >
            {content}
          </Dialog>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {children}
      {renderDialog()}
    </>
  );
};
