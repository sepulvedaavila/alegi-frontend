
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CaseFormValues } from '@/hooks/useCaseForm';
import SecurityNotice from './SecurityNotice';

const LegalArgumentsForm = () => {
  const { control } = useFormContext<CaseFormValues>();
  
  return (
    <div className="space-y-8">
      <SecurityNotice />
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Legal Arguments</h2>
        <p className="text-sm text-gray-500 mb-6">
          Document applicable laws related to your case
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <FormField
            control={control}
            name="applicableLaw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applicable Law</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter any statutes, regulations, or case law that apply to this case"
                    className="resize-none min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default LegalArgumentsForm;
