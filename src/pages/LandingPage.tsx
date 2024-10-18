import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Trophy, Users, BarChart2, Zap, ChevronRight, Star, Shield, Globe } from 'lucide-react';
import SEO from '../components/SEO';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import StructuredData from '../components/StructuredData';

const LandingPage: React.FC = () => {
  return (
    <>
      <StructuredData
        type="Organization"
        name="EsportsManager"
        description="All-in-one esports team management platform"
        url="https://esports-manager-mu.vercel.app"
        logo="https://esports-manager-mu.vercel.app/logo.png"
      />
      <SEO 
        title="Esports Management Platform"
        description="Elevate your esports team with our all-in-one management platform. Manage, analyze, and dominate in tournaments."
        keywords="esports, management, tournaments, teams, analytics"
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
        <Header />
        <HeroSection />
        <BenefitsSection />
        <USPSection />
        <TestimonialsSection />
        <PricingSection />
        <FreeTierSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

const Header: React.FC = () => (
  <motion.header 
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="p-5 flex justify-between items-center"
  >
    <h1 className="text-2xl font-bold flex items-center">
      <Trophy className="mr-2" /> EsportsManager
    </h1>
    <nav>
      <ul className="flex space-x-4">
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/login">Login</Link></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/register">Register</Link></motion.li>
      </ul>
    </nav>
  </motion.header>
);

const HeroSection: React.FC = () => (
  <section className="text-center py-20 relative overflow-hidden">
    <LazyLoadImage
      src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
      alt="Esports Arena"
      effect="blur"
      className="absolute inset-0 w-full h-full object-cover opacity-20"
    />
    <div className="relative z-10">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-4"
      >
        Elevate Your Esports Team
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl mb-8"
      >
        Manage, analyze, and dominate with our all-in-one platform
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Get Started Free <ChevronRight className="inline ml-2" />
        </Button>
      </motion.div>
    </div>
  </section>
);

const BenefitsSection: React.FC = () => {
  const benefits = [
    { title: 'Team Management', icon: Users },
    { title: 'Tournament Organization', icon: Trophy },
    { title: 'Performance Analytics', icon: BarChart2 },
    { title: 'Sponsorship Tools', icon: Zap },
  ];

  return (
    <section className="py-20 bg-blue-800 bg-opacity-30">
      <h3 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h3>
      <div className="flex justify-around flex-wrap">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={benefit.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="w-64 text-center p-6 m-4 bg-blue-700 bg-opacity-30 rounded-lg shadow-lg"
          >
            <benefit.icon className="mx-auto mb-4 w-12 h-12" />
            <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
            <p>Streamline your operations and boost team performance with our cutting-edge tools.</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const USPSection: React.FC = () => (
  <section className="py-20">
    <h3 className="text-3xl font-bold text-center mb-10">Our Unique Approach</h3>
    <motion.div 
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center flex-wrap"
    >
      <div className="w-full md:w-1/2 p-6">
        <h4 className="text-2xl font-semibold mb-4">AI-Powered Insights</h4>
        <p>Leverage cutting-edge AI to analyze team performance, predict outcomes, and make data-driven decisions that give you a competitive edge.</p>
      </div>
      <div className="w-full md:w-1/2 p-6">
        <motion.img
          src="https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="AI Analytics"
          className="rounded-lg shadow-2xl"
          animate={{ 
            rotateY: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
        />
      </div>
    </motion.div>
  </section>
);

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    { name: "John Doe", role: "Team Manager", quote: "EsportsManager revolutionized how we handle our team operations." },
    { name: "Jane Smith", role: "Tournament Organizer", quote: "The tournament tools are a game-changer for event planning." },
    { name: "Mike Johnson", role: "Esports Analyst", quote: "The analytics provided are deep, insightful, and easy to understand." },
  ];

  return (
    <section className="py-20 bg-blue-800 bg-opacity-30">
      <h3 className="text-3xl font-bold text-center mb-10">What Our Users Say</h3>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-blue-700 bg-opacity-30 p-6 rounded-lg shadow-xl max-w-sm"
          >
            <p className="text-lg mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <Star className="text-yellow-400 mr-2" />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-300">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const PricingSection: React.FC = () => {
  const plans = [
    { name: "Starter", price: "$19", features: ["Basic team management", "Up to 3 tournaments", "Basic analytics"] },
    { name: "Pro", price: "$49", features: ["Advanced team management", "Unlimited tournaments", "Advanced analytics", "Priority support"] },
    { name: "Enterprise", price: "Custom", features: ["Custom solutions", "Dedicated account manager", "API access", "24/7 support"] },
  ];

  return (
    <section className="py-20">
      <h3 className="text-3xl font-bold text-center mb-10">Choose Your Plan</h3>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-blue-700 bg-opacity-30 p-6 rounded-lg shadow-xl max-w-sm w-full md:w-1/4"
          >
            <h4 className="text-2xl font-bold mb-4">{plan.name}</h4>
            <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal">/month</span></p>
            <ul className="mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center mb-2">
                  <Shield className="mr-2 text-green-400" size={16} />
                  {feature}
                </li>
              ))}
            </ul>
            <Button fullWidth>Choose Plan</Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const FreeTierSection: React.FC = () => (
  <section className="py-20 bg-blue-800 bg-opacity-30">
    <h3 className="text-3xl font-bold text-center mb-10">Start For Free</h3>
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-blue-700 bg-opacity-30 rounded-lg shadow-xl"
    >
      <h4 className="text-2xl font-semibold mb-4">Free Tier Includes:</h4>
      <ul className="list-disc list-inside mb-6">
        <li>Basic team management for up to 10 players</li>
        <li>Organize and manage up to 3 tournaments</li>
        <li>Essential performance tracking metrics</li>
        <li>Access to our vibrant community support forum</li>
      </ul>
      <Button fullWidth whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Sign Up Now <ChevronRight className="inline ml-2" />
      </Button>
    </motion.div>
  </section>
);

const FAQSection: React.FC = () => {
  const faqs = [
    { question: "How does EsportsManager help my team?", answer: "EsportsManager provides tools for team management, performance analytics, and tournament organization, streamlining your operations and improving team performance." },
    { question: "Is there a free trial available?", answer: "Yes, we offer a free tier that allows you to explore our basic features without any cost." },
    { question: "Can I upgrade or downgrade my plan?", answer: "Absolutely! You can change your plan at any time to suit your team's needs." },
  ];

  return (
    <section className="py-20 bg-blue-800 bg-opacity-30">
      <h3 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h3>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-6"
          >
            <h4 className="text-xl font-semibold mb-2">{faq.question}</h4>
            <p>{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CTASection: React.FC = () => (
  <section className="py-20 text-center relative overflow-hidden">
    <motion.img
      src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
      alt="Esports Team"
      className="absolute inset-0 w-full h-full object-cover opacity-20"
      initial={{ scale: 1 }}
      animate={{ scale: 1.1 }}
      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
    />
    <div className="relative z-10">
      <motion.h3 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Ready to Take Your Team to the Next Level?
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Get Started Now <ChevronRight className="inline ml-2" />
        </Button>
      </motion.div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-10 text-center bg-blue-900 bg-opacity-30">
    <p>&copy; {new Date().getFullYear()} EsportsManager. All rights reserved.</p>
    <div className="mt-4">
      <Link to="/privacy" className="mx-2 hover:underline">Privacy Policy</Link>
      <Link to="/terms" className="mx-2 hover:underline">Terms of Service</Link>
      <Link to="/contact" className="mx-2 hover:underline">Contact Us</Link>
    </div>
  </footer>
);

export default LandingPage;
