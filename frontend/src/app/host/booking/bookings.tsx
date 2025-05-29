'use client';

import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { HostContext } from '@/context/HostContext';

const BookingManagement = () => {

    const { hostBookings } = useContext(HostContext)

    const [isLoading, setIsLoading] = useState(false);

    const getStatusColor = (status: BookingType['status']) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'CONFIRMED':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'COMPLETED':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
                        {hostBookings.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            hostBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="px-6 py-4">{booking.guest.name}</td>
                                    <td className="px-6 py-4">{booking.listing.title}</td>
                                    <td className="px-6 py-4">{booking.checkInDate}</td>
                                    <td className="px-6 py-4">{booking.checkOutDate}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={booking.status}
                                            // onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingType['status'])}
                                            disabled={isLoading}
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}
                                        >
                                            <option value="PENDING">Chờ xác nhận</option>
                                            <option value="CONFIRMED">Đã xác nhận</option>
                                            <option value="CANCELLED">Đã hủy</option>
                                            <option value="COMPLETED">Hoàn thành</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">{booking.totalPrice.toLocaleString('vi-VN')} VNĐ</td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:underline mr-2">Chi tiết</button>
                                        <button className="text-red-500 hover:underline">Hủy</button>
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
