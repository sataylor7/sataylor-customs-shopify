import React from 'react';

export default function Announcement() {
  return (
    <div className='w-full border-b p-2 flex flex-wrap justify-center items-center mx-auto max-w-screen-xl'>
      <div className='text-sm' role='region' aria-label='Announcement'>
        <p className='font-sans'>Welcome to our store</p>
      </div>
    </div>
  );
}
