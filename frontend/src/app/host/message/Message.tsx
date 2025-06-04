'use client'

import { useState } from 'react'
import ChatBox from '@/components/ChatBox'
import SidebarInbox from '@/components/SidebarInbox'

const Message = () => {
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const hostId = 1 // 🧑 giả định ID host là 1 (hoặc lấy từ context)

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Danh sách user */}
            <SidebarInbox />

            {/* Chat box */}
            <div className="flex-1 p-4">
                {selectedUser ? (
                    <ChatBox />
                ) : (
                    <div className="text-gray-500 text-center mt-20">Chọn một người để bắt đầu trò chuyện</div>
                )}
            </div>
        </div>
    )
}

export default Message
