# Energy Factory - 디자인 시스템 문서

## 개요

Energy Factory는 건강 보조제 및 영양 제품을 위한 현대적이고 사용자 친화적인 디자인 시스템을 적용한 웹 애플리케이션입니다. 일관성 있는 브랜드 경험과 뛰어난 사용성을 제공하는 것을 목표로 합니다.

## 디자인 철학

### 핵심 원칙
- **명확성 (Clarity)**: 사용자가 쉽게 이해할 수 있는 직관적인 인터페이스
- **일관성 (Consistency)**: 모든 페이지와 컴포넌트에서 통일된 디자인 언어
- **접근성 (Accessibility)**: 모든 사용자가 사용할 수 있는 포용적 디자인
- **효율성 (Efficiency)**: 빠르고 효과적인 사용자 경험

### 브랜드 가치
- **건강함**: 자연스럽고 신뢰할 수 있는 느낌
- **전문성**: 과학적이고 신뢰할 수 있는 정보 제공
- **혁신성**: 현대적이고 트렌디한 사용자 경험

## 컬러 시스템

### 기본 컬러 팔레트

#### 라이트 모드
```css
:root {
  --background: 0 0% 100%;          /* 순백색 배경 */
  --foreground: 0 0% 3.9%;          /* 진한 회색 텍스트 */
  --primary: 0 0% 9%;               /* 주요 액션 컬러 */
  --primary-foreground: 0 0% 98%;   /* 주요 액션 텍스트 */
  --secondary: 0 0% 96.1%;          /* 보조 배경 */
  --secondary-foreground: 0 0% 9%;  /* 보조 텍스트 */
  --muted: 0 0% 96.1%;              /* 비활성화 영역 */
  --muted-foreground: 0 0% 45.1%;   /* 비활성화 텍스트 */
  --accent: 0 0% 96.1%;             /* 강조 배경 */
  --accent-foreground: 0 0% 9%;     /* 강조 텍스트 */
  --destructive: 0 84.2% 60.2%;     /* 경고/삭제 컬러 */
  --border: 0 0% 89.8%;             /* 테두리 */
  --input: 0 0% 89.8%;              /* 입력 필드 테두리 */
  --ring: 0 0% 3.9%;                /* 포커스 링 */
}
```

#### 다크 모드
```css
.dark {
  --background: 0 0% 3.9%;          /* 진한 배경 */
  --foreground: 0 0% 98%;           /* 밝은 텍스트 */
  --primary: 0 0% 98%;              /* 주요 액션 컬러 */
  --primary-foreground: 0 0% 9%;    /* 주요 액션 텍스트 */
  --secondary: 0 0% 14.9%;          /* 보조 배경 */
  --secondary-foreground: 0 0% 98%; /* 보조 텍스트 */
  --muted: 0 0% 14.9%;              /* 비활성화 영역 */
  --muted-foreground: 0 0% 63.9%;   /* 비활성화 텍스트 */
  --destructive: 0 62.8% 30.6%;     /* 경고/삭제 컬러 */
  --border: 0 0% 14.9%;             /* 테두리 */
  --input: 0 0% 14.9%;              /* 입력 필드 테두리 */
  --ring: 0 0% 83.1%;               /* 포커스 링 */
}
```

#### 차트 컬러
데이터 시각화를 위한 전용 컬러 팔레트:
```css
/* 라이트 모드 */
--chart-1: 12 76% 61%;   /* 주황색 계열 */
--chart-2: 173 58% 39%;  /* 청록색 계열 */
--chart-3: 197 37% 24%;  /* 진한 파란색 */
--chart-4: 43 74% 66%;   /* 노란색 계열 */
--chart-5: 27 87% 67%;   /* 주황-빨강 계열 */

/* 다크 모드 */
--chart-1: 220 70% 50%;  /* 파란색 계열 */
--chart-2: 160 60% 45%;  /* 녹색 계열 */
--chart-3: 30 80% 55%;   /* 주황색 계열 */
--chart-4: 280 65% 60%;  /* 보라색 계열 */
--chart-5: 340 75% 55%;  /* 분홍색 계열 */
```

### 컬러 사용 가이드
- **Primary**: 주요 CTA 버튼, 링크, 중요한 액션
- **Secondary**: 보조 버튼, 카드 배경, 섹션 구분
- **Muted**: 설명 텍스트, 비활성화 상태, 플레이스홀더
- **Destructive**: 에러 메시지, 삭제 확인, 경고 알림
- **Chart**: 데이터 시각화, 그래프, 차트 요소

## 타이포그래피

### 폰트 시스템
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### 폰트 적용 원칙
- **시스템 폰트 우선**: 각 OS의 최적화된 폰트 사용
- **가독성 최우선**: 명확하고 읽기 쉬운 텍스트
- **성능 고려**: 웹 폰트 로딩 없이 빠른 렌더링

### 텍스트 스타일링
```css
body {
  line-height: 1.5;                    /* 적절한 줄 간격 */
  -webkit-font-smoothing: antialiased; /* 부드러운 폰트 렌더링 */
  -moz-osx-font-smoothing: grayscale;
}
```

## 레이아웃 시스템

### 컨테이너 구조
```css
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}
```

### 페이지 레이아웃
- **Header**: 네비게이션 및 브랜딩
- **Main**: 주요 콘텐츠 영역 (flex-1으로 확장)
- **Footer**: 부가 정보 및 링크

### 반응형 디자인
- **모바일 퍼스트**: 작은 화면부터 설계
- **TailwindCSS 브레이크포인트**: sm, md, lg, xl, 2xl
- **유연한 그리드**: CSS Grid와 Flexbox 조합

## 컴포넌트 디자인

### UI 컴포넌트 계층
```
src/components/
├── ui/              # 기본 원자 단위 컴포넌트
│   ├── button.tsx   # 버튼 컴포넌트
│   ├── input.tsx    # 입력 필드
│   ├── card.tsx     # 카드 레이아웃
│   └── ...
└── layout/          # 레이아웃 컴포넌트
    ├── Header.tsx   # 헤더
    ├── Footer.tsx   # 푸터
    └── Dialog.tsx   # 모달/다이얼로그
```

### 디자인 토큰 활용
모든 컴포넌트는 CSS 변수를 통해 테마를 일관성 있게 적용:
```css
.button-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

### 상태별 디자인
- **Default**: 기본 상태
- **Hover**: 마우스 오버 상태
- **Active**: 클릭/터치 상태
- **Focus**: 포커스 상태 (접근성)
- **Disabled**: 비활성화 상태

## 인터랙션 디자인

### 애니메이션 원칙
- **자연스러움**: 물리법칙을 따르는 움직임
- **목적성**: 사용자의 이해를 돕는 애니메이션
- **성능**: 60fps 유지하는 부드러운 전환

### TailwindCSS 애니메이션
```javascript
plugins: [require("tailwindcss-animate")]
```

### 상호작용 패턴
- **Hover Effects**: 버튼, 링크, 카드에 미묘한 변화
- **Focus States**: 키보드 네비게이션을 위한 명확한 표시
- **Loading States**: 데이터 로딩 중 사용자 피드백
- **Transitions**: 페이지 간 부드러운 전환

## 접근성 (Accessibility)

### 컬러 접근성
- **대비율**: WCAG 2.1 AA 기준 준수 (4.5:1 이상)
- **컬러 외 정보 전달**: 아이콘, 텍스트로 의미 보완
- **다크모드**: 저시력 사용자 고려

### 키보드 네비게이션
- **Tab Order**: 논리적인 탭 순서
- **Focus Indicators**: 명확한 포커스 표시
- **Skip Links**: 주요 콘텐츠로 빠른 이동

### 스크린 리더 지원
- **Semantic HTML**: 의미 있는 HTML 요소 사용
- **ARIA Labels**: 적절한 레이블 제공
- **Headings**: 계층적 제목 구조

## 다크 모드

### 구현 방식
- **클래스 기반**: `dark` 클래스로 테마 전환
- **시스템 설정 감지**: 사용자 OS 설정 반영
- **수동 전환**: 사용자가 직접 테마 선택 가능

### 다크 모드 디자인 고려사항
- **눈의 피로 감소**: 어두운 환경에서 편안한 사용
- **배터리 절약**: OLED 디스플레이에서 전력 효율성
- **대비 조정**: 밝기 차이를 적절히 조절

## 반응형 디자인

### 브레이크포인트
- **Mobile**: ~ 640px (기본)
- **Tablet**: 641px ~ 768px (sm:)
- **Desktop**: 769px ~ 1024px (md:)
- **Large Desktop**: 1025px ~ 1280px (lg:)
- **Extra Large**: 1281px ~ (xl:)

### 모바일 최적화
- **Touch Target**: 최소 44px 터치 영역
- **Thumb Zone**: 엄지 조작 영역 고려
- **네비게이션**: 모바일 친화적 메뉴 구조

## 성능 최적화

### CSS 최적화
- **Critical CSS**: 중요 스타일 우선 로딩
- **Tree Shaking**: 사용하지 않는 CSS 제거
- **Minification**: CSS 파일 크기 최소화

### 이미지 최적화
- **WebP 포맷**: 용량 효율적인 이미지 포맷
- **Lazy Loading**: 필요할 때만 이미지 로딩
- **Responsive Images**: 디바이스별 최적화된 이미지

## 브랜드 가이드라인

### 로고 사용법
- **여백**: 로고 주변 충분한 공간 확보
- **최소 크기**: 가독성 보장하는 최소 크기 설정
- **색상 변형**: 다양한 배경에 적합한 버전 제공

### 아이콘 시스템
- **Lucide React**: 일관된 아이콘 라이브러리 사용
- **크기**: 16px, 20px, 24px 표준 크기
- **스타일**: 라인 아이콘으로 통일

## 개발 가이드

### 디자인 토큰 사용
```typescript
// 컴포넌트에서 디자인 토큰 활용
className="bg-background text-foreground border-border"
```

### 컴포넌트 변형
```typescript
// Class Variance Authority로 컴포넌트 변형 관리
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
    },
  }
)
```

### 스타일 가이드 준수
- **유틸리티 클래스**: TailwindCSS 유틸리티 우선 사용
- **커스텀 CSS**: 필요시에만 제한적 사용
- **일관성**: 기존 디자인 토큰과 패턴 활용
