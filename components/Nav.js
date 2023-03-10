import Link from 'next/link';
import { useContext, useState, useCallback } from 'react';
import { CartContext } from '../context/shopContext';
import { AuthContext } from '../context/AuthContext';
import MiniCart from './MiniCart';
import { headerLinks } from '../configs/menus';
import Logo from './Logo';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import router from 'next/router';

export default function Nav() {
  const [navbar, setNavbar] = useState(false);
  const { cart, cartOpen, setCartOpen } = useContext(CartContext);
  const { customer } = useContext(AuthContext);
  const scrollDirection = useScrollDirection();

  let cartQuantity = 0;

  if (cart.lines && cart.lines.length > 0) {
    cart.lines.map((item) => {
      return (cartQuantity += item?.quantity);
    });
  }

  const handleProfileLink = useCallback(
    (e) => {
      e.preventDefault();
      // check for customer && customer token
      if (!customer || !customer.token) {
        router.push('/account/login');
      } else {
        router.push('/account/profile');
      }
    },
    [customer]
  );

  return (
    <header
      className={`border-b sticky ${
        scrollDirection === 'down' ? '-top-24' : 'top-0'
      } top-0 z-20 bg-sky-900 text-white`}>
      <div
        className='flex flex-wrap items-center mx-auto max-w-screen-xl w-full
          justify-between
          md:justify-start
          py-4
          px-4
          text-lg'>
        <div className='md:hidden'>
          <button
            className='p-2 text-white rounded-md outline-none focus:border-white focus:border'
            onClick={() => setNavbar(!navbar)}>
            {navbar ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </button>
        </div>
        <div className='md:mr-10'>
          <div className='md:order-2'>
            <Logo className={'cursor-pointer'} />
          </div>
        </div>

        <div className='flex items-center md:order-3 gap-x-2'>
          <a href={`#`} onClick={handleProfileLink}>
            <HiOutlineUser />
          </a>
          <a
            className='text-md font-semibold text-m cursor-pointer flex items-center gap-2 relative'
            onClick={() => setCartOpen(!cartOpen)}>
            <HiOutlineShoppingBag />{' '}
            {cartQuantity > 0 && (
              <div className='w-4 h-4 text-xs rounded-full bg-white text-sky-900 flex justify-center items-center absolute -top-2 -right-2'>
                {cartQuantity}
              </div>
            )}
          </a>
        </div>

        <div
          className={`items-center w-full md:flex md:w-auto md:order-1 md:flex-1 ${
            navbar ? 'block' : 'hidden'
          }`}
          id='mobile-menu-2'>
          <ul className='flex flex-col mt-4 font-regular md:flex-row md:space-x-8 lg:mt-0 '>
            {headerLinks.map(({ id, pathname, title }) => {
              return (
                <li key={id}>
                  <a
                    href={pathname}
                    className='block py-2 pr-4 pl-3 text-white hover:underline hover:underline-offset-8'>
                    {title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <MiniCart cart={cart} />
      </div>
    </header>
  );
}
