'use client';

import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/hook/zod-schema/loginSchema';
import { LoginApi } from '@/api/auth.api';
import { AppContext } from '@/context/AppContext';
import GoogleLogin from '@/components/GoogleLogin';

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    const { fetchUser } = useContext(AppContext);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await LoginApi(data);

            const { role } = response.data.user;

            if (role === 'ADMIN') router.push('/admin/dashboard');
            else if (role === 'HOST') router.push('/host/dashboard');
            else router.push('/');

            localStorage.setItem('access_token', response.data.access_token);
            fetchUser();
            toast.success('Đăng nhập thành công');
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Đăng nhập thất bại';
            toast.error(errorMessage);
        } finally {
            fetchUser();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Đăng nhập</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Chưa có tài khoản?{' '}
                        <Link href="/register" className="text-primary hover:underline font-medium">
                            Đăng ký
                        </Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Nhập email"
                            className="w-full mt-1 px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mật khẩu</label>
                        <div className="relative mt-1">
                            <input
                                {...register('password')}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu"
                                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <input type="checkbox" className="rounded border-gray-300 dark:bg-gray-800" />
                            Ghi nhớ đăng nhập
                        </label>
                        <Link href="/forgot-password" className="text-primary hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition disabled:opacity-50"
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                </form>

                {/* OR & Google Login */}
                <div className="text-center mt-6">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">Hoặc</span>
                        </div>
                    </div>
                    <GoogleLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;
