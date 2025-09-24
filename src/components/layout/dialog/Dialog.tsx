import React from "react";
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

/**
 * 재사용 가능한 다이얼로그 컴포넌트
 */
export const Dialog: React.FC<DialogProps> = ({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  size = "md",
  showCloseButton = true,
}) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={`${sizeClasses[size]} ${
          showCloseButton ? "" : "[&>button]:hidden"
        }`}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className="py-4">{children}</div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </ShadcnDialog>
  );
};

/**
 * 확인 다이얼로그 컴포넌트
 */
interface ConfirmDialogProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "default" | "destructive";
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  trigger,
  title = "확인",
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  open,
  onOpenChange,
  variant = "default",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog
      trigger={trigger}
      title={title}
      description={description}
      open={open}
      onOpenChange={onOpenChange}
      footer={
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div />
    </Dialog>
  );
};

/**
 * 알림 다이얼로그 컴포넌트
 */
interface AlertDialogProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  trigger,
  title = "알림",
  description,
  buttonText = "확인",
  onButtonClick,
  open,
  onOpenChange,
}) => {
  const handleButtonClick = () => {
    onButtonClick?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog
      trigger={trigger}
      title={title}
      description={description}
      open={open}
      onOpenChange={onOpenChange}
      footer={
        <Button onClick={handleButtonClick} className="w-full">
          {buttonText}
        </Button>
      }
    >
      <div />
    </Dialog>
  );
};
