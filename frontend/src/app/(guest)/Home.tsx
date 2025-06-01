'use client'

import ListingCard from '@/components/ListingCard'
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const Home = () => {

    const { listings } = useContext(AppContext)

    const router = useRouter()

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">
                Nơi lưu trú được ưa chuộng tại Hồ Chí Minh
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
                {listings.map((listing: any) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    )
}

export default Home