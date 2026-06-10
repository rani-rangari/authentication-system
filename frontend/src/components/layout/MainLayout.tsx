import React from 'react';
import { Outlet } from 'react-router-dom'; // From react-router-dom
import Navbar from '../common/Navbar';


const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Outlet /> {/* This is where your Home, Login, or Signup pages render */}
      </main>
    </div>
  );
};

export default MainLayout;