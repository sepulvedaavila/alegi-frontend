
import { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadFieldProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFiles: File[];
}

const FileUploadField = ({ onFileChange, selectedFiles }: FileUploadFieldProps) => {
  const [hovering, setHovering] = useState(false);
  
  return (
    <div>
      <div className="mt-2">
        <label 
          htmlFor="file-upload" 
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md transition-colors cursor-pointer
            ${hovering 
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800'}`}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className={`w-8 h-8 mb-2 ${hovering ? 'text-blue-500' : 'text-gray-400'}`} />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Any file type (Max 100MB)</p>
          </div>
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            multiple 
            onChange={onFileChange}
          />
        </label>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected files:</p>
          <ul className="space-y-1">
            {selectedFiles.map((file, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="flex items-center">
                  <FileText size={16} className="text-blue-500 mr-2" />
                  <span className="truncate max-w-xs">{file.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500 p-1 h-auto"
                  onClick={() => {
                    const newFiles = [...selectedFiles];
                    newFiles.splice(index, 1);
                    // Simulate the change event
                    const event = {
                      target: {
                        files: newFiles.length ? newFiles : null
                      }
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    onFileChange(event);
                  }}
                >
                  <X size={16} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadField;
