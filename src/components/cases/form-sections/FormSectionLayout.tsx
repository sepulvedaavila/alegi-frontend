
import { ReactNode } from 'react';

interface FormSectionLayoutProps {
  children: ReactNode;
}

const FormSectionLayout = ({ children }: FormSectionLayoutProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
      {children}
    </div>
  );
};

export default FormSectionLayout;
