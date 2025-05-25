'use client';

import SiderAdmin from '@/components/admin/SiderAdmin';
import AdminContextProvider from '@/context/AdminContext';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Left Sidebar - Fixed */}
            <SiderAdmin />

            {/* Main Content - Dynamic */}
            <div className="flex-1">
                <AdminContextProvider>
                    {children}
                </AdminContextProvider>
            </div>
        </div>
    );
}