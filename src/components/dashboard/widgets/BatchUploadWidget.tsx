
import { Upload, FileSpreadsheet } from 'lucide-react';

const BatchUploadWidget = () => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Batch Upload</h4>
        <button className="text-xs text-alegi-blue hover:underline">Help</button>
      </div>
      
      <div className="border border-dashed border-gray-300 rounded-md p-3 text-center">
        <FileSpreadsheet className="mx-auto text-gray-400 mb-1" size={18} />
        <p className="text-xs text-gray-600">
          Upload CSV or JSON files with multiple cases
        </p>
        <button className="mt-2 bg-alegi-blue text-white text-xs px-3 py-1 rounded">
          Select Files
        </button>
      </div>
      
      <div className="text-xs text-gray-500">
        <p>Supported formats: CSV, XLSX, JSON</p>
        <a href="#" className="text-alegi-blue hover:underline">Download template</a>
      </div>
    </div>
  );
};

export default BatchUploadWidget;
