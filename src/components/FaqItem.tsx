
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItemProps {
  question: string;
  answer: string;
  index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className={cn(
        "border-b border-bexa-lightgray last:border-0",
        "transition-all duration-300 ease-in-out",
        "animate-fade-in",
        {"animate-slide-up": index > 0}
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        onClick={toggleOpen}
        className="w-full py-6 px-4 flex justify-between items-center focus:outline-none text-left group"
      >
        <h3 className="text-lg font-medium text-gray-800 group-hover:text-bexa-teal transition-colors duration-300">
          {question}
        </h3>
        <ChevronDown 
          className={cn(
            "text-bexa-teal transition-transform duration-300 ease-in-out",
            isOpen ? "transform rotate-180" : ""
          )} 
          size={20} 
        />
      </button>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100 pb-6 px-4" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-gray-600 font-light leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;
