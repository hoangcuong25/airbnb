import axiosClient from '@/lib/axiosClient'

export const addToWishlistApi = async (listingId: number) => {
    try {
        const response = await axiosClient.post("/api/v1/wishlist/add-to-wishlist", { listingId })
    } catch (error) {
        throw error;
    }
}