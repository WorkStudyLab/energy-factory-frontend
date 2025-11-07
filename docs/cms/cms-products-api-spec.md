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
        "price": 15000,
        "category": "단백질",
        "imageUrl": "https://...",
        "brand": "Energy Factory",
        "weight": 1000,
        "weightUnit": "g",
        "stock": 50,
        "status": "AVAILABLE",  // AVAILABLE, LOW_STOCK, OUT_OF_STOCK, DISCONTINUED
        "averageRating": 4.5,
        "reviewCount": 120,
        "tags": ["고단백", "저지방", "다이어트"],
        "originalPrice": 18000,  // optional (할인 전 원가)
        "discount": 17  // optional (할인율 %)
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
    "stock": 50,
    "status": "AVAILABLE",
    "averageRating": 4.5,
    "reviewCount": 120,
    "tags": ["고단백", "저지방", "다이어트"],
    "originalPrice": 18000,
    "discount": 17
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
  "price": 15000,  // required
  "originalPrice": 18000,  // optional
  "discount": 17,  // optional
  "weight": 1000,
  "weightUnit": "g",
  "stock": 50,
  "status": "AVAILABLE",  // AVAILABLE, LOW_STOCK, OUT_OF_STOCK, DISCONTINUED
  "imageUrl": "https://...",
  "tags": ["고단백", "저지방"]  // optional
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
  "stock": 50,
  "status": "AVAILABLE",
  "imageUrl": "https://...",
  "tags": ["고단백", "저지방"]
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

## 6. 카테고리 목록 조회

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
- 테이블 표시: `id`, `imageUrl`, `name`, `brand`, `category`, `price`, `discount`, `stock`, `status`
- 검색/필터: `keyword`, `category`, `status`
- 페이지네이션: `pageInfo` 전체

### 2. 폼(생성/수정)에서 필수 필드
- **필수**: `name`, `category`, `price`
- **권장**: `brand`, `weight`, `weightUnit`, `stock`, `status`, `imageUrl`
- **선택**: `originalPrice`, `discount`, `tags`

### 3. 재고 상태 자동 판단 (백엔드 처리 권장)
- `stock === 0` → `OUT_OF_STOCK`
- `stock < 20` → `LOW_STOCK`
- `stock >= 20` → `AVAILABLE`

### 4. 할인율 계산 (프론트엔드에서 표시)
```javascript
if (originalPrice && discount) {
  // UI에 할인율 표시
  displayPrice = price;
  displayOriginalPrice = originalPrice;
  displayDiscount = discount + "%";
}
```

---

## 구현 우선순위

1. **필수 (Phase 1)**
   - [x] 상품 목록 조회 (페이지네이션)
   - [x] 상품 단일 조회
   - [x] 상품 생성
   - [x] 상품 수정
   - [x] 상품 삭제

2. **권장 (Phase 2)**
   - [ ] 카테고리 목록 조회
   - [ ] 상품 이미지 업로드 API
---

