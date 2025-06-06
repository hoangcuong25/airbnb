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
    MinusCircle,
    PlusCircle,
    CalendarDays,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppContext } from '@/context/AppContext';
import DropdownMenuNavbar from './DropdownMenuNavbar';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

const NavbarGuest = () => {

    const { user, logout } = useContext(AppContext)

    const [location, setLocation] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
    const [activeDateTab, setActiveDateTab] = useState('Ngày');
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
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 100) }
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
                        <div className='border-r border-gray-300 px-5'>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className='flex border-r border-gray-300 px-5 cursor-pointer'>
                                        <div className='pr-5'>
                                            <p>Nhận Phòng</p>
                                            <p className='font-light'>{checkInDate ? format(checkInDate, "dd/MM/yyyy", { locale: vi }) : "Thêm ngày"}</p>
                                        </div>
                                        <div>
                                            <p>Trả Phòng</p>
                                            <p className='font-light'>{checkOutDate ? format(checkOutDate, "dd/MM/yyyy", { locale: vi }) : "Thêm ngày"}</p>
                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <div className="flex justify-center mb-4">
                                        <button
                                            className={`px-4 py-2 rounded-l-md ${activeDateTab === 'Ngày' ? 'bg-gray-200' : 'bg-gray-100'}`}
                                            onClick={() => setActiveDateTab('Ngày')}
                                        >
                                            Ngày
                                        </button>
                                        <button
                                            className={`px-4 py-2 ${activeDateTab === 'Tháng' ? 'bg-gray-200' : 'bg-gray-100'}`}
                                            onClick={() => setActiveDateTab('Tháng')}
                                        >
                                            Tháng
                                        </button>
                                        <button
                                            className={`px-4 py-2 rounded-r-md ${activeDateTab === 'Linh hoạt' ? 'bg-gray-200' : 'bg-gray-100'}`}
                                            onClick={() => setActiveDateTab('Linh hoạt')}
                                        >
                                            Linh hoạt
                                        </button>
                                    </div>

                                    {activeDateTab === 'Ngày' && (
                                        <div className="flex flex-col items-center">
                                            <Calendar
                                                mode="range"
                                                selected={{
                                                    from: checkInDate,
                                                    to: checkOutDate,
                                                }}
                                                onSelect={(range) => {
                                                    setCheckInDate(range?.from);
                                                    setCheckOutDate(range?.to);
                                                    setFlexibleDays(null);
                                                }}
                                                numberOfMonths={2}
                                                disabled={(date) => {
                                                    const today = new Date()
                                                    today.setHours(0, 0, 0, 0)
                                                    return date < today;
                                                }}
                                            />

                                            <div className="flex justify-center space-x-2 mt-4">
                                                <button
                                                    className={`px-4 py-2 rounded-full ${flexibleDays === null ? "bg-gray-300" : "border border-gray-300"}`}
                                                    onClick={() => setFlexibleDays(null)}
                                                >
                                                    Ngày chính xác
                                                </button>
                                                {[1, 2, 3, 7, 14].map(days => (
                                                    <button
                                                        key={days}
                                                        className={`px-4 py-2 rounded-full ${flexibleDays === days ? "bg-gray-300" : "border border-gray-300"}`}
                                                        onClick={() => {
                                                            setFlexibleDays(days);
                                                            if (checkInDate) {
                                                                const calculatedCheckOut = new Date(checkInDate);
                                                                calculatedCheckOut.setDate(checkInDate.getDate() + days);
                                                                setCheckOutDate(calculatedCheckOut);
                                                            }
                                                        }}
                                                    >
                                                        ± {days} ngày
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeDateTab === 'Tháng' && (
                                        <div className="flex flex-col items-center py-8">
                                            <p className="font-medium mb-4">Chuyến đi của bạn diễn ra khi nào?</p>
                                            <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-center">
                                                Bộ chọn tháng (Placeholder)
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p>Th 3, 1 thg 7 <span className="font-normal">đến</span> Th 4, 1 thg 10</p>
                                            </div>
                                        </div>
                                    )}

                                    {activeDateTab === 'Linh hoạt' && (
                                        <div className="flex flex-col items-center py-4">
                                            {/* Duration Options */}
                                            <p className="font-medium mb-3">Bạn muốn ở trong bao lâu?</p>
                                            <div className="flex space-x-2 mb-6">
                                                <button className="px-4 py-2 border border-gray-300 rounded-full">Cuối tuần</button>
                                                <button className="px-4 py-2 border border-gray-300 rounded-full">1 tuần</button>
                                                <button className="px-4 py-2 border border-gray-300 rounded-full">1 tháng</button>
                                            </div>
                                            
                                            {/* Month Selection */}
                                            <p className="font-medium mb-3">Bạn muốn đi khi nào?</p>
                                            <div className="flex space-x-4 overflow-x-auto pb-4">
                                                {/* Placeholder Month Cards */}
                                                {[12, 1, 2, 3, 4, 5].map((month, index) => {
                                                    const year = month === 12 ? 2025 : 2026; // Static years based on image
                                                    return (
                                                        <div key={index} className="flex-none w-32 h-32 border border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer">
                                                            {/* Calendar Icon Placeholder */}
                                                            <div className="w-10 h-10 bg-gray-200 rounded-full mb-2"></div>
                                                            <p className="font-medium">Tháng {month}</p>
                                                            <p className="text-sm text-gray-500">{year}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PopoverContent>
                            </Popover>
                        </div>
                        {/* Guest Picker Popover */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className='px-5 pr-10 cursor-pointer'>
                                    <p>Khách</p>
                                    <p className='font-light'>{totalGuests > 0 ? `${totalGuests} khách${pets > 0 ? `, ${pets} thú cưng` : ''}` : "Thêm khách"}</p>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-4" align="end">
                                {/* Người lớn */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="font-medium">Người lớn</p>
                                        <p className="text-sm text-gray-500">Từ 13 tuổi trở lên</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => setAdults(Math.max(0, adults - 1))} disabled={adults === 0}><MinusCircle className="text-gray-400" size={20} /></button>
                                        <span className="w-6 text-center">{adults}</span>
                                        <button onClick={() => setAdults(adults + 1)}><PlusCircle className="text-gray-700" size={20} /></button>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 my-2"></div> {/* Divider */}

                                {/* Trẻ em */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="font-medium">Trẻ em</p>
                                        <p className="text-sm text-gray-500">Độ tuổi 2 – 12</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => setChildren(Math.max(0, children - 1))} disabled={children === 0}><MinusCircle className="text-gray-400" size={20} /></button>
                                        <span className="w-6 text-center">{children}</span>
                                        <button onClick={() => setChildren(children + 1)}><PlusCircle className="text-gray-700" size={20} /></button>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 my-2"></div> {/* Divider */}

                                {/* Em bé */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="font-medium">Em bé</p>
                                        <p className="text-sm text-gray-500">Dưới 2 tuổi</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => setInfants(Math.max(0, infants - 1))} disabled={infants === 0}><MinusCircle className="text-gray-400" size={20} /></button>
                                        <span className="w-6 text-center">{infants}</span>
                                        <button onClick={() => setInfants(infants + 1)}><PlusCircle className="text-gray-700" size={20} /></button>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 my-2"></div> {/* Divider */}

                                {/* Thú cưng */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Thú cưng</p>
                                        <p className="text-sm text-gray-500 underline cursor-pointer">Bạn sẽ mang theo động vật phục vụ?</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => setPets(Math.max(0, pets - 1))} disabled={pets === 0}><MinusCircle className="text-gray-400" size={20} /></button>
                                        <span className="w-6 text-center">{pets}</span>
                                        <button onClick={() => setPets(pets + 1)}><PlusCircle className="text-gray-700" size={20} /></button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
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
        </div >
    );
};

export default NavbarGuest;
