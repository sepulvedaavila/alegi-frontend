
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from '@/utils/scrollUtils';

const FaqHero = () => {
  const handleButtonClick = () => {
    smoothScrollTo("faq-cta");
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2e1a47] to-[#5f407a] -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-[1.3]">
            Frequently Asked{' '}
            <span className="block mt-2 bg-gradient-to-r from-[#a287ff] to-[#d4c5ff] bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-[1.7]">
            Find answers to the most common questions about ALEGI's AI-powered legal prediction platform.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleButtonClick}
              className="bg-white hover:bg-white/90 text-[#3366FF] font-bold rounded-full shadow-lg"
              size="lg"
            >
              Schedule Your Demo Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqHero;
