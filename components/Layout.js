import React from 'react';
import Footer from './Footer';
import Nav from './Nav';
import Announcement from './Announcement';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col justify-between min-h-screen bg-white'>
      <Announcement />
      <Nav />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
