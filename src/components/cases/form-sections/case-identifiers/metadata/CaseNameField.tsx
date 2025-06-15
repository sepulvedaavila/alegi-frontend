
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { CaseFormValues } from '@/hooks/useCaseForm';

const CaseNameField = () => {
  const { getValues } = useFormContext<CaseFormValues>();

  return (
    <div className="space-y-2">
      <label htmlFor="caseName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Case Name <span className="text-gray-400 dark:text-gray-500">(Auto-generated)</span>
      </label>
      <Input
        id="caseName"
        readOnly
        value={getValues("caseName") || "Will be generated from parties"}
        className="bg-gray-100 dark:bg-gray-800"
      />
    </div>
  );
};

export default CaseNameField;
