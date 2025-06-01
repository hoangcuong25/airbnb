'use client';

import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import { AdminContext } from '@/context/AdminContext';

const ReportManagement = () => {
    const { reports } = useContext(AdminContext);

    console.log(reports)

    if (!Array.isArray(reports)) return <div>Loading or invalid data</div>;

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý báo cáo</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Danh sách báo cáo từ người dùng</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
                        Không có báo cáo nào
                    </div>
                ) : (
                    reports.map((report) => (
                        <div
                            key={report.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    Báo cáo #{report.id} - {report.status}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-3">
                                    {report.reason}
                                </p>

                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Listing ID: {report.listingId}
                                    </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Ngày tạo: {new Date(report.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1 border-gray-300 text-gray-700 cursor-default"
                                    >
                                        <Eye size={14} />
                                        <span>Chi tiết</span>
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="flex items-center gap-1 cursor-default"
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
        </div>
    );
};

export default ReportManagement;
