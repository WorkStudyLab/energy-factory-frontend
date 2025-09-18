// import { useState } from "react"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

export default function NutritionPage() {
  // const [activeTab, setActiveTab] = useState("calculator")

  // Mock data for charts - 차트 활성화 시 사용
  // const macroData = [
  //   { name: "단백질", value: 30, color: "#10b981" },
  //   { name: "탄수화물", value: 40, color: "#3b82f6" },
  //   { name: "지방", value: 30, color: "#f59e0b" },
  // ]

  // const weeklyData = [
  //   { name: "월", 단백질: 120, 탄수화물: 150, 지방: 65 },
  //   { name: "화", 단백질: 110, 탄수화물: 130, 지방: 70 },
  //   { name: "수", 단백질: 130, 탄수화물: 140, 지방: 60 },
  //   { name: "목", 단백질: 100, 탄수화물: 120, 지방: 55 },
  //   { name: "금", 단백질: 140, 탄수화물: 160, 지방: 75 },
  //   { name: "토", 단백질: 90, 탄수화물: 110, 지방: 50 },
  //   { name: "일", 단백질: 80, 탄수화물: 100, 지방: 45 },
  // ]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">영양소 계산기</h1>
          <p className="text-gray-500">
            목표에 맞는 영양소 섭취량을 계산하고 관리하세요
          </p>
        </div>

        <Tabs defaultValue="calculator">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="calculator">영양소 계산</TabsTrigger>
            <TabsTrigger value="dashboard">영양 대시보드</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>개인 정보</CardTitle>
                  <CardDescription>
                    정확한 계산을 위해 신체 정보를 입력해주세요
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">나이</Label>
                      <Input id="age" type="number" placeholder="25" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">성별</Label>
                      <Select defaultValue="male">
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="성별 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">남성</SelectItem>
                          <SelectItem value="female">여성</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">키 (cm)</Label>
                      <Input id="height" type="number" placeholder="175" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">몸무게 (kg)</Label>
                      <Input id="weight" type="number" placeholder="70" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity">활동량</Label>
                    <Select defaultValue="moderate">
                      <SelectTrigger id="activity">
                        <SelectValue placeholder="활동량 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">
                          거의 운동 안함
                        </SelectItem>
                        <SelectItem value="light">
                          가벼운 활동 (주 1-3회)
                        </SelectItem>
                        <SelectItem value="moderate">
                          보통 활동 (주 3-5회)
                        </SelectItem>
                        <SelectItem value="active">
                          활발한 활동 (주 6-7회)
                        </SelectItem>
                        <SelectItem value="very-active">
                          매우 활발한 활동 (하루 2회)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>목표 설정</CardTitle>
                  <CardDescription>
                    운동 목표와 식이 제한 사항을 선택해주세요
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">운동 목표</Label>
                    <Select defaultValue="maintain">
                      <SelectTrigger id="goal">
                        <SelectValue placeholder="목표 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lose">체중 감량</SelectItem>
                        <SelectItem value="maintain">체중 유지</SelectItem>
                        <SelectItem value="gain">근육 증가</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diet">식이 유형</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger id="diet">
                        <SelectValue placeholder="식이 유형 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="balanced">균형 잡힌 식단</SelectItem>
                        <SelectItem value="high-protein">
                          고단백 식단
                        </SelectItem>
                        <SelectItem value="low-carb">
                          저탄수화물 식단
                        </SelectItem>
                        <SelectItem value="keto">케토 식단</SelectItem>
                        <SelectItem value="mediterranean">
                          지중해식 식단
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restrictions">식이 제한</Label>
                    <Select>
                      <SelectTrigger id="restrictions">
                        <SelectValue placeholder="식이 제한 선택 (선택사항)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">없음</SelectItem>
                        <SelectItem value="vegetarian">채식주의</SelectItem>
                        <SelectItem value="vegan">비건</SelectItem>
                        <SelectItem value="gluten-free">글루텐프리</SelectItem>
                        <SelectItem value="lactose-free">유당 제한</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    계산하기
                  </Button>
                </CardFooter>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>계산 결과</CardTitle>
                  <CardDescription>
                    목표 달성을 위한 일일 권장 영양소 섭취량
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">일일 칼로리</h3>
                        <p className="text-3xl font-bold text-green-600">
                          2,450 kcal
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>단백질</span>
                          <span className="font-medium">184g (30%)</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-600 w-[30%]"></div>
                        </div>
                        <div className="flex justify-between">
                          <span>탄수화물</span>
                          <span className="font-medium">245g (40%)</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 w-[40%]"></div>
                        </div>
                        <div className="flex justify-between">
                          <span>지방</span>
                          <span className="font-medium">82g (30%)</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-[30%]"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      {/* 차트 컴포넌트 - recharts 라이브러리 설치 후 활성화 */}
                      <div className="h-[200px] w-[200px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500 text-center">
                          차트 영역
                          <br />
                          <small>recharts 설치 필요</small>
                        </p>
                      </div>
                      {/* 
                      <ChartContainer
                        config={{
                          단백질: {
                            label: "단백질",
                            color: "hsl(var(--chart-1))",
                          },
                          탄수화물: {
                            label: "탄수화물",
                            color: "hsl(var(--chart-2))",
                          },
                          지방: {
                            label: "지방",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                        className="h-[200px] w-[200px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={macroData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {macroData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                      */}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">결과 저장</Button>
                  <Button variant="outline">식단 추천 받기</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>주간 영양소 섭취 현황</CardTitle>
                  <CardDescription>
                    지난 7일간의 영양소 섭취 추이
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* 주간 영양소 차트 - recharts 라이브러리 설치 후 활성화 */}
                  <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500 text-center">
                      주간 영양소 차트
                      <br />
                      <small>recharts 설치 필요</small>
                    </p>
                  </div>
                  {/* 
                  <ChartContainer
                    config={{
                      단백질: {
                        label: "단백질",
                        color: "hsl(var(--chart-1))",
                      },
                      탄수화물: {
                        label: "탄수화물",
                        color: "hsl(var(--chart-2))",
                      },
                      지방: {
                        label: "지방",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="단백질" fill="#10b981" />
                        <Bar dataKey="탄수화물" fill="#3b82f6" />
                        <Bar dataKey="지방" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>목표 달성률</CardTitle>
                  <CardDescription>
                    오늘의 영양소 목표 달성 현황
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>칼로리</span>
                      <span className="font-medium">
                        1,850 / 2,450 kcal (76%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 w-[76%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>단백질</span>
                      <span className="font-medium">142 / 184g (77%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 w-[77%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>탄수화물</span>
                      <span className="font-medium">180 / 245g (73%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[73%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>지방</span>
                      <span className="font-medium">65 / 82g (79%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[79%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>AI 영양 코치 피드백</CardTitle>
                  <CardDescription>
                    영양 데이터를 기반으로 한 맞춤형 조언
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">
                      오늘의 영양 분석
                    </h3>
                    <p className="text-green-700">
                      단백질 섭취가 목표에 근접하고 있습니다. 저녁 식사에 단백질
                      소스를 추가하면 목표를 달성할 수 있습니다. 탄수화물은 복합
                      탄수화물 위주로 섭취하는 것이 좋습니다.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2">
                      주간 추세 분석
                    </h3>
                    <p className="text-blue-700">
                      지난 주에 비해 단백질 섭취량이 10% 증가했습니다. 이는 근육
                      증가 목표에 긍정적인 영향을 줄 것입니다. 주말에는 단백질
                      섭취가 감소하는 경향이 있으니 주의하세요.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="font-medium text-amber-800 mb-2">
                      추천 식품
                    </h3>
                    <p className="text-amber-700">
                      목표 달성을 위해 다음 식품을 추천합니다: 그릭 요거트,
                      닭가슴살, 퀴노아, 아보카도. 이러한 식품은 균형 잡힌
                      영양소를 제공하며 목표 달성에 도움이 됩니다.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    AI 코치와 상담하기
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
