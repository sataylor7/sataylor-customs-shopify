import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useToast } from '@/hooks/useToast';

export default function SignUpForm() {
  const { register: signup } = useContext(AuthContext);
  const router = useRouter();
  const toast = useToast();
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Minimum of 8 characters'),
    // passwordConfirmation: Yup.string().oneOf(
    //   [Yup.ref('password'), null],
    //   'Passwords must match'
    // ),
    firstName: Yup.string().required('First Name required'),
    lastName: Yup.string().required('Last name is required'),
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

  async function onSubmitForm({ email, firstName, lastName, password }) {
    try {
      const response = await signup({
        email,
        password,
        firstName,
        lastName,
      });
      console.log(response);
      if (response.message) {
        reset();
        toast(response.type, response.message);
        router.push('/profile');
      }
    } catch (err) {
      console.log(err);
      toast('error', 'There was an error please contact support');
    }
  }
  return (
    <>
      <div className='w-1/2 mx-auto gap-y-3 mb-4'>
        <h2 className='text-3xl font-medium my-2'>Sign Up</h2>
        <p className='text-slate-600'>
          Welcome aboard! Please enter your details.
        </p>
      </div>
      <div className='p-4 py-6 rounded-lg bg-slate-50 md:p-8 w-1/2 mx-auto mb-4'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className='-mx-2 md:items-center md:flex'>
            <div className='flex-1 px-2'>
              <label className='block mb-2 text-sm text-gray-60'>
                First Name
              </label>
              <input
                type='text'
                placeholder='Fluffy '
                name='firstName'
                {...register('firstName')}
                className={`${
                  errors.firstName ? 'ring-2 ring-red-500' : null
                }block w-full px-5 py-2.5 mt-2 text-slate-700 placeholder-slate-400 bg-white border border-slate-200 rounded-lg focus:border-sky-400 dark:focus:border-sky-400 focus:ring-sky-400 focus:outline-none focus:ring focus:ring-opacity-40`}
              />
              {errors && (
                <span className='text-red-400 text-sm py-2'>
                  {errors.firstName?.message}
                </span>
              )}
            </div>

            <div className='flex-1 px-2 mt-4 md:mt-0'>
              <label className='block mb-2 text-sm text-gray-600'>
                Last Name
              </label>
              <input
                type='text'
                name='lastName'
                placeholder='Unicorn'
                {...register('lastName')}
                className={`${
                  errors.lastName ? 'ring-2 ring-red-500' : null
                }block w-full px-5 py-2.5 mt-2 text-slate-700 placeholder-slate-400 bg-white border border-slate-200 rounded-lg focus:border-sky-400 dark:focus:border-sky-400 focus:ring-sky-400 focus:outline-none focus:ring focus:ring-opacity-40`}
              />
              {errors && (
                <span className='text-red-400 text-sm py-2'>
                  {errors.lastName?.message}
                </span>
              )}
            </div>
          </div>
          <div className='mt-4'>
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
          {/* <div className='mt-4'>
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
          </div> */}

          <button className='w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-700 rounded-lg hover:bg-sky-900 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50'>
            Sign Up
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
