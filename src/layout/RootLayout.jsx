import React from 'react';
import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';
import { Outlet } from 'react-router-dom';
const RootLayout = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-indigo-50">
      <Navbar />
      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Fotter />
    </div>
    )
}

export default RootLayout;