
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Cookie Policy | ALEGI - AI Legal Prediction Platform" 
        description="Information about how ALEGI uses cookies to enhance your experience with our AI-powered legal prediction platform."
        keywords={[
          'ALEGI cookie policy', 
          'Legal AI platform cookies', 
          'AI for legal cases privacy', 
          'Legal prediction platform data'
        ]}
      />
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700">This Cookie Policy explains how ALEGI uses cookies to enhance your experience.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
          <p className="text-gray-700">Cookies are small files stored on your device to improve website functionality and user experience.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. What Cookies Do We Use?</h2>
          <p className="text-gray-700 mb-4">We use the following types of cookies:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Essential Cookies: Required for website functionality.</li>
            <li>Analytics Cookies: Help us analyze user behavior (Google Analytics).</li>
            <li>Marketing Cookies: Used for targeted advertising (Facebook Pixel).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
          <p className="text-gray-700">Some third-party services, such as Google Analytics and Facebook Pixel, may place cookies on your device.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
          <p className="text-gray-700">Users can opt out of certain cookies through their browser settings. However, essential cookies cannot be disabled as they are required for the platform to function.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
