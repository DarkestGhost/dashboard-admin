import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import Button from "@/components/ui/Button";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

const LogoutDialog = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <span className="text-lg font-vazir_bold flex items-center gap-2">
                            <HiArrowRightOnRectangle className="w-5 h-5 text-red-500" />
                            <span>خروج از داشبورد</span>
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="flex flex-col justify-center gap-y-4 py-2">
                        <p className="font-vazir_bold text-zinc-700 dark:text-zinc-200">
                            آیا میخوای خارج بشی؟
                        </p>
                        <p className="font-vazir_medium text-sm text-red-500 dark:text-red-400">
                            ⚠️ این عملیات قابل بازگشت نیست.
                        </p>
                    </div>
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={onClose} size={"md"} variant={"ghost"}>
                        لغو
                    </Button>
                    <Button onClick={onConfirm} size={"md"} variant={"danger"}>
                        خروج
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutDialog;
