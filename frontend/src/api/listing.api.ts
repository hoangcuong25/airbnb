import axiosClient from '@/lib/axiosClient'

export const createListingApi = async (data: any) => {
    try {
        const response = await axiosClient.post('/api/v1/listing/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    }
    catch (error) {
        throw error
    }
}
