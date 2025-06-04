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
        socket.emit('join_room', { userId1, userId2 })

        socket.on('loadMessages', (msgs) => {
            setMessages(msgs)
        })

        socket.on('receiveMessage', (message) => {
            setMessages(prev => [...prev, message])
        })

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

    return (
        <div className="flex flex-col h-full w-full p-4 bg-white">
            {/* 🧑‍💻 Hiển thị thông tin người đang chat */}
            <div className="pb-4 border-b mb-4">
                {textingWith ? (
                    <div className="font-semibold text-lg flex gap-3 items-center">
                        <Image src={textingWith.avatar} alt='avatar' width={50} height={50} className='rounded-full object-cover' />
                        <p>{textingWith.name} ({textingWith.role === 'host' ? 'Chủ nhà' : 'Người dùng'})</p>
                    </div>
                ) : (
                    <div className="text-gray-500">Đang tải thông tin người dùng...</div>
                )}
            </div>

            {/* Nội dung tin nhắn */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`p-2 rounded-lg w-fit max-w-xs text-sm ${msg.sender.id === userId1 ? 'ml-auto bg-blue-100' : 'mr-auto bg-gray-200'}`}>
                        {msg.content}
                    </div>
                ))}
            </div>

            {/* Gửi tin nhắn */}
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
