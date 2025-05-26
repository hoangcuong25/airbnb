'use client'

import { CalendarCheck2, KeyRound, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function ListingDetail({ listing }: { listing: ListingType }) {
    const [guests, setGuests] = useState(1)
    const [showAllImages, setShowAllImages] = useState(false)
    const displayImages = showAllImages ? listing.images : listing.images.slice(0, 5)

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
                </div>
            </div>

            {/* Booking box */}
            <div className="border p-4 rounded-xl shadow-md space-y-4 h-fit sticky top-24">
                <p className="text-lg font-semibold">
                    ₫{listing.pricePerNight.toLocaleString('vi-VN')} <span className="text-gray-500 text-sm">/ đêm</span>
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <label className="block font-medium">Nhận phòng</label>
                        <input type="date" className="w-full border rounded px-2 py-1" defaultValue="2025-07-18" />
                    </div>
                    <div>
                        <label className="block font-medium">Trả phòng</label>
                        <input type="date" className="w-full border rounded px-2 py-1" defaultValue="2025-07-20" />
                    </div>
                </div>

                <div>
                    <label className="block font-medium text-sm">Khách</label>
                    <select
                        className="w-full border rounded px-2 py-1"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4].map(n => (
                            <option key={n} value={n}>{n} khách</option>
                        ))}
                    </select>
                </div>

                <button className="w-full bg-pink-800 hover:bg-pink-900 text-white rounded-lg py-3 font-semibold">
                    Đặt phòng
                </button>

                <p className="text-xs text-center text-gray-500">Bạn vẫn chưa bị trừ tiền</p>
            </div>


        </div>
    )
}
