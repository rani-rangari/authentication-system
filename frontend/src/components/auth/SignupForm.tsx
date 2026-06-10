import { useState } from 'react';
import { Loader2, Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Logic for Spring Boot API integration will go here
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
      
      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input type="text" required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input type="email" required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="name@company.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input type="password" required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" onChange={(e) => setFormData({...formData, password: e.target.value})} />
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
      </p>
    </form>
  );
};

export default SignupForm;