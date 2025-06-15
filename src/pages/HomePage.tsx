
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import { throttle } from '@/utils/performanceUtils';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import CtaSection from '@/components/CtaSection';

// Lazy load sections that aren't immediately visible
const WhyJoinSection = lazy(() => import('@/components/WhyJoinSection'));
const HowItWorksSection = lazy(() => import('@/components/HowItWorksSection'));
const FeaturesSection = lazy(() => import('@/components/FeaturesSection'));
const SecuritySection = lazy(() => import('@/components/SecuritySection'));
const TargetAudienceSection = lazy(() => import('@/components/TargetAudienceSection'));

const HomePage = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState({
    features: false,
    whyJoin: false,
    howItWorks: false,
    security: false,
    targetAudience: false,
    cta: true, // Always load the CTA section
  });

  useEffect(() => {
    // Optimized scroll animation for reveal elements using throttle
    const handleScroll = throttle(() => {
      // Detect which sections are visible to start loading them
      const scrollPosition = window.scrollY + window.innerHeight;
      
      setVisibleSections({
        features: scrollPosition > 800,
        whyJoin: scrollPosition > 1400,
        howItWorks: scrollPosition > 2000,
        security: scrollPosition > 2600,
        targetAudience: scrollPosition > 3200,
        cta: true, // Always true regardless of scroll position
      });
      
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((reveal) => {
        const revealTop = reveal.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 50;
        
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    }, 100); // Throttle to run at most once every 100ms
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add hash change listener to handle deep links
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#cta-section') {
        // Force a re-render after a slight delay to ensure components are loaded
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 300);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    // Check hash on initial load
    handleHashChange();
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Preload critical images when component mounts
  useEffect(() => {
    const preloadCriticalImages = async () => {
      try {
        // Only preload the hero image initially
        const imagesToPreload = [
          '/lovable-uploads/f895d413-c639-44b2-9e10-9fd357a8b941.png'
        ];
        
        // Use Promise.all to load the image in parallel
        await Promise.all(
          imagesToPreload.map(img => {
            const image = new Image();
            image.src = img;
            return new Promise(resolve => {
              image.onload = resolve;
              image.onerror = resolve; // Continue even if there's an error
            });
          })
        );
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadCriticalImages();
  }, []);

  return (
    <div 
      className="min-h-screen overflow-hidden" 
      ref={sectionsRef}
      data-visible-sections={JSON.stringify(visibleSections)}
    >
      <SEO />
      <Navbar />
      <HeroSection />
      
      {/* Render sections with Suspense fallbacks */}
      <Suspense fallback={<div className="h-screen"></div>}>
        {visibleSections.features && <FeaturesSection />}
      </Suspense>
      
      <Suspense fallback={<div className="h-screen"></div>}>
        {visibleSections.whyJoin && <WhyJoinSection />}
      </Suspense>
      
      <Suspense fallback={<div className="h-screen"></div>}>
        {visibleSections.howItWorks && <HowItWorksSection />}
      </Suspense>
      
      <Suspense fallback={<div className="h-screen"></div>}>
        {visibleSections.security && <SecuritySection />}
      </Suspense>
      
      <Suspense fallback={<div className="h-screen"></div>}>
        {visibleSections.targetAudience && <TargetAudienceSection />}
      </Suspense>
      
      {/* CTA section is now directly loaded without Suspense or conditional rendering */}
      <div id="cta-section">
        <CtaSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;
