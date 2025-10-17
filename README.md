# Energy Factory Frontend

## 프로젝트 개요
Energy Factory는 건강 관리와 영양 관련 제품을 판매하는 이커머스 플랫폼입니다. 사용자들에게 영양 정보, 다이어트 코칭, 제품 구매 등의 기능을 제공합니다.

## 배포 주소
- **Production**: http://energy-factory-frontend-20251001.s3-website.ap-northeast-2.amazonaws.com/products

## 기술 스택
- **프레임워크**: React 19 + TypeScript
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS + shadcn/ui
- **상태 관리**: Zustand
- **데이터 페칭**: TanStack Query (React Query)
- **라우팅**: React Router v7
- **HTTP 클라이언트**: Axios
- **차트**: Recharts

## 주요 기능
- 사용자 인증 (로그인, 회원가입, 비밀번호 찾기)
- 제품 목록 및 상세 페이지
- 장바구니 관리
- 주문 내역 조회
- 마이페이지
- 영양 정보 제공
- 다이어트 코칭

## 프로젝트 구조
```
src/
├── components/     # 재사용 가능한 UI 컴포넌트
│   ├── layout/    # 레이아웃 컴포넌트 (Header, Footer 등)
│   └── ui/        # shadcn/ui 기반 공통 컴포넌트
├── contexts/      # React Context API
├── features/      # 기능별 모듈
│   ├── auth/      # 인증 관련 기능
│   └── products/  # 제품 관련 기능
├── pages/         # 라우트 페이지 컴포넌트
│   ├── auth/      # 인증 페이지
│   ├── products/  # 제품 페이지
│   ├── cart/      # 장바구니
│   └── mypage/    # 마이페이지
└── utils/         # 유틸리티 함수
```

## 설치 및 실행

### 필요 조건
- Node.js 18.x 이상
- npm 또는 yarn

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

### 빌드 미리보기
```bash
npm run preview
```

### 린트 실행
```bash
npm run lint
```

## 브랜치 전략
- `main`: 프로덕션 배포 브랜치
- `feature/*`: 기능 개발 브랜치
- `product`: 제품 관련 기능 개발 브랜치

## 라이센스
Private Project