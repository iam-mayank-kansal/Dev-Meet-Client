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

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  age?: string;
  dob?: string; // or `Date` if you're storing it as an actual date
}