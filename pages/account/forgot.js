import React from 'react';
import ForgotForm from '@/components/auth/ForgotForm';

export default function ForgotPassword() {
  return (
    <section className='bg-white'>
      <div className='wrapper'>
        <div className='w-1/2 mx-auto'>
          <ForgotForm />
        </div>
      </div>
    </section>
  );
}
