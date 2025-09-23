import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import type { SignupRequest, SignupResponse, ApiResponse } from "@/types/user";

const signupApi = async (userData: SignupRequest): Promise<SignupResponse> => {
  const response = await api.post<ApiResponse<SignupResponse>>("/api/users/signup", userData);
  return response.data.data;
};

export default function SignupTestPage() {
  const [formData, setFormData] = useState<SignupRequest>({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });

  const mutation = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      console.log("✅ 회원가입 성공:", data);
    },
    onError: (error: any) => {
      console.error("❌ 회원가입 실패:", error);
    },
  });

  const handleInputChange = (field: keyof SignupRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const generateRandomData = () => {
    const randomId = Math.floor(Math.random() * 10000);
    setFormData({
      email: `test${randomId}@example.com`,
      password: "password123!",
      name: `테스트유저${randomId}`,
      phoneNumber: `010-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    });
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">회원가입 API 테스트</h1>
          <p className="text-gray-500 mt-2">
            POST http://13.209.24.80:8080/api/users/signup
          </p>
        </div>

        {/* 테스트 폼 */}
        <Card>
          <CardHeader>
            <CardTitle>회원가입 테스트</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="test@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  placeholder="password123!"
                  required
                />
              </div>

              <div>
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="홍길동"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber">전화번호 (선택)</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange('phoneNumber')}
                  placeholder="010-1234-5678"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateRandomData}
                  className="flex-1"
                >
                  랜덤 데이터 생성
                </Button>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="flex-1"
                >
                  {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  회원가입 테스트
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 요청 데이터 */}
        <Card>
          <CardHeader>
            <CardTitle>요청 데이터</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* 결과 */}
        {mutation.isError && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                오류 발생
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-red-600">
                <p className="font-medium">
                  {mutation.error instanceof Error ? mutation.error.message : "알 수 없는 오류가 발생했습니다."}
                </p>
                {mutation.error?.response?.data && (
                  <pre className="bg-red-50 p-4 rounded text-sm overflow-x-auto mt-2">
                    {JSON.stringify(mutation.error.response.data, null, 2)}
                  </pre>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {mutation.isSuccess && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-600 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                회원가입 성공
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-green-50 p-4 rounded text-sm overflow-x-auto">
                {JSON.stringify(mutation.data, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* API 정보 */}
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle>API 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Method:</span> POST
            </div>
            <div>
              <span className="font-medium">URL:</span> http://13.209.24.80:8080/api/users/signup
            </div>
            <div>
              <span className="font-medium">Content-Type:</span> application/json
            </div>
            <div>
              <span className="font-medium">상태:</span> 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                mutation.isPending ? 'bg-yellow-100 text-yellow-800' :
                mutation.isError ? 'bg-red-100 text-red-800' :
                mutation.isSuccess ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {mutation.isPending ? '요청 중' :
                 mutation.isError ? '실패' :
                 mutation.isSuccess ? '성공' :
                 '대기 중'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}