import { HiTrash } from "react-icons/hi2";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  entityLabel,
  itemName,
}) => {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={
        <>
          <HiTrash className="w-5 h-5 text-red-500" />
          حذف {entityLabel}
        </>
      }
      confirmText="حذف"
    >
      <div className="flex flex-col justify-center gap-y-4 py-2">
        <p className="font-vazir_bold text-zinc-700 dark:text-zinc-200">
          می‌خواهی {entityLabel} «{itemName}» را حذف کنی؟
        </p>
        <p className="font-vazir_medium text-sm text-red-500 dark:text-red-400">
          ⚠️ این عملیات قابل بازگشت نیست.
        </p>
      </div>
    </ConfirmDialog>
  );
};

export default DeleteConfirmDialog;
