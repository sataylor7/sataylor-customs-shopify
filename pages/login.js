import React from 'react';
import GuestCheckout from '../components/auth/GuestCheckout';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <section className='bg-white'>
      <div className='wrapper'>
        <LoginForm />
        <hr />
        <GuestCheckout />
      </div>
    </section>
  );
}
