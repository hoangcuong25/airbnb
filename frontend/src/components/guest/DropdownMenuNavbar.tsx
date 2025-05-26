import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bell, CarTaxiFront, CircleHelp, CircleUser, Globe, Heart, Menu, MessageCircle, Settings } from "lucide-react";
import BecomeHost from "./BecomeHost";
import Link from "next/link";

const MenuItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <div className='flex items-center justify-start gap-2 pb-5 w-full hover:bg-gray-100 cursor-pointer px-2 py-1 rounded'>
        <Icon className='w-5 h-5' />
        <p>{label}</p>
    </div>
);

const MenuSection = ({ children }: { children: React.ReactNode }) => (
    <div className='border-b border-gray-300 w-full'>{children}</div>
);

const HostLinks = () => (
    <div className='flex flex-col items-start justify-start gap-2 border-b border-gray-300 py-5 w-full'>
        <p className='text-base hover:bg-gray-100 cursor-pointer px-2 py-1 rounded w-full'>Giới thiệu chủ nhà</p>
        <p className='text-base hover:bg-gray-100 cursor-pointer px-2 py-1 rounded w-full'>Tìm host hỗ trợ</p>
    </div>
);

const AuthenticatedMenu = ({ logout }: { logout: () => void }) => (
    <div className='flex flex-col items-start justify-start text-sm'>
        <MenuItem icon={Heart} label='Danh sách yêu thích' />
        <MenuItem icon={CarTaxiFront} label='Chuyến đi' />
        <MenuItem icon={MessageCircle} label='Tin nhắn' />
        <MenuItem icon={CircleUser} label='Hồ sơ' />
        <MenuItem icon={Bell} label='Thông báo' />
        <MenuItem icon={Settings} label='Cài đặt tài khoản' />
        <MenuItem icon={Globe} label='Ngôn ngữ' />
        <MenuItem icon={CircleHelp} label='Trung tâm trợ giúp' />
        <BecomeHost />
        <HostLinks />
        <p
            className='text-base mt-5 hover:bg-gray-100 cursor-pointer px-2 py-1 rounded w-full'
            onClick={logout}
        >
            Đăng xuất
        </p>
    </div>
);

const GuestMenu = () => (
    <div className='flex flex-col items-start justify-start text-sm'>
        <MenuSection>
            <MenuItem icon={CircleHelp} label='Trung tâm trợ giúp' />
        </MenuSection>
        <BecomeHost />
        <div className='pt-5 cursor-pointer'>
            <Link href='/login'>
                <p className='font-semibold'>Đăng nhập</p>
                <p className='text-xs'>Để xem thông tin tài khoản của bạn</p>
            </Link>
        </div>
    </div>
);

const DropdownMenuNavbar = ({ user, logout }: any) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='size-9 flex items-center justify-center rounded-full bg-gray-200 shadow-md'>
                    <Menu className='text-6xl' />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 p-5'>
                {user ? <AuthenticatedMenu logout={logout} /> : <GuestMenu />}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownMenuNavbar