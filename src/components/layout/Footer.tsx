import { Facebook, Instagram, Twitter } from "lucide-react";

// TODO: onNavigate prop 타입 정의 필요 (필요시)
interface FooterProps {
  onNavigate?: (route: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Energy Factory</h3>
          <p className="text-sm text-gray-500">
            운동 목표에 맞는 영양소 계산과 식단 계획을 바탕으로 식재료를 구매할
            수 있는 통합 쇼핑 플랫폼
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold">바로가기</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate("home");
                }}
              >
                홈
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate("products");
                }}
              >
                상품
              </a>
            </li>
            <li>
              <a
                href="/nutrition"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate("nutrition");
                }}
              >
                영양 계산기
              </a>
            </li>
            <li>
              <a
                href="/diet-coach"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate("diet-coach");
                }}
              >
                식단 코치
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold">고객 지원</h3>
          <ul className="space-y-2 text-sm">
            <li>
              {/* TODO: FAQ 페이지 구현 필요 */}
              <a href="/faq" className="hover:underline">
                자주 묻는 질문
              </a>
            </li>
            <li>
              {/* TODO: 문의 페이지 구현 필요 */}
              <a href="/contact" className="hover:underline">
                문의하기
              </a>
            </li>
            <li>
              {/* TODO: 배송 정책 페이지 구현 필요 */}
              <a href="/shipping" className="hover:underline">
                배송 정책
              </a>
            </li>
            <li>
              {/* TODO: 반품 및 환불 페이지 구현 필요 */}
              <a href="/returns" className="hover:underline">
                반품 및 환불
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold">소셜 미디어</h3>
          <div className="flex space-x-4">
            {/* TODO: 실제 소셜 미디어 링크로 교체 필요 */}
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
          <div className="space-y-2 text-sm">
            {/* TODO: 실제 연락처 정보로 교체 필요 */}
            <p>고객센터: 02-123-4567</p>
            <p>이메일: support@energyfactory.com</p>
          </div>
        </div>
      </div>
      <div className="container mt-8 border-t pt-4">
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Energy Factory. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
