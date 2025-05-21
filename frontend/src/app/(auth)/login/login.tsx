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

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {

    const { fetchUser } = useContext(AppContext)

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
            const response = await LoginApi(data)

            if (response.data.user.role == 'ADMIN') {
                router.push('/admin/dashboard');
            }
            else {
                router.push('/');
            }

            localStorage.setItem('access_token', response.data.access_token);
            fetchUser()

            toast.success('Đăng nhập thành công');
        } catch (error) {
            toast.error('Đăng nhập thất bại');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
            <div className="max-w-md w-full space-y-8 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg border border-gray-300 dark:border-gray-700 shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Đăng nhập</h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Hoặc{' '}
                        <Link href="/register" className="font-medium text-primary hover:text-primary/80">
                            đăng ký nếu chưa có tài khoản
                        </Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="Nhập email"
                                className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu"
                                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-primary border-gray-300 rounded" />
                            <span className="ml-2 text-sm text-gray-900 dark:text-gray-300">Ghi nhớ đăng nhập</span>
                        </label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none disabled:opacity-50"
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
