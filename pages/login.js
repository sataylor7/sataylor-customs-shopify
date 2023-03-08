import React, { useContext } from 'react';
import GuestCheckout from '../components/auth/GuestCheckout';
import LoginForm from '../components/auth/LoginForm';
import { CartContext } from '../context/shopContext';

export default function Login() {
  const { showGuestCheckout } = useContext(CartContext);
  return (
    <section className='bg-white'>
      <div className='wrapper'>
        <LoginForm />
        {showGuestCheckout && (
          <>
            <hr />
            <GuestCheckout />
          </>
        )}
      </div>
    </section>
  );
}
