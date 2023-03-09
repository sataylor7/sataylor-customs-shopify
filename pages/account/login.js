import React, { useContext } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { CartContext } from '@/context/shopContext';

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
