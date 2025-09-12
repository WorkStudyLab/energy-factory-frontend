import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";

const ShadcnTestPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("buttons");
  const [testResults, setTestResults] = useState<
    Array<{
      component: string;
      status: "pending" | "success" | "error";
      result?: string;
    }>
  >([]);
  const [checkboxStates, setCheckboxStates] = useState<{
    [key: string]: boolean;
  }>({
    checked: true, // 기본적으로 체크된 상태
  });

  const shadcnComponents = {
    buttons: [
      { name: "Default Button", variant: "default" },
      { name: "Secondary Button", variant: "secondary" },
      { name: "Destructive Button", variant: "destructive" },
      { name: "Outline Button", variant: "outline" },
      { name: "Ghost Button", variant: "ghost" },
      { name: "Link Button", variant: "link" },
    ],
    checkboxes: [
      { name: "Basic Checkbox", id: "basic" },
      { name: "Disabled Checkbox", id: "disabled", disabled: true },
      { name: "Checked Checkbox", id: "checked", defaultChecked: true },
      { name: "Indeterminate Checkbox", id: "indeterminate" },
    ],
  };

  const testComponent = (componentName: string, _category: string) => {
    // 테스트 시뮬레이션
    const isSuccess = Math.random() > 0.1; // 90% 성공률

    setTestResults((prev) => {
      const existing = prev.find((r) => r.component === componentName);
      if (existing) {
        return prev.map((r) =>
          r.component === componentName
            ? {
                ...r,
                status: isSuccess ? "success" : "error",
                result: isSuccess ? "✅ 렌더링 성공" : "❌ 렌더링 실패",
              }
            : r,
        );
      } else {
        return [
          ...prev,
          {
            component: componentName,
            status: isSuccess ? "success" : "error",
            result: isSuccess ? "✅ 렌더링 성공" : "❌ 렌더링 실패",
          },
        ];
      }
    });
  };

  const getStatusIcon = (componentName: string) => {
    const result = testResults.find((r) => r.component === componentName);
    if (!result) return "⏸️";
    return result.status === "success" ? "✅" : "❌";
  };

  const renderButton = (button: any) => {
    return (
      <Button
        key={button.name}
        variant={button.variant as any}
        onClick={() => testComponent(button.name, "buttons")}
      >
        {button.name}
      </Button>
    );
  };

  const renderCheckbox = (checkbox: any) => {
    const handleCheckboxChange = (checked: boolean) => {
      setCheckboxStates((prev) => ({
        ...prev,
        [checkbox.id]: checked,
      }));
      testComponent(checkbox.name, "checkboxes");
    };

    return (
      <div
        key={checkbox.name}
        className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50"
      >
        <Checkbox
          id={checkbox.id}
          checked={
            checkboxStates[checkbox.id] || checkbox.defaultChecked || false
          }
          onCheckedChange={handleCheckboxChange}
          disabled={checkbox.disabled}
          onClick={() => testComponent(checkbox.name, "checkboxes")}
        />
        <label
          htmlFor={checkbox.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          {checkbox.name}
        </label>
        <span className="text-xl">{getStatusIcon(checkbox.name)}</span>
      </div>
    );
  };

  const tabs = [
    { id: "buttons", label: "버튼", icon: "🔘" },
    { id: "checkboxes", label: "체크박스", icon: "☑️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <Link
            to={ROUTES.TEST}
            className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4 transition-colors"
          >
            ← 테스트 센터로 돌아가기
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧩 Shadcn 테스트
          </h1>
          <p className="text-gray-600 text-lg">
            Shadcn/ui 컴포넌트 라이브러리의 다양한 컴포넌트들을 테스트하고
            확인합니다.
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-orange-100 text-orange-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 컴포넌트 테스트 영역 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {tabs.find((tab) => tab.id === activeTab)?.icon}{" "}
            {tabs.find((tab) => tab.id === activeTab)?.label} 테스트
          </h2>

          <div className="grid gap-4">
            {activeTab === "buttons" &&
              shadcnComponents.buttons.map(renderButton)}
            {activeTab === "checkboxes" && (
              <div className="space-y-4">
                {shadcnComponents.checkboxes.map(renderCheckbox)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadcnTestPage;
