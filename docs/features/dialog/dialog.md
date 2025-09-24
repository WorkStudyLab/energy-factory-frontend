# Dialog 기능 문서

## 개요

이 프로젝트는 Zustand를 기반으로 한 전역 다이얼로그 시스템을 제공합니다. 알림, 확인, 커스텀 다이얼로그를 쉽게 사용할 수 있도록 설계되었습니다.

## 아키텍처

### 핵심 구성 요소

1. **DialogStore** (`src/stores/useDialogStore.ts`)

   - Zustand 기반 전역 상태 관리
   - 다이얼로그 상태와 액션을 중앙 집중식으로 관리

2. **DialogProvider** (`src/contexts/DialogContext.tsx`)

   - 전역 다이얼로그 렌더링을 담당하는 컨텍스트 프로바이더
   - 다이얼로그 타입에 따른 적절한 컴포넌트 렌더링

3. **Dialog Components** (`src/components/layout/dialog/Dialog.tsx`)

   - 재사용 가능한 다이얼로그 컴포넌트들
   - Shadcn/ui 기반 구현

4. **Dialog Helpers** (`src/utils/dialogHelpers.ts`)
   - 편리한 다이얼로그 사용을 위한 헬퍼 함수들

## 다이얼로그 타입

### 1. Alert Dialog (알림 다이얼로그)

- 단순한 정보 전달용
- 확인 버튼만 제공
- 성공, 에러, 경고, 정보 메시지에 사용

### 2. Confirm Dialog (확인 다이얼로그)

- 사용자 확인이 필요한 작업용
- 확인/취소 버튼 제공
- 삭제, 저장 등 중요한 작업에 사용

### 3. Custom Dialog (커스텀 다이얼로그)

- 자유로운 내용과 레이아웃
- ReactNode를 통한 완전한 커스터마이징
- 폼, 상세 정보 표시 등에 사용

## 사용법

### 1. 기본 설정

```tsx
// App.tsx에서 DialogProvider 설정
import { DialogProvider } from "@/contexts/DialogContext";

function App() {
  return <DialogProvider>{/* 앱 컴포넌트들 */}</DialogProvider>;
}
```

### 2. 알림 다이얼로그

```tsx
import { useDialogHelpers } from "@/utils/dialogHelpers";

function MyComponent() {
  const { alert } = useDialogHelpers();

  const handleSuccess = () => {
    alert("작업이 성공적으로 완료되었습니다!", {
      title: "성공",
      onConfirm: () => console.log("확인됨"),
    });
  };

  return <button onClick={handleSuccess}>성공 알림</button>;
}
```

### 3. 확인 다이얼로그

```tsx
import { useDialogHelpers } from "@/utils/dialogHelpers";

function MyComponent() {
  const { confirm } = useDialogHelpers();

  const handleDelete = () => {
    confirm("정말로 삭제하시겠습니까?", {
      title: "삭제 확인",
      onConfirm: () => {
        // 삭제 로직
        console.log("삭제됨");
      },
      onCancel: () => {
        console.log("취소됨");
      },
    });
  };

  return <button onClick={handleDelete}>삭제</button>;
}
```

### 4. 커스텀 다이얼로그

```tsx
import { useDialogHelpers } from "@/utils/dialogHelpers";

function MyComponent() {
  const { custom } = useDialogHelpers();

  const handleCustomDialog = () => {
    custom({
      title: "사용자 정보",
      description: "사용자 정보를 입력해주세요.",
      content: (
        <div className="space-y-4">
          <input placeholder="이름" />
          <input placeholder="이메일" />
        </div>
      ),
      footer: (
        <div className="flex gap-2">
          <button>취소</button>
          <button>저장</button>
        </div>
      ),
      size: "lg",
    });
  };

  return <button onClick={handleCustomDialog}>커스텀 다이얼로그</button>;
}
```

## API 레퍼런스

### useDialogStore

#### 상태

- `isOpen: boolean` - 다이얼로그 열림 상태
- `type: "alert" | "confirm" | "custom" | null` - 다이얼로그 타입
- `title?: string` - 다이얼로그 제목
- `description?: string` - 다이얼로그 설명
- `content?: ReactNode` - 커스텀 다이얼로그 내용
- `footer?: ReactNode` - 커스텀 다이얼로그 푸터
- `size?: "sm" | "md" | "lg" | "xl"` - 다이얼로그 크기
- `showCloseButton?: boolean` - 닫기 버튼 표시 여부

#### 액션

- `openDialog(options)` - 다이얼로그 열기
- `closeDialog()` - 다이얼로그 닫기
- `showAlert(message, options?)` - 알림 다이얼로그
- `showConfirm(message, options?)` - 확인 다이얼로그
- `showCustom(options)` - 커스텀 다이얼로그

### useDialogHelpers

#### 함수

- `alert(message, options?)` - 알림 다이얼로그 헬퍼
- `confirm(message, options?)` - 확인 다이얼로그 헬퍼
- `custom(options)` - 커스텀 다이얼로그 헬퍼

## 다이얼로그 크기

- `sm`: 최대 너비 384px (max-w-sm)
- `md`: 최대 너비 448px (max-w-md) - 기본값
- `lg`: 최대 너비 512px (max-w-lg)
- `xl`: 최대 너비 576px (max-w-xl)

## 스타일링

- Shadcn/ui 기반 디자인 시스템 사용
- Tailwind CSS로 스타일링
- 반응형 디자인 지원
- 접근성 고려 (키보드 네비게이션, 포커스 관리)

## 테스트

`src/pages/test/DialogTestPage.tsx`에서 모든 다이얼로그 기능을 테스트할 수 있습니다.

### 테스트 항목

1. 기본 알림 다이얼로그 (성공, 에러, 경고, 정보)
2. 확인 다이얼로그 (삭제, 저장, 취소)
3. 커스텀 다이얼로그 (기본, 폼, 큰 크기)
4. 콜백 함수 동작 확인

## 주의사항

1. **DialogProvider 필수**: 앱 최상위에 DialogProvider를 설정해야 합니다.
2. **단일 다이얼로그**: 동시에 하나의 다이얼로그만 표시됩니다.
3. **메모리 관리**: 다이얼로그가 닫힐 때 상태가 자동으로 초기화됩니다.
4. **콜백 함수**: onConfirm, onCancel, onClose 콜백은 선택사항입니다.

## 확장 가능성

- Promise 기반 다이얼로그 (async/await 패턴)
- 다중 다이얼로그 지원 (스택 방식)
- 애니메이션 커스터마이징
- 테마별 다이얼로그 스타일
- 다이얼로그 히스토리 관리

## 예제 코드

전체 예제는 `src/pages/test/DialogTestPage.tsx`를 참고하세요. 이 파일에는 모든 다이얼로그 타입과 사용법이 포함되어 있습니다.
