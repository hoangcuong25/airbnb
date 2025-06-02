"use client"

import React, { useState } from 'react'
import { IoSearch, IoSettingsOutline, IoChatbubbleEllipsesOutline, IoBriefcaseOutline } from 'react-icons/io5'
import { FaAirbnb } from 'react-icons/fa'

type Tab = 'all' | 'unread'

const SidebarInbox = () => {
  const [showAllMessagesList, setShowAllMessagesList] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('all')

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab)
    if (tab === 'all') {
      setShowAllMessagesList(true)
    } else {
      setShowAllMessagesList(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Tin nhắn</h2>
        <div className="flex items-center">
          <IoSearch className="ml-4 text-2xl cursor-pointer" />
          <IoSettingsOutline className="ml-4 text-2xl cursor-pointer" />
        </div>
      </div>
      <div className="flex px-4 border-b border-gray-200">
        <button
          className={`py-2 px-4 mr-2 border-b-2 ${activeTab === 'all' ? 'border-black font-semibold text-black' : 'border-transparent text-gray-700'} focus:outline-none`}
          onClick={() => handleTabClick('all')}
        >
          Tất cả
        </button>
        <button
          className={`py-2 px-4 mr-2 border-b-2 ${activeTab === 'unread' ? 'border-black font-semibold text-black' : 'border-transparent text-gray-700'} focus:outline-none`}
          onClick={() => handleTabClick('unread')}
        >
          Chưa đọc
        </button>
      </div>
      {showAllMessagesList ? (
        <div className="p-4">
          <div className="flex items-center p-3 rounded-lg bg-gray-100 cursor-pointer">
            <IoChatbubbleEllipsesOutline className="text-2xl mr-4" />
            <span>Tất cả</span>
          </div>
          <div className="flex items-center p-3 rounded-lg cursor-pointer">
            <IoBriefcaseOutline className="text-2xl mr-4" />
            <span>Du lịch</span>
          </div>
          <div className="flex items-center p-3 rounded-lg cursor-pointer">
            <FaAirbnb className="text-2xl mr-4" />
            <span>Hỗ trợ</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-center p-5">
          <IoChatbubbleEllipsesOutline className="text-5xl text-gray-400 mb-4" />
          <p className="my-1 text-gray-600">Bạn không có tin nhắn nào</p>
          <p className="my-1 text-gray-600">Khi bạn nhận được tin nhắn mới, tin nhắn đó sẽ xuất hiện ở đây.</p>
        </div>
      )}
    </div>
  )
}

export default SidebarInbox
