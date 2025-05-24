'use client';

import { useContext, useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import ModalAddListing from './ModalAddListing';
import { AppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface Listing {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    status: 'available' | 'unavailable' | 'maintenance';
    images: string[];
    amenities: string[];
    rating: number;
}

const ListingManagement = () => {

    const { listings } = useContext(AppContext)

    const [isLoading, setIsLoading] = useState(false);

    const [openAdd, setOpenAdd] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);

    const handleStatusChange = async (listingId: string, newStatus: Listing['status']) => {
        try {
            setIsLoading(true);
            // Add your API call here to update listing status
            toast.success('Cập nhật trạng thái thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: Listing['status']) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'unavailable':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'maintenance':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý danh sách phòng</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Quản lý và theo dõi tất cả phòng trong hệ thống</p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Tìm kiếm phòng..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex gap-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Tất cả trạng thái</option>
                        <option value="available">Có sẵn</option>
                        <option value="unavailable">Không có sẵn</option>
                        <option value="maintenance">Bảo trì</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Tất cả đánh giá</option>
                        <option value="5">5 sao</option>
                        <option value="4">4 sao</option>
                        <option value="3">3 sao</option>
                        <option value="3">2 sao</option>
                        <option value="3">1 sao</option>
                    </select>
                </div>
            </div>

            {/* Add New Listing Button */}
            <ModalAddListing open={openAdd} setOpen={setOpenAdd} />

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
                        Không có dữ liệu
                    </div>
                ) : (
                    listings.map((listing) => (
                        <div
                            key={listing.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-48">
                                {listing.images[0]?.url && (
                                    <Image
                                        src={listing.images[0].url}
                                        alt={listing.title}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {listing.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    {listing.address}, {listing.city}, {listing.country}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                    {listing.description}
                                </p>

                                {/* Price */}
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">
                                        {listing.pricePerNight.toLocaleString('vi-VN')} VNĐ/đêm
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={listing.host.avatar}
                                            alt={listing.host.name}
                                            width={24}
                                            height={24}
                                            className="rounded-full"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{listing.host.name}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1 border-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <Eye size={14} />
                                        <span>Chi tiết</span>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                    >
                                        <Pencil size={14} className="mr-1" />
                                        Sửa
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="flex items-center gap-1"
                                    >
                                        <Trash2 size={14} />
                                        <span>Xóa</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}


        </div>
    );
};

export default ListingManagement;