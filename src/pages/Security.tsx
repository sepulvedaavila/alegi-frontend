
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import SecurityHero from '@/components/security-page/SecurityHero';
import SecurityOverview from '@/components/security-page/SecurityOverview';
import SecurityFeatures from '@/components/security-page/SecurityFeatures';
import PrivacyMeasures from '@/components/security-page/PrivacyMeasures';
import ComplianceCertification from '@/components/security-page/ComplianceCertification';
import ContinuousSecurity from '@/components/security-page/ContinuousSecurity';
import UserControlledData from '@/components/security-page/UserControlledData';
import SecurityCta from '@/components/security-page/SecurityCta';

const Security = () => {
  // Add scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Security | ALEGI - AI-Powered Legal Predictions"
        description="Learn how ALEGI prioritizes your data security, ensuring the highest standards of protection, compliance, and confidentiality for your legal information."
      />
      <Navbar />
      <SecurityHero />
      <SecurityOverview />
      <SecurityFeatures />
      <PrivacyMeasures />
      <ComplianceCertification />
      <ContinuousSecurity />
      <UserControlledData />
      <SecurityCta />
      <Footer />
    </div>
  );
};

export default Security;
