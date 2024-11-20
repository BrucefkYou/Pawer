import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';

export default function BlogBtn() {
  const router = useRouter();
  const { auth ,setNextRoute} = useAuth();

  const isLogin = () => {
    if (auth.isAuth) {
      router.push('/member/blog');
    } else {
      toast('請先登入會員');
      router.push('/member/login');
    }
    setNextRoute('/member/blog');
  };
  return (
    <button className="btn btn-primary my-blog m-none" onClick={isLogin}>
      我的部落格
    </button>
  );
}
