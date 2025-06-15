
import { useEffect } from 'react';

/**
 * Custom hook to handle Calendly script loading and cleanup
 * @param isEnabled Boolean flag to control when the Calendly script should be loaded
 */
export function useCalendly(isEnabled: boolean) {
  useEffect(() => {
    if (isEnabled) {
      // Create and append Calendly script when enabled
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
      
      // Cleanup function to remove the script when component unmounts
      // or when isEnabled changes to false
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isEnabled]);
}
