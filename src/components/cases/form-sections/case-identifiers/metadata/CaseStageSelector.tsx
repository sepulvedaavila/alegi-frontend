
import { useFormContext } from 'react-hook-form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CaseFormValues } from '@/hooks/useCaseForm';
import { cn } from '@/lib/utils';
import { caseStages } from '@/utils/jurisdictionUtils';

const CaseStageSelector = () => {
  const { setValue, getValues, formState: { errors } } = useFormContext<CaseFormValues>();

  return (
    <div className="space-y-2">
      <label htmlFor="caseStage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Case Stage <span className="text-red-500">*</span>
      </label>
      <Select 
        onValueChange={(value) => setValue("caseStage", value)}
        defaultValue={getValues("caseStage")}
      >
        <SelectTrigger className={cn(errors.caseStage && "border-red-500")}>
          <SelectValue placeholder="Select case stage" />
        </SelectTrigger>
        <SelectContent>
          {caseStages.map((stage) => (
            <SelectItem key={stage} value={stage}>
              {stage}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.caseStage && (
        <p className="text-sm text-red-500">{errors.caseStage.message}</p>
      )}
    </div>
  );
};

export default CaseStageSelector;
