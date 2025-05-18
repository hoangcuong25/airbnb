import { z } from 'zod';

// Zod schema
export const registerSchema = z.object({
    name: z.string().min(1, 'Họ và tên là bắt buộc'),
    email: z.string().email('Email không hợp lệ'),
    password1: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    password2: z.string()
}).refine((data) => data.password1 === data.password2, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['password2'],
});