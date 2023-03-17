import React from 'react';
import ReviewsJSON from '@/data/reviews.json';

const Stars = ({ rating }) => {
  return (
    <ul className='text-sky-700 flex justify-center'>
      {[...Array(5)].map((star, index) => {
        index += 1;
        let attrs = {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          className: 'mr-1 h-5 w-5',
          fill: index <= rating ? 'currentColor' : 'none',
          strokeWidth: index <= rating ? '' : '1.5',
          stroke: index <= rating ? '' : 'currentColor',
        };
        return (
          <li key={star}>
            <svg {...attrs}>
              <path
                fill-rule='evenodd'
                d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                clip-rule='evenodd'
              />
            </svg>
          </li>
        );
      })}
    </ul>
  );
};

function Reviews() {
  const { reviews } = ReviewsJSON;
  return (
    <section className='pt-12 md:pt-2 border-t-[1px] border-slate-200'>
      <div className='flex justify-start items-start max-w-2xl mx-auto px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8 gap-y-3 '>
        <p className='text-2xl lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-800 '>
          Reviews
        </p>
      </div>
      <div className='flex justify-center items-center'>
        <div className='flex flex-col justify-start items-start w-full space-y-4'>
          <div className='w-full flex justify-start items-start flex-col bg-slate-100 p-8 gap-y-4'>
            {reviews.map(
              ({ name, piece_ordered, rating, title, description }) => {
                return (
                  <div className='border-b-[1px] border-sky-600 last:border-0 pb-5 wrapper'>
                    <div className='flex flex-col md:flex-row justify-between w-full'>
                      <div className='flex flex-row justify-between items-start'>
                        <p className='text-xl md:text-2xl font-medium leading-normal text-gray-800 '>
                          {title} <span className='text-l font-light'>|</span>{' '}
                          <span className='text-m font-thin'>
                            {piece_ordered}
                          </span>
                        </p>
                      </div>
                      <Stars {...{ rating }} />
                    </div>
                    <div id='menu' className='md:block'>
                      <p className='mt-3 text-base leading-normal text-gray-600  w-full md:w-9/12 xl:w-5/6'>
                        {description}
                      </p>
                      <div className='mt-6 flex justify-start items-center flex-row space-x-2.5'>
                        <div className='flex flex-col justify-start items-start space-y-2'>
                          <p className='text-base font-medium leading-none text-gray-800 '>
                            {name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
