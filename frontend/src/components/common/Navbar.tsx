import { LogIn, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
<nav className="bg-white-500 border-b border-gray-200 shadow-sm">
  {/* This div acts as the "container" to limit the width */}
  <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
    
    {/* Left Side: Title */}
    <div className="flex items-center gap-2 shrink-0">
      <ShieldCheck className="w-8 h-8 text-blue-600" />
      <span className="text-lg md:text-xl font-bold text-gray-800">AuthSystem</span>
    </div>

    {/* Right Side: Login Button */}
    <div>
      <Link 
        to="/login" 
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden md:inline">Login</span>
      </Link>
    </div>
    
  </div>
</nav>
  )
}

export default Navbar