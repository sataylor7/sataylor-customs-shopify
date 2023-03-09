import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import Orders from '@/components/auth/Orders';
import { useToast } from '@/hooks/useToast';

export default function Profile() {
  const { customer, logout } = useContext(AuthContext);
  const router = useRouter();
  const toast = useToast();

  if (!customer || !customer.token) {
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
  const handleLogout = async (e) => {
    e.preventDefault();
    const loggedOut = await logout();
    if (loggedOut.message === 'ok') {
      toast('success', 'You have been logged out');
      router.push('/');
    }
  };

  return (
    <section className='bg-white'>
      <div className='bg-slate-100 py-4'>
        <div className='max-w-2xl mx-auto lg:max-w-7xl lg:px-8 px-4 pb-3 sm:px-6 flex justify-between'>
          <div>
            <h1 className='text-3xl'>Hello {customer.firstName}</h1>
          </div>
          <div>
            <a
              href='#'
              onClick={handleLogout}
              className='bg-sky-700 text-white flex py-2 px-3 rounded-sm'>
              Logout
            </a>
          </div>
        </div>
      </div>
      <div className='max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8 gap-y-3 flex flex-wrap'>
        {customer.token && <Orders />}
        <div className='flex-1 ml-4'>
          <h3 className='text-xl border-b-[1px] border-slate-200 mb-3 pb-2'>
            Account Details
          </h3>
          <div>
            <span>Email:</span>
            <h2 className='text-m mt-2'>{customer.email}</h2>
          </div>
          <div className='mt-4'>
            <span>Default Address:</span>
            {customer.defaultAddress && (
              <div className='text-m mt-2'>
                <p>{customer.defaultAddress.address1}</p>
                {customer.defaultAddress.address2 && (
                  <p>{customer.defaultAddress.address2}</p>
                )}
                <p>
                  {customer.defaultAddress.city}{' '}
                  {customer.defaultAddress.province}{' '}
                  {customer.defaultAddress.zip}
                </p>
                <p>{customer.defaultAddress.country}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
