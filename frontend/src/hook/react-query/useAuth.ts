import { useMutation } from '@tanstack/react-query';
import { RegisterApi, RegisterPayload, } from '@/api/auth.api';

export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterPayload) => RegisterApi(data),
    });
}

// export function useLogin() {
//     return useMutation({
//         mutationFn: (data: LoginPayload) => login(data),
//     });
// }
