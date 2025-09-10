import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const UiTestPage: React.FC = () => {
  const [testResults, setTestResults] = useState<Array<{
    test: string;
    status: 'pending' | 'running' | 'success' | 'error';
    result?: string;
  }>>([]);
  const [isRunning, setIsRunning] = useState(false);

  const uiTests = [
    { name: '반응형 레이아웃 테스트', description: '다양한 화면 크기에서의 레이아웃 확인' },
    { name: '색상 테마 테스트', description: '다크/라이트 모드 색상 적용 확인' },
    { name: '애니메이션 테스트', description: 'CSS 애니메이션 및 트랜지션 확인' },
    { name: '폰트 렌더링 테스트', description: '텍스트 폰트 및 가독성 확인' },
    { name: '이미지 최적화 테스트', description: '이미지 로딩 및 최적화 확인' },
  ];

  const runUiTest = async (test: typeof uiTests[0]) => {
    setTestResults(prev => prev.map(t => 
      t.test === test.name ? { ...t, status: 'running' as const } : t
    ));

    // 테스트 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
    
    const isSuccess = Math.random() > 0.1; // 90% 성공률
    setTestResults(prev => prev.map(t => 
      t.test === test.name 
        ? { 
            ...t, 
            status: isSuccess ? 'success' as const : 'error' as const,
            result: isSuccess ? '✅ 통과' : '❌ 실패'
          } 
        : t
    ));
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults(uiTests.map(test => ({ test: test.name, status: 'pending' as const })));
    
    for (const test of uiTests) {
      await runUiTest(test);
    }
    
    setIsRunning(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const getStatusIcon = (testName: string) => {
    const result = testResults.find(r => r.test === testName);
    if (!result) return '⏸️';
    return result.status === 'success' ? '✅' : '❌';
  };

  const getStatusColor = (testName: string) => {
    const result = testResults.find(r => r.test === testName);
    if (!result) return 'border-gray-200';
    return result.status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <Link 
            to={ROUTES.TEST}
            className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            ← 테스트 센터로 돌아가기
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 UI 테스트
          </h1>
          <p className="text-gray-600 text-lg">
            사용자 인터페이스의 디자인, 반응성, 접근성을 테스트합니다.
          </p>
        </div>

        {/* 컨트롤 패널 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <button
                onClick={runAllTests}
                disabled={isRunning}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  isRunning
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg'
                }`}
              >
                {isRunning ? '테스트 실행 중...' : '🚀 전체 테스트 실행'}
              </button>
              
              <button
                onClick={clearResults}
                disabled={isRunning}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                🗑️ 결과 초기화
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              총 {uiTests.length}개 테스트
            </div>
          </div>
        </div>

        {/* UI 테스트 데모 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 반응형 테스트 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📱 반응형 레이아웃</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm">모바일</span>
                </div>
                <div className="h-20 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm">태블릿</span>
                </div>
              </div>
              <div className="h-20 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-sm">데스크톱</span>
              </div>
            </div>
          </div>

          {/* 색상 테마 테스트 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🎨 색상 테마</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-8 bg-blue-500 rounded"></div>
                <div className="h-8 bg-green-500 rounded"></div>
                <div className="h-8 bg-purple-500 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-8 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 테스트 목록 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🧪 UI 테스트 목록</h2>
          <div className="space-y-4">
            {uiTests.map((test, index) => {
              const result = testResults.find(r => r.test === test.name);
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(test.name)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getStatusIcon(test.name)}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{test.name}</h3>
                        <p className="text-sm text-gray-500">{test.description}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => runUiTest(test)}
                      disabled={isRunning}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      테스트
                    </button>
                  </div>
                  
                  {result && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{result.result}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 요약 통계 */}
        {testResults.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📊 테스트 요약</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">
                  {testResults.length}
                </div>
                <div className="text-sm text-gray-500">총 테스트</div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default UiTestPage;
