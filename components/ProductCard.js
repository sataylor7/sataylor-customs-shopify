import Link from 'next/link';
import Image from 'next/image';
import { formatter } from '../utils/helpers';

const ProductCard = ({ product }) => {
  const { handle, title } = product.node;

  const { altText, url } = product.node.images.edges[0].node;

  const price = product.node.priceRange.minVariantPrice.amount;

  return (
    <Link href={`/products/${handle}`}>
      <div class='w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl'>
        <a className='group'>
          <div className='w-full overflow-hidden bg-gray-200 rounded-3xl'>
            <div className='relative group-hover:opacity-75 h-72'>
              <Image src={url} alt={altText} layout='fill' objectFit='cover' />
            </div>
          </div>

          <div class='px-4 py-3 w-72'>
            <p class='text-lg font-bold text-black truncate block capitalize'>
              {title}
            </p>
            <div class='flex items-center'>
              <p class='text-lg font-semibold text-black cursor-auto my-3'>
                {formatter.format(price)}
              </p>
              <div class='ml-auto'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  class='bi bi-bag-plus'
                  viewBox='0 0 16 16'>
                  <path
                    fillRule='evenodd'
                    d='M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z'
                  />
                  <path d='M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z' />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </div>
      {/* <a className="group">
        <div className="w-full overflow-hidden bg-gray-200 rounded-3xl">
          <div className="relative group-hover:opacity-75 h-72">
            <Image 
              src={url}
              alt={altText}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-700">{formatter.format(price)}</p>
      </a> */}
    </Link>
  );
};

export default ProductCard;
