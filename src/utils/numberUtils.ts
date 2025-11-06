/**
 * 전화번호를 하이픈 포함 형식으로 변환합니다.
 * @param phoneNumber - 하이픈 없는 전화번호 (예: "01012345678")
 * @returns 하이픈 포함 전화번호 (예: "010-1234-5678")
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // 숫자만 추출
  const numbers = phoneNumber.replace(/[^0-9]/g, '');

  // 전화번호 길이에 따라 포맷팅
  if (numbers.length === 11) {
    // 형식: 010-1234-5678
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  } else if (numbers.length === 10) {
    // 형식: 010-123-4567 또는 02-1234-5678
    if (numbers.startsWith('02')) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    }
  } else if (numbers.length === 9 && numbers.startsWith('02')) {
    // 형식: 02-123-4567
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 5)}-${numbers.slice(5)}`;
  }

  // 포맷팅할 수 없는 경우 원본 반환
  return phoneNumber;
}
