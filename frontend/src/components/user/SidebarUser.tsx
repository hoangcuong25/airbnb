"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

const SidebarUser: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    // Check if the current pathname starts with the link path for highlighting nested routes
    return pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Hồ sơ</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <button
              className={`flex items-center gap-3 w-full text-left p-3 rounded-full transition-colors duration-200 ${isActive('/user/profile/about') ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
              onClick={() => navigateTo('/user/profile/about')}
            >
              <div className="w-10 h-10 bg-black text-white rounded-full flex justify-center items-center text-base">H</div> {/* Placeholder Avatar */}
              Giới thiệu bản thân
            </button>
          </li>
          <li className="mb-2">
            <button
              className={`flex items-center gap-3 w-full text-left p-3 rounded-full transition-colors duration-200 ${isActive('/user/profile/past-trips') ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
              onClick={() => navigateTo('/user/profile/past-trips')}
            >
              {/* Placeholder Suitcase Icon - Replace with actual icon if needed */}
              <span className="text-xl">💼</span>
              Chuyến đi trước đây
            </button>
          </li>
          <li className="mb-2">
            <button
              className={`flex items-center gap-3 w-full text-left p-3 rounded-full transition-colors duration-200 ${isActive('/user/profile/connections') ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
               onClick={() => navigateTo('/user/profile/connections')}
            >
               {/* Placeholder Connections Icon - Replace with actual icon if needed */}
              <span className="text-xl">👥</span>
              Kết nối
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarUser;
