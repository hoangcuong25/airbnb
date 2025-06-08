import React from 'react'
import Wishlist from './Wishlist'
import NavbarGuest from '@/components/guest/NavbarGuest'

const page = () => {
    return (
        <>
            <NavbarGuest />
            <Wishlist />
        </>
    )
}

export default page