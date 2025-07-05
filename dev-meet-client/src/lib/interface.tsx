export interface InputWithLabelProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}