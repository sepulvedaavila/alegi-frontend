
import { useEffect, useState } from 'react';
import { type CarouselApi } from "@/components/ui/carousel";

/**
 * Custom hook to handle auto-scrolling for carousels with performance optimizations
 * @param api The carousel API instance
 * @param interval The time interval in milliseconds
 */
export const useCarouselAutoScroll = (interval: number = 5000) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    let frame: number;
    let timeout: ReturnType<typeof setTimeout>;
    let lastScrollTime = Date.now();

    const scroll = () => {
      if (Date.now() - lastScrollTime >= interval) {
        api?.scrollNext();
        lastScrollTime = Date.now();
      }
      
      frame = requestAnimationFrame(scroll);
    };

    const startScrolling = () => {
      lastScrollTime = Date.now();
      frame = requestAnimationFrame(scroll);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        clearTimeout(timeout);
      } else {
        timeout = setTimeout(startScrolling, interval);
      }
    };

    // Start the scrolling after a delay
    timeout = setTimeout(startScrolling, interval);
    
    // Pause scrolling when page is not visible
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [api, interval]);

  return { api, setApi };
};
