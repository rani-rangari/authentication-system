import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-blue-800 to-blue-500 text-white items-center justify-center p-12 relative">
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="max-w-md space-y-6">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome Back
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Sign in to access your secure dashboard and manage your account
            settings.
          </p>

          <div className="pt-8">
            <div className="h-1 w-20 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 bg-gray-50 relative">
        <div className="lg:hidden absolute top-8 left-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
