import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';

export default function BlogBtn() {
  const router = useRouter();
  const { auth } = useAuth();

  const islogin = () => {
    if (auth.isAuth) {
      router.push('http://localhost:3000/member/blog');
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

      router.push('member/login');
    }
  };
  return (
    <button className="btn btn-primary my-blog m-none" onClick={islogin}>
      我的部落格
    </button>
  );
}
