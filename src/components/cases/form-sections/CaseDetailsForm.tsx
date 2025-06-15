import { useFormContext, useFieldArray } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { CaseFormValues } from '@/hooks/useCaseForm';
import { cn } from '@/lib/utils';
import { UploadCloud, Plus, Trash2, FileText, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SecurityNotice from './SecurityNotice';

const CaseDetailsForm = () => {
  const { register, formState: { errors }, setValue, getValues, watch } = useFormContext<CaseFormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle legal issues/causes of action
  const { fields: legalIssueFields, append: appendIssue, remove: removeIssue } = useFieldArray({
    name: 'legalIssues',
    keyName: 'id',
  });

  // For file uploads
  const [selectedFiles, setSelectedFiles] = useState<File[]>(
    (getValues('supportingDocuments') || []).filter((f): f is File => !!f)
  );
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...selectedFiles, ...newFiles];
      setSelectedFiles(updatedFiles);
      setValue('supportingDocuments', updatedFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    setValue('supportingDocuments', newFiles);
  };
  
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-8">
      <SecurityNotice />
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">Case Details</h2>
        <p className="text-sm text-gray-500">Comprehensive description of the case and its history</p>
      </div>

      {/* Causes of Action section */}
      <div className="space-y-4 pt-2 pb-6 border-b border-gray-200">
        <div>
          <h3 className="text-md font-medium mb-2">Causes of Action</h3>
          <p className="text-xs text-gray-500 mb-4">
            List the legal claims or issues in your case (e.g., breach of contract, negligence, etc.). You can describe in your own words.
          </p>
          
          {legalIssueFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-3">
              <Input 
                placeholder={`Cause of Action #${index + 1}`} 
                {...register(`legalIssues.${index}`)}
                className={cn(
                  errors.legalIssues?.[index] && "border-red-500"
                )}
              />
              
              {index > 0 && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeIssue(index)}
                  className="h-10 w-10 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          ))}
          
          {errors.legalIssues && (
            <p className="text-sm text-red-500 mb-2">{errors.legalIssues.message as string}</p>
          )}
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendIssue('')}
            className="mt-2"
          >
            <Plus size={16} className="mr-2" />
            Add Another Cause of Action
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="caseNarrative" className="block text-sm font-medium text-gray-700">
            Case Narrative <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500">
            Provide a chronological, detailed description of events leading to the dispute.
          </p>
          <Textarea
            id="caseNarrative"
            placeholder="Describe the facts and events of the case in detail..."
            className={cn(
              "min-h-[150px]",
              errors.caseNarrative && "border-red-500"
            )}
            {...register("caseNarrative")}
          />
          {errors.caseNarrative && (
            <p className="text-sm text-red-500">{errors.caseNarrative.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="supportingDocs" className="block text-sm font-medium text-gray-700">
            Supporting Documents
          </label>
          <p className="text-xs text-gray-500">
            Upload PDFs or Word documents that provide additional context or evidence.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
            <div className="flex flex-col items-center">
              <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">Drag & drop files here, or click to select files</p>
              <input
                ref={fileInputRef}
                id="supportingDocs"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.rtf"
              />
              <button
                type="button"
                onClick={openFileDialog}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Select Files
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Allowed file types: PDF, DOC, DOCX, TXT, RTF (Max 10MB per file)
              </p>
            </div>
            
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files</h4>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <FileText size={16} className="text-blue-500" />
                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <label htmlFor="historyNarrative" className="block text-sm font-medium text-gray-700">
            History Narrative
          </label>
          <p className="text-xs text-gray-500">
            Describe lower court decisions, motions filed, appeals, etc.
          </p>
          <Textarea
            id="historyNarrative"
            placeholder="Provide details about the procedural history of the case..."
            className="min-h-[150px]"
            {...register("historyNarrative")}
          />
        </div>

        <div className="space-y-2 pt-4">
          <label htmlFor="applicableLaw" className="block text-sm font-medium text-gray-700">
            Applicable Law
          </label>
          <p className="text-xs text-gray-500">
            List statutes, regulations, case law, or other legal authorities relevant to your case.
          </p>
          <Textarea
            id="applicableLaw"
            placeholder="Include relevant statutes, cases, or other legal authorities..."
            className="min-h-[150px]"
            {...register("applicableLaw")}
          />
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsForm;
