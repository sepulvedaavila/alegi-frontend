
import CaseNameField from './metadata/CaseNameField';
import CaseNumberField from './metadata/CaseNumberField';
import CaseTypeSelector from './metadata/CaseTypeSelector';
import CaseStageSelector from './metadata/CaseStageSelector';
import JurisdictionSelector from './metadata/JurisdictionSelector';
import DateFiledPicker from './metadata/DateFiledPicker';

const CaseMetadata = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CaseNameField />
      <CaseNumberField />
      <CaseTypeSelector />
      <CaseStageSelector />
      <JurisdictionSelector />
      <DateFiledPicker />
    </div>
  );
};

export default CaseMetadata;
