
import { useEffect, useRef } from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import MockUIContent from './MockUIContent';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-start pt-40 pb-0 overflow-hidden">
      <HeroBackground />
      
      <div className="container mx-auto px-4 py-16 md:py-28 pb-0 text-center w-full" ref={heroRef}>
        <HeroContent />
        <div className="mt-12 md:mt-16 dashboard-wrapper">
          <MockUIContent />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
