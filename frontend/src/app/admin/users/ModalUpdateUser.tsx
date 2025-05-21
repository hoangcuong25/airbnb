import React, { useEffect, useState } from 'react';
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
import Image from "next/image";

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
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleInputChange = (field: string, value: any) => {
        setSelectedUser({ ...selectedUser, [field]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleInputChange('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        // Nếu người dùng đã có ảnh (URL từ backend), hiển thị mặc định
        if (selectedUser?.avatar && typeof selectedUser.avatar === 'string') {
            setPreviewImage(selectedUser.avatar);
        } else {
            setPreviewImage(null);
        }
    }, [selectedUser]);

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

                    <div className="space-y-2">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {previewImage && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ảnh xem trước:</p>
                                <Image
                                    src={previewImage}
                                    alt="Ảnh người dùng"
                                    width={120}
                                    height={120}
                                    className="rounded-md border"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button onClick={handleSave}>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalUpdateUser;
