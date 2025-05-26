"use client"

import React from 'react';
import imageHost from '@public/become-a-host.jpg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { becomeHost } from '@/api/user.api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const BecomeAHost = () => {

    const router = useRouter()

    const handleBecomeHost = async () => {
        try {
            await becomeHost();
            router.push('/host/dashboard');
            toast.success("Bạn đã trở thành chủ nhà thành công!");
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Đã xảy ra lỗi khi trở thành chủ nhà. Vui lòng thử lại sau.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-10 flex flex-col md:flex-row gap-10">
                <div className="flex-1">
                    <Image
                        src={imageHost}
                        alt="Become a Host"
                        className="rounded-xl w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Trở thành chủ nhà của chúng tôi</h2>
                    <p className="text-gray-600 mb-6">
                        Kiếm thêm thu nhập bằng cách chia sẻ không gian của bạn. Hãy trở thành chủ nhà hôm nay và bắt đầu hành trình đón tiếp khách từ khắp nơi trên thế giới.
                    </p>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="w-full h-16 text-lg font-semibold bg-black text-white ">
                                Bắt đầu ngay
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Bạn có chắc chắn muốn trở thành Host?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Khi tiếp tục, bạn sẽ bắt đầu quá trình đăng ký làm chủ nhà.
                                    Bạn sẽ cần cung cấp thông tin chi tiết về không gian của mình, thiết lập lịch trình và giá cả, và hoàn thành các bước xác minh cần thiết.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction onClick={handleBecomeHost}>Chấp thuận</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </div>
        </div>
    );
};

export default BecomeAHost;
