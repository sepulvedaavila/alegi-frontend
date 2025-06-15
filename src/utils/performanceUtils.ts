
/**
 * Utility functions for optimizing performance
 */

/**
 * Debounce function to limit how often a function can be called
 * @param func The function to debounce
 * @param wait The time to wait in milliseconds
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * Throttle function to limit how often a function can be called
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Lazy loads an image and returns a promise that resolves when loaded
 * @param src The image source URL
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

/**
 * Memoize a function to cache its results
 * @param fn The function to memoize
 */
export const memoize = <T extends (...args: any[]) => any>(
  fn: T
): ((...args: Parameters<T>) => ReturnType<T>) => {
  const cache = new Map();
  
  return (...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Adds intersection observer to lazy load elements
 * @param elementRef The reference to the element
 * @param onIntersect Callback when element is intersected
 * @param options IntersectionObserver options
 * @returns A cleanup function that removes the observer
 */
export const useLazyLoading = (
  elementRef: React.RefObject<Element>,
  onIntersect: () => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
): (() => void) => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      }
    }, options);
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }
  
  // Fallback for browsers without IntersectionObserver
  onIntersect();
  return () => {};
};
