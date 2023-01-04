import React from 'react';
import Navbar from './NavBar';

const AccountPage = () => {
  return (
    <div className='w-full h-screen bg-dark-gray'>
      <Navbar />
      <h1 className='font-semibold text-5xl text-white text-center pt-32'>Account Page</h1>
    </div>
  )
}

export default AccountPage;