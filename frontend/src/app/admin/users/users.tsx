'use client';

import { AppContext } from '@/context/AppContext';
import { Pencil, Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import ModalUpdateUser from './ModalUpdateUser';

const UserManagement = () => {
    const { allUsers, formatDateUTC } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);

    const handleEditClick = (user: any) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleSave = () => {
        // Gọi API cập nhật người dùng ở đây
        toast.success(`Đã cập nhật tên người dùng: `);
        setOpen(false);
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý người dùng</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Quản lý và theo dõi tất cả người dùng trong hệ thống</p>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium">Tên</th>
                                <th className="px-6 py-3 text-left text-xs font-medium">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium">Vai trò</th>
                                <th className="px-6 py-3 text-left text-xs font-medium">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-medium">Ngày tạo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {allUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-gray-500 dark:text-gray-400 py-4">
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            ) : (
                                allUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4">{user.name}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.role}</td>
                                        <td className="px-6 py-4">Đang hoạt động</td>
                                        <td className="px-6 py-4">{user.createdAt ? formatDateUTC(user.createdAt) : ''}</td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className='border-gray-300'
                                                onClick={() => handleEditClick(user)}
                                            >
                                                <Pencil size={14} className="mr-1" />
                                                Sửa
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                <Trash2 size={14} className="mr-1" />
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal chỉnh sửa người dùng */}
            <ModalUpdateUser
                open={open}
                setOpen={setOpen}
                handleSave={handleSave}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />
        </div>
    );
};

export default UserManagement;
