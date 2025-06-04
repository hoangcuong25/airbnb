'use client'

import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL)

const ChatBox = () => {
    const { textingWith, user } = useContext(AppContext)
    const [messages, setMessages] = useState<any[]>([])
    const [newMessage, setNewMessage] = useState('')

    const userId1 = user?.id
    const userId2 = textingWith?.id

    useEffect(() => {
        if (userId1 && userId2) {
            socket.emit('join_room', { userId1, userId2 })

            const handleLoadMessages = (msgs: any[]) => setMessages(msgs)
            const handleReceiveMessage = (message: any) =>
                setMessages(prev => [...prev, message])

            socket.off('loadMessages', handleLoadMessages)
            socket.off('receiveMessage', handleReceiveMessage)

            socket.on('loadMessages', handleLoadMessages)
            socket.on('receiveMessage', handleReceiveMessage)
        }

        return () => {
            socket.off('loadMessages')
            socket.off('receiveMessage')
        }
    }, [userId1, userId2])

    const handleSend = () => {
        if (newMessage.trim()) {
            socket.emit('sendMessage', {
                senderId: userId1,
                receiverId: userId2,
                content: newMessage,
            })
            setNewMessage('')
        }
    }

    // ⛔ Nếu chưa chọn người để nhắn tin
    if (!textingWith) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500 bg-white">
                Vui lòng chọn một người để bắt đầu cuộc trò chuyện.
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full w-full p-4 bg-white">
            {/* 🧑‍💻 Thông tin người đang chat */}
            <div className="pb-4 border-b mb-4">
                <div className="font-semibold text-lg flex gap-3 items-center">
                    <Image src={textingWith.avatar} alt='avatar' width={50} height={50} className='rounded-full object-cover size-12' />
                    <p>
                        {textingWith.name} (
                        {textingWith.role === 'HOST' ? 'Chủ nhà' :
                            textingWith.role === 'ADMIN' ? 'Quản trị viên' :
                                'Người dùng'}
                        )
                    </p>
                </div>
            </div>

            {/* 💬 Nội dung tin nhắn */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {messages.map((msg, idx) => {
                    const isOwnMessage = msg.sender.id === userId1

                    return (
                        <div key={idx} className={`flex items-end gap-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                            {!isOwnMessage && (
                                <Image
                                    src={msg.sender.avatar}
                                    alt="avatar"
                                    width={30}
                                    height={30}
                                    className="rounded-full object-cover w-[30px] h-[30px]"
                                />
                            )}
                            <div className={`p-2 rounded-lg max-w-xs text-sm ${isOwnMessage ? 'bg-blue-100' : 'bg-gray-200'}`}>
                                {msg.content}
                            </div>
                            {isOwnMessage && (
                                <Image
                                    src={msg.sender.avatar}
                                    alt="avatar"
                                    width={30}
                                    height={30}
                                    className="rounded-full object-cover w-[30px] h-[30px]"
                                />
                            )}
                        </div>
                    )
                })}
            </div>

            {/* ✏️ Gửi tin nhắn */}
            <div className="flex mt-4 mb-10">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2  focus:outline-none "
                    placeholder="Nhập tin nhắn..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-r-lg transition-colors duration-200"
                    onClick={handleSend}
                >
                    Gửi
                </button>
            </div>
        </div>
    )
}

export default ChatBox
