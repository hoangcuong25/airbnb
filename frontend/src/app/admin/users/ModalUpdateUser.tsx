import React, { useEffect, useState } from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
    DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleSave: () => void;
    selectedUser: any;
    setSelectedUser: (user: any) => void;
    image: File | null;
    setImage: (image: File | null) => void;
    isLoading: boolean;
};

const ModalUpdateUser: React.FC<Props> = ({
    open, setOpen, handleSave, selectedUser,
    setSelectedUser, image, setImage, isLoading
}) => {

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleInputChange = (field: keyof typeof selectedUser, value: any) => {
        setSelectedUser({ ...selectedUser, [field]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (selectedUser?.avatar && typeof selectedUser.avatar === 'string') {
            setPreviewImage(selectedUser.avatar);
        } else {
            setPreviewImage(null);
        }
        setImage(null);
    }, [selectedUser]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
                    <DialogDescription>
                        Bạn có thể chỉnh sửa thông tin người dùng tại đây.
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
                    <Select
                        value={selectedUser?.gender || ''}
                        onValueChange={(value) => handleInputChange('gender', value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="MALE">Nam</SelectItem>
                            <SelectItem value="FEMALE">Nữ</SelectItem>
                            <SelectItem value="OTHER">Khác</SelectItem>
                        </SelectContent>
                    </Select>
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
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Ảnh xem trước:</p>
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
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? "Đang lưu..." : "Lưu"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalUpdateUser;
