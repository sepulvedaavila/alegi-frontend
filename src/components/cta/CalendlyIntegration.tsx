
import { useCalendly } from '../../hooks/useCalendly';

interface CalendlyIntegrationProps {
  showCalendly: boolean;
}

const CalendlyIntegration = ({ showCalendly }: CalendlyIntegrationProps) => {
  // Use our custom hook instead of inline useEffect
  useCalendly(showCalendly);
  
  return null;
};

export default CalendlyIntegration;
