import axiosClient from '@/lib/axiosClient'

export type RegisterPayload = {
    name: string;
    email: string;
    password1: string;
    password2: string;
};

export const RegisterApi = async (payload: RegisterPayload) => {
    try {
        if (payload.password1 !== payload.password2) {
            throw new Error('Mật khẩu không khớp');
        }

        const response = await axiosClient.post('/api/v1/auth/register', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export type LoginPayload = {
    email: string;
    password: string;
}

export const LoginApi = async (payload: LoginPayload) => {
    try {
        const response = await axiosClient.post('/api/v1/auth/login', payload)
        return response.data

    } catch (error) {
        throw error;
    }
}

export const LogoutApi = async () => {
    try {
        await axiosClient.post('/api/v1/auth/logout')

    } catch (error) {
        throw error;
    }
}
