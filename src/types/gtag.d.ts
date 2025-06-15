
// Type definitions for Google gtag.js
interface Window {
  gtag: (
    command: 'event',
    action: string,
    params?: {
      event_callback?: () => void;
      event_timeout?: number;
      [key: string]: any;
    }
  ) => void;
  dataLayer: any[];
}

declare const gtag: (
  command: 'event',
  action: string,
  params?: {
    event_callback?: () => void;
    event_timeout?: number;
    [key: string]: any;
  }
) => void;
