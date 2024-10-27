// import '@/styles/globals.css';
// 全域(global css)及全站會影響到的css(scss)都只有這裡可以導入
// import '@/styles/product-table.css';
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
  // 最外(上)元件階層包裹提供者元件，讓父母元件可以提供給他
  return <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>;
}

// return (
//   <AuthProvider>
//     <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
//   </AuthProvider>
// );
