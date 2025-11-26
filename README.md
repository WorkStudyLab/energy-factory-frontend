# Energy Factory Frontend

건강관리 제품을 판매하는 쇼핑몰 서비스의 프론트엔드 애플리케이션입니다.

| 서비스 | URL |
|--------|-----|
| 웹사이트 | https://energy-factory.kr |
| Figma | [UI/UX 디자인](https://www.figma.com/design/NBmTvw0qtFx453vJ0D3oPJ/UI-UX-GUI-0.8v?node-id=1-6&p=f&t=cnPikSsXcVODH3OM-0) |
| V0 | [UI 프로토타입](https://v0.dev/chat/fit-grocery-phase-1-ZDU4Lser3y7) |

## 서비스 화면

| 홈/상품 목록 | 상품 상세 | 영양정보 |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/45e56fe4-d4c1-41ee-9e36-55a5ec0b84ab" width="280" /> | <img src="https://github.com/user-attachments/assets/569c2771-22c2-4a7b-9c86-36cec60ca955" width="280" /> | <img src="https://github.com/user-attachments/assets/21a0fe45-f06b-4877-913d-6694af0ee3d3" width="280" /> |

| 장바구니 | 주문내역 | 마이페이지 |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/43a091e7-a661-4e20-9199-04c2c821c9e7" width="280" /> | <img src="https://github.com/user-attachments/assets/1f17946f-1b1e-43c3-b9c7-b4ca336d4f45" width="280" /> | <img src="https://github.com/user-attachments/assets/e449b12f-758d-4db1-9d66-e7999e342c96" width="280" /> |



## 기술 스택

| 분류 | 기술 |
|------|------|
| Core | React 19.1.1, TypeScript 5.8.3, Vite 7.1.2 |
| State | Zustand 5.0.8, TanStack Query 5.89.0 |
| UI | Tailwind CSS 3.4.17, shadcn/ui, Radix UI |
| Routing | React Router DOM 7.8.2 |
| HTTP | Axios 1.12.2 |
| Payment | Toss Payments SDK 2.4.0 |
| Infra | AWS S3, CloudFront, GitHub Actions |

### 상태 관리 라이브러리 선택 이유

- **Zustand**: RTK에 비해 보일러플레이트가 적고, 액션이나 리듀서 없이 훅 기반으로 전역 상태를 관리할 수 있음. 인증 정보나 UI 상태처럼 클라이언트 전용 상태를 다루기에 적합.
- **TanStack Query**: API 응답을 자동으로 캐싱하여 서버 상태를 위한 별도 Store가 불필요. 캐시 무효화, 자동 리페칭, 백그라운드 업데이트로 API 호출 빈도를 줄이고 사용자 경험 개선.

> 클라이언트 상태는 Zustand로, 서버 상태는 TanStack Query로 역할을 분리하여 효율적인 상태 관리 아키텍처를 구성.

## UI 개발 워크플로우

```
V0 (AI 프로토타입) → Figma (디자인 시스템) → Figma Make (코드 생성) → 프로젝트 적용
```

1. **V0**: 프롬프트 기반으로 초기 UI 프로토타입 생성
2. **Figma**: 디자인 시스템 구축, 컴포넌트 관리, 버전 관리
3. **Figma Make**: 디자인을 React + Tailwind + shadcn/ui 코드로 변환
4. **프로젝트 적용**: 생성된 코드를 프로젝트 구조에 맞게 통합

## 핵심 기술 구현

### 1. 이중 상태 관리
- **문제**: 클라이언트 상태와 서버 상태의 성격이 다름 (동기화 주기, 캐싱 전략)
- **해결**: Zustand (인증, UI 상태) + React Query (API 데이터 캐싱, 자동 동기화) 분리 운영

### 2. JWT 인증 및 자동 갱신
- **문제**: XSS 공격 방지, 토큰 만료 시 사용자 경험 저하
- **해결**: HttpOnly Cookie 저장 + Axios 인터셉터 401 응답 시 자동 토큰 갱신 후 요청 재시도

### 3. Feature-based Architecture
- **문제**: 기능 추가 시 여러 폴더에 분산된 파일 수정 필요
- **해결**: 도메인별 모듈화 (ui, hooks, services를 feature 단위로 그룹핑)

### 4. 상품 무한 스크롤
- **문제**: 대량 상품 목록의 초기 로딩 시간, 페이지네이션 UX
- **해결**: useInfiniteQuery + Intersection Observer 기반 무한 스크롤

### 5. 실시간 주문 알림 (SSE)
- **문제**: 주문 상태 변경을 사용자에게 실시간으로 전달
- **해결**: EventSource API로 SSE 연결 관리, 연결 끊김 시 자동 재연결 처리

## 시스템 아키텍처

<img width="1311" height="650" alt="image" src="https://github.com/user-attachments/assets/b78d4086-2615-4d0e-af45-ed7c538ddf8f" />


## 프로젝트 구조

```
src/
├── pages/         # 라우트 페이지 컴포넌트
├── features/      # 도메인별 기능 모듈 (ui, hooks, services)
├── components/    # 공통 컴포넌트 (layout, ui, providers)
├── stores/        # Zustand 전역 상태
├── hooks/         # 공통 Custom Hooks
├── lib/           # 라이브러리 설정 (Axios, React Query)
├── types/         # TypeScript 타입 정의
├── constants/     # 상수 정의
└── utils/         # 유틸리티 함수
```

## 개발 정보

- **개발 기간**: 2025.09.06 ~ 2025.11.07

- **주요 완료 항목**
    - 사용자 인증 및 권한 관리
    - 상품 및 주문 프로세스
    - 결제 시스템
    - 실시간 알림
    - CI/CD 파이프라인
 
## Contributors

| <img src="https://github.com/yundoun.png" width="80" /> | <img src="https://github.com/seongheonjeong.png" width="80" /> |
|:---:|:---:|
| [윤도운](https://github.com/yundoun) | [양태욱](https://github.com/didxodnr0769-bom) |
  | Frontend, CI/CD | UI/UX, Frontend |
