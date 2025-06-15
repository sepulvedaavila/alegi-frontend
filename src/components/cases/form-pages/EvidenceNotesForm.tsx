
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { CaseFormValues } from '@/hooks/useCaseForm';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import FormSectionLayout from '../form-sections/FormSectionLayout';
import FileUploadField from '../form-sections/evidence/FileUploadField';

const EvidenceNotesForm = () => {
  const { control, register, setValue } = useFormContext<CaseFormValues>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
      setValue('supportingDocuments', filesArray);
    }
  };

  return (
    <div className="space-y-6">
      <FormSectionLayout>
        <FormField
          control={control}
          name="evidence.0.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">What evidence do you have?</FormLabel>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Please describe any documents, photos, communications, or other things that support your account. You can upload them here.
              </p>
              <FormControl>
                <Textarea 
                  placeholder="I have [e.g., emails, photos of damage, a police report, witness statements]." 
                  className="min-h-[100px] resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="mt-4">
          <input 
            type="hidden" 
            {...register('evidence.0.type')} 
            value="Documentation" 
          />
          
          <FileUploadField 
            onFileChange={handleFileChange}
            selectedFiles={selectedFiles}
          />
        </div>
      </FormSectionLayout>
      
      <FormSectionLayout>
        <FormField
          control={control}
          name="additional_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">Additional Notes</FormLabel>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Is there anything else you think is important for us to know about this situation?
              </p>
              <FormControl>
                <Textarea 
                  placeholder="Any other details or context?" 
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

export default EvidenceNotesForm;
