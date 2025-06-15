
import { useState, useEffect } from 'react';

/**
 * A hook that delays rendering a component until needed
 * @param shouldLoad Boolean indicating when the component should be loaded
 * @param delayMs Optional delay in milliseconds
 * @returns Boolean indicating if component should render
 */
export const useLazyComponent = (shouldLoad: boolean, delayMs: number = 0): boolean => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldLoad && !shouldRender) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delayMs);
      
      return () => clearTimeout(timer);
    }
    
    return undefined;
  }, [shouldLoad, shouldRender, delayMs]);

  return shouldRender;
};
