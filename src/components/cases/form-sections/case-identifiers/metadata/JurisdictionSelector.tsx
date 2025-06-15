
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CaseFormValues } from '@/hooks/useCaseForm';
import { cn } from '@/lib/utils';
import { states, stateCountiesMap } from '@/utils/jurisdictionUtils';

const JurisdictionSelector = () => {
  const { register, setValue, getValues, watch, formState: { errors } } = useFormContext<CaseFormValues>();
  
  const stateJurisdiction = watch("stateJurisdiction");
  const counties = stateJurisdiction ? stateCountiesMap[stateJurisdiction] || [] : [];
  
  useEffect(() => {
    const county = getValues("countyJurisdiction");
    if (stateJurisdiction && county) {
      if (stateJurisdiction === "Federal") {
        setValue("jurisdiction", `Federal - ${county}`);
      } else {
        setValue("jurisdiction", `${stateJurisdiction} - ${county} County`);
      }
    } else if (stateJurisdiction) {
      setValue("jurisdiction", stateJurisdiction);
    }
  }, [stateJurisdiction, getValues, setValue]);

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="stateJurisdiction" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          State <span className="text-red-500">*</span>
        </label>
        <Select 
          onValueChange={(value) => {
            setValue("stateJurisdiction", value);
            setValue("countyJurisdiction", "");
          }}
          defaultValue={getValues("stateJurisdiction")}
        >
          <SelectTrigger className={cn(errors.stateJurisdiction && "border-red-500")}>
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.stateJurisdiction && (
          <p className="text-sm text-red-500">{errors.stateJurisdiction.message}</p>
        )}
      </div>

      {stateJurisdiction && counties.length > 0 && (
        <div className="space-y-2">
          <label htmlFor="countyJurisdiction" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {stateJurisdiction === "Federal" ? "District" : "County"}
          </label>
          <Select 
            onValueChange={(value) => setValue("countyJurisdiction", value)}
            defaultValue={getValues("countyJurisdiction")}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${stateJurisdiction === "Federal" ? "district" : "county"}`} />
            </SelectTrigger>
            <SelectContent>
              {counties.map((county) => (
                <SelectItem key={county} value={county}>
                  {county}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" {...register("jurisdiction")} />
        </div>
      )}
    </>
  );
};

export default JurisdictionSelector;
