import React from 'react';
import { useToast } from '@/hooks/useToast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { customerRecover } from '@/lib/shopify';

export default function ForgotForm() {
  const toast = useToast();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .min(8, 'This is not long enough to be an email')
      .max(120, 'This is too long'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isDirty, isValid } = formState;

  async function onSubmitForm({ email }) {
    try {
      console.log(email);
      const res = await customerRecover(email);
      if (res.userErrors.length > 0) {
        throw res.userErrors;
      }
      reset();
      toast('success', 'Got it! Email coming your way now');
    } catch (err) {
      console.log(err);
      toast('error', 'There was an error please contact support');
    }
  }

  return (
    <>
      <div className='gap-y-3 mb-4'>
        <h2 className='text-3xl font-medium my-2'>Forgot your password?</h2>
      </div>
      <div className='p-4 py-6 rounded-lg bg-slate-50 md:p-8 mb-4'>
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
          <button
            disabled={!isDirty || !isValid}
            className='disabled:bg-slate-500 w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-700 rounded-lg hover:bg-sky-900 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50'>
            Request Reset
          </button>
          <div className='mt-4 text-m text-slate-500'>
            <p>
              Remembered your password?{' '}
              <a
                href='/account/login'
                className='text-sky-700 underline underline-offset-4 ml-2'>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
