//import 'tailwindcss/tailwind.css';

import '../styles/global.css';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import Layout from '../components/Layout';
import ShopProvider from '../context/shopContext';
import { ToastProvider } from '../context/ToastContext';
import ToastContainer from '../components/ToastContainer';

import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ShopProvider>
      <ToastProvider>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
        <ToastContainer />
      </ToastProvider>
    </ShopProvider>
  );
}

export default MyApp;
