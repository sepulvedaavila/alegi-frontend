
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Terms of Service | ALEGI - AI Legal Platform" 
        description="Legal terms and conditions for using ALEGI's AI-powered legal case prediction and analysis platform."
        keywords={[
          'ALEGI terms', 
          'Legal AI terms of service', 
          'AI legal platform agreement', 
          'Legal case prediction terms',
          'AI legal analytics terms of use'
        ]}
      />
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-4">Effective Date: 01/01/2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-4">
            These Terms of Service ("Agreement") form a legally binding agreement between the Customer ("Customer", "you", "your") and ALEGI ("we", "us", "our"), governing your access to and use of ALEGI's AI-powered legal analytics platform and related services (the "Services"). This Agreement includes any current or future Order Forms, and all such documents are incorporated by this reference.
          </p>
          <p className="text-gray-700">
            By clicking "I Agree" or using ALEGI's Services, you acknowledge that you have read, accepted, and agree to be bound by this Agreement. If you do not accept these Terms, you must cease use of the Services immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
          <p className="text-gray-700 mb-4">
            "Administrator User Account" – The account for use by the designated administrator managing the Customer's use of ALEGI.
          </p>
          <p className="text-gray-700 mb-4">
            "Administrator Users" – Staff Users of the Customer authorized to access ALEGI's SaaS Services through an Administrator User Account.
          </p>
          <p className="text-gray-700 mb-4">
            "Aggregated Data" – Non-identifiable data generated from Customer use of the Services, used for analytics and improvements.
          </p>
          <p className="text-gray-700 mb-4">
            "Customer Data" – Any case data, legal insights, or related information provided by the Customer.
          </p>
          <p className="text-gray-700 mb-4">
            "Confidential Information" – Any proprietary or sensitive data provided by the Customer, including case details and personal identifiers.
          </p>
          <p className="text-gray-700 mb-4">
            "Permitted Users" – Individuals authorized by the Customer to use ALEGI's Services.
          </p>
          <p className="text-gray-700">
            "Order Form" – Any document detailing a Customer's service plan and associated fees.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Informational Use Only</h2>
          <p className="text-gray-700 mb-4">ALEGI provides AI-driven legal insights for informational purposes only.</p>
          <p className="text-gray-700 mb-4">We do not provide legal advice, legal assessments, or legal consultation.</p>
          <p className="text-gray-700">Customers should consult a licensed attorney before making legal decisions.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
          <p className="text-gray-700 mb-4">Users must:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide accurate and truthful case data.</li>
            <li>Not misuse AI-generated predictions.</li>
            <li>Not reverse-engineer ALEGI's AI models or platform.</li>
            <li>Not sell, distribute, or modify ALEGI-generated insights without written permission.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. AI Disclaimer</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>AI-generated predictions are not legally binding and do not guarantee outcomes.</li>
            <li>ALEGI's Services are provided on an "as-is" basis and may contain errors.</li>
            <li>Users must independently verify AI-generated insights before relying on them.</li>
            <li>ALEGI assumes no liability for decisions made based on its AI outputs.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Privacy & Data Security</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>ALEGI collects name, email, case details, billing info, company info, and personal indicators.</li>
            <li>We DO NOT sell or share user data with third parties.</li>
            <li>Data is stored for 5 years and cannot be deleted.</li>
            <li>End-to-end encryption ensures your data is secure and confidential.</li>
            <li>No ALEGI employee has access to user-provided data.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Account Termination</h2>
          <p className="text-gray-700 mb-4">We reserve the right to terminate accounts at our sole discretion, including but not limited to:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Violation of these Terms.</li>
            <li>Misuse of AI predictions.</li>
            <li>Any reason we see fit.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Fees & Payments</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Customers agree to pay the applicable fees as outlined in their Order Form.</li>
            <li>Fees are non-refundable.</li>
            <li>ALEGI reserves the right to modify pricing with prior notice.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>ALEGI's total liability shall not exceed the amount paid by the Customer in the last 12 months.</li>
            <li>We are not responsible for indirect, incidental, or consequential damages.</li>
            <li>AI predictions do not replace professional legal counsel.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Jurisdiction & Governing Law</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>This Agreement is governed by the laws of the State of Delaware.</li>
            <li>Any disputes must be resolved in Delaware courts.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>ALEGI may update these Terms at any time with 30 days' notice.</li>
            <li>Continued use of the Services after an update constitutes acceptance of the revised Terms.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Confidentiality</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>All Customer Data is strictly confidential and will not be shared with third parties.</li>
            <li>Aggregated Data may be used for service improvements but will never include identifiable information.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Service Availability & Modifications</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>ALEGI may modify or suspend services as needed for maintenance, security, or other reasons.</li>
            <li>We will strive to provide advance notice for any significant service changes.</li>
          </ul>
        </section>

        <p className="text-gray-700">For questions, contact contact@alegi.ai.</p>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
