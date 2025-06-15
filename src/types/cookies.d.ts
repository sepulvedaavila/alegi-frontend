
interface Window {
  gtag?: (
    command: 'consent' | 'config' | 'event' | 'set',
    action: string,
    params?: {
      [key: string]: any;
    }
  ) => void;
  fbq?: (
    command: 'init' | 'track' | 'consent',
    action: string,
    params?: {
      [key: string]: any;
    }
  ) => void;
  dataLayer?: any[];
}
