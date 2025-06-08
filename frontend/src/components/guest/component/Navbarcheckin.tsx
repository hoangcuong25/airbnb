import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { useState, useEffect } from 'react'
import { DateRange } from "react-day-picker"

interface NavbarcheckinProps {
    checkInDate: Date | undefined;
    checkOutDate: Date | undefined;
    setCheckInDate: (date: Date | undefined) => void;
    setCheckOutDate: (date: Date | undefined) => void;
    setFlexibleDays: (days: number | null) => void;
}

const Navbarcheckin = ({ checkInDate, checkOutDate, setCheckInDate, setCheckOutDate, setFlexibleDays }: NavbarcheckinProps) => {
    const [activeDateTab, setActiveDateTab] = useState('Ngày');
    const [isOpen, setIsOpen] = useState(false);
    const [localFlexibleDays, setLocalFlexibleDays] = useState<number | null>(null);

    useEffect(() => {
        if (checkInDate && checkOutDate) {
            const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setLocalFlexibleDays(diffDays);
        }
    }, [checkInDate, checkOutDate]);

    const handleDateSelect = (range: DateRange | undefined) => {
        if (!range) {
            setCheckInDate(undefined);
            setCheckOutDate(undefined);
            setLocalFlexibleDays(null);
            setFlexibleDays(null);
            return;
        }

        if (range.from) {
            setCheckInDate(range.from);
            if (range.to) {
                setCheckOutDate(range.to);
                const diffTime = Math.abs(range.to.getTime() - range.from.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setLocalFlexibleDays(diffDays);
                setFlexibleDays(diffDays);
            } else {
                setCheckOutDate(undefined);
                setLocalFlexibleDays(null);
                setFlexibleDays(null);
            }
        }
    };

    const handleFlexibleDaysSelect = (days: number | null) => {
        if (!checkInDate) return;
        
        setLocalFlexibleDays(days);
        setFlexibleDays(days);
        
        if (days) {
            const calculatedCheckOut = new Date(checkInDate);
            calculatedCheckOut.setDate(checkInDate.getDate() + days);
            setCheckOutDate(calculatedCheckOut);
        } else {
            setCheckOutDate(undefined);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        if (!checkInDate) {
            setCheckOutDate(undefined);
            setLocalFlexibleDays(null);
            setFlexibleDays(null);
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) handleClose();
        }}>
            <PopoverTrigger asChild>
                <div className='flex border-r border-gray-300 px-5 cursor-pointer'>
                    <div className='pr-5'>
                        <p>Nhận Phòng</p>
                        <p className='font-light'>{checkInDate ? format(checkInDate, "dd/MM/yyyy", { locale: vi }) : "Thêm ngày"}</p>
                    </div>
                    <div>
                        <p>Trả Phòng</p>
                        <p className='font-light'>{checkOutDate ? format(checkOutDate, "dd/MM/yyyy", { locale: vi }) : "Thêm ngày"}</p>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="flex justify-center mb-4">
                    <button
                        className={`px-4 py-2 rounded-l-md ${activeDateTab === 'Ngày' ? 'bg-gray-200' : 'bg-gray-100'}`}
                        onClick={() => setActiveDateTab('Ngày')}
                    >
                        Ngày
                    </button>
                    <button
                        className={`px-4 py-2 ${activeDateTab === 'Tháng' ? 'bg-gray-200' : 'bg-gray-100'}`}
                        onClick={() => setActiveDateTab('Tháng')}
                    >
                        Tháng
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r-md ${activeDateTab === 'Linh hoạt' ? 'bg-gray-200' : 'bg-gray-100'}`}
                        onClick={() => setActiveDateTab('Linh hoạt')}
                    >
                        Linh hoạt
                    </button>
                </div>

                {activeDateTab === 'Ngày' && (
                    <div className="flex flex-col items-center">
                        <Calendar
                            mode="range"
                            selected={{
                                from: checkInDate,
                                to: checkOutDate,
                            }}
                            onSelect={handleDateSelect}
                            numberOfMonths={2}
                            disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                if (checkInDate) {
                                    const checkIn = new Date(checkInDate);
                                    checkIn.setHours(0, 0, 0, 0);
                                    return date < checkIn;
                                }
                                return date < today;
                            }}
                        />

                        <div className="flex justify-center space-x-2 mt-4">
                            <button
                                className={`px-4 py-2 rounded-full ${!checkInDate ? "bg-gray-300" : localFlexibleDays === null ? "bg-gray-200" : "border border-gray-300"}`}
                                onClick={() => handleFlexibleDaysSelect(null)}
                                disabled={!checkInDate}
                            >
                                Ngày chính xác
                            </button>
                            {[1, 2, 3, 7, 14].map(days => (
                                <button
                                    key={days}
                                    className={`px-4 py-2 rounded-full ${!checkInDate ? "bg-gray-300" : localFlexibleDays === days ? "bg-gray-200" : "border border-gray-300"}`}
                                    onClick={() => handleFlexibleDaysSelect(days)}
                                    disabled={!checkInDate}
                                >
                                    ± {days} ngày
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {activeDateTab === 'Tháng' && (
                    <div className="flex flex-col items-center py-8">
                        <p className="font-medium mb-4">Chuyến đi của bạn diễn ra khi nào?</p>
                        <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-center">
                            Bộ chọn tháng (Placeholder)
                        </div>
                        <div className="mt-4 text-center">
                            <p>Th 3, 1 thg 7 <span className="font-normal">đến</span> Th 4, 1 thg 10</p>
                        </div>
                    </div>
                )}

                {activeDateTab === 'Linh hoạt' && (
                    <div className="flex flex-col items-center py-4">
                        <p className="font-medium mb-3">Bạn muốn ở trong bao lâu?</p>
                        <div className="flex space-x-2 mb-6">
                            <button className="px-4 py-2 border border-gray-300 rounded-full">Cuối tuần</button>
                            <button className="px-4 py-2 border border-gray-300 rounded-full">1 tuần</button>
                            <button className="px-4 py-2 border border-gray-300 rounded-full">1 tháng</button>
                        </div>
                        
                        <p className="font-medium mb-3">Bạn muốn đi khi nào?</p>
                        <div className="flex space-x-4 overflow-x-auto pb-4">
                            {[12, 1, 2, 3, 4, 5].map((month, index) => {
                                const year = month === 12 ? 2025 : 2026;
                                return (
                                    <div key={index} className="flex-none w-32 h-32 border border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full mb-2"></div>
                                        <p className="font-medium">Tháng {month}</p>
                                        <p className="text-sm text-gray-500">{year}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default Navbarcheckin;
