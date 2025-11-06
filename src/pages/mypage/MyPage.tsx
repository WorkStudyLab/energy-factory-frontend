import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import defaultUserImage from "@/assets/images/default-user-image.png";
import { useDeleteUser } from "@/features/auth/hooks/useDeleteUser";
import { useGetUserInfo } from "@/features/auth/hooks/useGetUserInfo";
import { useDialogHelpers } from "@/utils/dialogHelpers";
import { MyPageHeader } from "@/features/auth/ui/MyPageHeader";
import { MyPageBasicInfo } from "@/features/auth/ui/MyPageBasicInfo";
import { MyPageAccountSecurity } from "@/features/auth/ui/MyPageAccountSecurity";

export default function MyPage() {
  // 인증 관련 훅
  const { logout, user } = useAuthStore();
  const { deleteUser } = useDeleteUser();
  const {
    data: userInfoData,
    isLoading,
    error,
  } = useGetUserInfo();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { alert } = useDialogHelpers();

  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 네이버 연동 성공/실패 처리
  useEffect(() => {
    const linkStatus = searchParams.get("link");
    const reason = searchParams.get("reason");

    if (linkStatus === "success") {
      // URL 파라미터 먼저 제거
      window.history.replaceState({}, "", "/mypage");

      alert("네이버 계정 연동이 완료되었습니다!", {
        title: "연동 완료",
        onConfirm: () => {
          // 사용자 정보 새로고침을 위해 페이지 리로드
          window.location.reload();
        },
      });
    }

    if (linkStatus === "error") {
      // URL 파라미터 먼저 제거
      window.history.replaceState({}, "", "/mypage");

      const errorMessages: Record<string, string> = {
        already_linked: "이미 소셜 계정이 연동되어 있습니다.",
        already_in_use: "해당 네이버 계정은 이미 다른 사용자가 사용 중입니다.",
        unknown_error: "알 수 없는 오류가 발생했습니다.",
      };

      alert(errorMessages[reason || ""] || "계정 연동에 실패했습니다.", {
        title: "연동 실패",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // alert 제거

  /** 회원 탈퇴 요청 */
  const handleDeleteAccount = () => {
    // user가 null인 경우 처리
    if (!user) {
      alert("로그인이 필요합니다.", {
        title: "오류",
        onConfirm: () => navigate("/login"),
      });
      return;
    }

    const confirmed = window.confirm(
      "정말로 회원을 탈퇴하시겠습니까?\n\n탈퇴 시 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.",
    );

    if (confirmed) {
      // 회원 탈퇴 요청 (토큰에서 userId 자동 추출)
      deleteUser();
      // 로그아웃 요청
      logout();
      // 홈으로 이동
      navigate("/");
    }
  };

  // 로딩
  if (isLoading) {
    return <></>;
  }
  // 에러
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // userInfoData가 없는 경우
  if (!userInfoData) {
    return <div>사용자 정보를 불러올 수 없습니다.</div>;
  }

  const userInfo = {
    // 사용자 정보 상태
    ...userInfoData,
    profileImage: defaultUserImage, // 기본 프로필 이미지
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* 헤더 */}
          <MyPageHeader userInfo={userInfo} onLogout={handleLogout} />

          {/* 기본 정보 */}
          <MyPageBasicInfo userInfo={userInfo} />

          {/* 계정 보안 */}
          <MyPageAccountSecurity
            userInfo={userInfo}
            onDeleteAccount={handleDeleteAccount}
          />
        </div>
      </div>
    </div>
  );
}
