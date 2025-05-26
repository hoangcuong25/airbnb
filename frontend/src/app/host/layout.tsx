'use client'

import SiderHost from "@/components/host/SiderHost";
import HostContextProvider from "@/context/HostContext";

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
                <HostContextProvider>
                    {children}
                </HostContextProvider>
            </div>
        </div>
    );
}