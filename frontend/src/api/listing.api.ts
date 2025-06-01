import axiosClient from '@/lib/axiosClient'

export const createListingApi = async (data: any) => {
    try {
        const response = await axiosClient.post('/api/v1/listing/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 10 * 60 * 1000 // 10 minutes timeout
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

export const getMyListingApi = async () => {
    try {
        const response = await axiosClient.get('/api/v1/listing/get-my-listing')
        return response.data.data
    }
    catch (error) {
        throw error
    }
}

export const hostUpdateListingApi = async (formData: any) => {
    try {
        const response = await axiosClient.patch(`/api/v1/listing/host-update`, formData, {
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

export const hostDeleteListingApi = async (id: string) => {
    try {
        const response = await axiosClient.delete(`/api/v1/listing/host-delete/${id}`)
        return response.data
    }
    catch (error) {
        throw error
    }
}

export const getListingByIdApi = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/listing/get-listing/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const searchListingApi = async (keyword: string) => {
    try {
        const response = await axiosClient.get('/api/v1/listing/search', {
            params: { keyword },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
