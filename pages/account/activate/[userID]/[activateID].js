import React from 'react';
import { useRouter } from 'next/router';
import { encode } from 'shopify-gid';
import { useToast } from '@/hooks/useToast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { customerActivate } from '@/lib/shopify';

export default function Activate() {
  const router = useRouter();
  const toast = useToast();
  const { userID, activateID } = router.query;
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Minimum of 8 characters'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  async function onSubmitForm({ password }) {
    try {
      const res = await customerActivate(
        encode('Customer', userID),
        activateID,
        password
      );
      console.log(res);
      if (res.customer && res.customer.email) {
        router.push('/account/login');
      }
    } catch (err) {
      console.log(err);
      toast('error', 'There was an error please contact support');
    }
  }
  return (
    <>
      <div className='w-1/2 mx-auto gap-y-3 my-4'>
        <h2 className='text-3xl font-medium my-2'>Activate Account</h2>
        <p className='text-slate-600'>Almost there.</p>
      </div>
      <div className='p-4 py-6 rounded-lg bg-slate-50 md:p-8 w-1/2 mx-auto mb-4'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
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
          <div className='mt-4'>
            <label className='block mb-2 text-sm text-slate-600 '>
              Confirm Password
            </label>
            <input
              type='password'
              name='passwordConfirmation'
              {...register('passwordConfirmation')}
              className={`${
                errors.passwordConfirmation ? 'ring-2 ring-red-500' : null
              }block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:ring-sky-400 focus:outline-none focus:ring focus:ring-opacity-40`}
            />
            {errors && (
              <span className='text-red-400 text-sm py-2'>
                {errors.passwordConfirmation?.message}
              </span>
            )}
          </div>

          <button className='w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-700 rounded-lg hover:bg-sky-900 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50'>
            Activate
          </button>
          <div className='mt-4 text-m text-slate-500'>
            <p>
              Already have an account?{' '}
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
