import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <section className='bg-white'>
      <div className='wrapper'>
        <div className='w-1/2 mx-auto'>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
