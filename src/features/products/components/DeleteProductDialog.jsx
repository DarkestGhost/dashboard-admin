import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Button from "@/components/ui/Button";

const DeleteProductDialog = ({ isOpen, onClose, productName, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="font-vazir_regular">حذف محصول</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center gap-y-4">
          <p className="font-vazir_bold">
            آیا از حذف محصول «{productName}» مطمئن هستید؟
          </p>
          <p className="font-vazir_medium">این عملیات قابل بازگشت نیست.</p>
        </div>
        <DialogFooter>
          <Button onClick={onClose} size={"md"} variant={"outline"}>
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
