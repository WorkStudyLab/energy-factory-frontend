/**
 * 20자리의 랜덤 문자열을 생성합니다.
 */
function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

export default generateRandomString;
