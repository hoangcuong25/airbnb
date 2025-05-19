'use client';

import { useRouter, usePathname } from 'next/navigation';
import { 
    FaUsers, 
    FaCalendarCheck, 
    FaList, 
    FaCog 
} from 'react-icons/fa';

const SiderAdmin = () => {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        {
            title: 'Quản lý người dùng',
            icon: <FaUsers className="w-6 h-6" />,
            path: '/admin/users'
        },
        {
            title: 'Quản lý đặt phòng',
            icon: <FaCalendarCheck className="w-6 h-6" />,
            path: '/admin/bookings'
        },
        {
            title: 'Quản lý danh sách',
            icon: <FaList className="w-6 h-6" />,
            path: '/admin/listings'
        },
        {
            title: 'Cấu hình',
            icon: <FaCog className="w-6 h-6" />,
            path: '/admin/config'
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
                                    className={`w-full flex items-center px-6 py-4 text-gray-700 dark:text-gray-200 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md ${
                                        pathname === item.path
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
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SiderAdmin;
