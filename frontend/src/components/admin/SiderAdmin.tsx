'use client';

import { AppContext } from '@/context/AppContext';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useContext } from 'react';
import {
    FaUsers,
    FaCalendarCheck,
    FaList,
} from 'react-icons/fa';

const SiderAdmin = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { logout } = useContext(AppContext)

    const menuItems = [
        {
            title: 'Dashboard',
            icon: <LayoutDashboard className="w-6 h-6" />,
            path: '/admin/dashboard'
        },
        {
            title: 'Quản lý người dùng',
            icon: <FaUsers className="w-6 h-6" />,
            path: '/admin/user'
        },
        {
            title: 'Quản lý đặt phòng',
            icon: <FaCalendarCheck className="w-6 h-6" />,
            path: '/admin/booking'
        },
        {
            title: 'Quản lý danh sách',
            icon: <FaList className="w-6 h-6" />,
            path: '/admin/listing'
        }
    ];

    return (
        <div className="w-80 min-h-screen bg-white dark:bg-gray-800 border border-gray-200 shadow-xl">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 transition-colors duration-200">Admin Panel</h2>
                <nav>
                    <ul className="space-y-4">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <button
                                    onClick={() => router.push(item.path)}
                                    className={`w-full flex items-center px-6 py-4 text-gray-700 dark:text-gray-200 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md ${pathname === item.path
                                        ? 'bg-primary text-white shadow-lg scale-105'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <span className={`mr-4 transition-transform duration-300 ${pathname === item.path ? 'rotate-12' : 'group-hover:rotate-12'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-lg font-medium transition-colors duration-200">{item.title}</span>
                                </button>
                            </li>
                        ))}

                        <div>
                            <button
                                onClick={logout}
                                className="w-full flex items-center px-6 py-4 text-red-600 dark:text-red-400 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md hover:bg-red-200 dark:hover:bg-red-800"
                            >
                                <LogOut className="w-6 h-6 mr-4" />
                                <span className="text-lg font-medium">Đăng xuất</span>
                            </button>

                        </div>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SiderAdmin;
