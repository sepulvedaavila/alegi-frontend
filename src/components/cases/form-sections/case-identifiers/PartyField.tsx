
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CaseFormValues } from '@/hooks/useCaseForm';

interface PartyFieldProps {
  type: 'plaintiffs' | 'defendants' | 'attorneysOfRecord';
  label: string;
  required?: boolean;
  fields: Record<string, any>[];
  append: (value: any) => void;
  remove: (index: number) => void;
  showBarIdField?: boolean;
}

const PartyField = ({ 
  type, 
  label, 
  required = false, 
  fields, 
  append, 
  remove,
  showBarIdField = false
}: PartyFieldProps) => {
  const { register, formState: { errors } } = useFormContext<CaseFormValues>();

  // Define more descriptive labels based on party type
  const getItemLabel = () => {
    switch (type) {
      case 'attorneysOfRecord':
        return 'Attorney of Record';
      case 'plaintiffs':
        return 'Plaintiff';
      case 'defendants':
        return 'Defendant';
      default:
        return 'Party';
    }
  };

  const itemLabel = getItemLabel();
  
  const handleAddParty = () => {
    if (type === 'attorneysOfRecord' && showBarIdField) {
      append({ name: '', bar_id: '' });
    } else {
      append({ name: '' });
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder={`${itemLabel} ${index + 1} name`}
              {...register(`${type}.${index}.name` as const)}
              className={cn(
                "flex-1",
                errors[type]?.[index]?.name && "border-red-500"
              )}
            />
            
            {showBarIdField && (
              <Input
                placeholder="Bar ID (optional)"
                {...register(`${type}.${index}.bar_id` as any)}
                className="flex-1"
              />
            )}
            
            {fields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {errors[type]?.[index]?.name && (
            <p className="text-sm text-red-500">{errors[type]?.[index]?.name?.message}</p>
          )}
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={handleAddParty}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {itemLabel}
      </Button>
    </div>
  );
};

export default PartyField;
