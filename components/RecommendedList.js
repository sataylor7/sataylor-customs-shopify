import ProductCard from './ProductCard';

const RecommendedList = ({
  products,
  current,
  title = 'Recommended Products',
}) => {
  return (
    <div className='bg-white'>
      <div className='max-w-2xl mx-auto md:py-16 md:pt-2 md:px-4 py-24 px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold text-gray-900 mb-6'>{title}</h2>
        <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {products.map((product) =>
            product.node.id === current ? null : (
              <ProductCard key={product.node.id} product={product} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedList;
