'use client'

import { useState } from 'react'
import ChatBox from '@/components/ChatBox'
import SidebarInbox from '@/components/SidebarInbox'

const Message = () => {


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Danh sách user */}
            <SidebarInbox />

            {/* Chat box */}
            <div className="flex-1 p-4">
                <ChatBox />
            </div>
        </div>
    )
}

export default Message
