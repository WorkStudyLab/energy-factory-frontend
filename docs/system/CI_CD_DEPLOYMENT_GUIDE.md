# Energy Factory Frontend - CI/CD 배포 가이드

## 📋 프로젝트 개요

- **프로젝트명**: Energy Factory Frontend
- **기술 스택**: React (v19) + Vite + TypeScript
- **배포 환경**: AWS S3 정적 웹 호스팅 + CloudFront CDN
- **CI/CD**: GitHub Actions
- **백엔드/프론트엔드 통합**: CloudFront (https://d1o0ytu060swr1.cloudfront.net)

## 🌐 배포된 웹사이트

**프로덕션 URL (CloudFront)**: https://d1o0ytu060swr1.cloudfront.net
**원본 S3 URL**: http://energy-factory-frontend-20251001.s3-website.ap-northeast-2.amazonaws.com

## 🏗️ 아키텍처

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │    │  GitHub Actions │    │   AWS S3 Bucket │
│                 │───▶│                 │───▶│                 │
│ main branch push│    │   CI/CD Pipeline│    │ Static Web Host │
└─────────────────┘    └─────────────────┘    └────────┬────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │   CloudFront    │
                       사용자 접근 ────────────▶│    (CDN)        │
                       HTTPS 보안 연결          │  d1o0ytu0...    │
                                               └────────┬────────┘
                                                        │
                                          ┌─────────────┴─────────────┐
                                          ▼                           ▼
                                  ┌──────────────┐          ┌──────────────┐
                                  │  Frontend    │          │  Backend     │
                                  │   (정적파일)   │          │  (API 서버)   │
                                  └──────────────┘          └──────────────┘
```

## 🚀 CI/CD 파이프라인

### 트리거 조건
- `main` 브랜치에 push
- `main` 브랜치로 PR 생성

### 파이프라인 단계
1. **Checkout code** - 소스코드 체크아웃
2. **Setup Node.js** - Node.js 18 환경 설정
3. **Install dependencies** - npm ci로 의존성 설치
4. **Build project** - Vite로 프로덕션 빌드 (환경변수 주입)
5. **Configure AWS credentials** - AWS 인증 설정
6. **Deploy to S3** - S3 버킷에 파일 동기화
7. **Invalidate CloudFront** - CloudFront 캐시 자동 무효화 (2-5분 내 반영)

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
- **권한**: S3 버킷 + CloudFront 무효화 권한 (최소 권한 원칙)
- **정책**: `S3-Deploy-Policy`

**정책 내용**:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::energy-factory-frontend-20251001",
                "arn:aws:s3:::energy-factory-frontend-20251001/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation",
                "cloudfront:GetInvalidation"
            ],
            "Resource": "arn:aws:cloudfront::619490421445:distribution/E21IZFYCYIBGRW"
        }
    ]
}
```

### 3. AWS CloudFront 설정
- **Distribution ID**: `E21IZFYCYIBGRW`
- **도메인**: `d1o0ytu060swr1.cloudfront.net`
- **원본 서버**: S3 + Backend (통합)
- **HTTPS**: 자동 SSL 인증서
- **캐시 무효화**: CI/CD에서 자동 처리

### 4. GitHub Secrets
```
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=energy-factory-frontend-20251001
VITE_API_BASE_URL=https://d1o0ytu060swr1.cloudfront.net
CLOUDFRONT_DISTRIBUTION_ID=E21IZFYCYIBGRW
```

**Secrets 설정 위치**: GitHub Repository → Settings → Secrets and variables → Actions

### 5. CORS 설정
- **백엔드 (Spring Boot)**: CloudFront 도메인 허용 설정 완료
- **허용 도메인**: `https://d1o0ytu060swr1.cloudfront.net`

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
   - 빌드 시 CloudFront 도메인을 환경변수로 주입
   - S3에 파일 업로드
   - CloudFront 캐시 자동 무효화
3. **약 2-5분 후** 웹사이트에 변경사항 반영 (캐시 무효화 시간 포함)

### 수동 배포 (비상시)
```bash
# 1. 빌드
npm run build

# 2. AWS CLI로 업로드 (AWS CLI 설치 필요)
aws s3 sync ./dist s3://energy-factory-frontend-20251001 --delete

# 3. CloudFront 캐시 무효화 (필수)
aws cloudfront create-invalidation \
  --distribution-id E21IZFYCYIBGRW \
  --paths "/*"

# 4. 또는 AWS Console에서 직접 업로드 + 캐시 무효화
```

**중요**: CloudFront를 사용하므로 배포 후 반드시 캐시 무효화를 실행해야 변경사항이 즉시 반영됩니다. 무효화하지 않으면 최대 24시간 동안 구버전이 표시될 수 있습니다.

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
VITE_API_BASE_URL=https://d1o0ytu060swr1.cloudfront.net
```

## 📊 모니터링

### GitHub Actions
- 리포지토리 → Actions 탭에서 배포 상태 확인
- 실패 시 로그 확인 및 디버깅
- CloudFront 캐시 무효화 단계 성공 여부 확인

### CloudFront
- AWS Console → CloudFront → Distribution 상태 확인
- Invalidations 탭에서 캐시 무효화 진행 상태 확인
- Monitoring 탭에서 트래픽 및 오류율 확인

### 웹사이트 상태
- 프로덕션 URL 접속 테스트 (https://d1o0ytu060swr1.cloudfront.net)
- 브라우저 개발자 도구로 API 호출 확인
- CORS 오류 여부 확인
- HTTPS 인증서 유효성 확인

## 🚨 트러블슈팅

### 배포 실패 시
1. **GitHub Actions 로그 확인**
   - 어느 단계에서 실패했는지 확인

2. **일반적인 오류들**
   - AWS 자격 증명 오류: Secrets 재확인
   - S3 권한 오류: IAM 정책 확인
   - 빌드 오류: 로컬에서 빌드 테스트
   - CloudFront 권한 오류: IAM 정책에 `cloudfront:CreateInvalidation` 권한 확인

3. **CORS 오류 시**
   - 백엔드 Spring Boot CORS 설정 확인
   - 허용 도메인에 CloudFront URL (`https://d1o0ytu060swr1.cloudfront.net`) 포함 여부 확인

### 웹사이트 접속 불가 시
1. CloudFront 상태 확인 (AWS Console → CloudFront)
2. S3 버킷 정책 확인
3. 정적 웹 호스팅 활성화 상태 확인
4. 인덱스 문서 설정 확인

### 배포 후 변경사항이 반영되지 않을 때
1. **CloudFront 캐시 문제**
   - GitHub Actions 로그에서 캐시 무효화 단계 성공 여부 확인
   - AWS Console → CloudFront → Invalidations 탭에서 무효화 진행 상태 확인
   - 브라우저 캐시 강제 새로고침 (Cmd+Shift+R 또는 Ctrl+Shift+R)

2. **환경 변수 문제**
   - GitHub Secrets에서 `VITE_API_BASE_URL` 값이 올바른지 확인
   - 빌드 로그에서 환경 변수가 제대로 주입되었는지 확인

3. **IAM 권한 문제**
   - `github-actions-s3-deploy` 사용자에 CloudFront 권한이 있는지 확인
   - 에러 메시지: `User is not authorized to perform: cloudfront:CreateInvalidation`
   - 해결: IAM 정책에 CloudFront 권한 추가 (위의 IAM 설정 참조)

## 🔮 향후 개선 사항

### 성능 최적화
- [x] CloudFront CDN 설정 (완료 - 2025-10-21)
- [ ] 번들 사이즈 최적화 (코드 스플리팅)
- [ ] 이미지 최적화

### 보안 강화
- [x] HTTPS 설정 (CloudFront + SSL 인증서) (완료 - 2025-10-21)
- [x] CloudFront 캐시 자동 무효화 (완료 - 2025-10-21)
- [ ] CSP (Content Security Policy) 헤더
- [ ] 환경변수 보안 강화
- [ ] 커스텀 도메인 연결

### 개발 경험 개선
- [ ] 스테이징 환경 구축
- [ ] 자동화된 테스트 추가
- [ ] PR 미리보기 배포

## 📞 문의 및 지원

- **GitHub Repository**: [레포지토리 URL]
- **프로덕션 사이트**: https://d1o0ytu060swr1.cloudfront.net
- **원본 S3 사이트**: http://energy-factory-frontend-20251001.s3-website.ap-northeast-2.amazonaws.com
- **통합 도메인**: CloudFront를 통한 백엔드/프론트엔드 통합

## 📚 관련 문서

- [CloudFront 마이그레이션 가이드](./CLOUDFRONT_MIGRATION_GUIDE.md) - CloudFront 통합 과정 상세 설명
- [프로젝트 아키텍처](../ARCHITECTURE.md) - 시스템 아키텍처 문서

---

**최초 작성일**: 2025년 10월 1일
**최종 업데이트**: 2025년 10월 21일 (CloudFront 통합)
**작성자**: CI/CD 구축 프로젝트팀
**버전**: 2.0.0