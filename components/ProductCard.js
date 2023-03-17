import Link from 'next/link';
import Image from 'next/image';
import { formatter } from '../utils/helpers';

const ProductCard = ({ product }) => {
  const { handle, title, availableForSale, previousCustomOrder } = product.node;

  const { altText, url } = product?.node?.images?.edges[0]?.node;

  const price = product.node.priceRange.minVariantPrice.amount;

  return (
    <Link href={`/products/${handle}`}>
      <div className=' bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl'>
        <a className='group'>
          <div className='w-full overflow-hidden bg-gray-200 rounded-t-3xl'>
            <div className='relative group-hover:opacity-75 h-72'>
              {url && (
                <Image
                  src={url}
                  alt={altText}
                  layout='fill'
                  objectFit='cover'
                />
              )}
            </div>
          </div>

          <div className='px-4 py-3 w-72'>
            <p className='text-lg font-bold text-black truncate block capitalize'>
              {title}
            </p>
            <div className='flex items-center justify-between'>
              {!previousCustomOrder && (
                <>
                  <p className='text-lg font-semibold text-black cursor-auto my-3'>
                    {formatter.format(price)}
                  </p>
                  {!availableForSale && (
                    <div className='bg-slate-400 text-white rounded-lg px-4 py-3'>
                      Sold out
                    </div>
                  )}
                </>
              )}

              {previousCustomOrder && (
                <div className='bg-sky-700 text-white rounded-lg px-3 py-2'>
                  Inquire
                </div>
              )}
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
