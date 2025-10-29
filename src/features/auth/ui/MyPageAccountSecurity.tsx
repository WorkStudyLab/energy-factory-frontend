import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import deleteUserIcon from "@/assets/icons/deleteUserIcon.svg";
import type { UserInfo } from "@/types/user";

interface MyPageAccountSecurityProps {
  userInfo: UserInfo;
  onDeleteAccount: () => void;
}

export function MyPageAccountSecurity({
  userInfo,
  onDeleteAccount,
}: MyPageAccountSecurityProps) {
  const { authProvider } = userInfo;
  return (
    <Card className="border-neutral-200">
      <CardHeader className="pb-6">
        <CardTitle className="text-base font-bold">계정 보안</CardTitle>
        <CardDescription className="text-sm text-neutral-600">
          계정 보안 및 설정 관리
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Naver 계정 연동 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-200 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border border-neutral-200 rounded-full flex items-center justify-center">
              <span className="text-base text-black">N</span>
            </div>
            <div className="flex-1">
              <div className="text-base text-neutral-900 mb-1">
                네이버 계정 연동
              </div>
              <div className="text-base text-neutral-900">{userInfo.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:ml-0 ml-[52px]">
            {authProvider !== "naver" && (
              <Button className="bg-[#03c75a] hover:bg-[#02a144] text-white px-4 h-[38px] rounded-lg text-sm font-bold w-full md:w-auto">
                네이버 아이디 연동하기
              </Button>
            )}

            {authProvider === "naver" && (
              <Button className="bg-[#00a63e] hover:bg-[#008c36] text-white px-4 h-[38px] rounded-lg text-sm font-bold w-full md:w-auto">
                연동됨
              </Button>
            )}
          </div>
        </div>

        {/* 회원 탈퇴 */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <img src={deleteUserIcon} alt="회원 탈퇴" className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base text-neutral-900 mb-1">회원 탈퇴</div>
              <div className="text-sm text-neutral-600">
                계정을 영구적으로 삭제합니다
              </div>
            </div>
          </div>
          <Button
            onClick={onDeleteAccount}
            variant="outline"
            className="border-[#e7000b] text-[#e7000b] hover:bg-red-50 hover:text-[#e7000b] px-4 h-[38px] rounded-lg text-sm"
          >
            회원탈퇴
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
