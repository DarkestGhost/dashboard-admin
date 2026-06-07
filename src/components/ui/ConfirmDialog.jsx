import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import Button from "@/components/ui/Button";
// import { HiTrash } from "react-icons/hi2";

const ConfirmDialog = ({ isOpen, onClose, title, cancelText = "لغو", confirmText = "تایید", onConfirm, children }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title && <h3 className="text-lg font-vazir_bold flex items-center gap-2">
                            {/* <HiTrash className="w-5 h-5 text-red-500" />
                            <span>حذف محصول</span> */}
                            {title}
                        </h3>}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {children}
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={onClose} size={"md"} variant={"ghost"}>
                        {cancelText}
                    </Button>
                    <Button onClick={onConfirm} size={"md"} variant={"danger"}>
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;

