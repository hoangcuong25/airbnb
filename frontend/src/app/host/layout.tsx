'use client';

import SiderHost from "@/components/host/SiderHost";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Left Sidebar - Fixed */}
            <SiderHost />

            {/* Main Content - Dynamic */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}