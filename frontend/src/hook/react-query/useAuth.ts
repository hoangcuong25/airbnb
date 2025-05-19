import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginApi, LoginPayload, RegisterApi, RegisterPayload } from '@/api/auth.api';
import axiosClient from '@/lib/axiosClient'

// Đăng ký
export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterPayload) => RegisterApi(data),
    });
}

// Đăng nhập và lưu user vào cache
export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginPayload) => LoginApi(data),
        onSuccess: (data) => {
            queryClient.setQueryData(['currentUser'], data.data.user);
        },
    });
}

// ✅ Lấy current user, với staleTime = 5 phút
export function useCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await axiosClient.get('/api/v1/user/get-profile');
            return response.data.user;
        },
        staleTime: 1000 * 60 * 5, // 5 phút
    });
}
