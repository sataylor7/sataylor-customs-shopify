import { Fragment, useContext, useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { CartContext } from '../context/shopContext';
import { AuthContext } from '@/context/AuthContext';
import { formatter } from '../utils/helpers';
import EmptyCartSVG from '../icons/empty-svg.icon';
import LoginGuestView from './drawer/LoginGuestView';
import { getCheckoutUrl } from '@/lib/shopify';

const MiniCartView = ({
  cart,
  cartLoading,
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
  handleCheckoutLink,
  clearCart,
  setCartOpen,
}) => {
  const { lines = [], estimatedCost = {} } = cart;

  return (
    <>
      <div className='mt-8 overflow-y-auto flex-1'>
        <div className='flow-root'>
          {lines.length > 0 ? (
            <ul role='list' className='-my-6 divide-y divide-gray-200'>
              {lines.map((item) => {
                const { product, priceV2, id, title } = item.merchandise;
                const productImage = product.images.edges[0].node ?? {};
                return (
                  <li key={id + Math.random()} className='relative flex py-6'>
                    <div
                      className={`top-0 left-0 right-0 z-50 w-full h-full absolute ${
                        cartLoading ? 'bg-white opacity-60' : 'hidden'
                      }`}>
                      Loading..
                    </div>
                    <div className='relative flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md'>
                      <Image
                        src={productImage.src}
                        alt={product.title}
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>

                    <div className='flex flex-col flex-1 ml-4'>
                      <div>
                        <div className='flex justify-between text-base font-medium text-gray-900'>
                          <h3>
                            <Link href={`/products/${product.handle}`} passHref>
                              <a onClick={() => setCartOpen(false)}>
                                {product.title}
                              </a>
                            </Link>
                          </h3>
                          <p className='ml-4'>
                            {formatter.format(priceV2.amount)}
                          </p>
                        </div>
                        <p className='mt-1 text-sm text-gray-500'>
                          {title !== 'Default Title' && title}
                        </p>
                      </div>
                      <div className='flex items-end justify-between flex-1 text-sm'>
                        {/* <p className="text-gray-500">Qty {product.variantQuantity}</p> */}
                        <div className={`border`}>
                          <button
                            className='px-2'
                            onClick={() =>
                              decrementCartItem(item.id, item.quantity)
                            }
                            disabled={cartLoading}>
                            -
                          </button>
                          <span className='px-2 border-l border-r'>
                            {' '}
                            {item.quantity}
                          </span>
                          <button
                            className='px-2'
                            onClick={() =>
                              incrementCartItem(item.id, item.quantity)
                            }
                            disabled={cartLoading}>
                            +
                          </button>
                        </div>
                        <div className='flex'>
                          <button
                            onClick={() => removeCartItem(item.id)}
                            type='button'
                            className='font-medium text-gray-500 hover:text-gray-800'
                            disabled={cartLoading}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className='flex-auto'>
              <p className='text-center text-gray-900 px-10 leading-loose'>
                You haven&apos;t added anything in your cart yet. Start adding
                the products you like.
              </p>

              <div className='flex items-center justify-center mt-40px md:mt-95px'>
                <EmptyCartSVG />
              </div>
            </div>
          )}
        </div>
      </div>

      {cart.lines?.length > 0 ? (
        <div className='border-t border-gray-200 pt-4'>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <p>Subtotal</p>
            <p>{formatter.format(estimatedCost.subtotalAmount.amount)}</p>
          </div>
          <p className='mt-0.5 text-sm text-gray-500'>
            Shipping and taxes calculated at checkout.
          </p>
          <div className='mt-6'>
            <a
              href='#'
              onClick={handleCheckoutLink}
              className={`flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-sky-800 hover:bg-sky-900 border border-transparent rounded-md shadow-sm  ${
                cartLoading ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}>
              Checkout
            </a>
          </div>
          <div className='flex justify-center mt-6 text-sm text-center text-gray-500'>
            <p>
              <button
                onClick={() => clearCart()}
                className='font-medium hover:text-gray-800'>
                Clear Cart
              </button>{' '}
              or{' '}
              <button
                type='button'
                className='font-medium hover:text-gray-800'
                onClick={() => setCartOpen(false)}>
                Continue Shopping
                <span aria-hidden='true'> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default function MiniCart({ cart }) {
  const cancelButtonRef = useRef();
  const [currentView, setCurrentView] = useState('MiniCart');

  const {
    cartOpen,
    setCartOpen,
    checkoutUrl,
    removeCartItem,
    clearCart,
    cartLoading,
    incrementCartItem,
    decrementCartItem,
    associateCartToCustomer,
  } = useContext(CartContext);

  const { customer } = useContext(AuthContext);

  const handleCheckoutLink = useCallback(
    async (e) => {
      e.preventDefault();
      // check for customer && customer token don't exist
      if (!customer || !customer.token) {
        // set show guest checkout and redirect to /login
        setCurrentView('LoginGuest');
      } else {
        // if they do then that means the user has logged in (either register => login or just existing account login)
        // need to attach the user to the checkout
        await associateCartToCustomer(customer.email);
        // checkout if the customer has an address
        const { checkoutUrl } = await getCheckoutUrl(cart.id);
        if (checkoutUrl) window.location = checkoutUrl;
      }
    },
    [customer]
  );

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog
        initialFocus={cancelButtonRef}
        as='div'
        className='fixed inset-0 z-50 overflow-hidden'
        onClose={() => {
          setCartOpen(!cartOpen);
        }}>
        <div className='absolute inset-0 overflow-hidden'>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>

          <div className='fixed inset-y-0 right-0 flex max-w-full pl-10'>
            <Transition.Child
              as={Fragment}
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'>
              <div className='w-screen max-w-md'>
                <div className='flex flex-col h-full overflow-y-scroll bg-white shadow-xl px-4 py-6 sm:px-6'>
                  <div className='flex items-start justify-between'>
                    <Dialog.Title className='text-lg font-medium text-gray-900'>
                      {currentView === 'MiniCart' && 'Shopping cart'}
                      {currentView === 'LoginGuest' &&
                        'Please fill out your details'}
                    </Dialog.Title>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        ref={cancelButtonRef}
                        type='button'
                        className='p-2 -m-2 text-gray-400 hover:text-gray-500'
                        onClick={() => setCartOpen(false)}>
                        <span className='sr-only'>Close panel</span>
                        <XIcon className='w-6 h-6' aria-hidden='true' />
                      </button>
                    </div>
                  </div>
                  {currentView === 'MiniCart' && (
                    <MiniCartView
                      {...{
                        cart,
                        cartLoading,
                        decrementCartItem,
                        incrementCartItem,
                        removeCartItem,
                        handleCheckoutLink,
                        clearCart,
                        setCartOpen,
                      }}
                    />
                  )}
                  {currentView === 'LoginGuest' && (
                    <LoginGuestView {...{ setCurrentView }} />
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
