
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CaseFormValues } from '@/hooks/useCaseForm';
import { FieldErrorsImpl } from 'react-hook-form';

interface PartyFieldListProps {
  type: 'plaintiffs' | 'defendants';
  label: string;
  description: string;
  fields: Record<string, any>[];
  append: (value: any) => void;
  remove: (index: number) => void;
  errors?: FieldErrorsImpl<CaseFormValues>[keyof FieldErrorsImpl<CaseFormValues>];
}

const PartyFieldList = ({
  type,
  label,
  description,
  fields,
  append,
  remove,
  errors
}: PartyFieldListProps) => {
  const { register } = useFormContext<CaseFormValues>();

  const handleAddParty = () => {
    append({ name: '' });
  };

  const itemLabel = type === 'plaintiffs' ? 'Plaintiff' : 'Defendant';

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{label}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <Input
            {...register(`${type}.${index}.name` as const, { required: `${itemLabel} name is required` })}
            placeholder={`Full name${type === 'defendants' ? ' or entity name' : ''}`}
            className={cn(
              "flex-1",
              errors && errors[index]?.name && "border-red-500"
            )}
          />
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
      ))}
      
      {errors && (
        <p className="text-sm text-red-500">
          {Array.isArray(errors) 
            ? "All fields are required" 
            : errors.message}
        </p>
      )}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddParty}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another {itemLabel}
      </Button>
    </div>
  );
};

export default PartyFieldList;
