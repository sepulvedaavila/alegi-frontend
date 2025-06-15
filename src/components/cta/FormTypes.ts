
export interface FormData {
  name: string;
  company: string;
  telephone: string;
  email: string;
  industry?: string;
}

export interface ValidationErrors {
  [key: string]: string | undefined;
}

export interface FormFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  placeholder: string;
  error?: string;
  touched: boolean;
  required?: boolean;
  type?: string;
  label: string;
}
