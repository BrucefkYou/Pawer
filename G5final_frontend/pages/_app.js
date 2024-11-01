import { useEffect } from 'react';
import { AuthProvider } from '@/hooks/use-auth';
import { CartProvider } from '@/hooks/use-cart';
import '@/index.scss';
import DefaultLayout from '@/components/layout/default-layout';
export default function MyApp({ Component, pageProps }) {
  // 使用自訂在頁面層級的版面(layout)
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);
  return (
    <AuthProvider>
      <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
    </AuthProvider>
  );
}
