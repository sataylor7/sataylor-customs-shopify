import React, { useState, useCallback } from 'react';

export default function LoginGuestView({ setCurrentView }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [guest, setGuest] = useState(false);

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => {
      console.log(currentVariant);
      if (currentVariant === 'login' && !guest) {
        return 'register';
      } else if (currentVariant === 'register' && !guest) {
        return 'login';
      } else {
        return 'guest';
      }
    });
  }, []);

  const handleOnSubmit = () => {
    if (variant === 'login' && !guest) {
      handleLogin();
    } else if (variant === 'register' && !guest) {
      handleRegister();
    } else {
      handleGuest();
    }
  };

  const handleGuest = useCallback(async () => {
    try {
      //   await axios.post('/api/register', {
      //     email,
      //     name,
      //     password,
      //   });
      //   login();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      //   await axios.post('/api/register', {
      //     email,
      //     name,
      //     password,
      //   });
      //   login();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRegister = useCallback(async () => {
    try {
      //   await axios.post('/api/register', {
      //     email,
      //     name,
      //     password,
      //   });
      //   login();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='mt-8 overflow-y-auto flex-1'>
      <div className='flow-root w-full'>
        <div className='p-4 py-6 rounded-lg bg-slate-50 md:p-8 mb-4'>
          <form onSubmit={() => {}}>
            <h2 className='text-gray-600 text-2xl mb-8 font-semibold'>
              {variant === 'login' && !guest
                ? 'Sign in'
                : variant === 'register' && !guest
                ? 'Register'
                : 'Guest'}
            </h2>
            {variant === 'register' && (
              <>
                <div className=''>
                  <label className='block mb-2 text-sm text-gray-600'>
                    First Name
                  </label>
                  <input
                    type='text'
                    placeholder='Fluffy'
                    className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg   focus:border-sky-800  focus:ring-sky-800 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>
                <div className=' mt-4 '>
                  <label className='block mb-2 text-sm text-gray-600 '>
                    Last Name
                  </label>
                  <input
                    type='text'
                    placeholder='Unicorn'
                    className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-sky-800  focus:ring-sky-800 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>
              </>
            )}

            <div className='mt-4'>
              <label className='block mb-2 text-sm text-gray-600 '>Email</label>
              <input
                type='email'
                placeholder='fluffyunicorn@savetheunicorns.com'
                className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-sky-800  focus:ring-sky-800 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </div>
            {variant !== 'guest' && (
              <div className='mt-4'>
                <label className='block mb-2 text-sm text-gray-600 '>
                  Password
                </label>
                <input
                  type='password'
                  className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-sky-800  focus:ring-sky-800 focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </div>
            )}

            <button className='w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-700 rounded-lg hover:bg-sky-800 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50'>
              {variant === 'login' && !guest
                ? 'Sign in'
                : variant === 'register' && !guest
                ? 'Register'
                : 'Guest'}
            </button>
            <p className='text-neutral-500 mt-5'>
              {variant === 'login' ? 'First time?' : 'Already have an account?'}
              <span
                onClick={() => {
                  setGuest(false);
                  if (variant === 'login' || variant === 'guest')
                    setVariant('register');
                  if (variant === 'register' || variant === 'guest')
                    setVariant('login');
                }}
                className='text-sky-700 ml-1 hover:underline hover:underline-offset-4 cursor-pointer'>
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
              .
            </p>
            {!guest && (
              <p className='text-neutral-500 mt-2 border-t-[1px] border-slate-200 pt-2'>
                <span
                  onClick={() => {
                    setGuest(true);
                    setVariant('guest');
                  }}
                  className='text-sky-700 hover:underline hover:underline-offset-4 cursor-pointer'>
                  Checkout as a guest
                </span>
              </p>
            )}
          </form>
        </div>
        <button
          type='button'
          className='font-medium hover:text-gray-800'
          onClick={() => setCurrentView('MiniCart')}>
          <span aria-hidden='true'> &larr;</span>
          Go back to cart
        </button>
      </div>
    </div>
  );
}
