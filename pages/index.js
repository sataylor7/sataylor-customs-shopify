import { getProductsHomePage } from '../lib/shopify';
import ProductList from '../components/ProductList';
import Hero from '../components/Hero';
import Head from 'next/head';

export default function Home({ products }) {
  return (
    <div className=''>
      <Head>
        <title>S.A.Taylor Customs</title>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta
          httpEquiv='Content-Type'
          content='text/html; charset=ISO-8859-1'
        />
        <meta
          name='description'
          content='Custom, handmade, one of a kind, garments and accessories that are uniquely you.'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <meta property='og:title' content='S.A.Taylor Customs' />
        <meta property='og:type' content='website' />
        {/* <meta property='og:url' content='https://www.buildnextshop.com' />
        <meta
          property='og:image'
          content='https://www.buildnextshop.com/share.png'
        /> */}
        <meta
          property='og:description'
          content='Custom, handmade, one of a kind, garments and accessories that are uniquely you.'
        />
        <meta property='og:locale' content='en_US' />
        <meta property='og:site_name' content='S.A.Taylor Customs' />
      </Head>
      <Hero />
      <ProductList {...{ products, title: 'Featured Products' }} />
    </div>
  );
}

export async function getStaticProps() {
  const products = await getProductsHomePage();
  console.log(products);
  return {
    props: { products }, // will be passed to the page component as props
  };
}
