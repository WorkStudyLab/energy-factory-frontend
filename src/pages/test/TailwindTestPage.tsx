import React from "react";

const TailwindTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          🎨 Tailwind CSS 테스트
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 색상 테스트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              색상 테스트
            </h2>
            <div className="space-y-2">
              <div className="h-8 bg-red-500 rounded"></div>
              <div className="h-8 bg-green-500 rounded"></div>
              <div className="h-8 bg-blue-500 rounded"></div>
              <div className="h-8 bg-yellow-500 rounded"></div>
              <div className="h-8 bg-purple-500 rounded"></div>
            </div>
          </div>

          {/* 버튼 테스트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              버튼 테스트
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Primary Button
              </button>
              <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                Secondary Button
              </button>
              <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Outline Button
              </button>
            </div>
          </div>

          {/* 텍스트 테스트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              텍스트 테스트
            </h2>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">큰 제목</h1>
              <h2 className="text-xl font-semibold text-gray-800">중간 제목</h2>
              <h3 className="text-lg font-medium text-gray-700">작은 제목</h3>
              <p className="text-gray-600">일반 텍스트입니다.</p>
              <p className="text-sm text-gray-500">작은 텍스트입니다.</p>
            </div>
          </div>

          {/* 그리드 테스트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              그리드 테스트
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-16 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-sm">1</span>
              </div>
              <div className="h-16 bg-green-100 rounded flex items-center justify-center">
                <span className="text-sm">2</span>
              </div>
              <div className="h-16 bg-yellow-100 rounded flex items-center justify-center">
                <span className="text-sm">3</span>
              </div>
              <div className="h-16 bg-red-100 rounded flex items-center justify-center">
                <span className="text-sm">4</span>
              </div>
            </div>
          </div>

          {/* 애니메이션 테스트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              애니메이션 테스트
            </h2>
            <div className="space-y-3">
              <div className="h-8 bg-blue-500 rounded transform hover:scale-105 transition-transform cursor-pointer"></div>
              <div className="h-8 bg-green-500 rounded transform hover:rotate-3 transition-transform cursor-pointer"></div>
              <div className="h-8 bg-purple-500 rounded transform hover:translate-x-2 transition-transform cursor-pointer"></div>
            </div>
          </div>

          {/* 반응형 테스트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              반응형 테스트
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="block sm:hidden">모바일 화면</p>
              <p className="hidden sm:block md:hidden">태블릿 화면</p>
              <p className="hidden md:block">데스크톱 화면</p>
            </div>
          </div>
        </div>

        {/* 상태 표시 */}
        <div className="mt-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-2">✅</span>
            <div>
              <strong>Tailwind CSS가 정상적으로 작동하고 있습니다!</strong>
              <p className="text-sm mt-1">
                위의 모든 스타일이 Tailwind CSS로 적용되었습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindTestPage;
