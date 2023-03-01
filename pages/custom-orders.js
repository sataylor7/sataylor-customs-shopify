import React from 'react';
import { getProductsInCollection } from '../lib/shopify';
import ProductList from '../components/ProductList';

export default function Customs({ products }) {
  return (
    <div>
      <div className='header-section'>
        <h1>Previous Custom Orders</h1>
      </div>
      <div className='wrapper'>
        <ProductList {...{ products }} />
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const products = await getProductsInCollection('custom-orders');
  console.log(products);
  return {
    props: { products }, // will be passed to the page component as props
    revalidate: 60,
  };
}
