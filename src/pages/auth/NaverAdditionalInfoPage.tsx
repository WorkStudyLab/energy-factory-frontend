import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AuthApiService } from "@/features/auth/services/AuthApiService";
import { ROUTES } from "@/constants/routes";
import { useDialogHelpers } from "@/utils/dialogHelpers";
import type { UserAdditionalInfoRequest } from "@/types/user";

/**
 * 네이버 로그인 후 추가 정보 입력 페이지
 *
 * 네이버에서 제공하지 않는 정보(생년월일, 주소)를 입력받습니다.
 */
export default function NaverAdditionalInfoPage() {
  const navigate = useNavigate();
  const { alert } = useDialogHelpers();

  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [address, setAddress] = useState("");

  // 년도 옵션 생성 (현재 년도부터 100년 전까지)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 폼 유효성 검사
  const isFormValid = useMemo(() => {
    return (
      birthYear !== "" &&
      birthMonth !== "" &&
      birthDay !== "" &&
      address.trim() !== ""
    );
  }, [birthYear, birthMonth, birthDay, address]);

  // 추가 정보 업데이트 mutation
  const mutation = useMutation({
    mutationFn: async (data: UserAdditionalInfoRequest) => {
      return await AuthApiService.updateAdditionalInfo(data);
    },
    onSuccess: () => {
      alert("추가 정보가 저장되었습니다.", {
        title: "저장 완료",
        onConfirm: () => {
          navigate(ROUTES.HOME, { replace: true });
        },
      });
    },
    onError: (error: any) => {
      console.error("추가 정보 저장 실패:", error);
      alert("추가 정보 저장에 실패했습니다. 다시 시도해주세요.", {
        title: "저장 실패",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("모든 필수 항목을 입력해주세요.", {
        title: "입력 오류",
      });
      return;
    }

    // 생년월일을 YYYY-MM-DD 형식으로 변환
    const birthDate = `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`;

    mutation.mutate({
      birthDate,
      address: address.trim(),
    });
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>추가 정보 입력</CardTitle>
          <CardDescription>
            서비스 이용을 위해 추가 정보를 입력해주세요
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {/* 생년월일 */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-sm font-medium text-neutral-900">
                  생년월일
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-red-500">*</span>
                  <span className="text-sm font-medium text-neutral-500">
                    필수
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Select value={birthYear} onValueChange={setBirthYear} required>
                  <SelectTrigger className="h-9 border-neutral-200">
                    <SelectValue placeholder="년도" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={String(year)}>
                        {year}년
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={birthMonth}
                  onValueChange={setBirthMonth}
                  required
                >
                  <SelectTrigger className="h-9 border-neutral-200">
                    <SelectValue placeholder="월" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={String(month)}>
                        {month}월
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={birthDay} onValueChange={setBirthDay} required>
                  <SelectTrigger className="h-9 border-neutral-200">
                    <SelectValue placeholder="일" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={String(day)}>
                        {day}일
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 주소 */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="address" className="text-sm font-medium text-neutral-900">
                  배송지 주소
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-red-500">*</span>
                  <span className="text-sm font-medium text-neutral-500">
                    필수
                  </span>
                </div>
              </div>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="서울특별시 금천구 스타밸리"
                required
                className="h-9 border-neutral-200"
              />
            </div>
          </CardContent>

          <CardFooter className="flex gap-3 border-t border-neutral-200 pt-5">
            <Button
              type="submit"
              disabled={mutation.isPending || !isFormValid}
              className="w-full h-12 rounded-lg bg-[#108c4a] hover:bg-[#0d7a3f] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "저장 중..." : "저장하고 시작하기"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
