import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ROUTES } from "@/constants/routes"

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  height: string
  weight: string
  gender: string
  age: string
  goal: string
  activity: string
  terms: boolean
  privacy: boolean
  marketing: boolean
}

export default function SignupPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    height: "",
    weight: "",
    gender: "",
    age: "",
    goal: "",
    activity: "",
    terms: false,
    privacy: false,
    marketing: false,
  })

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 회원가입 로직 구현
    console.log("회원가입 시도:", formData)
  }
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold">회원가입</h1>
            <p className="text-gray-500">Energy Factory 계정을 만들어 건강한 쇼핑을 시작하세요</p>
            <p className="text-sm mt-2">
              이미 계정이 있으신가요?{" "}
              <a
                href="#"
                className="text-green-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigate(ROUTES.LOGIN)
                }}
              >
                로그인하기
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
                <CardDescription>계정 생성에 필요한 기본 정보를 입력해주세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">이름</Label>
                    <Input 
                      id="first-name" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">성</Label>
                    <Input 
                      id="last-name" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500">8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">비밀번호 확인</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">연락처</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>신체 정보 (선택사항)</CardTitle>
                <CardDescription>맞춤형 영양 계산을 위한 정보입니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="height">키 (cm)</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">몸무게 (kg)</Label>
                    <Input 
                      id="weight" 
                      type="number" 
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">성별</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="성별 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">남성</SelectItem>
                        <SelectItem value="female">여성</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">나이</Label>
                    <Input 
                      id="age" 
                      type="number" 
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>운동 목표 (선택사항)</CardTitle>
                <CardDescription>당신의 운동 목표를 선택하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal">주요 목표</Label>
                  <Select value={formData.goal} onValueChange={(value) => handleInputChange("goal", value)}>
                    <SelectTrigger id="goal">
                      <SelectValue placeholder="목표 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">체중 감량</SelectItem>
                      <SelectItem value="maintain">체중 유지</SelectItem>
                      <SelectItem value="muscle-gain">근육 증가</SelectItem>
                      <SelectItem value="performance">운동 성능 향상</SelectItem>
                      <SelectItem value="health">전반적인 건강 개선</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity">활동량</Label>
                  <Select value={formData.activity} onValueChange={(value) => handleInputChange("activity", value)}>
                    <SelectTrigger id="activity">
                      <SelectValue placeholder="활동량 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">거의 운동 안함</SelectItem>
                      <SelectItem value="light">가벼운 활동 (주 1-3회)</SelectItem>
                      <SelectItem value="moderate">보통 활동 (주 3-5회)</SelectItem>
                      <SelectItem value="active">활발한 활동 (주 6-7회)</SelectItem>
                      <SelectItem value="very-active">매우 활발한 활동 (하루 2회)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

          <Card>
            <CardHeader>
              <CardTitle>이용약관 및 개인정보 처리방침</CardTitle>
              <CardDescription>서비스 이용을 위해 약관에 동의해주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formData.terms}
                  onCheckedChange={(checked) => handleInputChange("terms", checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    이용약관 동의 (필수)
                  </label>
                  <p className="text-sm text-gray-500">
                    <a href="#" className="text-green-600 hover:underline">
                      이용약관
                    </a>
                    을 읽고 동의합니다
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="privacy" 
                  checked={formData.privacy}
                  onCheckedChange={(checked) => handleInputChange("privacy", checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="privacy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    개인정보 처리방침 동의 (필수)
                  </label>
                  <p className="text-sm text-gray-500">
                    <a href="#" className="text-green-600 hover:underline">
                      개인정보 처리방침
                    </a>
                    을 읽고 동의합니다
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="marketing" 
                  checked={formData.marketing}
                  onCheckedChange={(checked) => handleInputChange("marketing", checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="marketing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    마케팅 정보 수신 동의 (선택)
                  </label>
                  <p className="text-sm text-gray-500">프로모션 및 할인 정보를 이메일로 받습니다</p>
                </div>
              </div>
            </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => navigate(ROUTES.LOGIN)}>
                  취소
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">회원가입 완료</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}
