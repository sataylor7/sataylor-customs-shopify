import React from 'react';
import { footerLinks, social } from '../configs/menus';

const year = new Date().getUTCFullYear();
const Footer = () => (
  <footer className='p-4 bg-white sm:p-6 dark:bg-slate-900'>
    <div className='md:flex md:justify-between'>
      <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 md:flex-1'>
        {footerLinks.map((footerLink) => (
          <div key={footerLink.id}>
            <h3 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
              {footerLink.name}
            </h3>
            <ul>
              {footerLink.children.map((child) => (
                <li className='mb-4' key={child.value}>
                  <a
                    href={child.link}
                    target='_blank'
                    className='text-gray-600 hover:underline dark:text-gray-400'
                    rel='noreferrer'>
                    {child.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 md:hidden' />
      <div className='text-white uppercase font-semibold flex-1 justify-center flex mt-4 md:mt-0'>
        <h3>Our Mission</h3>
      </div>
    </div>
    <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
    <div className='sm:flex sm:items-center sm:justify-between'>
      <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
        © {year}{' '}
        <a
          href='#'
          target='_blank'
          className='hover:underline'
          rel='noreferrer'>
          SATaylor Customs.
        </a>{' '}
        All Rights Reserved.
      </span>
      <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
        Build | Design &bull;&nbsp;
        <a
          href='#'
          target='_blank'
          className='hover:underline'
          rel='noreferrer'>
          SATaylor Studios LLC.
        </a>
      </span>
      <div className='flex mt-4 space-x-6 sm:justify-center sm:mt-0'>
        {social.map((item, index) => (
          <>
            {item.show && (
              <a
                key={index}
                href={item.link}
                target='_blank'
                className='text-gray-500 hover:text-gray-900 dark:hover:text-white'>
                <span className='sr-only'>{item.title}</span>
                {item.icon}
              </a>
            )}
          </>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
