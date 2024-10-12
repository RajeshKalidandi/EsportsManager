import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us.</p>
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.</p>
          <h2 className="text-2xl font-semibold mb-2">3. Data Security</h2>
          <p className="mb-4">We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
          <h2 className="text-2xl font-semibold mb-2">4. Your Rights</h2>
          <p className="mb-4">You have the right to access, correct, or delete your personal data. You may also have the right to restrict or object to certain processing of your data.</p>
          <p className="mt-8">For more information about our privacy practices, please contact us at privacy@esportsmanager.com</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800">Back to Home</Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
