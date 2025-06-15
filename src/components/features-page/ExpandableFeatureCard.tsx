
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ExpandableFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  highlight?: boolean;
  header?: string;
}

const ExpandableFeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay, 
  highlight = false,
  header
}: ExpandableFeatureCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`reveal ${delay} rounded-xl p-6 transition-all duration-300 hover:shadow-md
        ${highlight 
          ? 'bg-gradient-to-br from-alegi-blue/10 to-white border-l-4 border-alegi-blue' 
          : 'bg-white border border-gray-100'}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 p-3 rounded-lg ${highlight 
          ? 'bg-gradient-to-br from-alegi-blue/20 to-alegi-blue-light/30' 
          : 'bg-gradient-to-br from-alegi-blue/5 to-alegi-blue-light/10'}`}>
          {icon}
        </div>
        <div className="flex-1">
          {header && (
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              {header}
            </h3>
          )}
          <h4 className={`text-lg font-semibold ${highlight ? 'text-alegi-blue' : 'text-gray-800'}`}>
            {title}
          </h4>
          
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full mt-2"
          >
            <div className="flex flex-col space-y-2">
              <div className="text-sm text-gray-600 line-clamp-2">
                {description.split(' ').slice(0, 10).join(' ')}
                {description.split(' ').length > 10 && '...'}
              </div>
              
              <CollapsibleContent className="text-sm text-gray-600 pt-2">
                {description}
              </CollapsibleContent>
              
              <CollapsibleTrigger asChild>
                <button className="flex items-center text-xs font-medium text-alegi-blue hover:text-alegi-blue-dark transition-colors">
                  {isOpen ? (
                    <>
                      <span>Show less</span>
                      <ChevronUp className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      <span>Read more</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </>
                  )}
                </button>
              </CollapsibleTrigger>
            </div>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default ExpandableFeatureCard;
