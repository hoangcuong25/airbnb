import axiosClient from '@/lib/axiosClient'

export const addToWishlistApi = async (listingId: number) => {
    try {
        const response = await axiosClient.post("/api/v1/wishlist/add-to-wishlist", { listingId })
    } catch (error) {
        throw error;
    }
}

export const fetchUserWishlistApi = async () => {
    try {
        const response = await axiosClient.get('/api/v1/wishlist/my-wishlist');
        return response.data.data
    }
    catch (error) {
        throw error;
    }
}

export const removeFromWishlistApi = async (listingId: number) => {
    try {
        await axiosClient.patch("/api/v1/wishlist/remove-from-wishlist", { listingId })

    }
    catch (error) {
        throw error;
    }
}