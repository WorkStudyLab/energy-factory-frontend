# 네이버 소셜 로그인 구현 가이드

## 개요

네이버 OAuth 2.0을 사용한 소셜 로그인 및 계정 연동 기능 구현 문서입니다.

**3가지 사용자 플로우**를 지원합니다:
1. **신규 사용자 OAuth 회원가입**: 네이버 로그인 → 추가 정보 입력 → 회원가입 완료
2. **기존 사용자 OAuth 로그인**: 네이버 로그인 → 즉시 로그인 완료
3. **LOCAL 계정 연동**: 일반 회원가입 후 또는 마이페이지에서 네이버 계정 연동

---

## 플로우 다이어그램

### 1. 신규 사용자 OAuth 회원가입

```
사용자 → 네이버 로그인 버튼 클릭
  ↓
GET /api/auth/oauth2/authorization/naver
  ↓
네이버 로그인 페이지 (네이버 측)
  ↓
사용자 인증 완료
  ↓
백엔드 OAuth 콜백 처리
  ↓
신규 사용자 감지 → /signup?oauth=pending 리다이렉트 (30분 세션)
  ↓
프론트엔드: GET /api/auth/oauth-temp-info (임시 정보 조회)
  ↓
회원가입 폼에 네이버 정보 자동 입력 (이메일, 이름, 전화번호 - 읽기 전용)
  ↓
사용자가 추가 정보 입력 (생년월일, 주소 - 필수)
  ↓
POST /api/auth/signup-with-oauth
  ↓
회원가입 완료 + 자동 로그인 (JWT 쿠키 발급)
  ↓
/signup/connect 페이지로 이동 (추가 소셜 계정 연동 안내)
  ↓
건너뛰기 또는 다른 소셜 계정 연동
  ↓
/products 페이지로 이동
```

### 2. 기존 사용자 OAuth 로그인

```
사용자 → 네이버 로그인 버튼 클릭
  ↓
GET /api/auth/oauth2/authorization/naver
  ↓
네이버 로그인 페이지 (네이버 측)
  ↓
사용자 인증 완료
  ↓
백엔드 OAuth 콜백 처리
  ↓
기존 사용자 감지 → JWT 쿠키 발급 → /products 리다이렉트
  ↓
프론트엔드: useAuthInit이 자동으로 사용자 정보 조회
  ↓
로그인 완료
```

### 3. LOCAL 계정에 네이버 연동

**시나리오 A: 일반 회원가입 직후**
```
일반 회원가입 완료 (POST /api/users/signup)
  ↓
자동 로그인 처리 (JWT 쿠키 발급)
  ↓
/signup/connect 페이지로 이동
  ↓
"네이버 아이디 연동하기" 버튼 클릭
  ↓
GET /api/auth/link/naver (로그인 상태에서 호출)
  ↓
네이버 로그인 페이지
  ↓
네이버 인증 완료
  ↓
백엔드에서 계정 연동 처리
  ↓
성공: /mypage?link=success
실패: /mypage?link=error&reason={already_linked|already_in_use|unknown_error}
  ↓
프론트엔드에서 성공/실패 메시지 표시
```

**시나리오 B: 마이페이지에서 연동**
```
마이페이지 접속 (로그인 필수)
  ↓
계정 보안 섹션에서 "네이버 아이디 연동하기" 버튼 클릭
  ↓
GET /api/auth/link/naver
  ↓
(이후 동일)
```

---

## 구현된 파일 목록

### 1. 타입 정의 (`src/types/user.ts`)

```typescript
// OAuth 임시 정보 (30분 세션)
export interface OAuthTempInfo {
  provider: "NAVER" | "KAKAO" | "GOOGLE";
  providerId: string;
  email: string;
  name: string;
  phoneNumber?: string;
}

// OAuth 회원가입 요청
export interface SignupWithOAuthRequest {
  email: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  address: string;
}

// 사용자 정보 (마이페이지)
export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  authProvider: "LOCAL" | "NAVER" | "KAKAO" | "GOOGLE";
  memberSince: string;
  address: string;
}
```

### 2. API 서비스 (`src/features/auth/services/AuthApiService.ts`)

```typescript
class AuthApiService {
  // OAuth 임시 정보 조회 (신규 사용자, 30분 세션)
  static async getOAuthTempInfo(): Promise<OAuthTempInfoResponse>;

  // OAuth 회원가입 완료
  static async signupWithOAuth(data: SignupWithOAuthRequest): Promise<SignupWithOAuthResponse>;

  // 사용자 정보 조회 (로그인 상태 확인용)
  static async getUserInfo(): Promise<UserInfo>;
}
```

### 3. 페이지 컴포넌트

#### `src/pages/auth/SignupPage.tsx`
- 일반 회원가입 + OAuth 회원가입 통합
- `?oauth=pending` 쿼리 파라미터 감지
- OAuth 임시 정보 조회 및 localStorage 캐싱 (세션 만료 대비)
- 네이버 제공 필드 추적 (`oauthProvidedFields`)

#### `src/pages/auth/SignupConnectPage.tsx`
- 회원가입 완료 후 소셜 계정 연동 안내
- "네이버 아이디 연동하기" 버튼 → `GET /api/auth/link/naver`
- "건너뛰기" 버튼 → `/products`로 이동

#### `src/pages/mypage/MyPage.tsx`
- 계정 연동 성공/실패 처리 (`?link=success|error`)
- URL 파라미터 기반 알림 표시
- 연동 성공 시 페이지 리로드하여 최신 정보 반영

### 4. UI 컴포넌트

#### `src/features/auth/ui/SignupForm.tsx`
- 일반 회원가입 vs OAuth 회원가입 분기
- OAuth 모드일 때:
  - 비밀번호 필드 숨김
  - 네이버 제공 필드 읽기 전용
  - `POST /api/auth/signup-with-oauth` 호출
- 일반 모드일 때:
  - 모든 필드 입력 가능
  - 비밀번호 유효성 검사
  - `POST /api/users/signup` 호출

#### `src/features/auth/ui/MyPageAccountSecurity.tsx`
- 네이버 계정 연동 상태 표시
- `authProvider === "naver"` → "연동됨" (비활성화)
- `authProvider !== "naver"` → "네이버 아이디 연동하기" 버튼

### 5. 인증 상태 관리

#### `src/hooks/useAuthInit.ts`
- 앱 초기화 시 로그인 상태 확인
- JWT 쿠키가 있으면 `GET /api/users/me`로 사용자 정보 조회
- `?oauth=pending` 상태에서는 스킵 (세션 중)
- `hasInitialized` ref로 중복 실행 방지

#### `src/stores/useAuthStore.ts`
- Zustand + persist로 사용자 정보 관리
- `setUser()`: 사용자 정보 저장 및 `isAuthenticated` 업데이트
- `logout()`: 스토어 초기화 + 백엔드 로그아웃 API 호출

#### `src/hooks/useSignup.tsx`
- 일반 회원가입 Hook
- 성공 시 `setUser()` 호출 → **자동 로그인 처리**
- `/signup/connect`로 리다이렉트

### 6. 라우트 권한 설정 (`src/constants/routeAuth.ts`)

```typescript
export const ROUTE_AUTH = {
  [ROUTES.SIGNUP]: {
    allowedRoles: ["guest"],
    redirectAuth: ROUTES.PRODUCTS,
  },
  [ROUTES.SIGNUP_CONNECT]: {
    allowedRoles: ["guest", "user"], // 회원가입 후 바로 접근하므로 user도 허용
  },
  [ROUTES.MY_PAGE]: {
    allowedRoles: ["user"],
    redirectUnauth: ROUTES.LOGIN,
  },
};
```

### 7. Axios 인터셉터 (`src/lib/axios/axios.ts`)

```typescript
// 401 에러 시 토큰 자동 갱신
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // /auth/login, /auth/refresh, /users/me는 재시도 제외
      if (originalRequest._retry || isSpecialEndpoint) {
        return Promise.reject(error);
      }

      // 토큰 갱신 시도
      await axios.post('/api/auth/refresh', {}, { withCredentials: true });
      return apiClient(originalRequest);
    }

    // 401 에러는 로그하지 않음 (미로그인 상태는 정상)
    if (error.response?.status !== 401) {
      console.error("API 에러:", error);
    }

    return Promise.reject(error);
  }
);
```

---

## 주요 구현 포인트

### 1. 30분 세션 타임아웃 대비 (localStorage 캐싱)

OAuth 회원가입 세션은 백엔드에서 30분으로 제한됩니다. 사용자가 회원가입 폼을 천천히 작성하다가 세션이 만료되는 경우를 대비하여 임시 정보를 localStorage에 캐싱합니다.

```typescript
// SignupPage.tsx
useEffect(() => {
  const oauthPending = searchParams.get("oauth");

  if (oauthPending === "pending") {
    setIsOAuthSignup(true);

    // 로컬 스토리지에서 복원 시도 (세션 만료 대비)
    const savedData = localStorage.getItem(OAUTH_TEMP_DATA_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      applyOAuthData(parsedData);
      return;
    }

    // API 호출
    const fetchOAuthTempInfo = async () => {
      const response = await AuthApiService.getOAuthTempInfo();
      localStorage.setItem(OAUTH_TEMP_DATA_KEY, JSON.stringify(response.data));
      applyOAuthData(response.data);
    };

    fetchOAuthTempInfo();
  }
}, [searchParams]);
```

### 2. 네이버 제공 필드 추적 및 비활성화

네이버에서 제공한 정보는 사용자가 수정할 수 없도록 읽기 전용으로 표시합니다.

```typescript
// OAuth 데이터 적용 시 제공된 필드 추적
const applyOAuthData = (data: OAuthTempInfo) => {
  const providedFields = new Set<string>();

  if (data.email) {
    handleInputChange("email", data.email);
    providedFields.add("email");
  }

  if (data.name) {
    handleInputChange("name", data.name);
    providedFields.add("name");
  }

  if (data.phoneNumber) {
    const [p1, p2, p3] = data.phoneNumber.split("-");
    handleInputChange("phone1", p1);
    handleInputChange("phone2", p2);
    handleInputChange("phone3", p3);
    providedFields.add("phone1");
    providedFields.add("phone2");
    providedFields.add("phone3");
  }

  setOAuthProvidedFields(providedFields);
};

// SignupForm.tsx - 필드별 비활성화
<LabelInput
  id="email"
  label="이메일"
  value={formData.email}
  disabled={oauthProvidedFields.has("email")}
/>
```

### 3. 일반 회원가입 후 자동 로그인

일반 회원가입 성공 시 백엔드에서 JWT 쿠키를 발급하고, 프론트엔드에서도 Zustand 스토어에 사용자 정보를 저장하여 자동 로그인 처리합니다.

```typescript
// useSignup.tsx
export const useSignup = () => {
  const { setUser } = useAuthStore();

  const mutation = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      // 회원가입 성공 시 사용자 정보를 스토어에 저장 (자동 로그인)
      setUser({
        id: data.data.id,
        email: data.data.email,
        name: data.data.name,
      });

      // SNS 연동 페이지로 리다이렉트
      alert("회원가입 성공!", {
        onConfirm: () => {
          navigate(ROUTES.SIGNUP_CONNECT);
        },
      });
    },
  });

  return { signup: mutation.mutate };
};
```

### 4. 계정 연동 성공/실패 처리

마이페이지에서 URL 쿼리 파라미터를 감지하여 연동 결과를 알림으로 표시합니다.

```typescript
// MyPage.tsx
useEffect(() => {
  const linkStatus = searchParams.get("link");
  const reason = searchParams.get("reason");

  if (linkStatus === "success") {
    // URL 파라미터 먼저 제거 (무한 루프 방지)
    window.history.replaceState({}, "", "/mypage");

    alert("네이버 계정 연동이 완료되었습니다!", {
      title: "연동 완료",
      onConfirm: () => {
        window.location.reload(); // 최신 정보 반영
      },
    });
  }

  if (linkStatus === "error") {
    window.history.replaceState({}, "", "/mypage");

    const errorMessages: Record<string, string> = {
      already_linked: "이미 소셜 계정이 연동되어 있습니다.",
      already_in_use: "해당 네이버 계정은 이미 다른 사용자가 사용 중입니다.",
      unknown_error: "알 수 없는 오류가 발생했습니다.",
    };

    alert(errorMessages[reason || ""] || "계정 연동에 실패했습니다.", {
      title: "연동 실패",
    });
  }
}, [searchParams]); // alert를 의존성에서 제거하여 무한 루프 방지
```

### 5. SignupConnectPage 권한 설정

일반 회원가입 후 자동 로그인된 상태에서 SignupConnectPage에 접근할 수 있도록 `allowedRoles`에 `"user"`를 추가합니다.

```typescript
// routeAuth.ts
[ROUTES.SIGNUP_CONNECT]: {
  allowedRoles: ["guest", "user"], // 회원가입 후 바로 접근하므로 user도 허용
},
```

---

## API 명세

### 1. 네이버 OAuth 로그인 시작

```
GET /api/auth/oauth2/authorization/naver
```

- **Response**: 302 리다이렉트 (네이버 로그인 페이지)
- **로그인 완료 후**:
  - 신규 사용자: `/signup?oauth=pending`
  - 기존 사용자: `/products`

### 2. OAuth 임시 정보 조회 (신규 사용자 전용)

```
GET /api/auth/oauth-temp-info
```

- **세션**: 30분
- **Response**:
```json
{
  "status": 200,
  "code": "20000000",
  "desc": "성공",
  "data": {
    "provider": "NAVER",
    "providerId": "naver_1234567890",
    "email": "user@naver.com",
    "name": "홍길동",
    "phoneNumber": "010-1234-5678"
  }
}
```

### 3. OAuth 회원가입 완료

```
POST /api/auth/signup-with-oauth
Content-Type: application/json

{
  "email": "user@naver.com",
  "name": "홍길동",
  "phoneNumber": "010-1234-5678",
  "birthDate": "1990-01-01",
  "address": "서울특별시 강남구"
}
```

- **Response**:
```json
{
  "status": 201,
  "code": "20100000",
  "desc": "회원가입 성공",
  "data": {
    "id": 123,
    "email": "user@naver.com",
    "name": "홍길동"
  }
}
```
- **Set-Cookie**: `accessToken`, `refreshToken` (HttpOnly)

### 4. 일반 회원가입

```
POST /api/users/signup
Content-Type: application/json

{
  "name": "홍길동",
  "email": "user@example.com",
  "password": "Password123!",
  "phoneNumber": "010-1234-5678",
  "birthDate": "1990-01-01",
  "address": "서울특별시 강남구"
}
```

- **Response**: 동일한 형식
- **Set-Cookie**: `accessToken`, `refreshToken` (HttpOnly) - **자동 로그인**

### 5. 네이버 계정 연동 (LOCAL 계정 전용)

```
GET /api/auth/link/naver
Authorization: Cookie (로그인 필수)
```

- **Response**: 302 리다이렉트 (네이버 로그인 페이지)
- **연동 완료 후**:
  - 성공: `/mypage?link=success`
  - 실패: `/mypage?link=error&reason={already_linked|already_in_use|unknown_error}`

### 6. 사용자 정보 조회

```
GET /api/users/me
Authorization: Cookie (HttpOnly)
```

- **Response**:
```json
{
  "name": "홍길동",
  "email": "user@naver.com",
  "phone": "010-1234-5678",
  "birthDate": "1990-01-01",
  "authProvider": "NAVER",
  "memberSince": "2024-06-15",
  "address": "서울특별시 강남구"
}
```

---

## 트러블슈팅

### 1. 회원가입 후 SignupConnectPage로 가지 않고 Products로 이동

**문제**: 일반 회원가입 성공 후 SignupConnectPage로 이동하려 하지만 Products 페이지로 리다이렉트됨

**원인**:
- 회원가입 성공 시 `setUser()` 호출로 자동 로그인 처리
- `SIGNUP_CONNECT` 라우트가 `allowedRoles: ["guest"]`로 설정되어 있음
- AppRoute가 로그인된 사용자를 감지하고 `redirectAuth: ROUTES.PRODUCTS`로 강제 리다이렉트

**해결**:
```typescript
// routeAuth.ts
[ROUTES.SIGNUP_CONNECT]: {
  allowedRoles: ["guest", "user"], // user도 허용
},
```

### 2. 회원가입 후 SignupConnectPage에서 네이버 연동 시 자동 로그인됨

**문제**: 일반 회원가입 직후 (미로그인 상태) SignupConnectPage에서 "네이버 아이디 연동하기" 클릭 시, 연동이 아닌 OAuth 로그인으로 처리됨

**원인**: 미로그인 상태에서 `/api/auth/link/naver` 호출 시 백엔드가 일반 OAuth 로그인으로 처리

**해결**: 일반 회원가입 성공 시 자동 로그인 처리 (`setUser()` 호출)

### 3. MyPage에서 무한 루프 발생

**문제**: `/mypage?link=success` 접근 시 "Maximum update depth exceeded" 에러

**원인**:
- `alert` 함수가 useEffect 의존성 배열에 포함
- alert 콜백에서 `window.location.reload()` 호출
- 무한 렌더링 루프 발생

**해결**:
```typescript
// MyPage.tsx
useEffect(() => {
  if (linkStatus === "success") {
    // URL 파라미터 먼저 제거
    window.history.replaceState({}, "", "/mypage");

    alert("연동 완료!", {
      onConfirm: () => {
        window.location.reload();
      },
    });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchParams]); // alert 제거
```

### 4. 전역 /users/me API 호출로 401 에러 반복

**문제**: OAuth 회원가입 중 (`?oauth=pending`) 페이지 이동마다 `GET /users/me` 호출로 401 에러 발생

**원인**: `useAuthInit`이 모든 페이지에서 실행되며 로그인 상태 확인 시도

**해결**:
```typescript
// useAuthInit.ts
useEffect(() => {
  // OAuth 회원가입 중이면 스킵
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("oauth") === "pending") {
    return;
  }

  // 로그인 상태 확인
  const initAuth = async () => {
    const userInfo = await AuthApiService.getUserInfo();
    setUser({...});
  };

  initAuth();
}, []);
```

### 5. 401 에러 로그가 콘솔을 가득 채움

**문제**: 미로그인 상태에서 페이지 이동마다 401 에러 로그 출력

**원인**: axios 인터셉터가 모든 401 에러를 로깅

**해결**:
```typescript
// axios.ts
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 에러는 로그하지 않음 (미로그인 상태는 정상)
    if (import.meta.env.DEV && error.response?.status !== 401) {
      console.error("API 에러:", error);
    }

    return Promise.reject(error);
  }
);
```

---

## 환경 변수

```env
# .env.development
VITE_API_BASE_URL=http://localhost:8080

# .env.production
VITE_API_BASE_URL=https://energy-factory.kr
```

---

## 주의사항

### 1. HttpOnly 쿠키 사용

- JWT 토큰은 HttpOnly 쿠키로 관리 (XSS 공격 방지)
- Zustand에는 사용자 정보만 저장 (토큰 저장 안함)
- 모든 API 요청에 `withCredentials: true` 필수

```typescript
// axios.ts
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 필수
});
```

### 2. 무한 루프 방지

- useEffect는 항상 의존성 배열 최소화
- `hasInitialized` ref로 중복 실행 방지
- `window.history.replaceState()`를 alert 전에 호출

### 3. 세션 타임아웃 대비

- OAuth 임시 정보는 localStorage에 캐싱
- 회원가입 완료 시 캐시 삭제
- 에러 발생 시 명확한 안내 메시지

### 4. 라우트 권한 설정

- SignupConnectPage는 로그인/비로그인 모두 허용
- MyPage는 로그인 필수
- 인증 페이지(Login, Signup)는 비로그인만 허용

---

## 테스트 시나리오

### 시나리오 1: 신규 사용자 OAuth 회원가입

1. 로그인 페이지 → "네이버로 로그인" 클릭
2. 네이버 로그인 완료
3. `/signup?oauth=pending` 페이지로 리다이렉트
4. 네이버 정보 자동 입력 (이메일, 이름, 전화번호 - 읽기 전용)
5. 추가 정보 입력 (생년월일, 주소)
6. "가입하고 시작하기" 클릭
7. 회원가입 완료 + 자동 로그인
8. `/signup/connect` 페이지로 이동
9. "건너뛰기" 또는 다른 소셜 계정 연동
10. `/products` 페이지로 이동
11. 헤더에 사용자 이름 표시

### 시나리오 2: 기존 사용자 OAuth 로그인

1. 로그인 페이지 → "네이버로 로그인" 클릭
2. 네이버 로그인 완료
3. 즉시 `/products` 페이지로 리다이렉트
4. 로그인 완료

### 시나리오 3: LOCAL 계정에 네이버 연동

**3-A: 일반 회원가입 직후**
1. 회원가입 완료
2. `/signup/connect` 페이지로 이동 (자동 로그인 상태)
3. "네이버 아이디 연동하기" 클릭
4. 네이버 로그인 완료
5. 연동 성공 시 `/mypage?link=success` 리다이렉트
6. "네이버 계정 연동이 완료되었습니다!" 알림
7. 페이지 리로드하여 최신 정보 반영

**3-B: 마이페이지에서 연동**
1. 마이페이지 접속 (로그인 필수)
2. 계정 보안 섹션 → "네이버 아이디 연동하기" 클릭
3. (이후 동일)

**3-C: 연동 실패 케이스**
1. 이미 소셜 계정이 연동된 경우: `?link=error&reason=already_linked`
2. 해당 네이버 계정이 다른 사용자가 사용 중: `?link=error&reason=already_in_use`
3. 알 수 없는 오류: `?link=error&reason=unknown_error`

### 시나리오 4: 세션 만료 후 복구

1. OAuth 회원가입 중 (`?oauth=pending`)
2. 회원가입 폼 작성 중 30분 경과 (세션 만료)
3. localStorage에서 임시 정보 복원
4. 회원가입 계속 진행 가능

### 시나리오 5: 페이지 새로고침

1. 로그인 상태에서 새로고침
2. `useAuthInit`이 쿠키에서 사용자 정보 복원
3. 로그인 상태 유지

---

## 향후 개선사항

### 1. 다른 소셜 로그인 추가
- 카카오 로그인
- 구글 로그인
- 동일한 아키텍처로 확장 가능

### 2. 토큰 갱신 큐 관리
- 여러 요청이 동시에 토큰 갱신을 시도하는 경우 대기 큐 구현
- 첫 번째 요청만 토큰 갱신, 나머지는 대기 후 재시도

### 3. 에러 처리 강화
- 네트워크 에러 시 재시도 로직
- 사용자 친화적인 에러 메시지
- 에러 바운더리 추가

### 4. 로딩 상태 개선
- Skeleton UI 추가
- 로딩 인디케이터 일관성 유지
- Suspense 활용

### 5. 계정 연동 해제 기능
- 마이페이지에서 연동 해제 버튼
- 연동 해제 후 LOCAL 계정으로 전환

---

## 참고 자료

- [네이버 OAuth 2.0 가이드](https://developers.naver.com/docs/login/overview/)
- [Zustand 공식 문서](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Axios 인터셉터](https://axios-http.com/docs/interceptors)
- [React Router v6](https://reactrouter.com/en/main)
