
import { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Upload, FileText, X } from 'lucide-react';
import { CaseFormValues } from '@/hooks/useCaseForm';
import { evidenceTypes } from '@/utils/evidenceUtils';

interface EvidenceItemProps {
  index: number;
  remove: (index: number) => void;
  canDelete: boolean;
}

const EvidenceItem = ({ index, remove, canDelete }: EvidenceItemProps) => {
  const { control, formState: { errors }, setValue, watch } = useFormContext<CaseFormValues>();
  const [selectedFile, setSelectedFile] = useState<File | null>(watch(`evidence.${index}.file`) || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setValue(`evidence.${index}.file`, file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValue(`evidence.${index}.file`, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-medium">Evidence #{index + 1}</h3>
        {canDelete && (
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={() => remove(index)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} className="mr-1" />
            Remove
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FormField
            control={control}
            name={`evidence.${index}.type`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Evidence Type <span className="text-red-500">*</span></FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className={errors?.evidence?.[index]?.type ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select evidence type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {evidenceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors?.evidence?.[index]?.type && (
                  <FormMessage>
                    {String(errors.evidence[index]?.type || 'Evidence type is required')}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={control}
            name={`evidence.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the evidence..."
                    className={`resize-none ${errors?.evidence?.[index]?.description ? "border-red-500" : ""}`}
                    {...field}
                  />
                </FormControl>
                {errors?.evidence?.[index]?.description && (
                  <FormMessage>
                    {String(errors.evidence[index]?.description || 'Description is required')}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="mt-4">
        <FormLabel htmlFor={`evidence-file-${index}`} className="block mb-2">Upload File (Optional)</FormLabel>
        <input
          ref={fileInputRef}
          id={`evidence-file-${index}`}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
        
        {selectedFile ? (
          <div className="flex items-center justify-between p-2 bg-gray-100 border rounded">
            <div className="flex items-center space-x-2">
              <FileText size={16} className="text-blue-500" />
              <span className="text-sm truncate max-w-xs">{selectedFile.name}</span>
              <span className="text-xs text-gray-500">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={16} />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full justify-start text-left font-normal"
          >
            <Upload size={16} className="mr-2" />
            Choose file...
          </Button>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Accepted file types: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
        </p>
      </div>
    </div>
  );
};

export default EvidenceItem;
