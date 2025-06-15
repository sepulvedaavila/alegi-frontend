
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      // Show banner after a small delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    // Set Google Analytics consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
    // Set Facebook Pixel consent
    if (window.fbq) {
      window.fbq('consent', 'grant');
    }
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    // Limit Google Analytics consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      });
    }
    // Limit Facebook Pixel consent
    if (window.fbq) {
      window.fbq('consent', 'revoke');
    }
    setIsVisible(false);
  };

  const viewCookiePolicy = () => {
    window.location.href = '/cookie-policy';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white shadow-lg border-t border-gray-200 animate-fade-in-up">
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex-1 pr-6">
          <h3 className="font-semibold text-lg mb-2">We value your privacy</h3>
          <p className="text-gray-600 mb-4 text-sm">
            We use cookies to enhance your browsing experience, serve personalized content, 
            and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            See our <button onClick={viewCookiePolicy} className="text-alegi-blue underline">Cookie Policy</button> for more information.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2 lg:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={acceptNecessary}
            className="whitespace-nowrap"
          >
            Necessary Only
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={acceptAll}
            className="whitespace-nowrap bg-alegi-blue hover:bg-alegi-blue-dark"
          >
            Accept All
          </Button>
        </div>
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close cookie consent banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
