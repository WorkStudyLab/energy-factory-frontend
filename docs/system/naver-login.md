# 네이버 소셜 로그인 구현 가이드

## 개요

네이버 OAuth 2.0을 사용한 소셜 로그인 기능 구현 문서입니다. 백엔드에서 자동으로 회원가입/로그인을 처리하고, 프론트엔드에서 추가 정보만 입력받는 방식으로 구현되었습니다.

---

## 로그인 플로우

```
1. 사용자가 "네이버로 로그인" 버튼 클릭
   ↓
2. GET /api/oauth2/naver 호출
   ↓
3. 네이버 로그인 페이지로 리다이렉트 (302)
   ↓
4. 사용자가 네이버에서 인증
   ↓
5. 백엔드가 자동으로 회원가입/로그인 처리
   - 새로운 사용자: 자동 회원가입
   - 기존 사용자: 정보 업데이트 및 로그인
   - LOCAL 계정이 있는 경우: 네이버 계정과 연동
   ↓
6. JWT Access Token & Refresh Token이 HttpOnly 쿠키로 저장
   ↓
7. /signup 페이지로 리다이렉트
   ↓
8. 프론트엔드에서 GET /api/users/me로 사용자 정보 조회
   ↓
9. 네이버에서 제공한 정보는 비활성화, 부족한 정보(생년월일, 주소)만 입력 가능
   ↓
10. PUT /api/users/additional-info로 추가 정보 업데이트
   ↓
11. 메인 페이지로 이동
```

---

## 구현된 파일 목록

### 1. 타입 정의
- **`src/types/user.ts`**
  - `UserAdditionalInfoRequest`: 추가 정보 입력 요청 타입
  - `UserProfileResponse`: 사용자 프로필 응답 타입
  - `UserMeResponse`: 사용자 정보 응답 타입

### 2. API 서비스
- **`src/features/auth/services/AuthApiService.ts`**
  - `getUserProfile()`: 사용자 프로필 조회
  - `getUserInfo()`: 사용자 정보 조회 (마이페이지용)
  - `updateAdditionalInfo()`: 추가 정보 업데이트

### 3. 페이지 컴포넌트
- **`src/pages/auth/LoginPage.tsx`**
  - 네이버 로그인 버튼 구현
  - `window.location.href`로 백엔드 OAuth API 호출

- **`src/pages/auth/SignupPage.tsx`**
  - 네이버 로그인 후 리다이렉트되는 페이지
  - 사용자 정보 자동 조회 및 폼에 채우기
  - 네이버 제공 필드 추적 (`naverProvidedFields`)
  - Zustand 스토어에 사용자 정보 저장

- **`src/pages/auth/NaverCallbackPage.tsx`** (미사용)
  - 초기 구현 시 만든 콜백 페이지
  - 백엔드가 `/signup`으로 직접 리다이렉트하므로 사용하지 않음

- **`src/pages/auth/NaverAdditionalInfoPage.tsx`** (미사용)
  - 초기 구현 시 만든 추가 정보 입력 페이지
  - SignupPage에서 모든 기능을 처리하므로 사용하지 않음

### 4. UI 컴포넌트
- **`src/features/auth/ui/SignupForm.tsx`**
  - 네이버 로그인 모드 지원 (`isNaverSignup` prop)
  - 네이버 제공 필드는 비활성화 (`naverProvidedFields` Set으로 관리)
  - 일반 회원가입 vs 네이버 추가 정보 입력 분기
  - 비밀번호 필드는 네이버 로그인 시 숨김

- **`src/features/auth/ui/LabelInput.tsx`**
  - `disabled` prop 추가로 비활성화 지원

### 5. 인증 상태 관리
- **`src/hooks/useAuthInit.ts`**
  - 앱 초기화 시 로그인 상태 확인
  - JWT 쿠키가 있으면 자동으로 사용자 정보 가져오기
  - localStorage에서 복원된 경우 스킵
  - `hasInitialized` ref로 중복 실행 방지

- **`src/stores/useAuthStore.ts`**
  - Zustand persist로 사용자 정보 localStorage 저장
  - `setUser()` 메서드로 로그인 상태 업데이트

### 6. Axios 인터셉터
- **`src/lib/axios/axios.ts`**
  - 401 에러 시 토큰 자동 갱신
  - `isRefreshing` 플래그로 무한 루프 방지
  - `_retry` 플래그로 재시도 제한
  - `/users/me`, `/auth/refresh`, `/auth/login`은 재시도 제외

### 7. 라우트 설정
- **`src/constants/routes.ts`**
  - `NAVER_CALLBACK`: `/oauth/naver/callback`
  - `NAVER_ADDITIONAL_INFO`: `/oauth/naver/additional-info`

- **`src/constants/routeAuth.ts`**
  - 콜백/추가정보 페이지 권한 설정

- **`src/App.tsx`**
  - `useAuthInit()` Hook 호출
  - 라우트 등록

---

## 주요 구현 포인트

### 1. 네이버 제공 필드 추적
```typescript
const providedFields = new Set<string>();
if (userInfo.name) providedFields.add("name");
if (userInfo.email) providedFields.add("email");
if (userInfo.phone) {
  providedFields.add("phone1");
  providedFields.add("phone2");
  providedFields.add("phone3");
}
if (userInfo.birthDate) {
  providedFields.add("birthYear");
  providedFields.add("birthMonth");
  providedFields.add("birthDay");
}
if (userInfo.address) providedFields.add("address");
```

### 2. 필드별 비활성화 처리
```typescript
<LabelInput
  disabled={naverProvidedFields.has("name")}
  // ...
/>

<Select disabled={naverProvidedFields.has("birthYear")}>
  // ...
</Select>
```

### 3. 일반 회원가입 vs 네이버 추가 정보 업데이트 분기
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // 네이버 로그인 모드: 추가 정보만 업데이트
  if (isNaverSignup) {
    updateAdditionalInfoMutation.mutate({
      birthDate,
      address: formData.address.trim(),
    });
    return;
  }

  // 일반 회원가입 모드: 전체 회원가입 처리
  signup(signupData);
};
```

### 4. 로그인 상태 복원
```typescript
// App.tsx에서 useAuthInit 호출
useAuthInit();

// useAuthInit.ts
useEffect(() => {
  if (hasInitialized.current) return;
  hasInitialized.current = true;

  if (isAuthenticated) return; // localStorage에서 복원됨

  const initAuth = async () => {
    const userInfo = await AuthApiService.getUserInfo();
    setUser({
      id: 0,
      email: userInfo.email,
      name: userInfo.name,
    });
  };

  initAuth();
}, []);
```

---

## 트러블슈팅

### 1. 이메일 중복 에러
**문제**: 네이버 로그인 후 추가 정보 입력 시 이메일 중복 에러 발생

**원인**: 이미 DB에 저장된 사용자인데 회원가입 API를 다시 호출

**해결**: 네이버 로그인 모드일 때는 `PUT /api/users/additional-info` 호출

### 2. 로그인 상태가 헤더에 반영 안됨
**문제**: 네이버 로그인 완료 후에도 헤더에 로그인 버튼이 표시됨

**원인**: JWT는 쿠키에 있지만 Zustand 스토어가 업데이트되지 않음

**해결**:
- SignupPage에서 사용자 정보 조회 시 `setUser()` 호출
- useAuthInit Hook으로 앱 초기화 시 로그인 상태 복원

### 3. 무한 새로고침
**문제**: 로그아웃 후 무한 새로고침 발생

**원인**: useEffect의 의존성 배열에 user, setUser가 포함되어 무한 루프

**해결**:
- `useRef`로 `hasInitialized` 플래그 추가
- 의존성 배열을 비워서 한 번만 실행 (`[]`)

### 4. axios 무한 API 호출
**문제**: 토큰 갱신 실패 시 무한 루프 발생

**원인**:
- 토큰 갱신 API(`/auth/refresh`)도 401 반환 시 다시 토큰 갱신 시도
- 사용자 정보 조회 API(`/users/me`)도 401 시 토큰 갱신 시도

**해결**:
- `isRefreshing` 전역 플래그 추가
- `_retry` 플래그로 재시도 제한
- 특정 API는 재시도 제외 처리

### 5. 입력 중 필드가 비활성화됨
**문제**: 생년월일/주소 입력 중 값이 생기면 즉시 비활성화

**원인**: `isNaverSignup && formData.field !== ""` 조건으로 체크

**해결**: 네이버에서 실제로 제공한 필드만 추적하여 비활성화
```typescript
disabled={naverProvidedFields.has("address")}
```

---

## 환경 변수

```env
# .env
VITE_API_BASE_URL=http://localhost:8080  # 개발
# VITE_API_BASE_URL=https://energy-factory.kr  # 프로덕션
```

---

## API 명세

### 1. 네이버 로그인 시작
```
GET /api/oauth2/naver
```
- Response: 302 리다이렉트 (네이버 로그인 페이지)
- 로그인 완료 후 백엔드가 자동으로 `/signup`으로 리다이렉트

### 2. 사용자 정보 조회
```
GET /api/users/me
Authorization: Cookie (HttpOnly)
```
- Response:
```json
{
  "name": "김진장",
  "email": "exam@example.com",
  "phone": "010-1234-5678",
  "birthDate": "1990-01-01",
  "authProvider": "naver",
  "memberSince": "2024-06-15",
  "address": "서울특별시 금천구 스타밸리"
}
```

### 3. 추가 정보 업데이트
```
PUT /api/users/additional-info
Authorization: Cookie (HttpOnly)
Content-Type: application/json

{
  "birthDate": "2025-11-05",
  "address": "string"
}
```
- Response:
```json
{
  "status": 1073741824,
  "code": "string",
  "desc": "string",
  "data": {
    "name": "김진장",
    "email": "exam@example.com",
    "phone": "010-1234-5678",
    "birthDate": "1990-01-01",
    "authProvider": "naver",
    "memberSince": "2024-06-15",
    "address": "서울특별시 금천구 스타밸리"
  }
}
```

---

## 주의사항

1. **HttpOnly 쿠키 사용**
   - JWT 토큰은 HttpOnly 쿠키로 관리
   - Zustand에는 사용자 정보만 저장 (토큰 저장 안함)
   - `withCredentials: true` 필수

2. **무한 루프 방지**
   - useEffect는 항상 `hasInitialized` ref로 제어
   - axios 인터셉터는 재시도 플래그로 제어
   - 특정 API는 토큰 갱신 제외 처리

3. **로그인 상태 복원**
   - localStorage: Zustand persist가 자동 복원
   - 쿠키: useAuthInit이 앱 초기화 시 복원

4. **비활성화 필드 시각적 효과**
   - `bg-gray-100 text-gray-600 cursor-not-allowed opacity-70`
   - 사용자가 네이버 제공 정보를 명확히 구분 가능

5. **백엔드 리다이렉트 URL**
   - 백엔드 설정에 따라 `/signup` 또는 다른 URL로 리다이렉트될 수 있음
   - 프론트엔드는 해당 페이지에서 사용자 정보를 조회하여 처리

---

## 테스트 시나리오

### 1. 정상 플로우
1. 로그인 페이지에서 "네이버로 로그인" 클릭
2. 네이버 로그인 완료
3. `/signup` 페이지로 리다이렉트
4. 네이버 정보가 자동으로 채워짐 (비활성화)
5. 추가 정보 (생년월일, 주소) 입력
6. "저장하고 시작하기" 클릭
7. 메인 페이지로 이동
8. 헤더에 사용자 이름 표시

### 2. 페이지 새로고침
1. 로그인 상태에서 새로고침
2. useAuthInit이 쿠키에서 사용자 정보 복원
3. 로그인 상태 유지

### 3. 로그아웃
1. 헤더에서 로그아웃 클릭
2. Zustand 스토어 초기화
3. 백엔드에 로그아웃 요청 (쿠키 삭제)
4. 로그인 페이지로 이동
5. 무한 새로고침 발생하지 않음

---

## 향후 개선사항

1. **에러 처리 강화**
   - 네트워크 에러 시 재시도 로직
   - 사용자 친화적인 에러 메시지

2. **로딩 상태 개선**
   - Skeleton UI 추가
   - 로딩 인디케이터 일관성 유지

3. **다른 소셜 로그인 추가**
   - 카카오 로그인
   - 구글 로그인

4. **토큰 갱신 큐 관리**
   - 여러 요청이 동시에 토큰 갱신을 시도하는 경우 대기 큐 구현

---

## 참고 자료

- [네이버 OAuth 2.0 가이드](https://developers.naver.com/docs/login/overview/)
- [Zustand 공식 문서](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Axios 인터셉터](https://axios-http.com/docs/interceptors)
