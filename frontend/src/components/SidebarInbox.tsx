"use client"

import React, { useState, useEffect, useContext } from 'react'
import {
  IoSearch,
  IoSettingsOutline,
  IoChatbubbleEllipsesOutline,
} from 'react-icons/io5'
import Image from 'next/image'
import { findContacts } from '@/api/message.api'
import { AppContext } from '@/context/AppContext'

interface Contact {
  id: number
  name: string
  avatar?: string
  role?: string
}

const SidebarInbox = () => {

  const { user } = useContext(AppContext)

  const [showAllMessagesList, setShowAllMessagesList] = useState(true)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchContacts = async () => {
        try {
          const data = await findContacts()
          setContacts(data)
        } catch (error) {
          console.error('Failed to load contacts', error)
        } finally {
          setLoading(false)
        }
      }

      fetchContacts()
    }

  }, [user])

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Tin nhắn</h2>
        <div className="flex items-center">
          <IoSearch className="ml-4 text-2xl cursor-pointer" />
          <IoSettingsOutline className="ml-4 text-2xl cursor-pointer" />
        </div>
      </div>

      <div className="flex px-4 py-2 border-b border-gray-200">
        <p className="font-medium">Danh sách nhắn tin</p>
      </div>

      {showAllMessagesList ? (
        <div className="flex flex-col gap-1 p-4 overflow-auto">
          {loading ? (
            <p className="text-center text-gray-400">Đang tải...</p>
          ) : contacts.length > 0 ? (
            contacts.map(contact => (
              <div
                key={contact.id}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                {contact.avatar ? (
                  <Image
                    src={contact.avatar}
                    alt={contact.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-4" />
                )}
                <span className="font-medium">{contact.name}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Không có liên hệ nào</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-center p-5">
          <IoChatbubbleEllipsesOutline className="text-5xl text-gray-400 mb-4" />
          <p className="my-1 text-gray-600">Bạn không có tin nhắn nào</p>
          <p className="my-1 text-gray-600">
            Khi bạn nhận được tin nhắn mới, tin nhắn đó sẽ xuất hiện ở đây.
          </p>
        </div>
      )}
    </div>
  )
}

export default SidebarInbox
