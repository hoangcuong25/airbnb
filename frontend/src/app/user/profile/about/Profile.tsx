"use client";

import React, { useState } from 'react';


const Profile: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleStartClick = () => {
    setShowDetails(true);
  };

  const handleOpenModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  // Data for modals (titles, descriptions, placeholders)
  const modalData: { [key: string]: { title: string; description: string; placeholder: string | null; type?: string } } = {
    education: {
      title: 'Bạn từng theo học ở đâu?',
      description:
        'Dù học tại nhà, trường trung học hay trường dạy nghề, hãy ghi tên ngôi trường đã xây dựng nền tảng cho bạn.',
      placeholder: 'Nơi tôi từng theo học:',
    },
    dreamDestination: {
      title: 'Bạn luôn muốn đi đến đâu?',
      description:
        'Dù đó là một trong nhiều nơi bạn muốn đến hay mơ ước mà bạn nhất định phải hoàn thành, hãy cho chúng tôi biết địa điểm đó.',
      placeholder: 'Nơi tôi luôn muốn đến:',
    },
    work: {
      title: 'Bạn làm công việc gì?',
      description:
        'Hãy cho chúng tôi biết nghề nghiệp của bạn. Nếu công việc của bạn không phải là công việc truyền thống, hãy cho biết thiên hướng nghề nghiệp của bạn. Ví dụ: Y tá, cha/mẹ của 4 đứa con, hoặc vận động viên lướt sóng đã giải nghệ. Phần này được hiển thị ở đâu?',
      placeholder: 'Công việc của tôi:',
    },
    pets: {
      title: 'Bạn có nuôi thú cưng không?',
      description: 'Hãy chia sẻ về bất kỳ thú cưng nào bạn có và tên của chúng. Ví dụ: Mèo tam thể Whiskers hay rùa tốc độ Leonardo.',
      placeholder: 'Thú cưng:',
    },
    birthDecade: {
      title: 'Thập niên bạn sinh ra',
      description: 'Đừng lo, người khác sẽ không thấy ngày sinh cụ thể của bạn.',
      placeholder: null,
      type: 'toggle', // Indicate this uses a toggle
    },
    favoriteSong: {
      title: 'Bài hát yêu thích của bạn thời trung học là gì?',
      description: 'Đừng ngại ngần chia sẻ giai điệu bạn từng nghe suốt những năm tháng tuổi teen.',
      placeholder: 'Bài hát yêu thích của tôi thời trung học phổ thông:',
    },
    funFact: {
      title: 'Sự thật thú vị về bạn là gì?',
      description: 'Hãy chia sẻ về điều gì đó độc đáo hoặc bất ngờ về bạn. Ví dụ: Tôi từng góp mặt trong một video ca nhạc, hoặc Tôi biết tung hứng.',
      placeholder: 'Sự thật thú vị về tôi:',
    },
    uselessSkill: {
      title: 'Kỹ năng vô dụng nhất của bạn là gì?',
      description: 'Chia sẻ một tài năng gây bất ngờ nhưng vô ích của bạn. Ví dụ: Trộn bài bằng tay.',
      placeholder: 'Kỹ năng vô dụng nhất của tôi:',
    },
    timeSpent: {
      title: 'Bạn dành quá nhiều thời gian để làm gì?',
      description: 'Chia sẻ một hoạt động hoặc sở thích chiếm rất nhiều thời gian rảnh của bạn. Ví dụ: Xem video về mèo hoặc chơi cờ vua.',
      placeholder: 'Tôi dành quá nhiều thời gian để:',
    },
    biographyTitle: {
      title: 'Tên sách tiểu sử của bạn sẽ là gì?',
      description: 'Nếu có ai đó viết sách về cuộc đời bạn, họ sẽ đặt tên sách là gì? Ví dụ: Sinh ra trong rong chơi hay Những ghi chép về một cô gái yêu chó.',
      placeholder: 'Tên sách tiểu sử của tôi sẽ là:',
    },
    languages: {
      title: 'Ngôn ngữ bạn sử dụng',
      description: 'Thêm các ngôn ngữ bạn có thể giao tiếp.', // Adjusted description based on image
      placeholder: 'Tìm kiếm ngôn ngữ', // Adjusted placeholder based on image
      type: 'textInput', // User requested text input for now
    },
    whereILive: {
      title: 'Nơi tôi sống',
      description: 'Chia sẻ nơi bạn đang sống hiện tại.', // Assuming a description
      placeholder: 'Nơi tôi sống:', // Assuming a placeholder
    },
  };

  const currentModalData = activeModal ? modalData[activeModal] : null;

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
                <div
                  className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                  onClick={() => handleOpenModal('education')}
                >
                  <span className="text-lg">🎓</span>
                  <div>Nơi tôi từng theo học</div>
                </div>
                <div
                  className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                  onClick={() => handleOpenModal('dreamDestination')}
                >
                   <span className="text-lg">✈️</span>
                  <div>Nơi tôi luôn muốn đến</div>
                </div>
                <div
                  className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                  onClick={() => handleOpenModal('work')}
                >
                   <span className="text-lg">💼</span>
                  <div>Công việc của tôi</div>
                </div>
                 <div
                   className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                   onClick={() => handleOpenModal('pets')}
                 >
                    <span className="text-lg">🐾</span>
                   <div>Thú cưng</div>
                 </div>
                 <div
                   className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                   onClick={() => handleOpenModal('birthDecade')}
                 >
                   <span className="text-lg">🕰️</span>
                   <div>Thập niên tôi sinh ra</div>
                 </div>
                 <div
                    className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                    onClick={() => handleOpenModal('favoriteSong')}
                  >
                    <span className="text-lg">🎵</span>
                   <div>Bài hát yêu thích của tôi thời trung học phổ thông</div>
                 </div>
                 <div
                    className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                    onClick={() => handleOpenModal('funFact')}
                  >
                    <span className="text-lg">💡</span>
                   <div>Sự thật thú vị về tôi</div>
                 </div>
                 <div
                   className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                   onClick={() => handleOpenModal('uselessSkill')}
                 >
                   <span className="text-lg">🔧</span>
                   <div>Kỹ năng vô dụng nhất của tôi</div>
                 </div>
                  <div
                    className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                    onClick={() => handleOpenModal('timeSpent')}
                  >
                    <span className="text-lg">⏳</span>
                   <div>Tôi dành quá nhiều thời gian để</div>
                 </div>
                 <div
                    className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                    onClick={() => handleOpenModal('biographyTitle')}
                  >
                    <span className="text-lg">📖</span>
                   <div>Tên sách tiêu sử của tôi sẽ là</div>
                 </div>
                 <div
                   className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                   onClick={() => handleOpenModal('languages')}
                 >
                   <span className="text-lg">🗣️</span>
                   <div>Ngôn ngữ của tôi</div>
                 </div>
                 <div
                   className="flex items-center gap-2 border-b border-gray-200 pb-4 cursor-pointer"
                   onClick={() => handleOpenModal('whereILive')}
                 >
                   <span className="text-lg">🏠</span>
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

      {/* Generic Modal */}
      {activeModal && currentModalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{currentModalData.title}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {currentModalData.description}
            </p>
            {currentModalData.type === 'toggle' ? (
              // Content for toggle type (Birth Decade)
              <div>
                <div className="flex items-center justify-between mb-4">
                   <div>Hiển thị thập niên tôi sinh ra</div>
                   {/* Basic Toggle Placeholder */}
                   <div className="w-10 h-5 bg-gray-300 rounded-xl flex items-center p-0.5 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out"></div>
                   </div>
                </div>
                 <div className="text-sm text-gray-600">Sinh ra vào thập niên 00</div>
              </div>
            ) : (
              // Default content for text input type
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={currentModalData.placeholder || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {/* Character count - might need specific logic per modal */}
                <div className="text-right text-xs text-gray-500 mt-1">Còn 40 ký tự</div>
              </div>
            )}
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-black text-white rounded-md font-bold">Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;