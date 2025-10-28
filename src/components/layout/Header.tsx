import { Bell, Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationPopoverContent } from "@/components/ui/notification-popover";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

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
            className="flex items-center gap-2 hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.PRODUCTS);
            }}
          >
            <span className="font-bold text-xl text-green-600">
              Energy Factory
            </span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6">
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
            className="relative hover:cursor-pointer"
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden md:flex h-auto w-auto p-1"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
                  2
                </Badge>
                <span className="sr-only">알림</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0" sideOffset={8}>
              <NotificationPopoverContent />
            </PopoverContent>
          </Popover>
          {isAuthenticated ? (
            <a
              className="hover:cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate(ROUTES.MY_PAGE);
              }}
            >
              <Avatar>
                <AvatarFallback className="bg-green-100 text-green-700 font-medium">
                  {/* @To Do: 추후 인증 상태 관리 변경 후 확인 필요 */}
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
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
