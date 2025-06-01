import React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

type Props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    listing: ListingType
}

const ModalViewListing = ({ open, setOpen, listing }: Props) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Chi tiết phòng</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Tiêu đề</Label>
                        <p className="text-gray-700 dark:text-gray-300">{listing.title}</p>
                    </div>

                    <div>
                        <Label>Mô tả</Label>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{listing.description}</p>
                    </div>

                    <div>
                        <Label>Giá / đêm</Label>
                        <p className="text-gray-700 dark:text-gray-300">
                            {listing.pricePerNight.toLocaleString("vi-VN")} VNĐ
                        </p>
                    </div>

                    <div>
                        <Label>Số khách tối đa</Label>
                        <p className="text-gray-700 dark:text-gray-300">{listing.maxGuests} khách</p>
                    </div>

                    <div>
                        <Label>Địa chỉ</Label>
                        <p className="text-gray-700 dark:text-gray-300">{listing.address}</p>
                    </div>

                    <div>
                        <Label>Thành phố</Label>
                        <p className="text-gray-700 dark:text-gray-300">{listing.city}</p>
                    </div>

                    <div>
                        <Label>Quốc gia</Label>
                        <p className="text-gray-700 dark:text-gray-300">{listing.country}</p>
                    </div>

                    {/* Hình ảnh */}
                    <div>
                        <Label>Hình ảnh</Label>
                        <div className="grid grid-cols-3 gap-3 mt-3">
                            {listing.images.map((img, idx) => (
                                <div key={idx} className="relative border rounded-md overflow-hidden">
                                    <img
                                        src={img.url}
                                        alt={`image-${idx}`}
                                        className="w-full h-24 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Đóng
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalViewListing
