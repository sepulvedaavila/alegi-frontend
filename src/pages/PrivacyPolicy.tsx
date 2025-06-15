
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Privacy Policy | ALEGI - AI Legal Analytics Platform" 
        description="Learn how ALEGI protects your data and privacy while delivering AI-powered legal predictions and insights."
        keywords={[
          'Legal AI privacy', 
          'ALEGI data protection', 
          'AI legal platform security', 
          'Legal case prediction privacy',
          'AI for lawyers data security'
        ]}
      />
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">Effective Date: 01/01/2025</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-4">At ALEGI, we take privacy seriously. This Privacy Policy explains what data we collect, how we use it, and how we protect it. By using our services, you agree to this policy.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="text-gray-700 mb-4">We collect the following types of personal information:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Identity Data: Name, email address, company information.</li>
            <li>Case Data: Case details, legal insights, and related information provided by users.</li>
            <li>Billing Data: Payment details for subscription purposes.</li>
            <li>Technical Data: IP addresses, browser type, and usage data collected through cookies.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
          <p className="text-gray-700 mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide and improve our AI-powered legal insights.</li>
            <li>Process transactions and manage accounts.</li>
            <li>Analyze platform performance using analytics tools.</li>
            <li>Ensure security and prevent fraudulent activity.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
          <p className="text-gray-700 mb-4">We use third-party services, including:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Google (Analytics, authentication, and marketing)</li>
            <li>ChatGPT (AI-powered services for predictions)</li>
            <li>Lovable (Website hosting and optimization)</li>
          </ul>
          <p className="text-gray-700 mt-2">These services may collect and process user data per their own privacy policies.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
          <p className="text-gray-700">We store user data for 5 years to ensure service continuity. We do not allow users to delete their data due to security and compliance reasons.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Security Measures</h2>
          <p className="text-gray-700 mb-4">We implement industry-standard security measures, including:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Encryption: All data is encrypted during transmission and storage.</li>
            <li>Internal Safeguards: Strict access controls to prevent unauthorized access.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Confidentiality and No Data Sharing</h2>
          <p className="text-gray-700">Your data is strictly confidential. We do not sell, rent, or share your data with third parties except as required by law.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
          <p className="text-gray-700">We may update this Privacy Policy periodically. We will notify users of significant changes.</p>
        </section>

        <p className="text-gray-700">For any concerns, contact us at contact@alegi.ai.</p>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
