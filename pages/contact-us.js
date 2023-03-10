import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useToast } from '../hooks/useToast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { social } from '../configs/menus';

export default function ContactUs() {
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .min(8, 'This is not long enough to be an email')
      .max(120, 'This is too long'),
    subject: Yup.string()
      .required('Subject is required')
      .min(8, 'The subject needs to be a bit longer, please')
      .max(120, 'This is too long'),
    message: Yup.string()
      .required('You need to enter your message')
      .min(10, 'Your message must be longer than this!')
      .max(1000, "Your message can't be more than 1000 characters"),
    human: Yup.bool().oneOf([true], 'Check the box if you are human'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmitForm(values) {
    console.log(values);
    // reset();
    // toast('warning', 'This will be implemented shortly');
    let config = {
      method: 'post',
      url: `/api/contact`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    };

    try {
      const response = await axios(config);
      console.log(response);
      if (response.status == 200) {
        reset();
        toast(
          'success',
          'Thank you for contacting us, we will be in touch soon.'
        );
      }
    } catch (err) {}
  }
  return (
    <section className='bg-white '>
      <div className='header-section'>
        <h1>Contact Us</h1>
      </div>
      <div className='wrapper'>
        <div className='grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2'>
          <div className=''>
            <div className='mb-6'>
              <h1 className='mt-2 text-2xl font-semibold text-gray-800 md:text-3xl '>
                We’d love to hear from you.
              </h1>

              <p className='mt-3 text-slate-500 '>
                Interested in designing your own bag, garment or just wanting to
                tell us something awesome about yourself?
                <br />
                Please fill out this form or shoot us an email.
              </p>
            </div>
            <div className='flex flex-row items-center gap-x-3'>
              <div>
                <span className='inline-block p-3 text-sky-700 rounded-full bg-sky-100/80 '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-5 h-5'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                    />
                  </svg>
                </span>
              </div>
              <div>
                <h2 className='mt-4 text-base font-medium text-slate-800 '>
                  Email
                </h2>

                <p className='mt-2 text-sm text-slate-500 '>
                  Our friendly team is here to help.
                </p>
                <p className='mt-2 text-sm text-sky-700 '>
                  info@sataylorcustoms.com
                </p>
              </div>
            </div>
            <div class='mt-6 w-80 md:mt-8 flex flex-row items-center gap-x-3 '>
              <div class='flex mt-4  '>
                {social.map((item, index) => (
                  <>
                    {item.show && (
                      <span className='inline-block p-3 text-sky-700 rounded-full bg-sky-100/80 '>
                        <a
                          key={index}
                          href={item.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sky-700 hover:text-sky-90'>
                          <span className='sr-only'>{item.title}</span>
                          {item.icon}
                        </a>
                      </span>
                    )}
                  </>
                ))}
              </div>
              <h3 class='font-medium text-slate-800'>Follow us</h3>
            </div>
          </div>

          <div className='p-4 py-6 rounded-lg bg-slate-50 md:p-8'>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className='-mx-2 md:items-center md:flex'>
                <div className='flex-1 px-2'>
                  <label className='block mb-2 text-sm text-slate-600'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    placeholder='Full Name'
                    name='name'
                    {...register('name')}
                    className={`${
                      errors.name ? 'ring-2 ring-red-500' : null
                    }block w-full px-5 py-2.5 mt-2 text-slate-700 placeholder-slate-400 bg-white border border-slate-200 rounded-lg focus:border-sky-400 dark:focus:border-sky-400 focus:ring-sky-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                  />
                  {errors && (
                    <span className='text-red-400 text-sm py-2'>
                      {errors.name?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className='mt-4'>
                <label className='block mb-2 text-sm text-slate-600 '>
                  Email address
                </label>
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
                  Subject Line
                </label>
                <input
                  type='text'
                  name='subject'
                  {...register('subject')}
                  placeholder='I am interested in having something made'
                  className={`${
                    errors.subject ? 'ring-2 ring-red-500' : null
                  }block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:ring-sky-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                />
                {errors && (
                  <span className='text-red-400 text-sm py-2'>
                    {errors.subject?.message}
                  </span>
                )}
              </div>
              <div className='w-full mt-4'>
                <label className='block mb-2 text-sm text-gray-600 '>
                  Message
                </label>
                <textarea
                  name='message'
                  rows='4'
                  {...register('message')}
                  className={`${
                    errors.message ? 'ring-2 ring-red-500' : null
                  }block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56  focus:ring-sky-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                  placeholder='Message'></textarea>
                {errors && (
                  <span className='text-red-400 text-sm py-2'>
                    {errors.message?.message}
                  </span>
                )}
              </div>
              <div class='mt-4 block min-h-[1.5rem] pl-[1.5rem]'>
                <input
                  class={`${
                    errors.human ? 'ring-2 ring-red-500' : null
                  }relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-white outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-['']  checked:bg-sky-700 checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-white focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent`}
                  type='checkbox'
                  name='human'
                  value=''
                  id='checkboxDefault'
                  {...register('human')}
                />
                <label
                  class='inline-block pl-[0.15rem] hover:cursor-pointer'
                  forhtml='checkboxDefault'>
                  I am not a robot
                </label>
                {errors && (
                  <span className='text-red-400 text-sm py-2 pl-2'>
                    {errors.human?.message}
                  </span>
                )}
              </div>
              <button className='w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-700 rounded-lg hover:bg-sky-900 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50'>
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
