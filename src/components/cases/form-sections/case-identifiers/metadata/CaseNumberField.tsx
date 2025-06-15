
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { CaseFormValues } from '@/hooks/useCaseForm';

const CaseNumberField = () => {
  const { register } = useFormContext<CaseFormValues>();

  return (
    <div className="space-y-2">
      <label htmlFor="caseNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Citation/Case Number
      </label>
      <Input
        id="caseNumber"
        placeholder="e.g., CV-2023-12345"
        {...register("caseNumber")}
      />
    </div>
  );
};

export default CaseNumberField;
