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

export const getAllListingApi = async () => {
    try {
        const response = await axiosClient.get('/api/v1/listing/get-all-listing')
        return response.data.data
    }
    catch (error) {
        throw error
    }
}

export const deleteListingApi = async (id: string) => {
    try {
        const response = await axiosClient.delete(`/api/v1/listing/delete/${id}`)
        return response.data
    }
    catch (error) {
        throw error
    }
}

export const updateListingApi = async (formData: any) => {
    try {
        const response = await axiosClient.patch(`/api/v1/listing/update`, formData, {
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
