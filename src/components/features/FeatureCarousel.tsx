
import React from 'react';
import { FeatureItem } from './FeatureGroup';
import { useCarouselAutoScroll } from '@/utils/carouselUtils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';

interface FeatureCarouselProps {
  featureGroups: FeatureItem[][];
}

const FeatureCarousel = ({ featureGroups }: FeatureCarouselProps) => {
  const { api, setApi } = useCarouselAutoScroll(3000); // 3 seconds interval
  const isMobile = useIsMobile();
  
  // Flatten the feature groups to create a single array of features
  const allFeatures = featureGroups.flat();
  
  return (
    <div className="w-full overflow-hidden px-4 md:px-0 mb-16">
      <Carousel 
        className="w-full reveal delay-200" 
        opts={{ 
          align: "center",
          loop: true,
          dragFree: true,
        }}
        setApi={setApi}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {allFeatures.map((feature, index) => (
            <CarouselItem 
              key={index} 
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <div className={`reveal ${feature.delay} feature-card h-full ${feature.highlight ? 'border-alegi-blue bg-gradient-to-br from-white to-alegi-blue/5 shadow-md' : ''} ${feature.className || ""}`}>
                  <div className="flex items-start gap-4 h-full">
                    <div className={`feature-icon ${feature.highlight ? 'bg-gradient-to-br from-alegi-blue/20 to-alegi-blue-light/30' : ''}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${feature.highlight ? 'text-alegi-blue' : ''}`}>{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                      {feature.highlight && (
                        <span className="inline-block mt-3 text-xs font-medium text-alegi-blue bg-alegi-blue/10 px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-8">
          <CarouselPrevious className="relative static mr-2 transform-none translate-y-0 left-0" />
          <CarouselNext className="relative static transform-none translate-y-0 right-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default FeatureCarousel;
