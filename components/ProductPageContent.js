import Image from 'next/image';
import ProductForm from './ProductForm';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import RecommendedList from './RecommendedList';
import { Disclosure } from '@headlessui/react';
import { HiChevronDown, HiScissors, HiOutlineBookOpen } from 'react-icons/hi';

export default function ProductPageContent({ product }) {
  const images = [];

  product.images.edges.map((image, i) => {
    images.push(
      <SwiperSlide key={`slide-${i}`}>
        <Image
          src={image.node.url}
          alt={image.node.altText}
          layout='fill'
          objectFit='cover'
        />
      </SwiperSlide>
    );
  });

  SwiperCore.use([Navigation, Pagination]);
  const products = product.collections.edges[0].node.products.edges;
  console.log(products);
  return (
    <div className='flex flex-col gap-y-8 justify-center'>
      <div className='flex flex-col items-center justify-center w-full max-w-6xl mx-auto space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 mb-14'>
        <div className='w-full max-w-md  bg-white border shadow-lg rounded-2xl grow'>
          <div className='relative w-full h-96 md:h-[500px]'>
            <Swiper
              style={{
                '--swiper-navigation-color': '#000',
                '--swiper-pagination-color': '#000',
              }}
              navigation
              pagination={{ clickable: true }}
              watchOverflow='true'
              className='h-96 md:h-[500px] rounded-2xl'
              loop={images.length > 1 ? true : false}>
              {images}
            </Swiper>
          </div>
        </div>
        <div className='flex flex-col  w-full md:w-2/5'>
          <ProductForm product={product} />
          <p className='w-11/12 max-w-3xl py-4 mx-auto space-y-8 md:space-x-4 lg:space-x-8 border-b-[1px] border-slate-200'>
            {product.description}
          </p>
          {product.materials || product.careInstructions ? (
            <div className='p-4'>
              {product.materials && (
                <Disclosure
                  as='div'
                  className='border-b-[1px] border-slate-200 pb-2'>
                  <Disclosure.Button className='py-2 flex items-center w-full justify-between'>
                    <div className='flex items-center gap-1'>
                      <HiScissors />
                      Materials
                    </div>

                    <HiChevronDown className='ui-open:rotate-180 ui-open:transform' />
                  </Disclosure.Button>
                  <Disclosure.Panel className='text-gray-500'>
                    {product.materials.value}
                  </Disclosure.Panel>
                </Disclosure>
              )}
              {product.careInstructions && (
                <Disclosure
                  as='div'
                  className='border-b-[1px] border-slate-200 pb-2'>
                  <Disclosure.Button className='py-2 flex items-center w-full justify-between'>
                    <div className='flex items-center gap-1'>
                      <HiOutlineBookOpen />
                      Care Instructions
                    </div>
                    <HiChevronDown className='ui-open:rotate-180 ui-open:transform' />
                  </Disclosure.Button>
                  <Disclosure.Panel className='text-gray-500'>
                    {product.careInstructions.value}
                  </Disclosure.Panel>
                </Disclosure>
              )}
            </div>
          ) : null}
        </div>
      </div>
      {/** MAKERS MARK */}
      <div className='bg-slate-50  p-12 flex items-start max-w-screen-lg mx-auto w-full mt-12 gap-4 justify-between'>
        <div className='flex flex-col'>
          <h3 className='text-lg font-semibold text-slate-600'>Makers Mark</h3>
          <p>Background of the makers mark and the importance</p>
        </div>
        <div className='w-28 overflow-hidden'>
          <div className='relative group-hover:opacity-75 h-28 bg-black'>
            <Image
              src='/sa-makers-mark.png'
              alt='SA makers mark'
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
      </div>
      {/** SHIPPING / RETURNS / REFUNDS */}
      <div className='flex flex-col md:flex-row gap-2 w-full max-w-screen-xl mx-auto mt-10 text-slate-700'>
        <div className='grow md:mr-2 flex flex-col gap-y-3 md:border-r-[1px] md:border-slate-100'>
          <div className='p-4'>
            <h4 className='text-lg font-normal bg-slate-50  p-4'>Shipping</h4>
            <p className='px-4 mt-2'>Information on the shipping</p>
          </div>
          <div className='p-4'>
            <h4 className='text-lg font-normal bg-slate-50  p-4'>
              Returns | Refunds
            </h4>
            <p className='px-4 mt-2'>
              Due to the nature of our services there are no refunds or returns.
            </p>
          </div>
        </div>

        <div className='w-1/2'>
          <h4 className='text-lg font-normal bg-slate-50  p-4'>
            30 Day Guarantee
          </h4>
          <p className='px-4 mt-2'>
            Information on the guarantee, any natural rips, tears, breaks,
            hardware malfunction have a 30 day repair guarantee. If the repair
            cannot be made for any reason then a new item will be made.
          </p>
        </div>
      </div>
      {products && products.length > 1 && (
        <RecommendedList current={product.id} products={products} />
      )}
    </div>
  );
}
