import React, { useState, useEffect } from 'react';


import Header from './partials/Header';
import Footer from './partials/Footer';
const Layout = ({ children }) => {
    const navLinks = [
      { path: '/signup', name: 'Sign-Up' },
      { path: '/logout', name: 'Logout' },
      { path: '/login', name: 'Login' }
    ];
    
    return (
      <div>
        <Header links={navLinks} />
        {children}
        <Footer/>
      </div>
    );
  };

  export default Layout
