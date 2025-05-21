'use client';

import { AppContext } from '@/context/AppContext';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { toast } from 'sonner';

const UserManagement = () => {

    const { allUsers, formatDateUTC } = useContext(AppContext)

    const [isLoading, setIsLoading] = useState(false);

    const handleStatusChange = async (userId: number, newStatus: 'active' | 'inactive') => {
        try {
            setIsLoading(true);
            // Add your API call here to update user status
            toast.success('Cập nhật trạng thái thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý người dùng</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Quản lý và theo dõi tất cả người dùng trong hệ thống</p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Tìm kiếm người dùng..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex gap-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Tất cả vai trò</option>
                        <option value="admin">Host</option>
                        <option value="user">User</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tên</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Vai trò</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ngày tạo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {allUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            ) : (
                                allUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin'
                                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                disabled={isLoading}
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${'active' === 'active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}
                                            >
                                                {'active' === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {user.createdAt ? formatDateUTC(user.createdAt) : ''}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                                            <button
                                                className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-full transition"
                                                title="Chỉnh sửa"
                                                onClick={() => console.log('Sửa người dùng', user.id)}
                                            >
                                                <Pencil size={16} />
                                                <span className="hidden sm:inline">Sửa</span>
                                            </button>

                                            <button
                                                className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700  hover:bg-red-200 rounded-full transition"
                                                title="Xóa"
                                                onClick={() => console.log('Xóa người dùng', user.id)}
                                            >
                                                <Trash2 size={16} />
                                                <span className="hidden sm:inline">Xóa</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;