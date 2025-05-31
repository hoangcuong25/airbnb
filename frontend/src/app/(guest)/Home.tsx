'use client'

import { addToWishlistApi, removeFromWishlistApi } from '@/api/wishlist.api'
import { AppContext } from '@/context/AppContext'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { toast } from 'sonner'

const Home = () => {

    const { listings, userWishlist, fetchUserWishlist } = useContext(AppContext)

    const router = useRouter()

    const handleAddToWishlist = async (listingId: number) => {
        try {
            const response = await addToWishlistApi(listingId)

            toast.success('Đã thêm vào danh sách yêu thích!');
            fetchUserWishlist()
        }
        catch (error: any) {
            toast.error('Thêm vào wishlist thất bại');
        }
    }

    const handleRemoveFromWishlist = async (listingId: number) => {
        try {
            await removeFromWishlistApi(listingId)

            toast.success('Đã bỏ khỏi danh sách yêu thích!');
            fetchUserWishlist()
        } catch (error: any) {
            toast.error('Bỏ wishlist thất bại');
        }
    }

    const isInWishlist = (listingId: number) => {
        return userWishlist.some((item: any) => item.listingId === listingId);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">
                Nơi lưu trú được ưa chuộng tại Hồ Chí Minh
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
                {listings.map((listing, index) => (
                    <div className="flex flex-col" key={index}>
                        <div key={index} className="relative">
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
                                <button className="absolute top-2 right-2 bg-white rounded-full p-1">
                                    {
                                        isInWishlist(listing.id) ?
                                            <Heart
                                                onClick={() => handleRemoveFromWishlist(listing.id)}
                                                className={`w-5 h-5 cursor-pointer  fill-red-500 text-red-500`}
                                            />
                                            : <Heart
                                                onClick={() => handleAddToWishlist(listing.id)}
                                                className={`w-5 h-5 cursor-pointer text-gray-500`}
                                            />
                                    }
                                </button>
                                {true && (
                                    <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded">
                                        Được khách yêu thích
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="p-2">
                            <p className="text-sm font-semibold">{listing.title}</p>
                            <p className="text-sm text-muted-foreground">
                                ₫{listing.pricePerNight} cho 2 đêm • ⭐ 5   (100 đánh giá)
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home