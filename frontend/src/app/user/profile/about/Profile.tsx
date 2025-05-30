"use client";

import React, { useState } from 'react';


const Profile: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleStartClick = () => {
    setShowDetails(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      {showDetails ? (
        <div className="flex flex-col gap-5">        
          <div className="flex items-center pb-5 border-b border-gray-200">
          
             <h1 className="text-3xl font-bold">Hồ sơ của tôi</h1>
          </div>

      
          <div className="flex gap-10 flex-col md:flex-row">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-36 h-36 bg-black text-white rounded-full flex justify-center items-center text-7xl mb-2.5">H</div>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer text-sm">Thêm ảnh</button>
            </div>

            <div className="flex-2">
              <p className="text-sm text-gray-600 mb-5">Host và khách có thể xem hồ sơ của bạn và hồ sơ này có thể hiển thị trên Airbnb để giúp chúng tôi tạo dựng niềm tin trong cộng đồng của mình. <a href="#" className="text-black underline">Tìm hiểu thêm</a></p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-7">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                  <span className="text-lg"></span> 
                  <div>Nơi tôi từng theo học</div>
                </div>
                <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                   <span className="text-lg"></span>
                  <div>Nơi tôi luôn muốn đến</div>
                </div>
                <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                   <span className="text-lg"></span>
                  <div>Công việc của tôi</div>
                </div>
                 <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                    <span className="text-lg"></span>
                   <div>Thú cưng</div>
                 </div>
                 <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                   <span className="text-lg"></span>
                   <div>Thập niên tôi sinh ra</div>
                 </div>
                 <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                    <span className="text-lg"></span>
                   <div>Bài hát yêu thích của tôi thời trung học phổ thông</div>
                 </div>
                 <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                    <span className="text-lg"></span>
                   <div>Sự thật thú vị về tôi</div>
                 </div>
                 <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                   <span className="text-lg"></span>
                   <div>Kỹ năng vô dụng nhất của tôi</div>
                 </div>
                  <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                    <span className="text-lg"></span>
                   <div>Tôi dành quá nhiều thời gian để</div>
                 </div>
                 <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                    <span className="text-lg"></span>
                   <div>Thứ mà tôi luôn nghĩ đến</div>
                 </div>
                 <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                   <span className="text-lg"></span>
                   <div>Tên sách tiêu sử của tôi sẽ là</div>
                 </div>
                 <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                   <span className="text-lg"></span>
                   <div>Ngôn ngữ của tôi</div>
                 </div>
                 <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                   <span className="text-lg"></span>
                   <div>Nơi tôi sống</div>
                 </div>
      
                <div></div>
              </div>

              <h2 className="text-xl font-bold mb-2.5">Giới thiệu bản thân</h2>
              <div className="border border-gray-300 rounded-lg p-5 mb-5">
                <textarea placeholder="Viết nội dung thú vị và ấn tượng." className="w-full h-24 border-none outline-none resize-none text-sm"></textarea>
                <button className="bg-transparent border-none text-black underline cursor-pointer text-sm pt-2.5">Thêm phần giới thiệu</button>
              </div>

              <h2 className="text-xl font-bold mb-2.5">Nơi tôi từng đến</h2>
              <div className="flex justify-between items-center border-b border-gray-200 pb-5 mb-5">
                 <p className="text-sm text-gray-600">Chọn tem mà bạn muốn hiển thị cho người khác xem trên hồ sơ của mình.</p>
            
                <div className="w-10 h-5 bg-gray-300 rounded-xl"></div> 
              </div>

              <h2 className="text-xl font-bold mb-2.5">Sở thích của tôi</h2>
               <div className="border-b border-gray-200 pb-5 mb-5">
                 <p className="text-sm text-gray-600 mb-4">Thêm sở thích vào hồ sơ để tìm ra điểm chung với host và khách khác.</p>
           
                 <div className="text-sm text-gray-400">[Interests List/Tags Placeholder]</div>
               </div>
            </div>
          </div>

      
          <div className="flex justify-end mt-5">
            <button className="px-5 py-2.5 bg-black text-white border-none rounded-md cursor-pointer font-bold">Hoàn tất</button>
          </div>

        </div>
      ) : (
        <div className="flex flex-col gap-5">
       
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Giới thiệu bản thân</h1>
            <button className="px-4 py-2 bg-gray-300 border-none rounded-md cursor-pointer">Chỉnh sửa</button>
          </div>

         
          <div className="flex gap-5 flex-col md:flex-row">
           
            <div className="flex-1 border border-gray-300 rounded-lg p-5 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-black text-white rounded-full flex justify-center items-center text-4xl mb-2.5">H</div>
              <div className="font-bold mb-1">Huy</div>
              <div className="text-sm text-gray-600">Khách</div>
            </div>

        
            <div className="flex-2 border border-gray-300 rounded-lg p-5 flex flex-col">
              <h2 className="text-xl font-bold mb-2.5">Hoàn tất hồ sơ của bạn</h2>
              <p className="text-sm text-gray-600 mb-4">
                Hồ sơ Airbnb là một phần quan trọng của mọi lượt đặt.
                Hãy hoàn tất hồ sơ để giúp khách và các host khác hiểu
                hơn về bạn.
              </p>
              <button
                className="px-5 py-2.5 bg-pink-600 text-white border-none rounded-md cursor-pointer font-bold"
                onClick={handleStartClick}
              >
                Bắt đầu
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5 mt-5">
           
            <i className="fas fa-comment-dots text-lg text-black"></i>
            <div>Đánh giá tôi đã viết</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;