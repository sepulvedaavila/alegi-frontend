
import React from 'react';
import { FormFieldProps } from './FormTypes';
import { AlertCircle } from 'lucide-react';

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  required = true,
  type = 'text',
  label
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-alegi-blue focus:border-alegi-blue transition-colors ${
          touched && error ? 'border-red-500' : 'border-gray-300'
        }`}
        required={required}
      />
      {touched && error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
