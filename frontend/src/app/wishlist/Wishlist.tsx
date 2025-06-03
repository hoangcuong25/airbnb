'use client'

import React, { useContext } from 'react'
import { AppContext } from '@/context/AppContext'
import ListingCard from '@/components/ListingCard'

const Wishlist = () => {
    const { listings, userWishlist } = useContext(AppContext)

    const wishlistListings = listings.filter(listing =>
        userWishlist.some((wish: any) => wish.listingId === listing.id)
    )

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistListings.length === 0 ? (
                <p>Danh sách yêu thích trống</p>
            ) : (
                wishlistListings.map((listing: any) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))
            )}
        </div>
    )
}

export default Wishlist
