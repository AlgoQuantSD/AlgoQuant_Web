import React from 'react';
import Navbar from './NavBar';

const WelcomePage = () => {
  return (
    // <div className='w-gull h-screen bg-dark-gray'>
    // <Navbar />
    //   <h1 className='font-semibold text-5xl text-white text-center pt-32'>Welcome Page</h1>
    // </div>
    <div className="flex bg-green h-screen w-screen">
      <Navbar />

      {/* Left side */}
      <div className="bg-gray w-1/2 h-full flex items-center justify-center">
        <div className="text-2xl text-dark-gray font-bold">
          Welcome to our website!
        </div>
      </div>
      
      {/* Right side */}
      <div className="bg-gray w-1/2 h-full flex flex-col items-center justify-center">
        <div className="text-2xl text-dark-gray font-bold">
          Investing simplified.
        </div>
        <button className="bg-dark-gray rounded-full text-white p-4">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default WelcomePage;