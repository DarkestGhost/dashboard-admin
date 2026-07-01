import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Button from "@/components/ui/Button";

interface ConfirmDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  title: React.ReactNode;
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  title,
  cancelText = "لغو",
  confirmText,
  onConfirm,
  children,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title && (
              <div className="text-lg font-vazir_bold flex items-center gap-2">
                {title}
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>{children}</DialogDescription>
        <DialogFooter>
          <Button onClick={onClose} size={"md"} variant={"ghost"}>
            {cancelText}
          </Button>
          {confirmText && (
            <Button onClick={onConfirm} size={"md"} variant={"danger"}>
              {confirmText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
