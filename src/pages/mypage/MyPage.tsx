import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import deleteUserIcon from "@/assets/icons/deleteUserIcon.svg";
import defaultUserImage from "@/assets/images/default-user-image.png";
import { useDeleteUser } from "@/features/auth/hooks/useDeleteUser";

export default function MyPage() {
  // 인증 관련 훅
  const { logout, user } = useAuthStore();
  const { deleteUser } = useDeleteUser();
  const navigate = useNavigate();

  // 사용자 정보 상태
  const userInfo = {
    name: "김진장",
    email: "exam@example.com",
    phone: "010-1234-5678",
    birthDate: "1990-01-01",
    authProvider: "naver",
    memberSince: "2024-06-15",
    address: "서울특별시 금천구 스타밸리",
    profileImage: defaultUserImage, // 기본 프로필 이미지
  };

  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /** 회원 탈퇴 요청 */
  const handleDeleteAccount = () => {
    // user가 null인 경우 처리
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const confirmed = window.confirm(
      "정말로 회원을 탈퇴하시겠습니까?\n\n탈퇴 시 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.",
    );

    if (confirmed) {
      // 회원 탈퇴 요청
      deleteUser(user.id);
      // 로그아웃 요청
      logout();
      // 홈으로 이동
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* 헤더 */}
          <Card className="border-neutral-200">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24 bg-neutral-200">
                    <AvatarImage
                      src={userInfo.profileImage}
                      alt={userInfo.name}
                    />
                    <AvatarFallback className="text-xl text-neutral-600 bg-neutral-200">
                      {userInfo.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-base font-normal mb-2">
                      {userInfo.name}님의 마이페이지
                    </h1>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className="border-[#88ff90] bg-transparent text-[#00a63e] text-xs font-bold"
                      >
                        Naver 계정
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-[#bedbff] bg-transparent text-[#155dfc] text-xs font-bold"
                      >
                        개인계정
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-600">
                      {userInfo.memberSince} 가입 · 7개월 전
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  className="bg-[#e20004] hover:bg-[#c10003] text-white px-12 h-[50px] rounded-lg"
                >
                  로그아웃
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 기본 정보 */}
          <Card className="border-neutral-200">
            <CardHeader className="pb-6">
              <CardTitle className="text-base font-bold">기본 정보</CardTitle>
              <CardDescription className="text-sm text-neutral-600">
                계정 및 본인 인증 정보
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-12">
              <div className="flex justify-between items-center">
                <span className="text-base text-neutral-700">이름</span>
                <span className="text-base text-neutral-900">
                  {userInfo.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-neutral-700">이메일</span>
                <span className="text-base text-neutral-900">
                  {userInfo.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-neutral-700">연락처</span>
                <span className="text-base text-neutral-900">
                  {userInfo.phone}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-neutral-700">생년월일</span>
                <span className="text-base text-neutral-900">
                  {userInfo.birthDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-neutral-700">계정 연동</span>
                <span className="text-base text-neutral-900">Naver</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-neutral-700">배송지</span>
                <span className="text-base text-neutral-900">
                  {userInfo.address}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 계정 보안 */}
          <Card className="border-neutral-200">
            <CardHeader className="pb-6">
              <CardTitle className="text-base font-bold">계정 보안</CardTitle>
              <CardDescription className="text-sm text-neutral-600">
                계정 보안 및 설정 관리
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Naver 계정 연동 */}
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-neutral-200 rounded-full flex items-center justify-center">
                    <span className="text-base text-black">N</span>
                  </div>
                  <div>
                    <div className="text-base text-neutral-900 mb-1">
                      Naver 계정 연동
                    </div>
                    <div className="text-base text-neutral-900">
                      {userInfo.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="bg-[#00a63e] hover:bg-[#008c36] text-white px-4 h-[38px] rounded-lg text-sm font-bold">
                    연동됨
                  </Button>
                  <Button className="bg-[#00a63e] hover:bg-[#008c36] text-white px-4 h-[38px] rounded-lg text-sm font-bold">
                    네이버 아이디 연동하기
                  </Button>
                </div>
              </div>

              {/* 회원 탈퇴 */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <img
                      src={deleteUserIcon}
                      alt="회원 탈퇴"
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <div className="text-base text-neutral-900 mb-1">
                      회원 탈퇴
                    </div>
                    <div className="text-sm text-neutral-600">
                      계정을 영구적으로 삭제합니다
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleDeleteAccount}
                  variant="outline"
                  className="border-[#e7000b] text-[#e7000b] hover:bg-red-50 hover:text-[#e7000b] px-4 h-[38px] rounded-lg text-sm"
                >
                  회원탈퇴
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
