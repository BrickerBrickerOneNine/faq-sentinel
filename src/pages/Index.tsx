
import React, { useEffect, useState } from 'react';
import FaqItem from '@/components/FaqItem';
import SecurityLayer from '@/components/SecurityLayer';
import { toast } from "sonner";

// Sample FAQ data - this would typically come from an API or CMS
const faqData = [
  {
    question: "What is Bexa's approach to patient care?",
    answer: "Bexa focuses on a holistic approach to patient care, integrating advanced medical technologies with personalized treatment plans. Our methodology emphasizes preventative measures alongside responsive care, ensuring patients receive comprehensive medical attention tailored to their specific needs."
  },
  {
    question: "How does Bexa's technology integrate with existing hospital systems?",
    answer: "Bexa's technology is designed with compatibility in mind, offering seamless integration with most major hospital information systems through standard HL7 and FHIR protocols. Our dedicated integration teams work closely with your IT department to ensure minimal disruption during implementation, typically completing the process within 2-4 weeks."
  },
  {
    question: "What security measures does Bexa implement to protect patient data?",
    answer: "Bexa employs enterprise-grade security measures including end-to-end encryption, multi-factor authentication, and regular security audits. Our systems are HIPAA compliant and adhere to international data protection standards including GDPR. We also provide comprehensive audit trails for all data access and modifications."
  },
  {
    question: "How does Bexa support continuous medical education?",
    answer: "Bexa provides ongoing educational resources through our physician portal, including webinars, case studies, and peer-reviewed research. Our platform also offers personalized learning paths based on your specialty and interests, with CME-eligible activities available for professional development credits."
  },
  {
    question: "What clinical trials is Bexa currently supporting?",
    answer: "Bexa is actively supporting clinical trials across multiple therapeutic areas including oncology, cardiology, and neurology. Our platform facilitates efficient patient recruitment, data collection, and analysis while maintaining rigorous compliance with international research standards. For specific trial information, please contact our clinical research department."
  },
  {
    question: "How does Bexa handle international regulatory differences?",
    answer: "Bexa maintains dedicated regulatory teams for major global markets who ensure our solutions comply with local healthcare regulations. Our modular system architecture allows for market-specific configurations while maintaining core functionality, making it adaptable to various regulatory environments from FDA to EMA and beyond."
  },
  {
    question: "What support options are available for physicians using Bexa systems?",
    answer: "Bexa offers 24/7 technical support through multiple channels including phone, email, and in-app messaging. Our dedicated physician support team consists of medical professionals who understand clinical workflows and can provide context-appropriate assistance. Additionally, we offer scheduled training sessions and personalized onboarding for new team members."
  }
];

const Index = () => {
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    if (!hasVisited) {
      toast.info("This content is protected. Screenshots and copying are disabled.");
      setHasVisited(true);
    }

    // Additional security measure - blur content when tab loses focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        toast.warning("Content is protected while tab is inactive");
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasVisited]);

  return (
    <SecurityLayer>
      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Hero Section with Logo */}
        <header className="w-full py-12 px-6 flex justify-center items-center animate-fade-in">
          <div className="max-w-5xl mx-auto text-center">
            <img 
              src="/lovable-uploads/90e37adc-023d-4972-a9e5-df994dacc84f.png" 
              alt="Bexa" 
              className="h-24 md:h-28 mb-8 mx-auto" 
              draggable="false"
            />
            <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-3">
              Physician Resource Center
            </h1>
            <p className="text-bexa-gray text-lg max-w-2xl mx-auto">
              Frequently asked questions for medical professionals. This information is confidential and protected.
            </p>
          </div>
        </header>

        {/* FAQ Section */}
        <main className="max-w-3xl mx-auto pb-24 px-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="glass rounded-2xl overflow-hidden shadow-md">
            <div className="bg-bexa-lightgray py-3 px-6">
              <h2 className="text-xl text-bexa-gray font-medium">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-bexa-lightgray bg-white">
              {faqData.map((faq, index) => (
                <FaqItem 
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                />
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 px-6 bg-bexa-lightgray animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-bexa-gray text-sm">
              © {new Date().getFullYear()} Bexa Medical Technologies. All rights reserved.
            </p>
            <p className="text-bexa-gray text-xs mt-2">
              The information contained in this document is confidential and intended for healthcare professionals only.
            </p>
          </div>
        </footer>
      </div>
    </SecurityLayer>
  );
};

export default Index;
