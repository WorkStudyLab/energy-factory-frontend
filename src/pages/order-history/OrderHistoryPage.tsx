import React from 'react';

const OrderHistoryPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">주문내역</h1>
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-lg text-gray-600">
          주문내역 화면입니다.
          <br />
          사용자의 과거 주문 내역을 조회하고 재주문할 수 있는 기능을 제공합니다.
        </p>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
