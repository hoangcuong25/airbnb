'use client'

import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3000') // hoặc đường dẫn backend

const ChatBox = ({ selfId, partnerId }: { selfId: number, partnerId: number }) => {
    const [messages, setMessages] = useState<any[]>([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        socket.emit('join_room', { selfId, partnerId })

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
    }, [selfId, partnerId])

    const handleSend = () => {
        if (newMessage.trim()) {
            socket.emit('sendMessage', {
                senderId: selfId,
                receiverId: partnerId,
                content: newMessage,
            })
            setNewMessage('')
        }
    }

    return (
        <div className="flex flex-col h-full w-full p-4 bg-white">
            <div className="flex-1 overflow-y-auto space-y-2">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`p-2 rounded-lg w-fit max-w-xs ${msg.sender.id === selfId ? 'ml-auto bg-blue-100' : 'mr-auto bg-gray-200'}`}>
                        <p className="text-sm">{msg.content}</p>
                    </div>
                ))}
            </div>
            <div className="flex mt-4">
                <input
                    type="text"
                    className="flex-1 border rounded-l px-3 py-2"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 rounded-r" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default ChatBox
