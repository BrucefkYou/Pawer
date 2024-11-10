import { BsPencilFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import styles from './create-btn.module.scss';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
// import logo from '@/assets/logo.png';

export default function CreateBtn({ btnName }) {
  const router = useRouter();
  const { auth } = useAuth();

  const islogin = () => {
    if (auth.isAuth) {
      router.push('http://localhost:3000/blog/create');
    } else {
      toast('請先登入會員', {
        duration: 1800,
        style: {
          borderRadius: '10px',
          borderTop: '15px #22355C solid',
          background: '#F5F5F5',
          color: '#646464',
          marginTop: '80px',
          width: '300px',
          height: '100px',
        },
      });
      router.push('http://localhost:3000/blog');
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      // href={`http://localhost:3000/blog/create`}
      className={`btn btn-warning ${styles['create-btn']}`}
      type="button"
      onClick={islogin}
    >
      {isMobile ? <BsPencilFill size={20} color="white" /> : btnName}
    </div>
  );
}
