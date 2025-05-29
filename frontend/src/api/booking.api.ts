import axiosClient from '@/lib/axiosClient'

export const createBookingApi = async (data: any) => {
    try {
        const response = await axiosClient.post('/api/v1/booking/create', data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getHostBookingApi = async () => {
    try {
        const response = await axiosClient.get('/api/v1/booking/host-booking')
        return response.data.data
    }
    catch (error) {
        throw error;
    }
}

export const updateStatusApi = async (bookingId: number, newStatus: 'CONFIRMED' | 'CANCELLED') => {
    try {
        const response = await axiosClient.patch(`/api/v1/booking/update-status`, {
            bookingId,
            status: newStatus
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};