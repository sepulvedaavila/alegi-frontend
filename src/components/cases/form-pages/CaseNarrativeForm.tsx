
import { useFormContext } from 'react-hook-form';
import { CaseFormValues } from '@/hooks/useCaseForm';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import FormSectionLayout from '../form-sections/FormSectionLayout';

const CaseNarrativeForm = () => {
  const { control } = useFormContext<CaseFormValues>();

  return (
    <div className="space-y-6">
      <FormSectionLayout>
        <FormField
          control={control}
          name="caseNarrative"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">Tell us your claim <span className="text-red-500">*</span></FormLabel>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Describe what happened and when it occurred in detail. If you've taken any legal steps, please mention them.
              </p>
              <FormControl>
                <Textarea 
                  placeholder="On [Date], [describe the events]. I [have/have not] filed yet..." 
                  className="min-h-[150px] resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSectionLayout>
      
      <FormSectionLayout>
        <FormField
          control={control}
          name="expectedOutcome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">What's your goal? <span className="text-red-500">*</span></FormLabel>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                What outcome are you seeking by pursuing this matter?
              </p>
              <FormControl>
                <Textarea 
                  placeholder="I want to be compensated in the amount of..." 
                  className="min-h-[100px] resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSectionLayout>
    </div>
  );
};

export default CaseNarrativeForm;
