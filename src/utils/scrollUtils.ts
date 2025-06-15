
/**
 * Utility for smooth scrolling to specific elements or positions
 */

/**
 * Smoothly scrolls to a specific element or position on the page
 * @param elementId ID of the element to scroll to
 * @param fallbackPosition Fallback position in pixels if element not found
 * @param maxAttempts Maximum number of attempts to find the element
 */
export const smoothScrollTo = (
  elementId: string,
  fallbackPosition?: number,
  maxAttempts: number = 5
): void => {
  let attempts = 0;
  
  // Force the CTA section to be visible in the DOM
  const visibleSections = document.querySelector('[data-visible-sections]');
  if (visibleSections) {
    try {
      const sectionsData = JSON.parse(visibleSections.getAttribute('data-visible-sections') || '{}');
      sectionsData.cta = true;
      visibleSections.setAttribute('data-visible-sections', JSON.stringify(sectionsData));
      
      // Dispatch resize event to trigger re-render
      window.dispatchEvent(new Event('resize'));
    } catch (e) {
      console.error('Error updating visible sections:', e);
    }
  }
  
  // Give lazy loading a chance to work
  setTimeout(() => {
    scrollToElement();
  }, 100);
  
  const scrollToElement = () => {
    attempts++;
    const element = document.getElementById(elementId);
    
    if (element) {
      // Calculate position accounting for any fixed headers (80px offset)
      const headerOffset = 80;
      const position = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      console.log(`Scrolling to ${elementId} at position: ${position}`);
      
      // Use a single smooth scroll to the target
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
      
      // Double check to ensure we reached the destination
      setTimeout(() => {
        const newPosition = element.getBoundingClientRect().top;
        if (Math.abs(newPosition - (-headerOffset)) > 100) {
          // We're not quite at the target, try once more
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.pageYOffset - headerOffset,
            behavior: 'smooth'
          });
        }
      }, 800);
      
      return true;
    } 
    
    if (attempts >= maxAttempts) {
      console.log(`Element ${elementId} not found after ${attempts} attempts`);
      if (fallbackPosition) {
        console.log(`Using fallback position: ${fallbackPosition}`);
        // Use fallback position with smooth behavior
        window.scrollTo({
          top: fallbackPosition,
          behavior: 'smooth'
        });
      } else {
        // Get the CTA section's approximate position
        const sections = document.querySelectorAll('section');
        let ctaPosition = document.body.scrollHeight - 1000; // Default near the bottom
        
        sections.forEach((section) => {
          if (section.id === 'signup') {
            ctaPosition = section.getBoundingClientRect().top + window.pageYOffset - 80;
          }
        });
        
        console.log(`Scrolling to approximate CTA position: ${ctaPosition}`);
        window.scrollTo({
          top: ctaPosition,
          behavior: 'smooth'
        });
      }
      
      // Force a rerender to ensure all components are loaded
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 500);
      
      return true;
    }
    
    // Calculate scroll position based on how far we are into our attempts
    const progress = attempts / maxAttempts;
    const targetPosition = fallbackPosition || document.body.scrollHeight - 1000;
    const scrollAmount = targetPosition * Math.min(progress * 1.2, 0.95);
    
    console.log(`Element not found. Progressive loading by scrolling to ${scrollAmount}`);
    window.scrollTo({
      top: scrollAmount,
      behavior: 'smooth'
    });
    
    // Attempt to force lazy load of components
    window.dispatchEvent(new Event('scroll'));
    
    // Progressive delay between attempts
    const delay = 200 + (attempts * 100);
    setTimeout(scrollToElement, delay);
    return false;
  };
};
