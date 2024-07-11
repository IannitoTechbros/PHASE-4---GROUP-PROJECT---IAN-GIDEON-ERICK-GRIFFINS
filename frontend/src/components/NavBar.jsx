import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="text-white">
            <Link to='/' className=" items-">
              <span className="text-xl ">Event Hub</span>
            </Link>
          </div>
          <div className='hidden md:flex md:items-center md:justify-end md:flex-1 md:space-x-4'>
            <NavLink to='/' className="text-white nav-link px-2 py-2 text-sm font-medium">Home</NavLink>
            <NavLink to='/about' className="text-white nav-link px-3 py-2 text-sm font-medium">About</NavLink>
            <NavLink to='/contact' className="text-white bottom-link px-3 py-2 text-sm font-medium">Contact us</NavLink>
            <NavLink to='/' className="text-white bottom-link px-3 py-2 text-sm font-medium">Logout</NavLink>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:hidden">
            <button className="text-white hover:text-white focus:outline-none">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
