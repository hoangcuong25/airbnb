'use client'

import Image from 'next/image'
import React, { useContext, useState } from 'react'
import air_bnb_logo from '@public/Airbnb_Logo.svg'
import {
    House,
    FerrisWheel,
    ConciergeBell,
    Globe,
    Search,
    MapPin,
    Building,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppContext } from '@/context/AppContext';
import DropdownMenuNavbar from './DropdownMenuNavbar';
import Navbarcheckin from './component/Navbarcheckin';
import Navbarguest from './component/Navbarguest';

const NavbarGuest = () => {
    const { user, logout } = useContext(AppContext)
    const [location, setLocation] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
    const [flexibleDays, setFlexibleDays] = useState<number | null>(null);
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);
    const totalGuests = adults + children + infants + pets;
    const pathname = usePathname()
    const router = useRouter();

    const suggestedLocations = [
        { label: 'Lân cận', description: 'Tìm xung quanh bạn', icon: 'nearby' },
        { label: 'Thành phố Hồ Chí Minh, Thành phố Hồ Chí Minh', description: 'Có các thắng cảnh như Chợ Bến Thành', icon: 'city' },
        { label: 'Đà Lạt, Lâm Đồng', description: 'Phù hợp cho người yêu thiên nhiên', icon: 'city' },
        { label: 'Bangkok, Thái Lan', description: 'Có cuộc sống về đêm náo nhiệt', icon: 'city' },
        { label: 'Hạ Long, Quảng Ninh', description: 'Phù hợp cho người yêu thiên nhiên', icon: 'city' },
        { label: 'Thành phố Huế, Thừa Thiên-Huế', description: 'Có kiến trúc ấn tượng', icon: 'city' },
        { label: 'Vũng Tàu, Bà Rịa - Vũng Tàu', description: 'Có đường bờ biển tuyệt đẹp', icon: 'city' },
    ];

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
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder='Tìm kiếm theo địa điểm'
                                className='bg-transparent outline-none text-sm font-light w-32'
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                            />
                            {showSuggestions && (
                                <ul className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                    {suggestedLocations.map((location, index) => (
                                        <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            <div className="flex items-center">
                                                {location.icon === 'nearby' ? <MapPin className="w-5 h-5 mr-2" /> : <Building className="w-5 h-5 mr-2" />}
                                                <div>
                                                    <p className="font-medium">{location.label}</p>
                                                    <p className="text-gray-500">{location.description}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <Navbarcheckin
                            checkInDate={checkInDate}
                            checkOutDate={checkOutDate}
                            setCheckInDate={setCheckInDate}
                            setCheckOutDate={setCheckOutDate}
                            setFlexibleDays={setFlexibleDays}
                        />

                        <Navbarguest
                            totalGuests={totalGuests}
                            pets={pets}
                        />

                        <button
                            onClick={async () => {
                                if (!location.trim()) return;
                                try {
                                    router.push(`/search?keyword=${encodeURIComponent(location.trim())}`);
                                } catch (err) {
                                    console.error('Search error:', err);
                                }
                            }}
                            className='flex items-center justify-center bg-red-500 rounded-full p-2'
                        >
                            <Search className='text-white' />
                        </button>
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
                <DropdownMenuNavbar user={user} logout={logout} />
            </div>
        </div>
    );
};

export default NavbarGuest;
