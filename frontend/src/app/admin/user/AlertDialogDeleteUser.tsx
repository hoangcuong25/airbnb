'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { deleteUser } from "@/api/user.api"; // API xoá người dùng
import { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    userId: string | null;
}

const AlertDialogDeleteUser = ({ open, setOpen, userId }: Props) => {
    const { fetchAllUsers } = useContext(AdminContext);

    const handleDelete = async () => {
        if (!userId) {
            toast.error("Không tìm thấy người dùng để xoá.");
            return;
        }

        try {
            await deleteUser(userId);
            toast.success("Xoá người dùng thành công.");
            await fetchAllUsers();
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xoá người dùng.");
        } finally {
            setOpen(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn xoá?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này không thể hoàn tác. Dữ liệu người dùng sẽ bị xoá khỏi hệ thống.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Huỷ</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Xoá</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogDeleteUser;
