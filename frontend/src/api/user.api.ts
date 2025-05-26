import axiosClient from '@/lib/axiosClient'

export const getUser = async () => {
    try {
        const response = await axiosClient.get('/api/v1/user/get-profile');

        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getAllUser = async () => {
    try {
        const response = await axiosClient.get('/api/v1/user/get-all-user');

        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (data: FormData) => {
    try {
        const response = await axiosClient.patch('/api/v1/user/update-user', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const response = await axiosClient.delete(`/api/v1/user/delete-user/${userId}`);

        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const becomeHost = async () => {
    try {
        const response = await axiosClient.post('/api/v1/user/become-host');

        return response.data.data;
    } catch (error) {
        throw error;
    }
}