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
      id: "login-api",
      title: "로그인 API 테스트",
      description: "사용자 로그인 API 기능 테스트",
      icon: "🔐",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      route: ROUTES.LOGIN_API_TEST,
    },
    {
      id: "signup-api",
      title: "회원가입 API 테스트",
      description: "사용자 회원가입 API 기능 테스트",
      icon: "📝",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      route: ROUTES.SIGNUP_API_TEST,
    },
    {
      id: "products-api",
      title: "상품 API 테스트",
      description: "상품 관련 API 기능 테스트",
      icon: "🛍️",
      color: "from-pink-500 to-pink-600",
      hoverColor: "hover:from-pink-600 hover:to-pink-700",
      route: ROUTES.PRODUCTS_API_TEST,
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
                rounded-2xl p-8 text-white transform transition-all duration-300
                hover:scale-105 hover:shadow-2xl
                shadow-lg
              `}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{category.title}</h3>
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
