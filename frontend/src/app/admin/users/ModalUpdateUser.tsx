import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleSave: () => void;
    selectedUser: any;
    setSelectedUser: (user: any) => void;
};

const ModalUpdateUser: React.FC<Props> = ({
    open,
    setOpen,
    handleSave,
    selectedUser,
    setSelectedUser,
}) => {
    const handleInputChange = (field: string, value: any) => {
        setSelectedUser({ ...selectedUser, [field]: value });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
                    <DialogDescription>
                        Bạn có thể chỉnh sửa thông tin của người dùng tại đây.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        value={selectedUser?.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Tên người dùng"
                    />

                    <Input
                        value={selectedUser?.age || ''}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        placeholder="Tuổi"
                        type="number"
                    />

                    <Input
                        value={selectedUser?.gender || ''}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        placeholder="Giới tính"
                    />

                    <Input
                        value={selectedUser?.dob || ''}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                        placeholder="Ngày sinh"
                        type="date"
                    />

                    <Input
                        value={selectedUser?.address || ''}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Địa chỉ"
                    />

                    <Input
                        value={selectedUser?.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Số điện thoại"
                        type="tel"
                    />

                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleInputChange('avatar', e.target.files?.[0])}
                    />
                </div>

                <DialogFooter className="mt-4">
                    <Button onClick={handleSave}>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalUpdateUser;
