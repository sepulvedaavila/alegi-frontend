
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CaseFormValues } from '@/hooks/useCaseForm';
import SecurityNotice from './SecurityNotice';
import EvidenceItem from './evidence/EvidenceItem';
import AdditionalNotes from './evidence/AdditionalNotes';

const EvidenceForm = () => {
  const { control } = useFormContext<CaseFormValues>();
  
  const { fields, append, remove } = useFieldArray({
    name: 'evidence',
    control,
  });

  return (
    <div className="space-y-8">
      <SecurityNotice />
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Evidence</h2>
        <p className="text-sm text-gray-500 mb-6">
          Document the key pieces of evidence in your case
        </p>
      </div>

      {fields.map((field, index) => (
        <EvidenceItem 
          key={field.id} 
          index={index} 
          remove={remove} 
          canDelete={index > 0}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append({ type: '', description: '', file: null })}
        className="w-full"
      >
        <Plus size={16} className="mr-2" />
        Add Another Piece of Evidence
      </Button>

      <AdditionalNotes />
    </div>
  );
};

export default EvidenceForm;
