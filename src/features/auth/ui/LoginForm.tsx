import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, isError, error } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <form onSubmit={handleLogin}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">이메일</Label>
          <Input
            id="username"
            type="email"
            placeholder="example@email.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">비밀번호</Label>
            <button
              type="button"
              className="text-sm text-green-600 hover:underline"
              onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
            >
              비밀번호 찾기
            </button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>
        {isError && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error?.response?.data?.message || "로그인에 실패했습니다."}
          </div>
        )}
      </CardFooter>
    </form>
  );
}
