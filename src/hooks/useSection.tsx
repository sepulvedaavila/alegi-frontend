
import { useRef, useEffect } from 'react';

/**
 * Custom hook to handle section animations and intersection observations
 * @param threshold Intersection observer threshold (0-1)
 * @param rootMargin Intersection observer root margin
 * @returns Reference object to attach to the section
 */
export const useSection = (threshold = 0.1, rootMargin = '0px') => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, index) => {
              // Add a staggered delay based on index
              setTimeout(() => {
                el.classList.add('active');
              }, index * 100); // 100ms staggered delay
            });
          }
        });
      },
      { 
        threshold, 
        rootMargin 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, rootMargin]);

  return sectionRef;
};

export default useSection;
