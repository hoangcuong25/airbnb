import React from 'react'
import SidebarInbox from '../../../../components/user/SidebarInbox'

const Messages = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4">
        <SidebarInbox />
      </div>
      <div className="flex-1 bg-gray-100">
        {/* Message Content Area */}
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a message to view
        </div>
      </div>
    </div>
  )
}

export default Messages
