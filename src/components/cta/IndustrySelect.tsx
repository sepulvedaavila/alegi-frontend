
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IndustrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  touched?: boolean;
}

const IndustrySelect: React.FC<IndustrySelectProps> = ({ 
  value, 
  onValueChange, 
  error,
  touched 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="industry">
        Industry <span className="text-red-500">*</span>
      </Label>
      <Select
        value={value || ""}
        onValueChange={onValueChange}
        required
      >
        <SelectTrigger 
          id="industry" 
          className={`w-full ${touched && error ? 'border-red-500' : ''}`}
        >
          <SelectValue placeholder="Select your industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Solo Lawyer">Solo Lawyer</SelectItem>
          <SelectItem value="Small Firm">Small Firm</SelectItem>
          <SelectItem value="Large Firm">Large Firm</SelectItem>
          <SelectItem value="In-House Counsel">In-House Counsel</SelectItem>
          <SelectItem value="Insurance">Insurance</SelectItem>
          <SelectItem value="Self-Litigant">Self-Litigant</SelectItem>
        </SelectContent>
      </Select>
      {touched && error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default IndustrySelect;

