
import SecurityNotice from './SecurityNotice';
import CaseMetadata from './case-identifiers/CaseMetadata';
import PartyInformation from './case-identifiers/PartyInformation';

const CaseIdentifiersForm = () => {
  return (
    <div className="space-y-8">
      <SecurityNotice />
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">Case Identifiers & Metadata</h2>
        <p className="text-sm text-gray-500">Basic information to identify and categorize the case</p>
      </div>

      <CaseMetadata />
      <PartyInformation />
    </div>
  );
};

export default CaseIdentifiersForm;
