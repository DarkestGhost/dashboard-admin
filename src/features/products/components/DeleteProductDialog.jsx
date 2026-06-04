import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Button from "@/components/ui/Button";
import { HiTrash } from "react-icons/hi2";

const DeleteProductDialog = ({ isOpen, onClose, productName, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-lg font-vazir_bold flex items-center gap-1 leading-none">
              <HiTrash className="w-5 h-5 text-red-500 shrink-0" />
              <span>حذف محصول</span>
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col justify-center gap-y-4 py-2">
          <p className="font-vazir_bold text-slate-700">
            میخوای محصول «{productName}» رو حذف کنی؟
          </p>
          <p className="font-vazir_medium text-sm text-red-500">
            ⚠️ این عملیات قابل بازگشت نیست.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose} size={"md"} variant={"ghost"}>
            لغو
          </Button>
          <Button onClick={onConfirm} size={"md"} variant={"danger"}>
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;
