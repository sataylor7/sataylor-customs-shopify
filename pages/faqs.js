import React from 'react';
import { Disclosure } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
export default function FAQs() {
  return (
    <section className='bg-white '>
      <div className='header-section'>
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className='max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8 gap-3 flex space-between flex-wrap'>
        <div className='flex-1'>
          <Disclosure as='div' className=''>
            <Disclosure.Button className='border-b-[1px] border-slate-200 p-2 flex items-center w-full justify-between bg-slate-100'>
              <div className='flex items-center gap-1'>
                What does the custom order process?
              </div>
              <HiChevronDown className='ui-open:rotate-180 ui-open:transform' />
            </Disclosure.Button>
            <Disclosure.Panel className='text-gray-500 p-2'>
              <ul className='list-decimal list-inside leading-8'>
                <li>Inquiry is sent from the customer to us.</li>
                <li>
                  We reach out and start to discuss how we can help bring the
                  customers vision to life.
                </li>
                <li>A quote is emailed, and a down payment is made</li>
                <li>A design concept is made and sent for approval</li>
                <li>
                  Approval is made, and the process of cutting/sewing/painting
                  making the piece starts
                </li>
                <li>
                  During this process we send out updates, and do our best to
                  keep the customer informed
                </li>
                <li>
                  Piece is completed, glamour shots are made and a final shot is
                  set off to customer
                </li>
                <li>
                  Piece is then packaged, a handwritten thank you note is
                  written
                </li>
                <li>
                  Piece is then shipped with a tracking number, tracking number
                  is sent to the customer
                </li>
                <li> Piece arrives at the customers destination</li>
              </ul>
            </Disclosure.Panel>
          </Disclosure>
          <Disclosure as='div' className=''>
            <Disclosure.Button className='border-b-[1px] border-slate-200 p-2 flex items-center w-full justify-between bg-slate-100'>
              <div className='flex items-center gap-1'>
                How long do custom orders usually take?
              </div>
              <HiChevronDown className='ui-open:rotate-180 ui-open:transform' />
            </Disclosure.Button>
            <Disclosure.Panel className='text-gray-500 p-2'>
              The time can vary based on the current wait list, however usually
              it takes 10-14 days to create/make/complete the custom order.{' '}
              <br />
              Updates are sent including progress shots, as well as any
              questions/clarifications needed. <br />
              We believe in being upfront and transparent through the whole
              process.
            </Disclosure.Panel>
          </Disclosure>
          <Disclosure as='div' className=''>
            <Disclosure.Button className='border-b-[1px] border-slate-200 p-2 flex items-center w-full justify-between bg-slate-100'>
              <div className='flex items-center gap-1'>
                When will my order arrive?
              </div>
              <HiChevronDown className='ui-open:rotate-180 ui-open:transform' />
            </Disclosure.Button>
            <Disclosure.Panel className='text-gray-500 p-2'>
              In most cases orders are packed and shipped within 2 business
              days. <br />
              Orders placed around holidays or containing custom items will take
              longer. <br /> Once the package is shipped, we unfortunately have
              no way to know or control when your order will arrive. <br /> All
              orders come with tracking numbers for your convenience. <br />
              If it has been longer than 2 weeks, please feel free to reach out
              to us at: info@sataylorcustoms.com
            </Disclosure.Panel>
          </Disclosure>
          <Disclosure as='div' className=''>
            <Disclosure.Button className='border-b-[1px] border-slate-200 p-2 flex items-center w-full justify-between bg-slate-100'>
              <div className='flex items-center gap-1'>
                Do you ship internationally?
              </div>
              <HiChevronDown className='ui-open:rotate-180 ui-open:transform' />
            </Disclosure.Button>
            <Disclosure.Panel className='text-gray-500 p-2'>
              At this time we do not, we only ship to the United States. <br />
              We do plan on expanding in the future to international.
            </Disclosure.Panel>
          </Disclosure>
        </div>
        <div className='shrink-0 md:w-1/3'>
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
                Do you have more questions?
              </h2>

              <p className='mt-2 text-sm text-slate-500 '>
                Our friendly team is here to help.
              </p>
              <p className='mt-2 text-sm text-sky-700 '>
                info@sataylorcustoms.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
