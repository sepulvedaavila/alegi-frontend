
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CaseFormValues } from '@/hooks/useCaseForm';

const AdditionalNotes = () => {
  const { control } = useFormContext<CaseFormValues>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="expectedOutcome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected Outcome</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What outcome do you expect or hope for in this case?"
                className="resize-none"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="additional_notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any other information that may be relevant to your case"
                className="resize-none"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default AdditionalNotes;
