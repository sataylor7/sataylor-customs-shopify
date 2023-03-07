import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function LoginForm() {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Minimum of 8 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .min(8, 'This is not long enough to be an email')
      .max(120, 'This is too long'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmitForm(values) {
    console.log(values);
    reset();
  }
  return (
    <>
      <div className='w-1/2 mx-auto gap-y-3 mb-4'>
        <h2 className='text-3xl font-medium my-2'>Login</h2>
        <p className='text-slate-600'>
          {' '}
          Welcome back! Please enter your details.
        </p>
      </div>
      <div className='p-4 py-6 rounded-lg bg-slate-50 md:p-8 w-1/2 mx-auto mb-4'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className=''>
            <label className='block mb-2 text-sm text-slate-600 '>Email</label>
            <input
              type='email'
              name='email'
              {...register('email')}
              placeholder='Email'
              className={`${
                errors.email ? 'ring-2 ring-red-500' : null
              }block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:ring-sky-400 focus:outline-none focus:ring focus:ring-opacity-40`}
            />
            {errors && (
              <span className='text-red-400 text-sm py-2'>
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className='mt-4'>
            <label className='block mb-2 text-sm text-slate-600 '>
              Password
            </label>
            <input
              type='password'
              name='password'
              {...register('password')}
              className={`${
                errors.password ? 'ring-2 ring-red-500' : null
              }block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:ring-sky-400 focus:outline-none focus:ring focus:ring-opacity-40`}
            />
            {errors && (
              <span className='text-red-400 text-sm py-2'>
                {errors.password?.message}
              </span>
            )}
          </div>
          <button className='w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-700 rounded-lg hover:bg-sky-900 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50'>
            Login
          </button>
          <div className='mt-4 text-m text-slate-500'>
            <p>
              Don't have an account?{' '}
              <a
                href='/signup'
                className='text-sky-700 underline underline-offset-4 ml-2'>
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
