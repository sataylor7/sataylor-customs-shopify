import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { customer } = useContext(AuthContext);

  if (!customer || !customer.customerAccessToken) {
    return (
      <section>
        <div className='wrapper'>
          <h1 className='text-3xl'>Access Denied</h1>
          <p>
            <a
              href='/login'
              className='text-sky-700 underline underline-offset-4'>
              You must be logged in to view this page
            </a>
          </p>
        </div>
      </section>
    );
  }

  console.log(customer);

  return (
    <section className='bg-white'>
      <div className='bg-slate-100 py-4'>
        <div className='max-w-2xl mx-auto lg:max-w-7xl lg:px-8 px-4 pb-3 sm:px-6'>
          <h1 className='text-3xl'>Hello {customer.firstName}</h1>
          <h2 className='text-m mt-2'>Email: {customer.email}</h2>
        </div>
      </div>

      <div className='wrapper'></div>
    </section>
  );
}
