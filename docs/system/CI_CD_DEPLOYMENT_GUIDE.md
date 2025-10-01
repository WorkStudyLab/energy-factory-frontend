# Energy Factory Frontend - CI/CD 배포 가이드

## 📋 프로젝트 개요

- **프로젝트명**: Energy Factory Frontend
- **기술 스택**: React (v19) + Vite + TypeScript
- **배포 환경**: AWS S3 정적 웹 호스팅
- **CI/CD**: GitHub Actions
- **백엔드**: Spring Boot (EC2: http://13.209.24.80:8080)

## 🌐 배포된 웹사이트

**프로덕션 URL**: http://energy-factory-frontend-20251001.s3-website.ap-northeast-2.amazonaws.com

## 🏗️ 아키텍처

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │    │  GitHub Actions │    │   AWS S3 Bucket │
│                 │───▶│                 │───▶│                 │
│ main branch push│    │   CI/CD Pipeline│    │ Static Web Host │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐                            ┌─────────────────┐
│   Spring Boot   │◀───────────────────────────│    Frontend     │
│   (EC2 Server)  │        API Calls           │     (S3)        │
│  :8080 port     │                            │                 │
└─────────────────┘                            └─────────────────┘
```

## 🚀 CI/CD 파이프라인

### 트리거 조건
- `main` 브랜치에 push
- `main` 브랜치로 PR 생성

### 파이프라인 단계
1. **Checkout code** - 소스코드 체크아웃
2. **Setup Node.js** - Node.js 18 환경 설정
3. **Install dependencies** - npm ci로 의존성 설치
4. **Build project** - Vite로 프로덕션 빌드
5. **Configure AWS credentials** - AWS 인증 설정
6. **Deploy to S3** - S3 버킷에 파일 동기화

## 🔧 설정 완료 사항

### 1. AWS S3 설정
- **버킷명**: `energy-factory-frontend-20251001`
- **정적 웹 호스팅**: 활성화
- **인덱스 문서**: `index.html`
- **오류 문서**: `index.html` (SPA 라우팅용)
- **퍼블릭 액세스**: 허용
- **버킷 정책**: 퍼블릭 읽기 권한

### 2. AWS IAM 설정
- **IAM 사용자**: `github-actions-s3-deploy`
- **권한**: S3 버킷 특정 권한만 (최소 권한 원칙)
- **정책**: S3-Deploy-Policy

### 3. GitHub Secrets
```
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=energy-factory-frontend-20251001
VITE_API_BASE_URL=http://13.209.24.80:8080
```

### 4. CORS 설정
- **백엔드 (Spring Boot)**: S3 도메인 허용 설정 완료
- **허용 도메인**: S3 웹사이트 엔드포인트

## 📁 프로젝트 구조

```
energy-factory-frontend/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 워크플로우
├── src/
│   ├── components/             # UI 컴포넌트
│   ├── pages/                  # 페이지 컴포넌트
│   ├── lib/
│   │   └── axios/
│   │       └── axios.ts        # API 클라이언트 설정
│   └── ...
├── dist/                       # 빌드 결과물 (배포용)
├── .env                        # 환경변수
├── package.json
├── vite.config.ts             # Vite 설정
└── README.md
```

## 🔄 배포 프로세스

### 자동 배포 (권장)
1. 코드 변경 후 `main` 브랜치에 push
2. GitHub Actions가 자동으로 빌드 및 배포 실행
3. 약 2-3분 후 웹사이트에 변경사항 반영

### 수동 배포 (비상시)
```bash
# 1. 빌드
npm run build

# 2. AWS CLI로 업로드 (AWS CLI 설치 필요)
aws s3 sync ./dist s3://energy-factory-frontend-20251001 --delete

# 3. 또는 AWS Console에서 직접 업로드
```

## 🛠️ 개발 워크플로우

### 1. 로컬 개발
```bash
# 개발 서버 실행
npm run dev

# 빌드 테스트
npm run build
npm run preview
```

### 2. 배포 전 체크리스트
- [ ] 로컬에서 빌드 성공 확인
- [ ] API 연동 테스트
- [ ] TypeScript 컴파일 오류 없음
- [ ] ESLint 검사 통과

### 3. 브랜치 전략
- `main`: 프로덕션 브랜치 (자동 배포)
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치

## 🔧 주요 설정 파일

### GitHub Actions 워크플로우
```yaml
# .github/workflows/deploy.yml
name: Deploy to S3
on:
  push:
    branches: [ main ]
# ... (상세 내용은 파일 참조)
```

### Vite 설정
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://13.209.24.80:8080',
        changeOrigin: true,
      },
    },
  },
})
```

### 환경변수
```bash
# .env
VITE_API_BASE_URL=http://13.209.24.80:8080
```

## 📊 모니터링

### GitHub Actions
- 리포지토리 → Actions 탭에서 배포 상태 확인
- 실패 시 로그 확인 및 디버깅

### 웹사이트 상태
- 프로덕션 URL 접속 테스트
- 브라우저 개발자 도구로 API 호출 확인
- CORS 오류 여부 확인

## 🚨 트러블슈팅

### 배포 실패 시
1. **GitHub Actions 로그 확인**
   - 어느 단계에서 실패했는지 확인
   
2. **일반적인 오류들**
   - AWS 자격 증명 오류: Secrets 재확인
   - S3 권한 오류: IAM 정책 확인
   - 빌드 오류: 로컬에서 빌드 테스트

3. **CORS 오류 시**
   - 백엔드 Spring Boot CORS 설정 확인
   - 허용 도메인에 S3 URL 포함 여부 확인

### 웹사이트 접속 불가 시
1. S3 버킷 정책 확인
2. 정적 웹 호스팅 활성화 상태 확인
3. 인덱스 문서 설정 확인

## 🔮 향후 개선 사항

### 성능 최적화
- [ ] CloudFront CDN 설정
- [ ] 번들 사이즈 최적화 (코드 스플리팅)
- [ ] 이미지 최적화

### 보안 강화
- [ ] HTTPS 설정 (CloudFront + SSL 인증서)
- [ ] CSP (Content Security Policy) 헤더
- [ ] 환경변수 보안 강화

### 개발 경험 개선
- [ ] 스테이징 환경 구축
- [ ] 자동화된 테스트 추가
- [ ] PR 미리보기 배포

## 📞 문의 및 지원

- **GitHub Repository**: [레포지토리 URL]
- **프로덕션 사이트**: http://energy-factory-frontend-20251001.s3-website.ap-northeast-2.amazonaws.com
- **백엔드 API**: http://13.209.24.80:8080

---

**작성일**: 2025년 10월 1일  
**작성자**: CI/CD 구축 프로젝트팀  
**버전**: 1.0.0