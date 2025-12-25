import { Bell, Menu, ShoppingCart, TreePine, Snowflake } from "lucide-react";
import { useThemeStore } from "@/stores/useThemeStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { NotificationPopoverContent } from "@/components/ui/notification-popover";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { subscribeNotificationChange } from "@/utils/notificationBroadcast";
import { useState, useEffect } from "react";
import useCartCount from "@/features/cart/hooks/useCartCount";

interface MobileMenuProps {
  isAuthenticated: boolean;
  userRole?: string;
}

function MobileMenu({ isAuthenticated, userRole }: MobileMenuProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isAdmin = userRole === "admin";

  const handleNavigate = (route: string) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
              handleNavigate(ROUTES.PRODUCTS);
            }}
          >
            상품
          </a>
          {isAuthenticated && (
            <a
              href="/order-history"
              className="text-lg font-medium hover:underline"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(ROUTES.ORDER_HISTORY);
              }}
            >
              주문 내역
            </a>
          )}
          {isAdmin && (
            <>
              <div className="text-lg font-bold text-green-600 mt-4">CMS</div>
              <a
                href={ROUTES.CMS_PRODUCTS}
                className="text-base font-medium hover:underline pl-4"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(ROUTES.CMS_PRODUCTS);
                }}
              >
                상품 관리
              </a>
              <a
                href={ROUTES.TEST}
                className="text-base font-medium hover:underline pl-4"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(ROUTES.TEST);
                }}
              >
                테스트 센터
              </a>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

interface DesktopNavProps {
  isAuthenticated: boolean;
  userRole?: string;
}

function DesktopNav({ isAuthenticated, userRole }: DesktopNavProps) {
  const navigate = useNavigate();
  const isAdmin = userRole === "admin";

  return (
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
      {isAuthenticated && (
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
      )}
      {isAdmin && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-sm font-medium hover:text-green-600 h-auto p-0"
            >
              CMS
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => navigate(ROUTES.CMS_PRODUCTS)}
              className="cursor-pointer"
            >
              상품 관리
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(ROUTES.TEST)}
              className="cursor-pointer"
            >
              테스트 센터
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
}

interface HeaderActionsProps {
  isAuthenticated: boolean;
  userName?: string;
  cartCount: number;
}

function HeaderActions({
  isAuthenticated,
  userName,
  cartCount,
}: HeaderActionsProps) {
  const navigate = useNavigate();
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const { theme, toggleChristmas } = useThemeStore();

  // 다른 탭에서 알림 변경 시 localStorage에서 다시 로드
  useEffect(() => {
    const unsubscribe = subscribeNotificationChange(() => {
      // localStorage에서 최신 데이터를 읽어와서 스토어에 반영
      const stored = localStorage.getItem("notification-storage");
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (data.state) {
            // Zustand persist는 state.state 형태로 저장함
            useNotificationStore.setState(data.state);
          }
        } catch (error) {
          console.error("알림 동기화 에러:", error);
        }
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className="flex items-center gap-4">
      {/* Christmas Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleChristmas}
        className={cn(
          "relative transition-all duration-300",
          theme === "christmas"
            ? "text-[hsl(42,85%,65%)] hover:text-[hsl(42,85%,75%)] hover:bg-[hsl(220,20%,18%)]"
            : "hover:text-[hsl(350,65%,45%)]"
        )}
        title={theme === "christmas" ? "기본 테마로 전환" : "크리스마스 테마로 전환"}
      >
        {theme === "christmas" ? (
          <Snowflake className="h-5 w-5 animate-spin" style={{ animationDuration: "3s" }} />
        ) : (
          <TreePine className="h-5 w-5" />
        )}
      </Button>

      {isAuthenticated && (
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
            {cartCount}
          </Badge>
          <span className="sr-only">장바구니</span>
        </a>
      )}
      {isAuthenticated && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative hidden md:flex h-auto w-auto p-1"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Badge>
              )}
              <span className="sr-only">알림</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0" sideOffset={8}>
            <NotificationPopoverContent />
          </PopoverContent>
        </Popover>
      )}
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
              {userName?.charAt(0).toUpperCase() || "U"}
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
  );
}

export default function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCartCount();
  const { isAuthenticated, user } = useAuthStore();
  const theme = useThemeStore((state) => state.theme);
  const isChristmas = theme === "christmas";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isChristmas
          ? "bg-gradient-to-r from-[hsl(220,25%,8%)] via-[hsl(220,22%,12%)] to-[hsl(220,20%,10%)] text-[hsl(40,30%,92%)] border-[hsl(220,20%,18%)] shadow-lg shadow-black/30"
          : "bg-[hsl(var(--header-bg))] text-[hsl(var(--header-foreground))]"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileMenu isAuthenticated={isAuthenticated} userRole={user?.role} />
          <a
            className="flex items-center gap-2 hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.PRODUCTS);
            }}
          >
            <span
              className={cn(
                "font-bold text-xl transition-colors duration-300",
                isChristmas
                  ? "bg-gradient-to-r from-[hsl(0,70%,55%)] via-[hsl(42,85%,60%)] to-[hsl(0,70%,55%)] bg-clip-text text-transparent drop-shadow-[0_0_10px_hsl(42,85%,50%/30%)]"
                  : "text-[hsl(var(--header-brand))]"
              )}
            >
              Energy Factory
            </span>
          </a>
        </div>
        <DesktopNav isAuthenticated={isAuthenticated} userRole={user?.role} />
        <HeaderActions
          cartCount={cartCount}
          isAuthenticated={isAuthenticated}
          userName={user?.name}
        />
      </div>
    </header>
  );
}
