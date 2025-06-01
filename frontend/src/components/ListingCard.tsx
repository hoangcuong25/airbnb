'use client'

import { AppContext } from '@/context/AppContext'
import { addToWishlistApi, removeFromWishlistApi } from '@/api/wishlist.api'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { toast } from 'sonner'

interface ListingCardProps {
    listing: any
}

const ListingCard = ({ listing }: ListingCardProps) => {
    const { user, userWishlist, fetchUserWishlist } = useContext(AppContext)
    const router = useRouter()

    const isInWishlist = (listingId: number) =>
        userWishlist.some((item: any) => item.listingId === listingId)

    const handleAddToWishlist = async (listingId: number) => {
        try {
            await addToWishlistApi(listingId)
            toast.success('Đã thêm vào danh sách yêu thích!')
            fetchUserWishlist()
        } catch {
            toast.error('Thêm vào wishlist thất bại')
        }
    }

    const handleRemoveFromWishlist = async (listingId: number) => {
        try {
            await removeFromWishlistApi(listingId)
            toast.success('Đã bỏ khỏi danh sách yêu thích!')
            fetchUserWishlist()
        } catch {
            toast.error('Bỏ wishlist thất bại')
        }
    }

    return (
        <div className="flex flex-col">
            <div className="relative h-56 w-full">
                <Image
                    src={typeof listing.images[0] === "string"
                        ? listing.images[0]
                        : (listing.images[0]?.url || "/placeholder.png")}
                    alt={listing.title}
                    fill
                    className="object-cover rounded-lg"
                    onClick={() => router.push(`/listing/${listing.id}`)}
                />
                <button className="absolute top-2 right-2 bg-white rounded-full p-1 z-10">
                    {user && isInWishlist(listing.id) ? (
                        <Heart
                            onClick={() => handleRemoveFromWishlist(listing.id)}
                            className="w-5 h-5 cursor-pointer fill-red-500 text-red-500"
                        />
                    ) : (
                        <Heart
                            onClick={() => handleAddToWishlist(listing.id)}
                            className="w-5 h-5 cursor-pointer text-gray-500"
                        />
                    )}
                </button>
                <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded">
                    Được khách yêu thích
                </span>
            </div>
            <div className="p-2">
                <p className="text-sm font-semibold">{listing.title}</p>
                <p className="text-sm text-muted-foreground">
                    ₫{listing.pricePerNight} cho 2 đêm • ⭐ 5 (100 đánh giá)
                </p>
            </div>
        </div>
    )
}

export default ListingCard
