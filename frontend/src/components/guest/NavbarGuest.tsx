'use client';

import Image from 'next/image';
import React, { useContext, useState } from 'react';
import air_bnb_logo from '@public/Airbnb_Logo.svg';
import {
    House,
    FerrisWheel,
    ConciergeBell,
    Globe,
    Search,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppContext } from '@/context/AppContext';
import DropdownMenuNavbar from './DropdownMenuNavbar';

const NAV_ITEMS = [
    { path: '/', label: 'Trang chủ', icon: House },
    { path: '/experiences', label: 'Trải nghiệm', icon: FerrisWheel },
    { path: '/services', label: 'Dịch vụ', icon: ConciergeBell },
];

const NavbarGuest = () => {
    const { user, logout } = useContext(AppContext);
    const [location, setLocation] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = () => {
        if (!location.trim()) return;
        router.push(`/search?keyword=${encodeURIComponent(location.trim())}`);
    };

    const renderNavItems = () =>
        NAV_ITEMS.map(({ path, label, icon: Icon }, i) => {
            const isActive = pathname === path;
            return (
                <Link
                    key={i}
                    href={path}
                    className={`flex items-center px-4 py-2 rounded-full transition-all duration-200
                    ${isActive
                            ? 'bg-red-500 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm hover:text-black'
                        }`}
                >
                    <Icon className="w-5 h-5 mr-2 transition-colors duration-200" />
                    <span className="text-sm font-medium">{label}</span>
                </Link>
            );
        });

    return (
        <div className="flex items-start justify-between w-full px-6 py-4">
            {/* Logo */}
            <Image src={air_bnb_logo} width={100} height={100} alt="Logo" onClick={() => router.push('/')} />

            {/* Center Navigation - hidden on /user pages */}
            {!pathname.startsWith('/user') && !pathname.startsWith('/wishlist') && !pathname.startsWith('/message') && (
                <div className="flex flex-col items-center justify-between">
                    <div className="flex items-center gap-4 flex-wrap">{renderNavItems()}</div>

                    <div className="flex items-center justify-center mt-5 text-sm">
                        <div className="border border-gray-300 rounded-full px-5 py-2 flex items-center">
                            <div className="border-r border-gray-300 pr-5">
                                <input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Tìm kiếm theo địa điểm"
                                    className="bg-transparent outline-none text-sm font-light w-32"
                                />
                            </div>
                            <div className="border-r border-gray-300 px-5 text-gray-600">
                                <p>Nhận Phòng</p>
                                <p className="font-light">Thêm ngày</p>
                            </div>
                            <div className="border-r border-gray-300 px-5 text-gray-600">
                                <p>Trả Phòng</p>
                                <p className="font-light">Thêm ngày</p>
                            </div>
                            <div className="px-5 pr-10 text-gray-600">
                                <p>Khách</p>
                                <p className="font-light">Thêm khách</p>
                            </div>
                            <button
                                onClick={handleSearch}
                                className="flex items-center justify-center bg-red-500 rounded-full p-2 ml-2"
                            >
                                <Search className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Right Side */}
            <div className="flex items-center gap-6">
                <p>Trở thành Host</p>

                {user ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
                        <Image
                            src={user.avatar}
                            alt="User Avatar"
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 shadow-md">
                        <Globe className="text-gray-500" />
                    </div>
                )}

                <DropdownMenuNavbar user={user} logout={logout} />
            </div>
        </div>
    );
};

export default NavbarGuest;
