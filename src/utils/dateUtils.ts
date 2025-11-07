/**
 * 날짜 포맷 유틸리티 함수 (한국 시간 기준)
 */

/**
 * UTC 날짜 문자열을 한국 시간으로 변환하여 포맷팅
 * @param dateString - UTC 날짜 문자열
 * @returns 포맷된 날짜 문자열 (예: "2024년 7월 20일 14:30")
 */
export const formatOrderDate = (dateString: string | undefined | null) => {
  if (!dateString) return "-";

  const utcString = dateString.endsWith("Z") ? dateString : dateString + "Z";
  const date = new Date(utcString);
  const koreaTimeOffset = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(date.getTime() + koreaTimeOffset);

  const year = koreaTime.getUTCFullYear();
  const month = koreaTime.getUTCMonth() + 1;
  const day = koreaTime.getUTCDate();
  const hours = koreaTime.getUTCHours();
  const minutes = koreaTime.getUTCMinutes();

  return `${year}년 ${month}월 ${day}일 ${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};

/**
 * UTC 날짜 문자열을 한국 시간으로 변환하여 배송 예정일 계산 (3일 후)
 * @param dateString - UTC 날짜 문자열
 * @returns 포맷된 배송 예정일 문자열 (예: "2024년 7월 23일 (화)")
 */
export const formatDeliveryDate = (dateString: string | undefined | null) => {
  if (!dateString) return "-";

  const utcString = dateString.endsWith("Z") ? dateString : dateString + "Z";
  const date = new Date(utcString);
  const koreaTimeOffset = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(date.getTime() + koreaTimeOffset);

  // 3일 추가
  koreaTime.setUTCDate(koreaTime.getUTCDate() + 3);

  const year = koreaTime.getUTCFullYear();
  const month = koreaTime.getUTCMonth() + 1;
  const day = koreaTime.getUTCDate();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[koreaTime.getUTCDay()];

  return `${year}년 ${month}월 ${day}일 (${weekday})`;
};

/**
 * UTC 날짜 문자열을 한국 시간으로 변환하여 "YYYY-MM-DD 오전/오후" 형식으로 포맷팅
 * @param dateString - UTC 날짜 문자열
 * @returns 포맷된 날짜 문자열 (예: "2024-07-20 오후 2:30")
 */
export const formatOrderDateTime = (
  dateString: string | undefined | null,
) => {
  if (!dateString) return "-";

  const utcString = dateString.endsWith("Z") ? dateString : dateString + "Z";
  const date = new Date(utcString);
  const koreaTimeOffset = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(date.getTime() + koreaTimeOffset);

  const year = koreaTime.getUTCFullYear();
  const month = String(koreaTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(koreaTime.getUTCDate()).padStart(2, "0");
  const hours = koreaTime.getUTCHours();
  const minutes = String(koreaTime.getUTCMinutes()).padStart(2, "0");

  const period = hours < 12 ? "오전" : "오후";
  const displayHours = hours % 12 || 12;

  return `${year}-${month}-${day} ${period} ${displayHours}:${minutes}`;
};

/**
 * UTC 날짜 문자열을 한국 시간으로 변환하여 날짜만 포맷팅 (시간 제외)
 * @param dateString - UTC 날짜 문자열
 * @returns 포맷된 날짜 문자열 (예: "2024-07-20")
 */
export const formatDateOnly = (dateString: string | undefined | null) => {
  if (!dateString) return "-";

  const utcString = dateString.endsWith("Z") ? dateString : dateString + "Z";
  const date = new Date(utcString);
  const koreaTimeOffset = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(date.getTime() + koreaTimeOffset);

  const year = koreaTime.getUTCFullYear();
  const month = String(koreaTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(koreaTime.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
