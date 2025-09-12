import React from 'react';

const NutritionPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">영양계산기</h1>
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-lg text-gray-600">
          영양계산기 화면입니다.
          <br />
          사용자가 음식의 영양성분을 계산하고 관리할 수 있는 기능을 제공합니다.
        </p>
      </div>
    </div>
  );
};

export default NutritionPage;
