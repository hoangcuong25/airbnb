import { useEffect, useState } from "react";

type DatePickerProps = {
    data: any;
    setData: any;
};

export default function DatePicker({ data, setData }: DatePickerProps) {
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState(getTomorrow(today));

    function getTomorrow(dateStr: string) {
        const date = new Date(dateStr);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split("T")[0];
    }

    const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckIn = e.target.value;
        setCheckIn(newCheckIn);

        // Nếu checkOut <= checkIn thì cập nhật lại checkOut = checkIn + 1
        if (newCheckIn >= checkOut) {
            setCheckOut(getTomorrow(newCheckIn));
        }
    };

    useEffect(() => {
        // Cập nhật data khi checkIn hoặc checkOut thay đổi
        setData((prevData: any) => ({
            ...prevData,
            checkInDate: checkIn,
            checkOutDate: checkOut,
        }));
    }, [checkIn, checkOut, setData]);

    return (
        <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
                <label className="block font-medium">Nhận phòng</label>
                <input
                    type="date"
                    className="w-full border rounded px-2 py-1"
                    value={checkIn}
                    min={today}
                    onChange={handleCheckInChange}
                />
            </div>
            <div>
                <label className="block font-medium">Trả phòng</label>
                <input
                    type="date"
                    className="w-full border rounded px-2 py-1"
                    value={checkOut}
                    min={getTomorrow(checkIn)}
                    onChange={(e) => setCheckOut(e.target.value)}
                />
            </div>
        </div>
    );
}
