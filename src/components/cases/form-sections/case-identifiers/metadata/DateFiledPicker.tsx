
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CaseFormValues } from '@/hooks/useCaseForm';
import { cn } from '@/lib/utils';

const DateFiledPicker = () => {
  const { getValues, setValue, watch, formState: { errors } } = useFormContext<CaseFormValues>();
  
  const caseStage = watch("caseStage");

  return (
    <div className="space-y-2">
      <label htmlFor="dateFiled" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Date Filed {caseStage !== "Assessing filing" && <span className="text-red-500">*</span>}
      </label>
      {caseStage === "Assessing filing" ? (
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          disabled={true}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>Not required for assessment</span>
        </Button>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !getValues("dateFiled") && "text-muted-foreground",
                errors.dateFiled && "border-red-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {getValues("dateFiled") ? (
                format(getValues("dateFiled"), "PPP")
              ) : (
                <span>Select date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={getValues("dateFiled")}
              onSelect={(date) => setValue("dateFiled", date as Date)}
              disabled={(date) => date > new Date()}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      )}
      {errors.dateFiled && (
        <p className="text-sm text-red-500">{errors.dateFiled.message as string}</p>
      )}
    </div>
  );
};

export default DateFiledPicker;
