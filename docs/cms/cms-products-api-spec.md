# CMS 상품 관리 API 명세서

## 개요
프론트엔드 CMS 상품 관리 UI에 필요한 백엔드 API 명세입니다.

---

## 1. 상품 목록 조회 (페이지네이션)

### Endpoint
```
GET /api/admin/products
```

### Query Parameters
| 파라미터 | 타입 | 필수 | 설명 | 예시 |
|---------|------|------|------|------|
| page | number | N | 페이지 번호 (0부터 시작) | 0 |
| size | number | N | 페이지 크기 | 10 |
| category | string | N | 카테고리 필터 | "단백질" |
| status | string | N | 상태 필터 | "AVAILABLE" |
| keyword | string | N | 검색어 (상품명, 브랜드, 태그) | "닭가슴살" |

### Response
```json
{
  "status": 200,
  "code": "SUCCESS",
  "desc": "조회 성공",
  "data": {
    "products": [
      {
        "id": 1,
        "name": "프리미엄 닭가슴살",
        "price": 15000,  // 대표 가격 (기본 변형 또는 최저가)
        "category": "단백질",
        "imageUrl": "https://...",
        "brand": "Energy Factory",
        "weight": 1000,
        "weightUnit": "g",
        "status": "AVAILABLE",  // AVAILABLE, LOW_STOCK, OUT_OF_STOCK, DISCONTINUED
        "averageRating": 4.5,
        "reviewCount": 120,
        "tags": ["고단백", "저지방", "다이어트"],
        "originalPrice": 18000,  // optional (할인 전 원가)
        "discount": 17,  // optional (할인율 %)
        "variants": [  // 상품 변형 목록 (옵션별 재고 관리)
          {
            "id": 1,
            "name": "500g",
            "price": 10000,
            "stock": 50,
            "reservedStock": 5,  // 주문 중 재고
            "availableStock": 45  // 실제 판매 가능 재고
          },
          {
            "id": 2,
            "name": "1kg",
            "price": 18000,
            "stock": 80,
            "reservedStock": 10,
            "availableStock": 70
          }
        ]
      }
    ],
    "pageInfo": {
      "currentPage": 0,
      "pageSize": 10,
      "totalElements": 50,
      "totalPages": 5,
      "first": true,
      "last": false
    }
  }
}
```

---

## 2. 상품 단일 조회

### Endpoint
```
GET /api/admin/products/{id}
```

### Path Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | number | Y | 상품 ID |

### Response
```json
{
  "status": 200,
  "code": "SUCCESS",
  "desc": "조회 성공",
  "data": {
    "id": 1,
    "name": "프리미엄 닭가슴살",
    "price": 15000,
    "category": "단백질",
    "imageUrl": "https://...",
    "brand": "Energy Factory",
    "weight": 1000,
    "weightUnit": "g",
    "status": "AVAILABLE",
    "averageRating": 4.5,
    "reviewCount": 120,
    "tags": ["고단백", "저지방", "다이어트"],
    "originalPrice": 18000,
    "discount": 17,
    "variants": [
      {
        "id": 1,
        "name": "500g",
        "price": 10000,
        "stock": 50,
        "reservedStock": 5,
        "availableStock": 45
      },
      {
        "id": 2,
        "name": "1kg",
        "price": 18000,
        "stock": 80,
        "reservedStock": 10,
        "availableStock": 70
      }
    ]
  }
}
```

---

## 3. 상품 생성

### Endpoint
```
POST /api/admin/products
```

### Request Body
```json
{
  "name": "프리미엄 닭가슴살",  // required
  "brand": "Energy Factory",
  "category": "단백질",  // required
  "price": 15000,  // required (대표 가격)
  "originalPrice": 18000,  // optional
  "discount": 17,  // optional
  "weight": 1000,
  "weightUnit": "g",
  "status": "AVAILABLE",  // AVAILABLE, LOW_STOCK, OUT_OF_STOCK, DISCONTINUED
  "imageUrl": "https://...",
  "tags": ["고단백", "저지방"]  // optional
  // ⚠️ variants는 별도 API로 관리 (POST /api/admin/products/{id}/variants)
}
```

### Response
```json
{
  "status": 201,
  "code": "CREATED",
  "desc": "상품이 생성되었습니다",
  "data": {
    "id": 1,
    "name": "프리미엄 닭가슴살",
    "price": 15000,
    // ... 전체 상품 정보
  }
}
```

---

## 4. 상품 수정

### Endpoint
```
PUT /api/admin/products/{id}
```

### Path Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | number | Y | 상품 ID |

### Request Body
```json
{
  "name": "프리미엄 닭가슴살",
  "brand": "Energy Factory",
  "category": "단백질",
  "price": 15000,
  "originalPrice": 18000,
  "discount": 17,
  "weight": 1000,
  "weightUnit": "g",
  "status": "AVAILABLE",
  "imageUrl": "https://...",
  "tags": ["고단백", "저지방"]
  // ⚠️ variants는 별도 API로 관리
}
```

### Response
```json
{
  "status": 200,
  "code": "SUCCESS",
  "desc": "상품이 수정되었습니다",
  "data": {
    "id": 1,
    "name": "프리미엄 닭가슴살",
    "price": 15000,
    // ... 전체 상품 정보
  }
}
```

---

## 5. 상품 삭제

### Endpoint
```
DELETE /api/admin/products/{id}
```

### Path Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | number | Y | 상품 ID |

### Response
```json
{
  "status": 200,
  "code": "SUCCESS",
  "desc": "상품이 삭제되었습니다",
  "data": null
}
```

---

## 6. 상품 변형(Variants) 관리

### 6-1. 변형 목록 조회

#### Endpoint
```
GET /api/admin/products/{productId}/variants
```

#### Path Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| productId | number | Y | 상품 ID |

#### Response
```json
{
  "status": 200,
  "code": "SUCCESS",
  "desc": "조회 성공",
  "data": {
    "variants": [
      {
        "id": 1,
        "name": "500g",
        "price": 10000,
        "stock": 50,
        "reservedStock": 5,
        "availableStock": 45
      },
      {
        "id": 2,
        "name": "1kg",
        "price": 18000,
        "stock": 80,
        "reservedStock": 10,
        "availableStock": 70
      }
    ]
  }
}
```

### 6-2. 변형 생성

#### Endpoint
```
POST /api/admin/products/{productId}/variants
```

#### Request Body
```json
{
  "name": "2kg",  // required
  "price": 30000,  // required
  "stock": 100  // required
}
```

#### Response
```json
{
  "status": 201,
  "code": "CREATED",
  "desc": "변형이 생성되었습니다",
  "data": {
    "id": 3,
    "name": "2kg",
    "price": 30000,
    "stock": 100,
    "reservedStock": 0,
    "availableStock": 100
  }
}
```

### 6-3. 변형 수정

#### Endpoint
```
PUT /api/admin/products/{productId}/variants/{variantId}
```

#### Request Body
```json
{
  "name": "2kg",
  "price": 35000,
  "stock": 120
}
```

### 6-4. 변형 삭제

#### Endpoint
```
DELETE /api/admin/products/{productId}/variants/{variantId}
```

---

## 7. 카테고리 목록 조회

### Endpoint
```
GET /api/admin/categories
```

### Response
```json
{
  "status": 200,
  "code": "SUCCESS",
  "desc": "조회 성공",
  "data": {
    "categories": [
      "단백질",
      "탄수화물",
      "보충제",
      "견과류",
      "유제품",
      "채소",
      "기타"
    ]
  }
}
```

---

## 데이터 타입 정의

### Product Status (상품 상태)
| 값 | 설명 | UI 표시 |
|----|------|---------|
| AVAILABLE | 판매중 | 초록색 |
| LOW_STOCK | 재고부족 | 노란색 |
| OUT_OF_STOCK | 품절 | 빨간색 |
| DISCONTINUED | 단종 | 회색 |

### Weight Unit (중량 단위)
- `g` (그램)
- `kg` (킬로그램)
- `ml` (밀리리터)
- `l` (리터)

### Product Variant (상품 변형)
| 필드 | 타입 | 설명 |
|-----|------|------|
| id | number | 변형 ID |
| name | string | 변형명 (예: "500g", "1kg") |
| price | number | 변형별 가격 |
| stock | number | 총 재고 |
| reservedStock | number | 주문 중인 재고 (결제 대기 등) |
| availableStock | number | 실제 판매 가능 재고 (stock - reservedStock) |

---

## 에러 응답

### 공통 에러 포맷
```json
{
  "status": 400,
  "code": "INVALID_REQUEST",
  "desc": "잘못된 요청입니다",
  "data": null
}
```

### 주요 에러 코드
| Status | Code | 설명 |
|--------|------|------|
| 400 | INVALID_REQUEST | 잘못된 요청 |
| 401 | UNAUTHORIZED | 인증 필요 |
| 403 | FORBIDDEN | 권한 없음 (ADMIN만 접근 가능) |
| 404 | NOT_FOUND | 상품을 찾을 수 없음 |
| 500 | INTERNAL_SERVER_ERROR | 서버 오류 |

---

## 권한 요구사항

모든 CMS API는 **ADMIN 권한**이 필요합니다.

Request Header에 인증 토큰 필요:
```
Authorization: Bearer {access_token}
```

---

## UI 구현 참고사항

### 1. 목록 페이지에서 필요한 필드
- 테이블 표시: `id`, `imageUrl`, `name`, `brand`, `category`, `price`, `discount`, `variants`, `status`
- 검색/필터: `keyword`, `category`, `status`
- 페이지네이션: `pageInfo` 전체

### 2. 폼(생성/수정)에서 필수 필드
- **필수**: `name`, `category`, `price`
- **권장**: `brand`, `weight`, `weightUnit`, `status`, `imageUrl`
- **선택**: `originalPrice`, `discount`, `tags`
- **주의**: `variants`는 상품 생성/수정 시 포함하지 않음 (별도 API로 관리)

### 3. 재고 표시 (프론트엔드 계산)
```javascript
// variants 배열에서 총 재고 계산
const totalStock = product.variants?.reduce(
  (sum, variant) => sum + variant.availableStock,
  0
) ?? 0;

// 재고 상태 판단
let stockStatus;
if (totalStock === 0) stockStatus = "품절";
else if (totalStock < 20) stockStatus = "재고부족";
else stockStatus = "정상";
```

### 4. 재고 상태 자동 판단 (백엔드 처리 권장)
백엔드에서 모든 variants의 `availableStock` 합계를 기준으로 판단:
- 합계 === 0 → `OUT_OF_STOCK`
- 합계 < 20 → `LOW_STOCK`
- 합계 >= 20 → `AVAILABLE`

### 5. 할인율 계산 (프론트엔드에서 표시)
```javascript
if (originalPrice && discount) {
  displayPrice = price;
  displayOriginalPrice = originalPrice;
  displayDiscount = discount + "%";
}
```

---


## 구현 우선순위

1. **필수 (Phase 1)** - 기본 상품 CRUD
   - [ ] 상품 목록 조회 (페이지네이션, 필터, 검색) - `variants` 포함
   - [ ] 상품 단일 조회 - `variants` 포함
   - [ ] 상품 생성 (기본 정보만)
   - [ ] 상품 수정 (기본 정보만)
   - [ ] 상품 삭제

2. **필수 (Phase 2)** - 변형 관리
   - [ ] 상품 변형 목록 조회
   - [ ] 상품 변형 생성
   - [ ] 상품 변형 수정
   - [ ] 상품 변형 삭제

3. **권장 (Phase 3)** - 추가 기능
   - [ ] 카테고리 목록 조회
   - [ ] 상품 이미지 업로드 API
   - [ ] 상품 일괄 삭제

4. **선택 (Phase 4)** - 고급 기능
   - [ ] 상품 통계 API
   - [ ] 상품 복제
   - [ ] 엑셀 내보내기/가져오기

---

## ⚠️ 중요 변경사항

### Stock → Variants 구조 변경

#### 변경 전 (기존)
```json
{
  "id": 1,
  "name": "프리미엄 닭가슴살",
  "stock": 50  // ❌ 단일 재고
}
```

#### 변경 후 (현재)
```json
{
  "id": 1,
  "name": "프리미엄 닭가슴살",
  "variants": [  // ✅ 변형별 재고
    {
      "id": 1,
      "name": "500g",
      "price": 10000,
      "stock": 50,
      "availableStock": 45
    },
    {
      "id": 2,
      "name": "1kg",
      "price": 18000,
      "stock": 80,
      "availableStock": 70
    }
  ]
}
```

### 영향받는 API
- ✅ **GET /api/admin/products** - 목록 조회 시 `variants` 배열 포함
- ✅ **GET /api/admin/products/{id}** - 단일 조회 시 `variants` 배열 포함
- ❌ **POST /api/admin/products** - 생성 시 `stock` 필드 제거 (variants는 별도 관리)
- ❌ **PUT /api/admin/products/{id}** - 수정 시 `stock` 필드 제거 (variants는 별도 관리)
- ➕ **신규 API** - Variants 관리용 CRUD 엔드포인트 추가 (Section 6 참고)

### 프론트엔드 대응 방안
- **목록 화면**: variants의 `availableStock` 합계를 "재고" 컬럼에 표시
- **상세 화면**: variants 목록을 별도 섹션으로 표시 (드롭다운 or 테이블)
- **생성/수정 폼**: 기본 정보만 입력, variants는 상품 생성 후 별도 관리

---

## 문의사항

- 프론트엔드 구현: `/src/features/admin-products/services/adminProductsService.ts`
- 더미 데이터: `/src/features/admin-products/constants/dummyData.ts`

추가 필드나 수정이 필요한 경우 프론트엔드팀에 문의 바랍니다.

---

## 개발 이력

### 2025-11-10: Tag 객체 배열 변환 처리

#### 문제 상황
- **증상**: ProductForm에서 상품 수정 시 React 렌더링 오류 발생
  ```
  Error: Objects are not valid as a React child (found: object with keys {id, name})
  Encountered two children with the same key, `[object Object]`
  ```
- **원인**:
  - 서버 API 응답의 `tags` 필드가 `Tag[]` 타입 (객체 배열: `[{id, name, ...}]`)
  - UI 컴포넌트는 `string[]` 타입을 기대 (`["고단백", "저지방"]`)
  - 변환 로직 없이 객체를 직접 렌더링하려 시도하여 에러 발생

#### 해결 방법
**adminProductsService.ts:30-45** - 상품 단일 조회 시 Tag 변환 로직 추가

```typescript
// 변경 전
static async getProduct(id: number): Promise<Product | null> {
  try {
    const response = await api.get<ApiResponse<Product>>(
      `/api/admin/products/${id}`,
    );
    return response.data.data;
  } catch (error) {
    return null;
  }
}

// 변경 후
static async getProduct(id: number): Promise<Product | null> {
  try {
    const response = await api.get<ApiResponse<ProductServerDetail>>(
      `/api/admin/products/${id}`,
    );
    const serverData = response.data.data;

    // Tag[] 객체 배열을 string[] 배열로 변환
    return {
      ...serverData,
      tags: serverData.tags?.map(t => t.name) || [],
    };
  } catch (error) {
    return null;
  }
}
```

#### 구현 패턴
이는 기존 `useProductDetail.ts`에서 사용하던 패턴과 동일:
```typescript
// useProductDetail.ts:79
tags: serverData.tags?.map(t => t.name) || [],
```

#### 적용 범위
- ✅ **useProductDetail.ts**: 일반 사용자 상품 상세 조회 (기존)
- ✅ **adminProductsService.ts**: Admin CMS 상품 수정 페이지 (신규 추가)

#### 타입 정의 참고
```typescript
// ProductServerDetail - 서버 응답 타입
interface ProductServerDetail {
  // ...
  tags: Tag[] | null;  // 객체 배열
}

// Product - UI 사용 타입
interface Product {
  // ...
  tags: string[];  // 문자열 배열
}

// Tag - 태그 객체
interface Tag {
  id: number;
  name: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}
```

#### 관련 파일
- `/src/features/admin-products/services/adminProductsService.ts` - 변환 로직 추가
- `/src/types/product.ts` - 타입 정의
- `/src/features/products/hooks/useProductDetail.ts` - 참조 패턴

#### 검증
- ProductForm.tsx:264 렌더링 에러 해결
- 상품 수정 페이지에서 태그가 문자열로 정상 표시
- 태그 추가/삭제 기능 정상 동작
