import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import type { LoginRequest, LoginResponse, ApiResponse } from "@/types/user";

const loginApi = async (loginData: LoginRequest): Promise<LoginResponse> => {
  // Form data로 전송 (서버에서 form-urlencoded 형식을 기대하는 것 같음)
  const formData = new URLSearchParams();
  formData.append('username', loginData.username);
  formData.append('password', loginData.password);

  const response = await api.post<ApiResponse<LoginResponse>>("/api/auth/login", formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data.data;
};

export default function LoginTestPage() {
  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("✅ 로그인 성공:", data);
      
      // 토큰을 localStorage에 저장
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      
      alert("로그인 성공! 토큰이 localStorage에 저장되었습니다.");
    },
    onError: (error: any) => {
      console.error("❌ 로그인 실패:", error);
    },
  });

  const handleInputChange = (field: keyof LoginRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const fillTestData = () => {
    setFormData({
      username: "test@example.com",
      password: "password123!",
    });
  };

  const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("토큰이 삭제되었습니다.");
  };

  const currentTokens = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">로그인 API 테스트</h1>
          <p className="text-gray-500 mt-2">
            POST http://13.209.24.80:8080/api/auth/login
          </p>
        </div>

        {/* 현재 토큰 상태 */}
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>현재 토큰 상태</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Access Token:</span>
                <span className={`ml-2 ${currentTokens.accessToken ? 'text-green-600' : 'text-gray-400'}`}>
                  {currentTokens.accessToken ? '저장됨' : '없음'}
                </span>
                {currentTokens.accessToken && (
                  <div className="text-xs text-gray-500 mt-1 break-all">
                    {currentTokens.accessToken.substring(0, 50)}...
                  </div>
                )}
              </div>
              <div>
                <span className="font-medium">Refresh Token:</span>
                <span className={`ml-2 ${currentTokens.refreshToken ? 'text-green-600' : 'text-gray-400'}`}>
                  {currentTokens.refreshToken ? '저장됨' : '없음'}
                </span>
                {currentTokens.refreshToken && (
                  <div className="text-xs text-gray-500 mt-1 break-all">
                    {currentTokens.refreshToken.substring(0, 50)}...
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearTokens}
                className="mt-2"
              >
                토큰 삭제
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 테스트 폼 */}
        <Card>
          <CardHeader>
            <CardTitle>로그인 테스트</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">사용자명 (이메일)</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  placeholder="test@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    placeholder="password123!"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={fillTestData}
                  className="flex-1"
                >
                  테스트 데이터 입력
                </Button>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="flex-1"
                >
                  {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  로그인 테스트
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 요청 데이터 */}
        <Card>
          <CardHeader>
            <CardTitle>요청 데이터 (Form Data)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded text-sm space-y-1">
              <div><span className="font-mono">username:</span> {formData.username}</div>
              <div><span className="font-mono">password:</span> {"*".repeat(formData.password.length)}</div>
            </div>
          </CardContent>
        </Card>

        {/* 결과 */}
        {mutation.isError && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                로그인 실패
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-red-600">
                <p className="font-medium">
                  {mutation.error instanceof Error ? mutation.error.message : "로그인에 실패했습니다."}
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
                로그인 성공
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Token Type:</span> {mutation.data?.tokenType}
                </div>
                <div>
                  <span className="font-medium">Access Token:</span>
                  <div className="text-xs text-gray-600 mt-1 break-all bg-gray-50 p-2 rounded">
                    {mutation.data?.accessToken}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Refresh Token:</span>
                  <div className="text-xs text-gray-600 mt-1 break-all bg-gray-50 p-2 rounded">
                    {mutation.data?.refreshToken}
                  </div>
                </div>
              </div>
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
              <span className="font-medium">URL:</span> http://13.209.24.80:8080/api/auth/login
            </div>
            <div>
              <span className="font-medium">Content-Type:</span> application/x-www-form-urlencoded
            </div>
            <div>
              <span className="font-medium">인증:</span> 필요 없음
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

        {/* 참고 사항 */}
        <Card className="bg-yellow-50">
          <CardHeader>
            <CardTitle>참고 사항</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div>• 서버에서는 Spring Security의 UsernamePasswordAuthenticationFilter를 사용합니다.</div>
            <div>• 요청은 application/x-www-form-urlencoded 형식으로 전송됩니다.</div>
            <div>• 성공 시 Access Token과 Refresh Token을 받습니다.</div>
            <div>• 토큰은 자동으로 localStorage에 저장되어 다른 API 호출 시 사용됩니다.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}