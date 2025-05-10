import React, { useState } from 'react'
import { Navigation, UserCircle, ChevronDown, UserCog } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleAuthDropdown = () => {
    setShowAuthDropdown(!showAuthDropdown);
  };

  const closeDropdown = () => {
    setShowAuthDropdown(false);
  };

  return (
    <div className='fixed top-0 left-0 w-full z-50'>
      <nav className="bg-yellow-500 text-black shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80">
            <Navigation size={28} />
            <span className="font-bold text-xl">Vahana</span>
          </Link>
          
          {/* Main Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/">
              <button className="font-medium hover:text-white transition-colors">Home</button>
            </Link>
            
            <Link to="/services">
              <button className="font-medium hover:text-white transition-colors">Services</button>
            </Link>
            
            <Link to="/about">
              <button className="font-medium hover:text-white transition-colors">About</button>
            </Link>
            
            <Link to="/contact">
              <button className="font-medium hover:text-white transition-colors">Contact</button>
            </Link>

            {/* Admin Link - Added to main navigation */}
            <Link to="/admin">
              <button className="font-medium hover:text-white transition-colors flex items-center">
                <UserCog size={20} className="mr-1" />
                Admin
              </button>
            </Link>
          </div>
          
          {/* Right-side Actions */}
          <div className="flex items-center space-x-4">
            {/* Account Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center space-x-1 hover:text-white transition-colors"
                onClick={toggleAuthDropdown}
                aria-expanded={showAuthDropdown}
                aria-label="Account menu"
              >
                <UserCircle size={20} />
                <span>Account</span>
                <ChevronDown size={16} className={`transition-transform ${showAuthDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showAuthDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  onMouseLeave={closeDropdown}
                >
                  <Link to="/signin">
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={closeDropdown}
                    >
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={closeDropdown}
                    >
                      Sign Up
                    </button>
                  </Link>
                  {/* Added Admin link to dropdown for mobile users */}
                  <Link to="/admin">
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                      onClick={closeDropdown}
                    >
                      <UserCog size={16} className="mr-2" />
                      Admin
                    </button>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Book Now Button */}
            <button 
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => navigate('/book')}
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
