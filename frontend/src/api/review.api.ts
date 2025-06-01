import axiosClient from '@/lib/axiosClient'

export const reviewApi = async (reviewData: {
    listingId: number;
    rating: number;
    comment: string;
}) => {
    try {
        const response = await axiosClient.post('/api/v1/review/user-review', reviewData)
        return response.data.data
    } catch (error: any) {
        throw error.response?.data || error.message
    }
}