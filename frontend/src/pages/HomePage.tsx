import { Link } from 'react-router-dom';
import { ShieldCheck, Database, LayoutTemplate } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
        Secure <span className="text-blue-600">Authentication</span> Module
      </h1>
      
      <p className="text-lg text-gray-600 max-w-2xl mb-10">
        A professional-grade authentication system built with a modern tech stack. 
        Featuring seamless integration between React, Spring Boot, and MySQL.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
        <FeatureCard 
          icon={<LayoutTemplate className="w-8 h-8 text-blue-500" />} 
          title="React Frontend" 
          description="Responsive UI with Tailwind CSS and secure routing." 
        />
        <FeatureCard 
          icon={<ShieldCheck className="w-8 h-8 text-blue-500" />} 
          title="Spring Boot API" 
          description="Robust backend with JWT authentication and security." 
        />
        <FeatureCard 
          icon={<Database className="w-8 h-8 text-blue-500" />} 
          title="MySQL Database" 
          description="Reliable data persistence for user credentials." 
        />
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4">
        <Link 
          to="/signup" 
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link 
          to="/login" 
          className="px-8 py-3 bg-white text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

export default HomePage;