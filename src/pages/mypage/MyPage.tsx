import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import defaultUserImage from "@/assets/images/default-user-image.png";
import { useDeleteUser } from "@/features/auth/hooks/useDeleteUser";
import { useGetUserInfo } from "@/features/auth/hooks/useGetUserInfo";
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
  } = useGetUserInfo(user ? user.id : 0);
  const navigate = useNavigate();

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

  console.log(userInfoData);
  const userInfo = {
    // 사용자 정보 상태
    ...userInfoData,
    profileImage: defaultUserImage, // 기본 프로필 이미지
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
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
