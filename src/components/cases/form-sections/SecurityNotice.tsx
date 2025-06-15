
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

const SecurityNotice = () => {
  return (
    <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 rounded-lg">
      <Shield className="h-5 w-5 text-blue-500 dark:text-blue-300 mr-2" />
      <AlertDescription className="text-blue-700 dark:text-blue-200 text-sm">
        Your information is secure. We maintain strict confidentiality of all case details.
      </AlertDescription>
    </Alert>
  );
};

export default SecurityNotice;
