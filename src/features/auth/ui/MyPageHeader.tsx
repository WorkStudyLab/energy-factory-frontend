import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { UserInfo } from "@/types/user";

interface MyPageHeaderProps {
  userInfo: UserInfo & { profileImage: string };
  onLogout: () => void;
}

/**
 * yyyy-mm-dd 형식의 가입일로부터 경과 시간을 계산합니다.
 *
 * 계산 기준:
 * - 1개월 미만: "N일 전"
 * - 1개월 이상 12개월 미만: "N개월 전"
 * - 12개월 이상: "N년 전" (12개월 = 1년)
 * - 개월 수는 날짜 차이를 기준으로 계산 (같은 날짜면 정확히 1개월)
 */
function getTimeSinceJoined(memberSince: string): string {
  const joinDate = new Date(memberSince);
  const today = new Date();

  // 날짜를 0시 0분 0초로 정규화하여 일 단위 비교
  joinDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // 일 수 차이 계산
  const daysDiff = Math.floor(
    (today.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  // 1일 미만
  if (daysDiff < 1) {
    return "오늘";
  }

  // 1개월 미만 (30일 기준)
  if (daysDiff < 30) {
    return `${daysDiff}일 전`;
  }

  // 개월 수 계산 (연도 차이 * 12 + 월 차이)
  const yearsDiff = today.getFullYear() - joinDate.getFullYear();
  const monthsDiff = today.getMonth() - joinDate.getMonth();
  const totalMonths = yearsDiff * 12 + monthsDiff;

  // 날짜가 이전이면 한 달 덜 계산
  if (today.getDate() < joinDate.getDate()) {
    const adjustedMonths = totalMonths - 1;

    if (adjustedMonths < 12) {
      return `${adjustedMonths}개월 전`;
    }

    const years = Math.floor(adjustedMonths / 12);
    return `${years}년 전`;
  }

  // 12개월 미만
  if (totalMonths < 12) {
    return `${totalMonths}개월 전`;
  }

  // 12개월 이상
  const years = Math.floor(totalMonths / 12);
  return `${years}년 전`;
}

export function MyPageHeader({ userInfo, onLogout }: MyPageHeaderProps) {
  const { name, memberSince, authProvider, profileImage } = userInfo;
  return (
    <Card className="border-neutral-200">
      <CardContent className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-6">
            <Avatar className="h-20 w-20 md:h-24 md:w-24 bg-neutral-200 flex-shrink-0">
              <AvatarImage src={profileImage} alt={name} />
            </Avatar>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-normal mb-2">
                {name}님의 마이페이지
              </h1>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {authProvider === "local" && (
                  <Badge
                    variant="outline"
                    className="border-[#bedbff] bg-transparent text-[#155dfc] text-xs font-bold"
                  >
                    개인계정
                  </Badge>
                )}
                {authProvider === "naver" && (
                  <Badge
                    variant="outline"
                    className="border-[#88ff90] bg-transparent text-[#00a63e] text-xs font-bold"
                  >
                    Naver 계정
                  </Badge>
                )}
              </div>
              <p className="text-sm text-neutral-600">
                {memberSince} 가입 · {getTimeSinceJoined(memberSince)}
              </p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            className="bg-[#e20004] hover:bg-[#c10003] text-white font-bold px-10 h-[45px] rounded-lg w-full md:w-auto"
          >
            로그아웃
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
