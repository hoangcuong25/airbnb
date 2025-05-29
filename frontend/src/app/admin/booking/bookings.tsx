'use client';

import { AdminContext } from '@/context/AdminContext';
import { useContext } from 'react';

const BookingManagement = () => {

    const { allBooking } = useContext(AdminContext)

    const getStatusBadge = (status: string) => {
        const base = "px-2 py-1 text-xs font-semibold rounded-full";
        switch (status) {
            case 'PENDING':
                return <span className={`${base} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`}>Chờ xác nhận</span>;
            case 'CONFIRMED':
                return <span className={`${base} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>Đã xác nhận</span>;
            case 'CANCELLED':
                return <span className={`${base} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`}>Đã hủy</span>;
            case 'COMPLETED':
                return <span className={`${base} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>Hoàn thành</span>;
            default:
                return <span className={`${base} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`}>Không xác định</span>;
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quản lý đặt phòng</h1>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Khách</th>
                            <th className="px-6 py-3">Phòng</th>
                            <th className="px-6 py-3">Check-in</th>
                            <th className="px-6 py-3">Check-out</th>
                            <th className="px-6 py-3">Trạng thái</th>
                            <th className="px-6 py-3">Tổng tiền</th>
                            <th className="px-6 py-3">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {allBooking.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            allBooking.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="px-6 py-4">{booking.guest.name}</td>
                                    <td className="px-6 py-4">{booking.listing.title}</td>
                                    <td className="px-6 py-4">{booking.checkInDate}</td>
                                    <td className="px-6 py-4">{booking.checkOutDate}</td>
                                    <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                                    <td className="px-6 py-4">{booking.totalPrice.toLocaleString('vi-VN')} VNĐ</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <span className="text-gray-400 text-sm">Không khả dụng</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingManagement;