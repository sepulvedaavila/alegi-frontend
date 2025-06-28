
import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from "sonner";
import type { FormData } from '@/components/cta/FormTypes';

export function useCtaForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    telephone: "",
    email: "",
    industry: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'telephone') {
      const formattedValue = value.replace(/[^\d\s()+\-]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const openModal = (e: React.MouseEvent<Element, MouseEvent> | React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    if (email) {
      setFormData(prev => ({
        ...prev,
        email
      }));
    }
  };

  const closeModal = () => {
    if (!isSubmitted) {
      setIsModalOpen(false);
    }
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setShowCalendly(false);
    setFormData({
      name: "",
      company: "",
      telephone: "",
      email: "",
      industry: ""
    });
    setEmail("");
  };

  const handleFullFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      // Log form data for debugging
      console.log('Submitting form data:', formData);
      
      // Try a direct Formspree submission first (backup method)
      let directFormspreeSuccess = false;
      try {
        console.log('Attempting direct Formspree submission...');
        const directResponse = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            company: formData.company,
            telephone: formData.telephone,
            email: formData.email,
            industry: formData.industry,
            _subject: `New ALEGI Waitlist Registration: ${formData.name} from ${formData.company}`
          })
        });
        
        const directData = await directResponse.json();
        if (directResponse.ok) {
          console.log('Direct Formspree submission successful:', directData);
          directFormspreeSuccess = true;
        } else {
          console.error('Direct Formspree submission failed:', directData);
        }
      } catch (directError) {
        console.error('Error during direct Formspree submission:', directError);
      }
      
      // If direct submission failed, try through our edge function
      if (!directFormspreeSuccess) {
        console.log('Attempting submission through edge function...');
        // Call the edge function to send emails via Formspree
        const response = await fetch(import.meta.env.VITE_SUPABASE_EDGE_FUNCTION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            company: formData.company,
            telephone: formData.telephone,
            email: formData.email,
            industry: formData.industry
          })
        });
        
        const data = await response.json();
        console.log('Edge function response:', data);
        
        if (!response.ok) {
          throw new Error(`Form submission failed: ${data.error || 'Unknown error'}`);
        }
      }

      // Process the form submission successful response
      setIsLoading(false);
      setIsSubmitted(true);
      setShowCalendly(true);
      
      toast("You've been successfully added to our waitlist!", {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
      
      // For analytics, trigger event
      if (typeof window !== 'undefined') {
        try {
          window.gtag?.('event', 'lead_form_submitted', {
            'event_category': 'engagement',
            'event_label': 'waitlist',
            'value': 1
          });
        } catch (error) {
          console.error('Analytics tracking error:', error);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setIsLoading(false);
      
      // More detailed error message
      if (error instanceof Error) {
        toast(`Submission error: ${error.message}. Please try again or contact support.`, {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          duration: 5000,
        });
      } else {
        toast("There was an error submitting your form. Please try again.", {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        });
      }
    }
  };

  return {
    email,
    setEmail,
    isLoading,
    isModalOpen,
    formData,
    isSubmitted,
    showCalendly,
    handleInputChange,
    openModal,
    closeModal,
    resetForm,
    handleFullFormSubmit
  };
}
