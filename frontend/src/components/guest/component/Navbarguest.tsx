import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MinusCircle, PlusCircle } from 'lucide-react'
import { useState } from 'react'

interface NavbarguestProps {
    totalGuests: number;
    pets: number;
}

const Navbarguest = ({ totalGuests, pets }: NavbarguestProps) => {
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [petsCount, setPets] = useState(0);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className='px-5 pr-10 cursor-pointer'>
                    <p>Khách</p>
                    <p className='font-light'>{totalGuests > 0 ? `${totalGuests} khách${pets > 0 ? `, ${pets} thú cưng` : ''}` : "Thêm khách"}</p>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="end">
                {/* Người lớn */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="font-medium">Người lớn</p>
                        <p className="text-sm text-gray-500">Từ 13 tuổi trở lên</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setAdults(Math.max(0, adults - 1))} disabled={adults === 0}><MinusCircle className="text-gray-400" size={20} /></button>
                        <span className="w-6 text-center">{adults}</span>
                        <button onClick={() => setAdults(adults + 1)}><PlusCircle className="text-gray-700" size={20} /></button>
                    </div>
                </div>
                <div className="border-t border-gray-200 my-2"></div>

                {/* Trẻ em */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="font-medium">Trẻ em</p>
                        <p className="text-sm text-gray-500">Độ tuổi 2 – 12</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setChildren(Math.max(0, children - 1))} disabled={children === 0}><MinusCircle className="text-gray-400" size={20} /></button>
                        <span className="w-6 text-center">{children}</span>
                        <button onClick={() => setChildren(children + 1)}><PlusCircle className="text-gray-700" size={20} /></button>
                    </div>
                </div>
                <div className="border-t border-gray-200 my-2"></div>

                {/* Em bé */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="font-medium">Em bé</p>
                        <p className="text-sm text-gray-500">Dưới 2 tuổi</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setInfants(Math.max(0, infants - 1))} disabled={infants === 0}><MinusCircle className="text-gray-400" size={20} /></button>
                        <span className="w-6 text-center">{infants}</span>
                        <button onClick={() => setInfants(infants + 1)}><PlusCircle className="text-gray-700" size={20} /></button>
                    </div>
                </div>
                <div className="border-t border-gray-200 my-2"></div>

                {/* Thú cưng */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Thú cưng</p>
                        <p className="text-sm text-gray-500 underline cursor-pointer">Bạn sẽ mang theo động vật phục vụ?</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setPets(Math.max(0, petsCount - 1))} disabled={petsCount === 0}><MinusCircle className="text-gray-400" size={20} /></button>
                        <span className="w-6 text-center">{petsCount}</span>
                        <button onClick={() => setPets(petsCount + 1)}><PlusCircle className="text-gray-700" size={20} /></button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default Navbarguest;

