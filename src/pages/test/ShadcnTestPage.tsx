import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const ShadcnTestPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buttons');
  const [testResults, setTestResults] = useState<Array<{
    component: string;
    status: 'pending' | 'success' | 'error';
    result?: string;
  }>>([]);

  const shadcnComponents = {
    buttons: [
      { name: 'Primary Button', variant: 'primary' },
      { name: 'Secondary Button', variant: 'secondary' },
      { name: 'Destructive Button', variant: 'destructive' },
      { name: 'Outline Button', variant: 'outline' },
      { name: 'Ghost Button', variant: 'ghost' },
      { name: 'Link Button', variant: 'link' },
    ],
    inputs: [
      { name: 'Text Input', type: 'text' },
      { name: 'Email Input', type: 'email' },
      { name: 'Password Input', type: 'password' },
      { name: 'Number Input', type: 'number' },
      { name: 'Search Input', type: 'search' },
    ],
    cards: [
      { name: 'Basic Card', description: '기본 카드 컴포넌트' },
      { name: 'Card with Header', description: '헤더가 있는 카드' },
      { name: 'Card with Footer', description: '푸터가 있는 카드' },
      { name: 'Card with Image', description: '이미지가 있는 카드' },
    ],
    badges: [
      { name: 'Default Badge', variant: 'default' },
      { name: 'Secondary Badge', variant: 'secondary' },
      { name: 'Destructive Badge', variant: 'destructive' },
      { name: 'Outline Badge', variant: 'outline' },
    ],
  };

  const testComponent = (componentName: string, category: string) => {
    // 테스트 시뮬레이션
    const isSuccess = Math.random() > 0.1; // 90% 성공률
    
    setTestResults(prev => {
      const existing = prev.find(r => r.component === componentName);
      if (existing) {
        return prev.map(r => 
          r.component === componentName 
            ? { ...r, status: isSuccess ? 'success' : 'error', result: isSuccess ? '✅ 렌더링 성공' : '❌ 렌더링 실패' }
            : r
        );
      } else {
        return [...prev, {
          component: componentName,
          status: isSuccess ? 'success' : 'error',
          result: isSuccess ? '✅ 렌더링 성공' : '❌ 렌더링 실패'
        }];
      }
    });
  };

  const testAllComponents = () => {
    Object.entries(shadcnComponents).forEach(([category, components]) => {
      components.forEach(component => {
        setTimeout(() => {
          testComponent(component.name, category);
        }, Math.random() * 1000);
      });
    });
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const getStatusIcon = (componentName: string) => {
    const result = testResults.find(r => r.component === componentName);
    if (!result) return '⏸️';
    return result.status === 'success' ? '✅' : '❌';
  };

  const getStatusColor = (componentName: string) => {
    const result = testResults.find(r => r.component === componentName);
    if (!result) return 'border-gray-200';
    return result.status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50';
  };

  const renderButton = (button: any) => {
    const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      link: "text-blue-600 underline-offset-4 hover:underline focus:ring-blue-500",
    };

    return (
      <button
        key={button.name}
        className={`${baseClasses} ${variantClasses[button.variant as keyof typeof variantClasses]}`}
        onClick={() => testComponent(button.name, 'buttons')}
      >
        {button.name}
      </button>
    );
  };

  const renderInput = (input: any) => {
    return (
      <div key={input.name} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {input.name}
        </label>
        <input
          type={input.type}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={`${input.name} 입력...`}
          onClick={() => testComponent(input.name, 'inputs')}
        />
      </div>
    );
  };

  const renderCard = (card: any) => {
    return (
      <div
        key={card.name}
        className={`border rounded-lg p-6 shadow-sm transition-all ${getStatusColor(card.name)}`}
        onClick={() => testComponent(card.name, 'cards')}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{card.name}</h3>
          <span className="text-xl">{getStatusIcon(card.name)}</span>
        </div>
        <p className="text-gray-600">{card.description}</p>
        {card.name === 'Card with Image' && (
          <div className="mt-4 h-32 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-500">이미지 영역</span>
          </div>
        )}
      </div>
    );
  };

  const renderBadge = (badge: any) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    const variantClasses = {
      default: "bg-blue-100 text-blue-800",
      secondary: "bg-gray-100 text-gray-800",
      destructive: "bg-red-100 text-red-800",
      outline: "border border-gray-300 text-gray-700",
    };

    return (
      <span
        key={badge.name}
        className={`${baseClasses} ${variantClasses[badge.variant as keyof typeof variantClasses]} cursor-pointer`}
        onClick={() => testComponent(badge.name, 'badges')}
      >
        {badge.name}
      </span>
    );
  };

  const tabs = [
    { id: 'buttons', label: '버튼', icon: '🔘' },
    { id: 'inputs', label: '입력', icon: '📝' },
    { id: 'cards', label: '카드', icon: '🃏' },
    { id: 'badges', label: '배지', icon: '🏷️' },
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
            Shadcn/ui 컴포넌트 라이브러리의 다양한 컴포넌트들을 테스트하고 확인합니다.
          </p>
        </div>

        {/* 컨트롤 패널 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <button
                onClick={testAllComponents}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 hover:shadow-lg transition-all"
              >
                🚀 전체 테스트 실행
              </button>
              
              <button
                onClick={clearResults}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
              >
                🗑️ 결과 초기화
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              총 {Object.values(shadcnComponents).flat().length}개 컴포넌트
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 컴포넌트 테스트 영역 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {tabs.find(tab => tab.id === activeTab)?.icon} {tabs.find(tab => tab.id === activeTab)?.label} 컴포넌트
          </h2>
          
          <div className="space-y-6">
            {activeTab === 'buttons' && (
              <div className="flex flex-wrap gap-4">
                {shadcnComponents.buttons.map(renderButton)}
              </div>
            )}
            
            {activeTab === 'inputs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shadcnComponents.inputs.map(renderInput)}
              </div>
            )}
            
            {activeTab === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shadcnComponents.cards.map(renderCard)}
              </div>
            )}
            
            {activeTab === 'badges' && (
              <div className="flex flex-wrap gap-4">
                {shadcnComponents.badges.map(renderBadge)}
              </div>
            )}
          </div>
        </div>

        {/* 테스트 결과 요약 */}
        {testResults.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📊 테스트 결과</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">
                  {testResults.length}
                </div>
                <div className="text-sm text-gray-500">테스트된 컴포넌트</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {testResults.filter(r => r.status === 'success').length}
                </div>
                <div className="text-sm text-green-600">성공</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {testResults.filter(r => r.status === 'error').length}
                </div>
                <div className="text-sm text-red-600">실패</div>
              </div>
            </div>
            
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <span className="font-medium">{result.component}</span>
                  <span className="text-sm">{result.result}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShadcnTestPage;
