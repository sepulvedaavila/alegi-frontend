
import { useFormContext } from 'react-hook-form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CaseFormValues } from '@/hooks/useCaseForm';
import { caseTypes } from '@/utils/jurisdictionUtils';

const CaseTypeSelector = () => {
  const { setValue, getValues } = useFormContext<CaseFormValues>();

  return (
    <div className="space-y-2">
      <label htmlFor="caseType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Case Type
      </label>
      <Select 
        onValueChange={(value) => setValue("caseType", value)}
        defaultValue={getValues("caseType")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select case type" />
        </SelectTrigger>
        <SelectContent>
          {caseTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CaseTypeSelector;
