import { useEffect } from 'react';
import { AuthProvider } from '@/hooks/use-auth';
import { CartProvider } from '@/hooks/use-cart/use-cart-state';
import { LoaderProvider } from '@/hooks/use-loader';
import Head from 'next/head';
import CustomCursor from '@/components/mouseCursor';
import '@/index.scss';
import DefaultLayout from '@/components/layout/default-layout';

export default function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  const pageTitle = pageProps.title || 'Pawer寶沃';

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{pageTitle}</title>
      </Head>
      <LoaderProvider>
        <AuthProvider>
          <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
        </AuthProvider>
      </LoaderProvider>
    </>
  );
}
