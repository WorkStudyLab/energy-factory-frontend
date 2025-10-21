# CloudFront 통합 마이그레이션 가이드

> **작성일**: 2025-10-21
> **목적**: S3 직접 접근에서 CloudFront를 통한 백엔드/프론트엔드 통합 도메인 사용으로 마이그레이션

## 📋 배경

### 마이그레이션 전
- **프론트엔드**: S3 직접 호스팅
  - URL: `http://energy-factory-frontend-20251001.s3-website.ap-northeast-2.amazonaws.com`
- **백엔드**: EC2 직접 접근
  - URL: `http://13.209.24.80:8080`

### 마이그레이션 후
- **통합 도메인**: CloudFront 사용
  - URL: `https://d1o0ytu060swr1.cloudfront.net`
  - 백엔드와 프론트엔드를 하나의 도메인으로 통합

## 🎯 해결한 문제

### 문제점
AWS 백엔드 도메인과 프론트엔드 도메인을 CloudFront로 통합했지만, **CI/CD로 S3에 배포된 웹에서는 과거 주소를 가리키고 있었음**

- 로컬: `.env` 파일 수정으로 해결 가능
- 배포: GitHub Secrets에서 환경 변수를 관리하므로 별도 수정 필요

## 🔧 해결 과정

### 1. CI/CD 설정 확인

**파일**: `.github/workflows/deploy.yml`

```yaml
- name: Build project
  run: npm run build
  env:
    VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
```

빌드 시 GitHub Secrets에서 환경 변수를 주입하는 것을 확인

### 2. GitHub Secrets 업데이트

**GitHub Repository → Settings → Secrets and variables → Actions**

#### 업데이트한 Secret

1. **VITE_API_BASE_URL**
   - **기존 값**: `http://13.209.24.80:8080`
   - **새로운 값**: `https://d1o0ytu060swr1.cloudfront.net`

#### 추가한 Secret

2. **CLOUDFRONT_DISTRIBUTION_ID**
   - **값**: `E21IZFYCYIBGRW`
   - **목적**: 배포 후 CloudFront 캐시 자동 무효화

### 3. CloudFront 캐시 무효화 설정

#### 기존 deploy.yml 코드 (이미 구현되어 있었음)

```yaml
- name: Invalidate CloudFront (Optional)
  run: |
    if [ ! -z "${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}" ]; then
      aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
    fi
```

**특징**:
- `CLOUDFRONT_DISTRIBUTION_ID` Secret이 있으면 자동 실행
- 없으면 조용히 스킵 (선택적 기능)

#### 문제 발생

```
An error occurred (AccessDenied) when calling the CreateInvalidation operation:
User: arn:aws:iam::619490421445:user/github-actions-s3-deploy is not authorized
to perform: cloudfront:CreateInvalidation
```

**원인**: IAM 사용자 `github-actions-s3-deploy`가 S3 권한만 있고 CloudFront 권한이 없음

### 4. IAM 정책 업데이트

**AWS Console → IAM → Policies → `s3-Deploy-Policy`**

#### 기존 정책
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
        }
    ]
}
```

#### 업데이트된 정책
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

**추가된 권한**:
- `cloudfront:CreateInvalidation`: 캐시 무효화 생성
- `cloudfront:GetInvalidation`: 무효화 상태 조회
- 특정 Distribution에만 권한 부여 (최소 권한 원칙)

## ✅ 최종 결과

### 배포 프로세스
1. 코드 변경 후 `main` 브랜치에 push
2. GitHub Actions 자동 실행
   - 빌드 (새 CloudFront 도메인 주입)
   - S3 업로드
   - **CloudFront 캐시 무효화** (자동)
3. 2-5분 내 변경사항 반영

### 성능 개선
- CloudFront CDN으로 전 세계 빠른 로딩
- 자동 캐시 무효화로 배포 즉시 반영
- HTTPS 보안 연결

## 📊 마이그레이션 체크리스트

- [x] GitHub Secrets `VITE_API_BASE_URL` 업데이트
- [x] GitHub Secrets `CLOUDFRONT_DISTRIBUTION_ID` 추가
- [x] IAM 정책에 CloudFront 권한 추가
- [x] 상품 상세 페이지 할인율 0 예외처리
- [x] 배포 테스트 및 확인
- [x] 문서화 완료

## 🔮 향후 개선사항

### 완료된 항목 (과거 TODO에서 이동)
- ✅ CloudFront CDN 설정
- ✅ HTTPS 설정

### 남은 개선사항
- [ ] 커스텀 도메인 연결 (예: `energyfactory.com`)
- [ ] SSL 인증서 갱신 자동화
- [ ] CloudFront 로그 분석 및 모니터링
- [ ] 캐시 전략 최적화 (TTL 설정)
- [ ] Staging 환경 CloudFront 분리

## 📝 참고 문서

- [CI/CD 배포 가이드](./CI_CD_DEPLOYMENT_GUIDE.md)
- [프로젝트 아키텍처](../ARCHITECTURE.md)
- AWS CloudFront 공식 문서: https://docs.aws.amazon.com/cloudfront/
- GitHub Actions Secrets: https://docs.github.com/en/actions/security-guides/encrypted-secrets

---

**작성자**: Claude Code
**검토일**: 2025-10-21
**버전**: 1.0.0
