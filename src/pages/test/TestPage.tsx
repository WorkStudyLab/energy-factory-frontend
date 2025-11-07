import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const TestPage: React.FC = () => {
  const testCategories = [
    {
      id: "ui",
      title: "UI 테스트",
      description: "사용자 인터페이스 및 상호작용 테스트",
      icon: "🎨",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      route: ROUTES.UI_TEST,
    },
    {
      id: "shadcn",
      title: "Shadcn 테스트",
      description: "Shadcn/ui 컴포넌트 라이브러리 테스트",
      icon: "🧩",
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
      route: ROUTES.SHADCN_TEST,
    },
    {
      id: "tailwind",
      title: "Tailwind 테스트",
      description: "Tailwind CSS 스타일링 테스트",
      icon: "🎨",
      color: "from-cyan-500 to-cyan-600",
      hoverColor: "hover:from-cyan-600 hover:to-cyan-700",
      route: ROUTES.TAILWIND_TEST,
    },
    {
      id: "dialog",
      title: "다이얼로그 테스트",
      description: "다양한 다이얼로그 기능 테스트",
      icon: "💬",
      color: "from-indigo-500 to-indigo-600",
      hoverColor: "hover:from-indigo-600 hover:to-indigo-700",
      route: ROUTES.DIALOG_TEST,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🧪 테스트 센터
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            프로젝트의 다양한 기능들을 체계적으로 테스트할 수 있는 통합 테스트
            환경입니다.
          </p>
        </div>

        {/* 테스트 카테고리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testCategories.map((category) => (
            <Link key={category.id} to={category.route} className="group block">
              <div
                className={`
                bg-gradient-to-br ${category.color} ${category.hoverColor}
                rounded-2xl p-6 text-white transform transition-all duration-300
                hover:scale-105 hover:shadow-2xl
                shadow-lg h-full flex flex-col
              `}
              >
                <div className="text-center flex-1 flex flex-col justify-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
