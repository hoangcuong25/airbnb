'use client'

import { CalendarCheck2, KeyRound, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import DatePicker from './DatePicker'
import { toast } from 'sonner'
import { createBookingApi } from '@/api/booking.api'
import ModalReview from './ModalReview'
import ModalReport from './ModalReport'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function ListingDetail({ listing }: { listing: ListingType }) {
    const router = useRouter()
    const [guests, setGuests] = useState(1)
    const [showAllImages, setShowAllImages] = useState(false)
    const displayImages = showAllImages ? listing.images : listing.images.slice(0, 5)

    const [data, setData] = useState({
        listingId: 0,
        checkInDate: '',
        checkOutDate: '',
        totalPrice: 0,
        status: 'PENDING',
        guestNumber: guests,
    })

    useEffect(() => {
        if (listing) {
            setData(prev => ({
                ...prev,
                guestNumber: guests,
                listingId: listing.id,
                totalPrice: listing.pricePerNight,
            }))
        }
    }, [listing, guests])

    const handleBooking = async () => {
        try {
            await createBookingApi(data)
            toast.success('Đặt phòng thành công!')
        }
        catch (error) {
            toast.error('Đặt phòng thất bại, vui lòng thử lại sau.')
        }
    }

    const handlePayment = () => {
        router.push(`/payment?listingId=${listing.id}&price=${listing.pricePerNight}&title=${encodeURIComponent(listing.title)}`)
    }

    console.log(listing)

    return (
        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 border-t border-gray-300 mt-4 w-full">
            {/* Left content */}
            <div className="lg:col-span-2 space-y-4">
                <h1 className="text-2xl font-semibold">{listing.title}</h1>

                {/* Image Grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 rounded-xl overflow-hidden relative">
                    {displayImages.map((img, idx) => (
                        <div key={img.id} className={`${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} relative w-full aspect-[4/3] rounded-xl overflow-hidden`}>
                            <Image
                                src={img.url}
                                alt={img.name || `room ${idx + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    ))}

                    {!showAllImages && listing.images.length > 5 && (
                        <button
                            onClick={() => setShowAllImages(true)}
                            className="absolute bottom-2 right-2 bg-white bg-opacity-80 text-sm font-medium px-3 py-1 rounded shadow"
                        >
                            Hiển thị tất cả ảnh
                        </button>
                    )}
                </div>


                {/* Info */}
                <div>
                    <h2 className="text-xl font-medium">{listing.address}, {listing.city}, {listing.country}</h2>
                    <p className="text-gray-500">1 giường · 1 phòng tắm riêng</p>
                    <p className="text-sm text-yellow-600 font-medium mt-1">⭐ 5.0 · 3 đánh giá</p>
                </div>

                {/* Host info */}
                <div className="border-t pt-4 flex items-center space-x-4">
                    <Image
                        src={listing.host.avatar}
                        alt={listing.host.name}
                        width={35}
                        height={35}
                        className="rounded-full mb-2"
                    />
                    <div>
                        <h3 className="font-semibold">Host: {listing.host.name}</h3>
                        <p className="text-sm text-gray-600">2 năm kinh nghiệm đón tiếp khách</p>
                    </div>
                </div>

                {/* Highlights */}
                <div className="border-t pt-6 space-y-5 text-base text-gray-800">
                    <div className="flex items-start gap-3">
                        <KeyRound className="mt-1 " size={25} />
                        <p>
                            <strong>Trải nghiệm nhận phòng xuất sắc</strong> – Khách luôn đánh giá cao trải nghiệm nhận phòng tại đây.
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <MapPin className="mt-1 " size={25} />
                        <p>
                            <strong>Yên bình và tiện nghi</strong> – Nhà nằm trong một khu vực yên tĩnh, thư giãn.
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <CalendarCheck2 className="mt-1 " size={25} />
                        <p>
                            <strong>Hủy miễn phí trước 13 tháng 7</strong> – Linh hoạt điều chỉnh kế hoạch.
                        </p>
                    </div>

                    {/* Description */}
                    <div className="border-t pt-6 text-base text-gray-800 w-full">
                        <h3 className="text-xl font-semibold mb-2">Mô tả</h3>
                        <p className="leading-relaxed whitespace-pre-line">{listing.description}</p>
                    </div>

                    {/* Modal review */}
                    <ModalReview listingId={listing.id} />

                    <p className="font-semibold mb-2">Đánh giá:</p>
                    {
                        listing?.Review && listing.Review.length > 0 ? (
                            <div className="space-y-4">
                                {listing.Review.map((review: any) => (
                                    <div key={review.id} className="border rounded p-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium">⭐ {review.rating}/5</span>
                                            <span className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString('vi-VN')}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 whitespace-pre-line">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Chưa có đánh giá nào.</p>
                        )
                    }
                </div>
            </div>

            {/* Booking box */}
            <div className="lg:col-span-1">
                <div className="sticky top-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-primary">
                            {listing.pricePerNight.toLocaleString('vi-VN')} VNĐ
                        </span>
                        <span className="text-gray-600">/ đêm</span>
                    </div>

                    <DatePicker
                        onDateChange={(checkIn, checkOut) => {
                            setData(prev => ({
                                ...prev,
                                checkInDate: checkIn,
                                checkOutDate: checkOut,
                                totalPrice: listing.pricePerNight
                            }))
                        }}
                    />

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Số khách
                        </label>
                        <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full p-2 border rounded-md"
                        >
                            {[...Array(listing.maxGuests)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1} khách
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button 
                        onClick={handlePayment}
                        className="w-full mt-4 bg-primary hover:bg-primary/90"
                    >
                        Thanh toán ngay
                    </Button>
                </div>
            </div>
        </div>
    )
}
