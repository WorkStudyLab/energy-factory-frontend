import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialogHelpers } from "@/utils/dialogHelpers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";

/**
 * 다이얼로그 테스트 페이지
 */
export const DialogTestPage: React.FC = () => {
  const { alert, confirm, custom } = useDialogHelpers();
  const navigate = useNavigate();

  const [testMessage, setTestMessage] = useState("테스트 메시지입니다.");
  const [itemName, setItemName] = useState("사용자 데이터");

  // 기본 알림 다이얼로그들
  const handleSuccess = () => {
    alert("작업이 성공적으로 완료되었습니다!", {
      title: "성공",
      onConfirm: () => console.log("성공 알림 확인됨"),
    });
  };

  const handleError = () => {
    alert("오류가 발생했습니다. 다시 시도해주세요.", {
      title: "오류",
      onConfirm: () => console.log("오류 알림 확인됨"),
    });
  };

  const handleWarning = () => {
    alert("이 작업은 되돌릴 수 없습니다.", {
      title: "경고",
      onConfirm: () => console.log("경고 알림 확인됨"),
    });
  };

  const handleInfo = () => {
    alert("새로운 기능이 추가되었습니다.", {
      title: "정보",
      onConfirm: () => console.log("정보 알림 확인됨"),
    });
  };

  // 커스텀 메시지로 알림
  const handleCustomAlert = () => {
    alert(testMessage, {
      title: "커스텀 알림",
      onConfirm: () => console.log("커스텀 알림 확인됨"),
    });
  };

  // 확인 다이얼로그들
  const handleDelete = () => {
    confirm(`정말로 ${itemName}을(를) 삭제하시겠습니까?`, {
      title: "삭제 확인",
      onConfirm: () => {
        console.log("삭제 확인됨");
        alert(`${itemName}이(가) 삭제되었습니다.`, {
          title: "성공",
          onConfirm: () => console.log("삭제 완료 알림 확인됨"),
        });
      },
      onCancel: () => {
        console.log("삭제 취소됨");
        alert("삭제가 취소되었습니다.", {
          title: "정보",
          onConfirm: () => console.log("삭제 취소 알림 확인됨"),
        });
      },
    });
  };

  const handleSave = () => {
    confirm("현재 변경사항을 저장하시겠습니까?", {
      title: "저장 확인",
      onConfirm: () => {
        console.log("저장 확인됨");
        alert("저장되었습니다.", {
          title: "성공",
          onConfirm: () => console.log("저장 완료 알림 확인됨"),
        });
      },
      onCancel: () => {
        console.log("저장 취소됨");
        alert("저장이 취소되었습니다.", {
          title: "정보",
          onConfirm: () => console.log("저장 취소 알림 확인됨"),
        });
      },
    });
  };

  const handleCancel = () => {
    confirm("작성 중인 내용이 사라집니다. 계속하시겠습니까?", {
      title: "취소 확인",
      onConfirm: () => {
        console.log("취소 확인됨");
        alert("작업이 취소되었습니다.", {
          title: "정보",
          onConfirm: () => console.log("취소 완료 알림 확인됨"),
        });
      },
      onCancel: () => {
        console.log("취소 취소됨");
        alert("작업을 계속합니다.", {
          title: "성공",
          onConfirm: () => console.log("작업 계속 알림 확인됨"),
        });
      },
    });
  };

  // 커스텀 다이얼로그
  const handleCustomDialog = () => {
    custom({
      title: "커스텀 다이얼로그",
      description: "이것은 커스텀 다이얼로그입니다.",
      content: (
        <div className="space-y-4">
          <p>여기에 원하는 내용을 넣을 수 있습니다.</p>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-sm">예시: 폼, 리스트, 차트 등</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-input">입력 필드</Label>
            <Input id="custom-input" placeholder="여기에 입력하세요" />
          </div>
        </div>
      ),
      size: "lg",
      onClose: () => console.log("커스텀 다이얼로그 닫힘"),
    });
  };

  // 폼이 있는 커스텀 다이얼로그
  const handleFormDialog = () => {
    custom({
      title: "사용자 정보 입력",
      description: "새로운 사용자 정보를 입력해주세요.",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="form-name">이름</Label>
            <Input id="form-name" placeholder="이름을 입력하세요" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="form-email">이메일</Label>
            <Input
              id="form-email"
              type="email"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="form-phone">전화번호</Label>
            <Input id="form-phone" placeholder="전화번호를 입력하세요" />
          </div>
        </div>
      ),
      footer: (
        <div className="flex gap-2">
          <Button variant="outline">취소</Button>
          <Button>저장</Button>
        </div>
      ),
      size: "md",
      onClose: () => console.log("폼 다이얼로그 닫힘"),
    });
  };

  // 큰 크기의 커스텀 다이얼로그
  const handleLargeDialog = () => {
    custom({
      title: "상세 정보",
      description: "더 많은 정보를 표시하는 큰 다이얼로그입니다.",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>이름</Label>
              <div className="p-2 bg-gray-100 rounded">홍길동</div>
            </div>
            <div className="space-y-2">
              <Label>나이</Label>
              <div className="p-2 bg-gray-100 rounded">30</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>주소</Label>
            <div className="p-2 bg-gray-100 rounded">
              서울시 강남구 테헤란로 123
            </div>
          </div>
          <div className="space-y-2">
            <Label>설명</Label>
            <div className="p-2 bg-gray-100 rounded h-20">
              여기에 긴 설명이 들어갑니다. 여러 줄의 텍스트를 표시할 수
              있습니다.
            </div>
          </div>
        </div>
      ),
      size: "xl",
      onClose: () => console.log("큰 다이얼로그 닫힘"),
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(ROUTES.TEST)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          테스트 센터로 돌아가기
        </Button>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">다이얼로그 테스트</h1>
        <p className="text-gray-600">
          다양한 다이얼로그 기능을 테스트해보세요.
        </p>
      </div>

      {/* 기본 알림 다이얼로그 */}
      <Card>
        <CardHeader>
          <CardTitle>기본 알림 다이얼로그</CardTitle>
          <CardDescription>
            성공, 에러, 경고, 정보 알림을 테스트합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleSuccess}
              className="bg-green-600 hover:bg-green-700"
            >
              성공 알림
            </Button>
            <Button onClick={handleError} variant="destructive">
              에러 알림
            </Button>
            <Button
              onClick={handleWarning}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              경고 알림
            </Button>
            <Button onClick={handleInfo} variant="outline">
              정보 알림
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="test-message">커스텀 메시지</Label>
            <div className="flex gap-2">
              <Input
                id="test-message"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="알림 메시지를 입력하세요"
              />
              <Button onClick={handleCustomAlert} variant="outline">
                커스텀 알림
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 확인 다이얼로그 */}
      <Card>
        <CardHeader>
          <CardTitle>확인 다이얼로그</CardTitle>
          <CardDescription>
            삭제, 저장, 취소 확인을 테스트합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleDelete} variant="destructive">
              삭제 확인
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              저장 확인
            </Button>
            <Button onClick={handleCancel} variant="outline">
              취소 확인
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="item-name">삭제할 항목명</Label>
            <div className="flex gap-2">
              <Input
                id="item-name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="삭제할 항목명을 입력하세요"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 커스텀 다이얼로그 */}
      <Card>
        <CardHeader>
          <CardTitle>커스텀 다이얼로그</CardTitle>
          <CardDescription>
            다양한 크기와 내용의 커스텀 다이얼로그를 테스트합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleCustomDialog}
              className="bg-purple-600 hover:bg-purple-700"
            >
              기본 커스텀
            </Button>
            <Button
              onClick={handleFormDialog}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              폼 다이얼로그
            </Button>
            <Button
              onClick={handleLargeDialog}
              className="bg-orange-600 hover:bg-orange-700"
            >
              큰 다이얼로그
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 테스트 결과 로그 */}
      <Card>
        <CardHeader>
          <CardTitle>테스트 로그</CardTitle>
          <CardDescription>
            콘솔에서 다이얼로그 동작을 확인하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded text-sm">
            <p>개발자 도구의 콘솔을 열어서 다이얼로그 동작을 확인하세요.</p>
            <p className="mt-2 text-gray-600">
              - 확인/취소 버튼 클릭 시 콘솔에 로그가 출력됩니다.
            </p>
            <p className="text-gray-600">
              - 각 다이얼로그의 콜백 함수가 정상적으로 실행되는지 확인하세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
