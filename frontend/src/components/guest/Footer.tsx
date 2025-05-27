'use client'

import { Globe } from 'lucide-react'
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6'

export default function Footer() {
    return (
        <footer className="border-t mt-10 text-sm text-gray-700">
            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h4 className="font-semibold mb-2">Hỗ trợ</h4>
                    <ul className="space-y-1">
                        <li>Trung tâm trợ giúp</li>
                        <li>Yêu cầu trợ giúp về vấn đề an toàn</li>
                        <li>AirCover</li>
                        <li>Chống phân biệt đối xử</li>
                        <li>Hỗ trợ người khuyết tật</li>
                        <li>Các tuỳ chọn huỷ</li>
                        <li>Báo cáo lo ngại của khu dân cư</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Đón tiếp khách</h4>
                    <ul className="space-y-1">
                        <li>Cho thuê nhà trên Airbnb</li>
                        <li>AirCover cho Chủ nhà</li>
                        <li>Tài nguyên về đón tiếp khách</li>
                        <li>Diễn đàn cộng đồng</li>
                        <li>Đón tiếp khách có trách nhiệm</li>
                        <li>Tham gia khoá học miễn phí về công việc Đón tiếp khách</li>
                        <li>Tìm host hỗ trợ</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Airbnb</h4>
                    <ul className="space-y-1">
                        <li>Bản phát hành Mùa hè 2025</li>
                        <li>Trang tin tức</li>
                        <li>Tính năng mới</li>
                        <li>Cơ hội nghề nghiệp</li>
                        <li>Nhà đầu tư</li>
                        <li>Chỗ ở khẩn cấp Airbnb.org</li>
                    </ul>
                </div>
            </div>

            <div className="border-t py-4 px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 max-w-6xl mx-auto gap-3">
                <div className="flex items-center flex-wrap gap-2">
                    <span>© 2025 Airbnb, Inc.</span>
                    <span>· Quyền riêng tư</span>
                    <span>· Điều khoản</span>
                    <span>· Sơ đồ trang web</span>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                    <div className="flex items-center gap-1">
                        <Globe size={14} />
                        <span>Tiếng Việt (VN)</span>
                    </div>
                    <span>₫ VND</span>
                    <FaFacebook className="w-4 h-4" />
                    <FaXTwitter className="w-4 h-4" />
                    <FaInstagram className="w-4 h-4" />
                </div>
            </div>
        </footer>
    )
}
