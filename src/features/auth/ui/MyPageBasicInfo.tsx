import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MyPageBasicInfoProps {
  userInfo: {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    address: string;
  };
}

export function MyPageBasicInfo({ userInfo }: MyPageBasicInfoProps) {
  return (
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
          <span className="text-base text-neutral-900">{userInfo.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-base text-neutral-700">이메일</span>
          <span className="text-base text-neutral-900">{userInfo.email}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-base text-neutral-700">연락처</span>
          <span className="text-base text-neutral-900">{userInfo.phone}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-base text-neutral-700">생년월일</span>
          <span className="text-base text-neutral-900">
            {userInfo.birthDate}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-base text-neutral-700">배송지</span>
          <span className="text-base text-neutral-900">{userInfo.address}</span>
        </div>
      </CardContent>
    </Card>
  );
}
