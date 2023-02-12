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
    <div>
      <div className='flex flex-col items-center justify-center w-full max-w-6xl mx-auto space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8'>
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

      {products && products.length > 1 && (
        <RecommendedList current={product.id} products={products} />
      )}
    </div>
  );
}
