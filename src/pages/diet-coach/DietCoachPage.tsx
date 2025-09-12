import React from 'react';

const DietCoachPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">식단코치</h1>
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-lg text-gray-600">
          식단코치 화면입니다.
          <br />
          AI 기반 개인 맞춤형 식단 추천 및 관리 서비스를 제공합니다.
        </p>
      </div>
    </div>
  );
};

export default DietCoachPage;
