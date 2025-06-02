'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ReportDetailModal = ({ report }: { report: any }) => {
    if (!report) return null;

    const { id, status, reason, createdAt, reporter, listing } = report;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span>Chi tiết</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Chi tiết báo cáo #{id}</DialogTitle>
                    <DialogDescription>Xem đầy đủ thông tin báo cáo từ người dùng</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-sm text-gray-700 dark:text-gray-200">
                    {/* Thông tin chung */}
                    <div>
                        <strong>Trạng thái:</strong> <span className="uppercase">{status}</span>
                    </div>
                    <div>
                        <strong>Ngày tạo:</strong> {new Date(createdAt).toLocaleString()}
                    </div>

                    {/* Lý do */}
                    <div>
                        <strong>Lý do báo cáo:</strong>
                        <p className="mt-1 whitespace-pre-wrap">{reason}</p>
                    </div>

                    {/* Người báo cáo */}
                    <div>
                        <strong>Người báo cáo:</strong>
                        <div className="flex items-center gap-3 mt-1">
                            {reporter?.avatar && (
                                <img
                                    src={reporter.avatar}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full object-cover border"
                                />
                            )}
                            <div>
                                <div>{reporter?.name}</div>
                                <div className="text-xs text-gray-500">{reporter?.email}</div>
                            </div>
                        </div>
                    </div>

                    {/* Thông tin phòng */}
                    <div>
                        <strong>Phòng bị báo cáo:</strong>
                        <div className="mt-1 space-y-1">
                            <div><strong>Tiêu đề:</strong> {listing?.title}</div>
                            <div><strong>Địa chỉ:</strong> {listing?.address}, {listing?.country}</div>
                            <div><strong>Giá mỗi đêm:</strong> {listing?.pricePerNight?.toLocaleString()} VND</div>
                            <div><strong>Số khách tối đa:</strong> {listing?.maxGuests}</div>
                            <div><strong>Mô tả:</strong> <p className="whitespace-pre-wrap">{listing?.description}</p></div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Đóng</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReportDetailModal;
