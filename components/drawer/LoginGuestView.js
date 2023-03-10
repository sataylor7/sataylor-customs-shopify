import React, { useState, useCallback, useContext } from 'react';
import * as Yup from 'yup';
import update from 'immutability-helper';
import { AuthContext } from '@/context/AuthContext';
import { CartContext } from '@/context/shopContext';
import { getCheckoutUrl } from '@/lib/shopify';

// validation helpers
const ValidateForm = async ({ validationSchema, setErrors, values }) => {
  const isFormValid = await validationSchema.isValid(values, {
    abortEarly: false,
  });
  if (!isFormValid) {
    return validationSchema
      .validate(values, { abortEarly: false })
      .catch((err) => {
        const tempErrMessage = [];
        const errors = err.inner.reduce((acc, error) => {
          tempErrMessage.push(error.message);
          return {
            ...acc,
            [error.path]: tempErrMessage[0],
          };
        }, {});
        console.log(errors);
        setErrors((prevErrors) =>
          update(prevErrors, {
            $set: errors,
          })
        );
      });
  }
  return 'Form good';
};

export default function LoginGuestView({ setCurrentView }) {
  const { associateCartToCustomer, cart } = useContext(CartContext);
  const { register: signup, login } = useContext(AuthContext);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const onFieldChange = useCallback((fieldName, value) => {
    setValues((prevValues) =>
      update(prevValues, {
        [fieldName]: {
          $set: value,
        },
      })
    );
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const validationSchema = Yup.object().shape({
        password: Yup.string()
          .required('Password is required')
          .min(8, 'Minimum of 8 characters'),
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
      });

      try {
        await ValidateForm({ validationSchema, setErrors, values });
        await login({
          email: values.email,
          password: values.password,
        });
        // @TODO: check for address if there isn't an address then go to the address view else
        // for now attach the customer email to the current checkout/cart then redirect to checkout
        await associateCartToCustomer(values.email);
        const { checkoutUrl } = await getCheckoutUrl(cart.id);
        if (checkoutUrl) window.location = checkoutUrl;
      } catch (error) {
        console.log(error);
      }
    },
    [values]
  );

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();
      const validationSchema = Yup.object().shape({
        password: Yup.string()
          .required('Password is required')
          .min(8, 'Minimum of 8 characters'),
        firstName: Yup.string().required('First Name required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
      });
      try {
        await ValidateForm({ validationSchema, setErrors, values });
        await signup({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        });
        // @TODO: check for address if there isn't an address then go to the address view else
        // for now attach the customer email to the current checkout/cart then redirect to checkout
        await associateCartToCustomer(values.email);
        const { checkoutUrl } = await getCheckoutUrl(cart.id);
        if (checkoutUrl) window.location = checkoutUrl;
      } catch (error) {
        console.log(error);
      }
    },
    [values]
  );

  // handle guest checkout needs to clear the cart and redirect to the checkout url
  const handleGuest = async (e) => {
    e.preventDefault();
    const { checkoutUrl } = await getCheckoutUrl(cart.id);
    if (checkoutUrl) window.location = checkoutUrl;
  };

  return (
    <div className='mt-8 overflow-y-auto flex-1'>
      <div className='flow-root w-full'>
        <div className='p-4 py-6 rounded-lg bg-slate-50 md:p-8 mb-4'>
          <form>
            <h2 className='text-gray-600 text-2xl mb-8 font-semibold'>
              {variant === 'login' ? 'Login' : 'Register'}
            </h2>
            {variant === 'register' && (
              <>
                <div className=''>
                  <label
                    className='block mb-2 text-sm text-gray-600'
                    htmlFor='firstName'>
                    First Name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    onChange={(e) => {
                      onFieldChange('firstName', e.target.value);
                      setErrors({ firstName: false });
                    }}
                    placeholder='Fluffy'
                    className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg   focus:border-sky-800  focus:ring-sky-800 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                  {errors && (
                    <span className='text-red-400 text-sm py-2'>
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div className=' mt-4 '>
                  <label
                    className='block mb-2 text-sm text-gray-600 '
                    htmlFor='lastName'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    onChange={(e) => {
                      onFieldChange('lastName', e.target.value);
                      setErrors({ lastName: false });
                    }}
                    placeholder='Unicorn'
                    className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-sky-800  focus:ring-sky-800 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                  {errors && (
                    <span className='text-red-400 text-sm py-2'>
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </>
            )}

            <div className='mt-4'>
              <label
                className='block mb-2 text-sm text-gray-600 '
                htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                name='email'
                onChange={(e) => {
                  onFieldChange('email', e.target.value);
                  setErrors({ email: false });
                }}
                placeholder='please enter your email'
                className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-sky-800  focus:ring-sky-800 focus:outline-none focus:ring focus:ring-opacity-40'
              />
              {errors && (
                <span className='text-red-400 text-sm py-2'>
                  {errors.email}
                </span>
              )}
            </div>
            {variant !== 'guest' && (
              <div className='mt-4'>
                <label
                  className='block mb-2 text-sm text-gray-600 '
                  htmlFor='password'>
                  Password
                </label>
                <input
                  onChange={(e) => {
                    onFieldChange('password', e.target.value);
                    setErrors({ password: false });
                  }}
                  name='password'
                  type='password'
                  className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-sky-800  focus:ring-sky-800 focus:outline-none focus:ring focus:ring-opacity-40'
                />
                {errors && (
                  <span className='text-red-400 text-sm py-2'>
                    {errors.password}
                  </span>
                )}
              </div>
            )}

            <button
              onClick={variant === 'login' ? handleLogin : handleRegister}
              className='w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-700 rounded-lg hover:bg-sky-800 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50'>
              {variant === 'login' ? 'Sign in' : 'Register'}
            </button>
            <p className='text-neutral-500 mt-5'>
              {variant === 'login' ? 'First time?' : 'Already have an account?'}
              <span
                onClick={() => {
                  setErrors({
                    firstName: false,
                    lastName: false,
                    email: false,
                    password: false,
                  });
                  toggleVariant();
                }}
                className='text-sky-700 ml-1 hover:underline hover:underline-offset-4 cursor-pointer'>
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
              .
            </p>
            <p className='mt-2 border-t-[1px] border-slate-200 pt-2'>
              <a
                onClick={handleGuest}
                className='text-sky-700 hover:underline hover:underline-offset-4 cursor-pointer'>
                Checkout as a guest
              </a>
            </p>
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
