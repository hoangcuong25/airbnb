'use client';

import { useContext } from 'react';
import { AdminContext } from '@/context/AdminContext';
import ReportDetailModal from './ReportDetailModal';
import DeleteReportDialog from './DeleteReportDialog';

const ReportManagement = () => {
    const { reports, setReports } = useContext(AdminContext);

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
                            <div className="p-4 space-y-3">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Báo cáo #{report.id} - <span className="uppercase">{report.status}</span>
                                </h3>

                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    <strong>Lý do:</strong>
                                    <p className="line-clamp-2">{report.reason}</p>
                                </div>

                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    <strong>Ngày tạo:</strong> {new Date(report.createdAt).toLocaleString()}
                                </div>

                                {/* Reporter info */}
                                <div className="border-t pt-3 text-sm text-gray-600 dark:text-gray-300">
                                    <strong>Người báo cáo:</strong> {report.reporter?.name} <br />
                                    <strong>Email:</strong> {report.reporter?.email}
                                </div>

                                {/* Listing info */}
                                <div className="border-t pt-3 text-sm text-gray-600 dark:text-gray-300">
                                    <strong>Phòng bị báo cáo:</strong> {report.listing?.title} <br />
                                    <strong>Địa chỉ:</strong> {report.listing?.address}, {report.listing?.country} <br />
                                    <strong>Giá/đêm:</strong> {report.listing?.pricePerNight?.toLocaleString()} VND <br />
                                    <strong>Số khách tối đa:</strong> {report.listing?.maxGuests}
                                </div>

                                <div className="flex justify-end gap-2 pt-3">
                                    <ReportDetailModal report={report} />

                                    <DeleteReportDialog
                                        reportId={Number(report.id)}
                                        reports={reports}
                                        setReports={setReports}
                                    />
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
