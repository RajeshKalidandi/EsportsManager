import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing or using our service, you agree to be bound by these Terms and Conditions.</p>
          <h2 className="text-2xl font-semibold mb-2">2. Use of Service</h2>
          <p className="mb-4">You agree to use our service only for lawful purposes and in accordance with these Terms.</p>
          <h2 className="text-2xl font-semibold mb-2">3. User Accounts</h2>
          <p className="mb-4">You are responsible for maintaining the confidentiality of your account and password.</p>
          <h2 className="text-2xl font-semibold mb-2">4. Intellectual Property</h2>
          <p className="mb-4">The service and its original content, features, and functionality are owned by EsportsManager and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
          <h2 className="text-2xl font-semibold mb-2">5. Termination</h2>
          <p className="mb-4">We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
          <p className="mt-8">If you have any questions about these Terms, please contact us at legal@esportsmanager.com</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800">Back to Home</Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;
