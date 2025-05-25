'use client'

import Image from 'next/image'
import React, { useContext } from 'react'
import air_bnb_logo from '@public/Airbnb_Logo.svg'
import {
    House,
    FerrisWheel,
    ConciergeBell,
    Globe,
    Search,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AppContext } from '@/context/AppContext';
import DropdownMenuNavbar from './DropdownMenuNavbar';

const NavbarGuest = () => {

    const { user, logout } = useContext(AppContext)

    const pathname = usePathname()

    return (
        <div className='flex items-start justify-between'>
            {/* Logo */}
            <Image src={air_bnb_logo} width={100} height={100} alt='Logo' />

            {/* Center Navigation */}
            <div className='flex flex-col items-center justify-between'>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {[
                        { icon: <House className="w-5 h-5" />, label: 'Nơi lưu trú', path: '/' },
                        { icon: <FerrisWheel className="w-5 h-5 " />, label: 'Trải nghiệm mới', path: '/experience' },
                        { icon: <ConciergeBell className="w-5 h-5 " />, label: 'Dịch vụ', path: '/service' },
                    ].map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow transition duration-200 cursor-pointer ${pathname === item.path ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            {item.icon}
                            <p className="text-sm font-medium whitespace-nowrap">{item.label}</p>
                        </Link>
                    ))}
                </div>

                <div className='flex items-center justify-center mt-5 text-sm '>
                    <div className='border border-gray-300 rounded-full px-5 py-2 flex items-center justify-between'>
                        <div className='border-r border-gray-300 pr-5'>
                            <p>Địa điểm</p>
                            <p className='font-light'>Tìm kiếm theo địa điểm</p>
                        </div>
                        <div className='border-r border-gray-300 px-5'>
                            <p>Nhận Phòng</p>
                            <p className='font-light'>Thêm ngày</p>
                        </div>
                        <div className='border-r border-gray-300 px-5'>
                            <p>Trả Phòng</p>
                            <p className='font-light'>Thêm ngày</p>
                        </div>
                        <div className='px-5 pr-10'>
                            <p>Khách</p>
                            <p className='font-light'>Thêm khách</p>
                        </div>
                        <div className='flex items-center justify-center bg-red-500 rounded-full p-2'>
                            <Search className='text-white' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex items-center justify-between gap-8'>
                <p>Trở thành Host</p>

                {/* Hiển thị icon Globe nếu có user */}
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

                {/* Menu dropdown */}
                <DropdownMenuNavbar user={user} logout={logout}/>

            </div>
        </div >
    );
};

export default NavbarGuest;
