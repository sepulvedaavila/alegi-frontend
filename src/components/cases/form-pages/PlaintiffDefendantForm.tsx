
import { useFormContext } from 'react-hook-form';
import { CaseFormValues } from '@/hooks/useCaseForm';
import { useFieldArray } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { states } from '@/utils/jurisdictionUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import PartyFieldList from '../form-sections/party-information/PartyFieldList';

const PlaintiffDefendantForm = () => {
  const { control, register, formState: { errors } } = useFormContext<CaseFormValues>();

  // Setup field arrays for multiple plaintiffs and defendants
  const {
    fields: plaintiffFields,
    append: appendPlaintiff,
    remove: removePlaintiff
  } = useFieldArray({
    control,
    name: "plaintiffs"
  });

  const {
    fields: defendantFields,
    append: appendDefendant,
    remove: removeDefendant
  } = useFieldArray({
    control,
    name: "defendants"
  });

  return (
    <div className="space-y-6">
      <PartyFieldList
        type="plaintiffs"
        label="Plaintiff Information"
        description="Who is bringing this case forward?"
        fields={plaintiffFields}
        append={appendPlaintiff}
        remove={removePlaintiff}
        errors={errors.plaintiffs}
      />

      <PartyFieldList
        type="defendants"
        label="Defendant Information"
        description="Who is defending the claim?"
        fields={defendantFields}
        append={appendDefendant}
        remove={removeDefendant}
        errors={errors.defendants}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Jurisdiction</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Where did the claim happen?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="stateJurisdiction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State <span className="text-red-500">*</span></FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="countyJurisdiction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City/County <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter city or county" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      
      <input type="hidden" {...register('caseStage')} value="Assessing filing" />
    </div>
  );
};

export default PlaintiffDefendantForm;
