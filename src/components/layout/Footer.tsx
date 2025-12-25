import { Facebook, Instagram, Twitter } from "lucide-react";
import { useThemeStore } from "@/stores/useThemeStore";
import { cn } from "@/lib/utils";

// TODO: onNavigate prop 타입 정의 필요 (필요시)
interface FooterProps {
  onNavigate?: (route: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const theme = useThemeStore((state) => state.theme);
  const isChristmas = theme === "christmas";

  return (
    <footer
      className={cn(
        "w-full border-t py-6 transition-all duration-300",
        isChristmas
          ? "bg-gradient-to-r from-[hsl(220,25%,8%)] via-[hsl(220,22%,12%)] to-[hsl(220,20%,10%)] text-[hsl(40,30%,90%)] border-[hsl(220,20%,20%)]"
          : "bg-[hsl(var(--header-bg))] text-[hsl(var(--header-foreground))]"
      )}
    >
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3
            className={cn(
              "text-lg font-bold",
              isChristmas && "text-[hsl(42,85%,65%)]"
            )}
          >
            Energy Factory
          </h3>
          <p className={cn("text-sm", isChristmas ? "text-[hsl(220,15%,60%)]" : "text-muted-foreground")}>
            운동 목표에 맞는 영양소 계산과 식단 계획을 바탕으로 식재료를 구매할
            수 있는 통합 쇼핑 플랫폼
          </p>
        </div>
        <div className="space-y-4">
          <h3 className={cn("text-sm font-bold", isChristmas && "text-[hsl(0,70%,60%)]")}>바로가기</h3>
          <ul className={cn("space-y-2 text-sm", isChristmas && "text-[hsl(220,15%,70%)]")}>
            <li>
              <a
                href="/"
                className={cn("hover:underline", isChristmas && "hover:text-[hsl(42,85%,65%)]")}
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
                className={cn("hover:underline", isChristmas && "hover:text-[hsl(42,85%,65%)]")}
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
                className={cn("hover:underline", isChristmas && "hover:text-[hsl(42,85%,65%)]")}
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
                className={cn("hover:underline", isChristmas && "hover:text-[hsl(42,85%,65%)]")}
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
          <h3 className={cn("text-sm font-bold", isChristmas && "text-[hsl(155,50%,50%)]")}>고객 지원</h3>
          <ul className={cn("space-y-2 text-sm", isChristmas && "text-[hsl(220,15%,70%)]")}>
            <li>
              {/* TODO: FAQ 페이지 구현 필요 */}
              <a href="/faq" className={cn("hover:underline", isChristmas && "hover:text-[hsl(42,85%,65%)]")}>
                자주 묻는 질문
              </a>
            </li>
            <li>
              {/* TODO: 문의 페이지 구현 필요 */}
              <a href="/contact" className={cn("hover:underline", isChristmas && "hover:text-[hsl(42,85%,65%)]")}>
                문의하기
              </a>
            </li>
            <li>
              {/* TODO: 배송 정책 페이지 구현 필요 */}
              <a href="/shipping" className={cn("hover:underline", isChristmas && "hover:text-[hsl(42,85%,65%)]")}>
                배송 정책
              </a>
            </li>
            <li>
              {/* TODO: 반품 및 환불 페이지 구현 필요 */}
              <a href="/returns" className={cn("hover:underline", isChristmas && "hover:text-[hsl(42,85%,65%)]")}>
                반품 및 환불
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className={cn("text-sm font-bold", isChristmas && "text-[hsl(42,85%,65%)]")}>소셜 미디어</h3>
          <div className="flex space-x-4">
            {/* TODO: 실제 소셜 미디어 링크로 교체 필요 */}
            <a href="#" className={cn(
              isChristmas
                ? "text-[hsl(220,15%,55%)] hover:text-[hsl(0,70%,60%)]"
                : "text-muted-foreground hover:text-foreground"
            )}>
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className={cn(
              isChristmas
                ? "text-[hsl(220,15%,55%)] hover:text-[hsl(0,70%,60%)]"
                : "text-muted-foreground hover:text-foreground"
            )}>
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className={cn(
              isChristmas
                ? "text-[hsl(220,15%,55%)] hover:text-[hsl(0,70%,60%)]"
                : "text-muted-foreground hover:text-foreground"
            )}>
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
          <div className={cn("space-y-2 text-sm", isChristmas && "text-[hsl(220,15%,60%)]")}>
            {/* TODO: 실제 연락처 정보로 교체 필요 */}
            <p>고객센터: 02-123-4567</p>
            <p>이메일: support@energyfactory.com</p>
          </div>
        </div>
      </div>
      <div className={cn(
        "container mt-8 border-t pt-4",
        isChristmas && "border-[hsl(220,20%,20%)]"
      )}>
        <p className={cn(
          "text-center text-xs",
          isChristmas ? "text-[hsl(220,15%,50%)]" : "text-muted-foreground"
        )}>
          &copy; {new Date().getFullYear()} Energy Factory. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
