import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [hoveredSide, setHoveredSide] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (side) => {
    setHoveredSide(side);
  };

  const handleMouseLeave = () => {
    setHoveredSide(null);
  };

  const handleButtonClick = (page) => {
    if (page === 'signup') {
      navigate('/signup'); // Navigate to the signup page
    } else if (page === 'login') {
      navigate('/login'); // Navigate to the login page
    }
  };

  return (
    <div className="container bg-cover bg-center bg-gray-900 h-screen flex relative"
         style={{ backgroundImage: "url('./landingpage.jpg')" }}>
      
      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className={`text-white text-4xl text-center z-10 transition-opacity duration-500 ${hoveredSide ? 'opacity-0' : 'opacity-100'}`}>
          WELCOME TO EVENT HUB
        </h1>
      </div>

      {/* Left side */}
      <div className={`split left relative w-1/2 ${hoveredSide !== 'right' ? 'opacity-100' : 'opacity-0'}`}
        onMouseEnter={() => handleMouseEnter('left')}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`absolute inset-0 bg-red-700 bg-opacity-70 transition-all duration-1000 ${hoveredSide === 'left' ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-white text-4xl absolute top-1/4 left-1/2 transform -translate-x-1/2">Event</h1>
          <button onClick={() => handleButtonClick('signup')} className="button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent border-2 border-white text-white py-2.5 px-6 text-base font-bold uppercase hover:bg-red-700 hover:border-red-700">Signup</button>
        </div>
      </div>
      
      {/* Right side */}
      <div className={`split right relative w-1/2 ${hoveredSide !== 'left' ? 'opacity-100' : 'opacity-0'}`}
        onMouseEnter={() => handleMouseEnter('right')}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`absolute inset-0 bg-gray-900 bg-opacity-80 transition-all duration-1000 ${hoveredSide === 'right' ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-white text-4xl absolute top-1/4 left-1/2 transform -translate-x-1/2">Hub</h1>
          <button onClick={() => handleButtonClick('login')} className="button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent border-2 border-white text-white py-2.5 px-6 text-base font-bold uppercase hover:bg-gray-900 hover:border-gray-900">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
