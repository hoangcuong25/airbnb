import React from 'react';

const Connection: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-5 py-10 text-center flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5">Kết Nối</h1>
      <div className="mb-5">
        {}
        <img src="/path/to/your/suitcase-icon.png" alt="Suitcase" className="max-w-[150px] h-auto" />
      </div>
      <p className="text-base text-gray-700 mb-5 leading-relaxed">
        Sau khi thực hiện chuyến đi đầu tiên trên Airbnb, bạn
        sẽ tìm thấy các đặt chỗ trước đây của mình tại đây.
      </p>
      <button className="px-6 py-3 bg-pink-600 text-white border-none rounded-md cursor-pointer text-base font-bold">Đặt chuyến đi</button>
    </div>
  );
};

export default Connection;