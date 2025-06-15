
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ExpandableSolutionCardProps {
  icon: React.ReactNode;
  title: string;
  header: string;
  description: string;
  delay: string;
  highlight?: boolean;
}

export const ExpandableFeatureCard = ({ 
  icon, 
  title, 
  header,
  description, 
  delay, 
  highlight = false 
}: ExpandableSolutionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to format description with bullet points
  const formatDescription = (desc: string) => {
    return desc.split('\n\n').map((paragraph, i) => (
      <p key={i} className={`${i > 0 ? 'mt-2' : ''}`}>
        {paragraph.startsWith('•') 
          ? paragraph.split('\n').map((line, j) => (
              <div key={j} className="flex items-start mb-1">
                {line.startsWith('•') && (
                  <>
                    <span className="mr-1">{line.substring(0, 1)}</span>
                    <span>{line.substring(2)}</span>
                  </>
                )}
              </div>
            ))
          : paragraph
        }
      </p>
    ));
  };

  return (
    <div 
      className={`reveal ${delay} rounded-xl p-6 transition-all duration-300 hover:shadow-md h-full flex flex-col
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
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            {header}
          </h3>
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
                {description.split('\n\n')[0]}
              </div>
              
              <CollapsibleContent className="text-sm text-gray-600 pt-2">
                {formatDescription(description)}
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
