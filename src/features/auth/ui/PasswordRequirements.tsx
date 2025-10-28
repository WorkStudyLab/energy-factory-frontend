interface PasswordRequirementsProps {
  validation: {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

export const PasswordRequirements = ({
  validation,
}: PasswordRequirementsProps) => {
  return (
    <div className="bg-[#f4f5f6] rounded-[10px] px-6 py-3">
      <p className="text-sm font-semibold text-black mb-2">
        비밀번호 요구 사항
      </p>
      <ul className="space-y-1 text-sm">
        <li className="flex items-center gap-2">
          <span
            className={
              validation.minLength ? "text-green-600" : "text-gray-500"
            }
          >
            • 8자 이상 입력해주세요
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span
            className={
              validation.hasUpperCase ? "text-green-600" : "text-gray-500"
            }
          >
            • 대문자 포함
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span
            className={
              validation.hasLowerCase ? "text-green-600" : "text-gray-500"
            }
          >
            • 소문자 포함
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span
            className={validation.hasNumber ? "text-green-600" : "text-gray-500"}
          >
            • 숫자 포함
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span
            className={
              validation.hasSpecialChar ? "text-green-600" : "text-gray-500"
            }
          >
            • 특수문자 포함
          </span>
        </li>
      </ul>
    </div>
  );
};
