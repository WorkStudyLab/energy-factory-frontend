import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LabelInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
}

/**
 * 라벨과 인풋을 함께 표시하는 컴포넌트
 */
export const LabelInput = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  description,
  disabled = false,
}: LabelInputProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <Label htmlFor={id} className="text-sm font-medium text-neutral-900">
          {label}
        </Label>
        {required && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-red-500">*</span>
            <span className="text-sm font-medium text-neutral-500">필수</span>
          </div>
        )}
      </div>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className={`h-9 rounded-lg border-neutral-200 ${
          disabled
            ? "bg-gray-100 text-gray-600 cursor-not-allowed opacity-70"
            : ""
        }`}
      />
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};
