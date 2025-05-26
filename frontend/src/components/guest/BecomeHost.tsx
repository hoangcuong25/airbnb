"use client"

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BecomeHost = () => {

    const router = useRouter();

    const [selected, setSelected] = useState<string | null>(null);

    const options = [
        { value: "stay", label: "Nơi lưu trú", emoji: "🏠" },
        { value: "experience", label: "Trải nghiệm", emoji: "🎈" },
        { value: "service", label: "Dịch vụ", emoji: "🛎️" },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='flex items-start justify-start gap-2 border-b border-gray-300 py-5 w-full hover:bg-gray-100 cursor-pointer px-2 rounded'>
                    <div className='flex flex-col items-start justify-start'>
                        <p className='font-semibold'>Trở thành host</p>
                        <p className='text-xs'>
                            Bắt đầu tiếp đón khách và <br />
                            kiếm thêm thu nhập thật dễ dàng
                        </p>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className='w-[1000px] !max-w-none'>
                <DialogHeader>
                    <DialogTitle className='text-center text-3xl font-bold py-3'>
                        Bạn muốn cung cấp gì?
                    </DialogTitle>
                </DialogHeader>

                <div className='grid grid-cols-3 gap-6 mt-6'>
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => setSelected(opt.value)}
                            className={`flex flex-col items-center justify-center border rounded-xl size-72 p-6 cursor-pointer transition text-center text-lg ${selected === opt.value
                                ? "border-black shadow-lg"
                                : "border-gray-300"
                                }`}
                        >
                            <span className='text-6xl'>{opt.emoji}</span>
                            <p className='mt-10 font-medium text-xl'>{opt.label}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <Button
                        disabled={!selected}
                        className={`rounded-xl text-lg h-12 w-28 font-semibold transition ${selected
                            ? "bg-black "
                            : "bg-gray-300 border border-black text-black cursor-not-allowed"
                            }`}
                        onClick={() => router.push(`/become-a-host`)}
                    >
                        Tiếp theo
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default BecomeHost;
