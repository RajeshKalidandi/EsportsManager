import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold mb-4">About EsportsManager</h1>
          <p className="mb-4">
            EsportsManager is a cutting-edge SaaS platform designed to revolutionize the way esports teams are managed and organized. Our mission is to provide teams, from amateur to professional, with the tools they need to succeed in the competitive world of esports.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p className="mb-4">
            We envision a future where every esports team, regardless of size or resources, has access to professional-grade management tools. By democratizing access to advanced analytics, team management, and tournament organization features, we aim to elevate the entire esports ecosystem.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
          <p className="mb-4">
            Founded by a group of passionate gamers and tech enthusiasts, EsportsManager brings together expertise from the worlds of competitive gaming, software development, and sports management. Our diverse team is united by a common goal: to create the most comprehensive and user-friendly esports management platform on the market.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Our Commitment</h2>
          <p className="mb-4">
            We are committed to continuous innovation, always striving to stay ahead of the curve in the fast-paced world of esports. We value our users' feedback and are dedicated to evolving our platform to meet the changing needs of the esports community.
          </p>
          <p className="mt-8">
            Join us in shaping the future of esports management. Whether you're a team manager, player, or tournament organizer, EsportsManager is here to help you achieve your goals and push the boundaries of what's possible in competitive gaming.
          </p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800">Back to Home</Link>
      </div>
    </div>
  );
};

export default AboutUs;
