import React from 'react';
import Logo from './Logo';
import { footerLinks, social } from '../configs/menus';

const year = new Date().getUTCFullYear();
const Footer = () => (
  <footer className='p-4 sm:p-6 bg-slate-900'>
    <div className='container mx-auto max-w-screen-xl'>
      <div className='md:flex md:justify-between'>
        <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 md:flex-1'>
          {footerLinks.map((footerLink) => (
            <div key={footerLink.id}>
              <h3 className='mb-6 text-sm font-semibold text-white uppercase'>
                {footerLink.name}
              </h3>
              <ul>
                {footerLink.children.map((child) => (
                  <li className='mb-4' key={child.value}>
                    <a
                      href={child.link}
                      target='_blank'
                      className='text-white hover:underline'
                      rel='noreferrer'>
                      {child.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className='my-6 sm:mx-auto border-gray-700 md:hidden' />
        <div className='text-white flex-1 flex mt-4 md:mt-0 flex-col text-sm'>
          <h3 className='uppercase font-semibold mb-6 '>Our Mission</h3>
          <p>
            Create custom, handmade, one of a kind, garments and accessories
            that are uniquely you.
          </p>
          <div className='mt-4'>
            <Logo className={'cursor-pointer'} />
          </div>
        </div>
      </div>
      <hr className='my-6 sm:mx-auto border-gray-700 lg:my-8' />
      <div className='flex flex-col md:flex-row sm:items-center sm:justify-between'>
        <span className='mb-6 md:mb-0 text-sm text-gray-400 sm:text-center '>
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
        <span className='text-sm text-gray-400 sm:text-center'>
          Build | Design &bull;&nbsp;
          <a
            href='#'
            target='_blank'
            className='hover:underline'
            rel='noreferrer'>
            SATaylor Studios LLC.
          </a>
        </span>
        <div className='md:flex md:justify-center space-x-6 hidden mt-0'>
          {social.map((item, index) => (
            <>
              {item.show && (
                <a
                  key={index}
                  href={item.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-500 hover:text-white'>
                  <span className='sr-only'>{item.title}</span>
                  {item.icon}
                </a>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
