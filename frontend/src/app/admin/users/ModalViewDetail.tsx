import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect } from "react";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
    user: UserType | null;
    formatDateUTC: (date: string) => string;
};

const ModaViewDetail = ({ open, setOpen, user, formatDateUTC }: Props) => {
    useEffect(() => {
        if (!user) {
            setOpen(false);
        }
    }, [user]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Chi tiết người dùng</DialogTitle>
                    <DialogDescription>Xem thông tin chi tiết về người dùng đã chọn.</DialogDescription>
                </DialogHeader>

                {user ? (
                    <div className="space-y-4 text-sm text-gray-700">
                        {/* Avatar */}
                        <div className="flex justify-center">
                            <Image
                                src={user.avatar || "/default-avatar.png"}
                                alt="Avatar"
                                width={96}
                                height={96}
                                className="rounded-full border border-gray-200 shadow-sm"
                            />
                        </div>

                        {/* Thông tin */}
                        <div><strong>Họ tên:</strong> {user.name}</div>
                        <div><strong>Email:</strong> {user.email}</div>
                        <div><strong>Vai trò:</strong> {user.role}</div>
                        <div><strong>Giới tính:</strong> {user.gender === "male" ? "Nam" : "Nữ"}</div>
                        <div><strong>Ngày sinh:</strong> {formatDateUTC(user.dob)}</div>
                        <div><strong>Tuổi:</strong> {user.age}</div>
                        <div><strong>SĐT:</strong> {user.phone}</div>
                        <div><strong>Địa chỉ:</strong> {user.address}</div>
                        <div><strong>Ngày tạo:</strong> {user.createdAt ? formatDateUTC(user.createdAt) : "N/A"}</div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">Không tìm thấy người dùng.</p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ModaViewDetail;
