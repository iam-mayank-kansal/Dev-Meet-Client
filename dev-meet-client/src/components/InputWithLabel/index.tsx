import { InputWithLabelProps } from "@/lib/interface";

export default function InputWithLabel({
  label,
  type = 'text',
  name,
  value,
  placeholder = '',
  required = false,
  onChange,
  minLength,
}: InputWithLabelProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}