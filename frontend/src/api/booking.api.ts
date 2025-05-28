import axiosClient from '@/lib/axiosClient'

export const createBookingApi = async (data: any) => {
    try {
        const response = await axiosClient.post('/api/v1/booking/create', data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}