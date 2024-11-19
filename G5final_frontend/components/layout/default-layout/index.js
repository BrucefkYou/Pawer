import Navbar from './navbar';
import Footer from './footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function DefaultLayout({ children }) {
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();

  console.log(router.pathname);

  useEffect(() => {
    console.log(1);
    setIsLoading(true);
  }, [router.pathname]);

  useEffect(() => {
    console.log(2);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [loading]);

  return (
    <>
      <Navbar />
      <main>{loading ? <p>loading...</p> : children}</main>
      <Footer />
    </>
  );
}
