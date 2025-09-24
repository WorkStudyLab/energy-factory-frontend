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
}: LabelInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
      />
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};
