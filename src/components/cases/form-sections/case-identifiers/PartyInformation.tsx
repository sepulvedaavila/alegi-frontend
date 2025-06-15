
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { CaseFormValues } from '@/hooks/useCaseForm';
import PartyField from './PartyField';

const PartyInformation = () => {
  const { control, setValue, watch } = useFormContext<CaseFormValues>();
  
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

  const {
    fields: attorneyFields,
    append: appendAttorney,
    remove: removeAttorney
  } = useFieldArray({
    control,
    name: "attorneysOfRecord"
  });

  const plaintiffs = watch("plaintiffs");
  const defendants = watch("defendants");

  // Automatically update case name when plaintiffs or defendants change
  useEffect(() => {
    const validPlaintiffs = plaintiffs?.filter(p => p.name && p.name.trim() !== '') || [];
    const validDefendants = defendants?.filter(d => d.name && d.name.trim() !== '') || [];
    
    // Update case name immediately when typing plaintiff or defendant names
    if (validPlaintiffs.length > 0 || validDefendants.length > 0) {
      const plaintiffNames = validPlaintiffs.length > 0 
        ? (validPlaintiffs.length > 1 ? `${validPlaintiffs[0].name} et al.` : validPlaintiffs[0].name)
        : '[Plaintiff]';
      
      const defendantNames = validDefendants.length > 0
        ? (validDefendants.length > 1 ? `${validDefendants[0].name} et al.` : validDefendants[0].name)
        : '[Defendant]';
      
      setValue("caseName", `${plaintiffNames} v. ${defendantNames}`);
    }
  }, [plaintiffs, defendants, setValue]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">Parties Involved</h3>
        <p className="text-sm text-gray-500">Individuals or entities involved in the case</p>
      </div>

      <div className="space-y-4">
        <PartyField
          type="plaintiffs"
          label="Plaintiff(s)"
          required={true}
          fields={plaintiffFields}
          append={appendPlaintiff}
          remove={removePlaintiff}
        />

        <PartyField
          type="defendants"
          label="Defendant(s)"
          required={true}
          fields={defendantFields}
          append={appendDefendant}
          remove={removeDefendant}
        />

        <PartyField
          type="attorneysOfRecord"
          label="Attorney"
          fields={attorneyFields}
          append={appendAttorney}
          remove={removeAttorney}
          showBarIdField={true}
        />
      </div>
    </div>
  );
};

export default PartyInformation;
