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
import { AppContext } from '@/context/AppContext';
import DropdownMenuNavbar from './DropdownMenuNavbar';

const NavbarUser = () => {

    const { user, logout } = useContext(AppContext)

    const pathname = usePathname()

    return (
        <div className='flex items-start justify-between'>
            {/* Logo */}
            <Image src={air_bnb_logo} width={100} height={100} alt='Logo' />


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
                <DropdownMenuNavbar user={user} logout={logout} />

            </div>
        </div >
    );
};

export default NavbarUser;
