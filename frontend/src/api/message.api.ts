import axiosClient from '@/lib/axiosClient'

export const findContacts = async () => {
    try {
        const response = await axiosClient.get(`/api/v1/message/contacts`);
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch contacts:', error);
        throw error;
    }
};
