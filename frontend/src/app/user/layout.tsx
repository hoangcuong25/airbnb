import NavbarGuest from "@/components/guest/NavbarGuest";
import SidebarUser from "@/components/user/SidebarUser";
import React from 'react';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavbarGuest />
            <div className="flex">
                <aside className="w-64 bg-white shadow-md sticky top-0 h-screen">
                    <SidebarUser />
                </aside>
                <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}