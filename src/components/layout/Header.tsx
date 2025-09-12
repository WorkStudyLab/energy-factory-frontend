import { useState } from "react";
import { Bell, Menu, Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <a
                  href="/"
                  className="text-lg font-medium hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(ROUTES.HOME);
                  }}
                >
                  홈
                </a>
                <a
                  href="/products"
                  className="text-lg font-medium hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(ROUTES.PRODUCTS);
                  }}
                >
                  상품
                </a>
                <a
                  href="/nutrition"
                  className="text-lg font-medium hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(ROUTES.NUTRITION);
                  }}
                >
                  영양 계산기
                </a>
                <a
                  href="/diet-coach"
                  className="text-lg font-medium hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(ROUTES.DIET_COACH);
                  }}
                >
                  식단 코치
                </a>
                <a
                  href="/order-history"
                  className="text-lg font-medium hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(ROUTES.ORDER_HISTORY);
                  }}
                >
                  주문 내역
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <a
            href="/"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.HOME);
            }}
          >
            <span className="font-bold text-xl text-green-600">
              Energy Factory
            </span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/"
            className="text-sm font-medium hover:text-green-600"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.HOME);
            }}
          >
            홈
          </a>
          <a
            href="/products"
            className="text-sm font-medium hover:text-green-600"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.PRODUCTS);
            }}
          >
            상품
          </a>
          <a
            href="/nutrition"
            className="text-sm font-medium hover:text-green-600"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.NUTRITION);
            }}
          >
            영양계산기
          </a>
          <a
            href="/diet-coach"
            className="text-sm font-medium hover:text-green-600"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.DIET_COACH);
            }}
          >
            식단코치
          </a>
          <a
            href="/order-history"
            className="text-sm font-medium hover:text-green-600"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.ORDER_HISTORY);
            }}
          >
            주문내역
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <a
            className="relative hidden md:block"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.ORDER_HISTORY);
            }}
          >
            <Package className="h-5 w-5" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
              2
            </Badge>
            <span className="sr-only">주문 내역</span>
          </a>
          <a
            className="relative"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.CART);
            }}
          >
            <ShoppingCart className="h-5 w-5" />
            {/* TODO: 실제 장바구니 아이템 개수로 교체 필요 */}
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
              3
            </Badge>
            <span className="sr-only">장바구니</span>
          </a>
          <a
            className="relative hidden md:block"
            onClick={(e) => {
              e.preventDefault();
              // 알림 페이지가 있다면 여기에 추가
            }}
          >
            <Bell className="h-5 w-5" />
            {/* TODO: 실제 알림 개수로 교체 필요 */}
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
              2
            </Badge>
            <span className="sr-only">알림</span>
          </a>
          {isLoggedIn ? (
            <a
              href="/profile"
              onClick={(e) => {
                e.preventDefault();
                navigate(ROUTES.PROFILE);
              }}
            >
              <Avatar>
                {/* TODO: 실제 사용자 프로필 이미지로 교체 필요 */}
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="사용자"
                />
                <AvatarFallback>사용자</AvatarFallback>
              </Avatar>
            </a>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                navigate(ROUTES.LOGIN);
              }}
            >
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
