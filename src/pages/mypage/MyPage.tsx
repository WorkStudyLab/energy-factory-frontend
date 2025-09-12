import { useState } from "react"
import {
  User,
  Package,
  Settings,
  Target,
  Heart,
  Shield,
  MapPin,
  Edit,
  Save,
  X,
  Eye,
  Star,
  RotateCcw,
  Truck,
  CheckCircle,
  Clock,
  Cookie as Google,
  MessageSquare,
  Mail,
  Phone,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [editingSection, setEditingSection] = useState<string | null>(null)

  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState({
    // 기본 정보
    name: "김건강",
    email: "health@example.com",
    phone: "010-1234-5678",
    birthDate: "1990-01-01",
    profileImage: "https://placehold.co/120x120",

    // 인증 정보
    authProvider: "google", // google, kakao, email
    isEmailVerified: true,

    // 신체 정보
    height: 175,
    weight: 70,
    gender: "male",
    age: 34,
    activityLevel: "moderate",

    // 운동 목표
    fitnessGoal: "muscle-gain",
    targetWeight: 75,
    timeline: "3-months",

    // 영양 계획
    dietType: "high-protein",
    dailyCalories: 2450,
    proteinRatio: 30,
    carbRatio: 40,
    fatRatio: 30,

    // 식이 제한
    dietaryRestrictions: [],
    allergies: "",
    preferredFoods: "닭가슴살, 연어, 퀴노아",
    dislikedFoods: "",

    // 배송지 정보
    addresses: [
      {
        id: 1,
        name: "집",
        address: "서울시 강남구 테헤란로 123",
        detailAddress: "456동 789호",
        zipCode: "06123",
        isDefault: true,
      },
      {
        id: 2,
        name: "회사",
        address: "서울시 서초구 강남대로 456",
        detailAddress: "ABC빌딩 10층",
        zipCode: "06789",
        isDefault: false,
      },
    ],

    // 설정
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: true,
    },

    // 통계
    stats: {
      totalOrders: 12,
      totalSpent: 450000,
      favoriteCategory: "고단백 식품",
      memberSince: "2023-06-15",
      streak: 7,
    },
  })

  // 주문 내역 데이터
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-20",
      status: "delivered",
      statusText: "배송완료",
      total: 89900,
      items: [
        {
          id: 1,
          name: "프리미엄 단백질 파우더",
          price: 45000,
          quantity: 1,
          image: "https://placehold.co/60x60",
        },
        {
          id: 2,
          name: "유기농 닭가슴살 10팩",
          price: 25900,
          quantity: 1,
          image: "https://placehold.co/60x60",
        },
      ],
      canReview: true,
      canReorder: true,
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-18",
      status: "shipping",
      statusText: "배송중",
      total: 67800,
      items: [
        {
          id: 4,
          name: "크레아틴 모노하이드레이트",
          price: 28000,
          quantity: 1,
          image: "https://placehold.co/60x60",
        },
      ],
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-15",
      status: "preparing",
      statusText: "상품준비중",
      total: 34500,
      items: [
        {
          id: 7,
          name: "MCT 오일",
          price: 22000,
          quantity: 1,
          image: "https://placehold.co/60x60",
        },
      ],
      canCancel: true,
    },
  ]

  // 상태별 색상 및 아이콘
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "delivered":
        return { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> }
      case "shipping":
        return { color: "bg-blue-100 text-blue-800", icon: <Truck className="h-4 w-4" /> }
      case "preparing":
        return { color: "bg-yellow-100 text-yellow-800", icon: <Package className="h-4 w-4" /> }
      default:
        return { color: "bg-gray-100 text-gray-800", icon: <Clock className="h-4 w-4" /> }
    }
  }

  // 인증 제공자 정보
  const getAuthProviderInfo = (provider: string) => {
    switch (provider) {
      case "google":
        return { name: "Google", icon: <Google className="h-4 w-4" />, color: "text-red-600" }
      case "kakao":
        return { name: "카카오", icon: <MessageSquare className="h-4 w-4" />, color: "text-yellow-600" }
      case "email":
        return { name: "이메일", icon: <Mail className="h-4 w-4" />, color: "text-blue-600" }
      default:
        return { name: "이메일", icon: <Mail className="h-4 w-4" />, color: "text-blue-600" }
    }
  }

  const authInfo = getAuthProviderInfo(userInfo.authProvider)

  // 정보 수정 함수
  const handleSave = (data: any) => {
    setUserInfo((prev) => ({ ...prev, ...data }))
    setEditingSection(null)
  }

  // 주소 추가/수정/삭제 함수
  // const handleAddAddress = (newAddress: any) => {
  //   const id = Math.max(...userInfo.addresses.map((a) => a.id)) + 1
  //   setUserInfo((prev) => ({
  //     ...prev,
  //     addresses: [...prev.addresses, { ...newAddress, id }],
  //   }))
  // }

  const handleDeleteAddress = (addressId: number) => {
    setUserInfo((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== addressId),
    }))
  }

  const handleSetDefaultAddress = (addressId: number) => {
    setUserInfo((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      })),
    }))
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
               <AvatarImage src={userInfo.profileImage || "https://placehold.co/120x120"} alt={userInfo.name} />
              <AvatarFallback className="text-lg">{userInfo.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{userInfo.name}님의 마이페이지</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className={`flex items-center gap-1 ${authInfo.color}`}>
                  {authInfo.icon}
                  <span className="text-sm">{authInfo.name} 계정</span>
                </div>
                {userInfo.isEmailVerified && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    인증완료
                  </Badge>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-1">
                {userInfo.stats.memberSince} 가입 · {userInfo.stats.streak}일 연속 활동
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{userInfo.stats.totalOrders}</div>
              <div className="text-xs text-gray-500">총 주문</div>
            </div>
            <Separator orientation="vertical" className="h-8 mx-2" />
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">
                {(userInfo.stats.totalSpent / 10000).toFixed(0)}만원
              </div>
              <div className="text-xs text-gray-500">총 구매</div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="profile" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">내 정보</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">주문내역</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">건강목표</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">배송지</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">선호도</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">설정</span>
            </TabsTrigger>
          </TabsList>

          {/* 내 정보 탭 */}
          <TabsContent value="profile" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* 기본 정보 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>기본 정보</CardTitle>
                    <CardDescription>개인 정보와 계정 설정</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection(editingSection === "basic" ? null : "basic")}
                  >
                    {editingSection === "basic" ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingSection === "basic" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">이름</Label>
                        <Input id="name" defaultValue={userInfo.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" type="email" defaultValue={userInfo.email} disabled />
                        <p className="text-xs text-gray-500">
                          이메일은 {authInfo.name} 계정과 연동되어 변경할 수 없습니다
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">연락처</Label>
                        <Input id="phone" defaultValue={userInfo.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birth">생년월일</Label>
                        <Input id="birth" type="date" defaultValue={userInfo.birthDate} />
                      </div>
                      <div className="flex gap-2">
                         <Button size="sm" onClick={() => handleSave({})}>
                           <Save className="h-4 w-4 mr-1" />
                           저장
                         </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditingSection(null)}>
                          취소
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">이름</span>
                        <span className="font-medium">{userInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">이메일</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{userInfo.email}</span>
                          {userInfo.isEmailVerified && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                              인증완료
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">연락처</span>
                        <span className="font-medium">{userInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">생년월일</span>
                        <span className="font-medium">{userInfo.birthDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">계정 연동</span>
                        <div className="flex items-center gap-1">
                          {authInfo.icon}
                          <span className="font-medium">{authInfo.name}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 신체 정보 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>신체 정보</CardTitle>
                    <CardDescription>영양 계산을 위한 신체 정보</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection(editingSection === "body" ? null : "body")}
                  >
                    {editingSection === "body" ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingSection === "body" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="height">키 (cm)</Label>
                          <Input id="height" type="number" defaultValue={userInfo.height} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">몸무게 (kg)</Label>
                          <Input id="weight" type="number" defaultValue={userInfo.weight} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="gender">성별</Label>
                          <Select defaultValue={userInfo.gender}>
                            <SelectTrigger>
                              <SelectValue />
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
                          <Input id="age" type="number" defaultValue={userInfo.age} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="activity">활동량</Label>
                        <Select defaultValue={userInfo.activityLevel}>
                          <SelectTrigger>
                            <SelectValue />
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
                      <div className="flex gap-2">
                         <Button size="sm" onClick={() => handleSave({})}>
                           <Save className="h-4 w-4 mr-1" />
                           저장
                         </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditingSection(null)}>
                          취소
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">키</span>
                        <span className="font-medium">{userInfo.height}cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">몸무게</span>
                        <span className="font-medium">{userInfo.weight}kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">성별</span>
                        <span className="font-medium">{userInfo.gender === "male" ? "남성" : "여성"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">나이</span>
                        <span className="font-medium">{userInfo.age}세</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">BMI</span>
                        <span className="font-medium">
                          {(userInfo.weight / Math.pow(userInfo.height / 100, 2)).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 계정 보안 */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>계정 보안</CardTitle>
                  <CardDescription>계정 보안 및 인증 설정</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {authInfo.icon}
                      <div>
                        <div className="font-medium">{authInfo.name} 계정 연동</div>
                        <div className="text-sm text-gray-500">{userInfo.email}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      연동됨
                    </Badge>
                  </div>

                  {userInfo.authProvider === "email" && (
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5" />
                        <div>
                          <div className="font-medium">비밀번호</div>
                          <div className="text-sm text-gray-500">마지막 변경: 2024-01-01</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        변경
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5" />
                      <div>
                        <div className="font-medium">휴대폰 인증</div>
                        <div className="text-sm text-gray-500">{userInfo.phone}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      인증완료
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 주문 내역 탭 */}
          <TabsContent value="orders" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">주문 내역</h2>
                  <p className="text-gray-500">최근 주문한 상품들을 확인하세요</p>
                </div>
                 <Button variant="outline" onClick={() => console.log("주문 내역 전체 보기")}>
                   전체 보기
                 </Button>
              </div>

              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => {
                  const statusInfo = getStatusInfo(order.status)
                  return (
                    <Card key={order.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div>
                              <CardTitle className="text-base">{order.id}</CardTitle>
                              <CardDescription>{order.date}</CardDescription>
                            </div>
                            <Badge className={`${statusInfo.color} flex items-center gap-1`}>
                              {statusInfo.icon}
                              {order.statusText}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{order.total.toLocaleString()}원</div>
                            <div className="text-sm text-gray-500">{order.items.length}개 상품</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-3 overflow-x-auto">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex-shrink-0 flex items-center gap-2 bg-gray-50 p-2 rounded">
                              <img
                                 src={item.image || "https://placehold.co/60x60"}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="min-w-0">
                                <div className="font-medium text-sm truncate">{item.name}</div>
                                <div className="text-xs text-gray-500">{item.quantity}개</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2 pt-3 border-t">
                        {order.status === "delivered" && order.canReview && (
                          <Button variant="outline" size="sm">
                            <Star className="h-4 w-4 mr-1" />
                            리뷰
                          </Button>
                        )}
                        {order.canReorder && (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4 mr-1" />
                            재주문
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          상세
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          {/* 건강 목표 탭 */}
          <TabsContent value="health" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>운동 목표</CardTitle>
                    <CardDescription>현재 설정된 피트니스 목표</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection(editingSection === "goals" ? null : "goals")}
                  >
                    {editingSection === "goals" ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingSection === "goals" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>주요 목표</Label>
                        <Select defaultValue={userInfo.fitnessGoal}>
                          <SelectTrigger>
                            <SelectValue />
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
                        <Label>목표 체중 (kg)</Label>
                        <Input type="number" defaultValue={userInfo.targetWeight} />
                      </div>
                      <div className="space-y-2">
                        <Label>목표 기간</Label>
                        <Select defaultValue={userInfo.timeline}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-month">1개월</SelectItem>
                            <SelectItem value="3-months">3개월</SelectItem>
                            <SelectItem value="6-months">6개월</SelectItem>
                            <SelectItem value="1-year">1년</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                         <Button size="sm" onClick={() => handleSave({})}>
                           <Save className="h-4 w-4 mr-1" />
                           저장
                         </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditingSection(null)}>
                          취소
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">주요 목표</span>
                        <Badge className="bg-green-100 text-green-700">
                          {userInfo.fitnessGoal === "muscle-gain" ? "근육 증가" : userInfo.fitnessGoal}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">현재 체중</span>
                        <span className="font-medium">{userInfo.weight}kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">목표 체중</span>
                        <span className="font-medium">{userInfo.targetWeight}kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">목표 기간</span>
                        <span className="font-medium">3개월</span>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>목표 달성률</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>영양 계획</CardTitle>
                  <CardDescription>일일 영양소 목표</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">일일 칼로리</span>
                      <span className="font-medium">{userInfo.dailyCalories} kcal</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>단백질</span>
                        <span>{userInfo.proteinRatio}%</span>
                      </div>
                      <Progress value={userInfo.proteinRatio} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>탄수화물</span>
                        <span>{userInfo.carbRatio}%</span>
                      </div>
                      <Progress value={userInfo.carbRatio} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>지방</span>
                        <span>{userInfo.fatRatio}%</span>
                      </div>
                      <Progress value={userInfo.fatRatio} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                     onClick={() => console.log("영양 계산기로 이동")}
                  >
                    <Activity className="h-4 w-4 mr-1" />
                    영양 계산기에서 수정
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* 배송지 관리 탭 */}
          <TabsContent value="addresses" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">배송지 관리</h2>
                  <p className="text-gray-500">자주 사용하는 배송지를 관리하세요</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <MapPin className="h-4 w-4 mr-1" />새 배송지 추가
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>새 배송지 추가</DialogTitle>
                      <DialogDescription>새로운 배송지 정보를 입력해주세요</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>배송지 이름</Label>
                        <Input placeholder="예: 집, 회사" />
                      </div>
                      <div className="space-y-2">
                        <Label>주소</Label>
                        <Input placeholder="주소를 입력하세요" />
                      </div>
                      <div className="space-y-2">
                        <Label>상세 주소</Label>
                        <Input placeholder="상세 주소를 입력하세요" />
                      </div>
                      <div className="space-y-2">
                        <Label>우편번호</Label>
                        <Input placeholder="우편번호" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="default" />
                        <Label htmlFor="default">기본 배송지로 설정</Label>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">취소</Button>
                        <Button>추가</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {userInfo.addresses.map((address) => (
                  <Card key={address.id} className={address.isDefault ? "border-green-500" : ""}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{address.name}</CardTitle>
                          {address.isDefault && <Badge className="bg-green-100 text-green-700">기본</Badge>}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <X className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>배송지 삭제</AlertDialogTitle>
                                <AlertDialogDescription>
                                  이 배송지를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>취소</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteAddress(address.id)}>
                                  삭제
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <div>{address.address}</div>
                        <div>{address.detailAddress}</div>
                        <div className="text-gray-500">{address.zipCode}</div>
                      </div>
                    </CardContent>
                    {!address.isDefault && (
                      <CardFooter className="pt-3 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                          onClick={() => handleSetDefaultAddress(address.id)}
                        >
                          기본 배송지로 설정
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 식이 선호도 탭 */}
          <TabsContent value="preferences" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>식이 제한 및 알레르기</CardTitle>
                    <CardDescription>안전한 식품 추천을 위한 정보</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection(editingSection === "dietary" ? null : "dietary")}
                  >
                    {editingSection === "dietary" ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingSection === "dietary" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>식이 제한</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {["글루텐프리", "비건", "케토", "저탄수화물", "유기농", "유제품 제외"].map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <input type="checkbox" id={item} />
                              <Label htmlFor={item} className="text-sm">
                                {item}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>알레르기 식품</Label>
                        <Textarea placeholder="예: 땅콩, 갑각류, 유제품" defaultValue={userInfo.allergies} />
                      </div>
                      <div className="flex gap-2">
                         <Button size="sm" onClick={() => handleSave({})}>
                           <Save className="h-4 w-4 mr-1" />
                           저장
                         </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditingSection(null)}>
                          취소
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">식이 제한</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userInfo.dietaryRestrictions.length > 0 ? (
                            userInfo.dietaryRestrictions.map((item, index) => (
                              <Badge key={index} variant="secondary">
                                {item}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">설정된 제한 사항이 없습니다</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">알레르기</span>
                        <div className="mt-1">
                          {userInfo.allergies ? (
                            <span className="text-sm">{userInfo.allergies}</span>
                          ) : (
                            <span className="text-sm text-gray-400">알레르기 정보가 없습니다</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>선호 식품</CardTitle>
                    <CardDescription>좋아하는 식품과 기피 식품</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection(editingSection === "foods" ? null : "foods")}
                  >
                    {editingSection === "foods" ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingSection === "foods" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>선호하는 식품</Label>
                        <Textarea placeholder="예: 닭가슴살, 연어, 퀴노아" defaultValue={userInfo.preferredFoods} />
                      </div>
                      <div className="space-y-2">
                        <Label>기피하는 식품</Label>
                        <Textarea placeholder="예: 브로콜리, 양파, 버섯" defaultValue={userInfo.dislikedFoods} />
                      </div>
                      <div className="flex gap-2">
                         <Button size="sm" onClick={() => handleSave({})}>
                           <Save className="h-4 w-4 mr-1" />
                           저장
                         </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditingSection(null)}>
                          취소
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">선호 식품</span>
                        <div className="mt-1">
                          <span className="text-sm">{userInfo.preferredFoods || "설정된 선호 식품이 없습니다"}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">기피 식품</span>
                        <div className="mt-1">
                          <span className="text-sm">{userInfo.dislikedFoods || "설정된 기피 식품이 없습니다"}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 설정 탭 */}
          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              {/* 알림 설정 */}
              <Card>
                <CardHeader>
                  <CardTitle>알림 설정</CardTitle>
                  <CardDescription>받고 싶은 알림을 선택하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>이메일 알림</Label>
                      <p className="text-sm text-gray-500">주문 상태, 배송 정보를 이메일로 받습니다</p>
                    </div>
                    <Switch checked={userInfo.notifications.email} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>푸시 알림</Label>
                      <p className="text-sm text-gray-500">앱 푸시 알림을 받습니다</p>
                    </div>
                    <Switch checked={userInfo.notifications.push} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS 알림</Label>
                      <p className="text-sm text-gray-500">중요한 정보를 문자로 받습니다</p>
                    </div>
                    <Switch checked={userInfo.notifications.sms} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>마케팅 알림</Label>
                      <p className="text-sm text-gray-500">할인 정보, 신상품 소식을 받습니다</p>
                    </div>
                    <Switch checked={userInfo.notifications.marketing} />
                  </div>
                </CardContent>
              </Card>

              {/* 계정 관리 */}
              <Card>
                <CardHeader>
                  <CardTitle>계정 관리</CardTitle>
                  <CardDescription>계정 관련 설정</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">데이터 내보내기</div>
                      <div className="text-sm text-gray-500">내 정보와 주문 내역을 다운로드합니다</div>
                    </div>
                    <Button variant="outline" size="sm">
                      내보내기
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">계정 비활성화</div>
                      <div className="text-sm text-gray-500">계정을 일시적으로 비활성화합니다</div>
                    </div>
                    <Button variant="outline" size="sm">
                      비활성화
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                    <div>
                      <div className="font-medium text-red-600">계정 삭제</div>
                      <div className="text-sm text-gray-500">모든 데이터가 영구적으로 삭제됩니다</div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 bg-transparent">
                          삭제
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>계정을 삭제하시겠습니까?</AlertDialogTitle>
                          <AlertDialogDescription>
                            이 작업은 되돌릴 수 없습니다. 모든 데이터가 영구적으로 삭제됩니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">삭제</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
