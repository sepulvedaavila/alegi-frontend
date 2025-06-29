import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useFeedbackWidget = () => {
  const location = useLocation();

  useEffect(() => {
    // Only load the feedback widget on dashboard routes
    if (location.pathname.startsWith('/dashboard')) {
      // Check if the script is already loaded
      const existingScript = document.querySelector('script[src*="feedback-js"]');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@betahuhn/feedback-js/dist/feedback-js.min.js';
        script.defer = true;
        script.setAttribute('data-feedback-opts', JSON.stringify({
          endpoint: 'https://hooks.zapier.com/hooks/catch/23577600/ubku916/',
          id: 'dashboard',
          emailField: true,
          title: 'Aelegi Feedback',
          forceShowButton: true
        }));
        
        document.head.appendChild(script);
      }
    }
  }, [location.pathname]);
}; 