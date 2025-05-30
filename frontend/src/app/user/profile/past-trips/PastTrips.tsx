import React from 'react';


const PastTrips: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-5 py-10 text-center flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5">Chuyến đi quá khứ</h1>
      <div className="mb-5">
        {}
        <img src="/path/to/your/connections-image.png" alt="People connecting" className="max-w-[150px] h-auto" />
      </div>
      <p className="text-base text-gray-700 mb-5 leading-relaxed">
        Khi bạn tham gia trải nghiệm hoặc mời ai
        đó tham gia chuyến đi, bạn sẽ tìm thấy hồ
        sơ của những khách khác ở đây. <a href="#" className="text-black underline">Tìm hiểu thêm</a>
      </p>
      <button className="px-6 py-3 bg-pink-600 text-white border-none rounded-md cursor-pointer text-base font-bold">Đặt chuyến đi</button>
    </div>
  );
};

export default PastTrips;