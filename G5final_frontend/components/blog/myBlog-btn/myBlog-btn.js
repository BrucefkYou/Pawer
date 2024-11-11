import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';

export default function BlogBtn() {
  const router = useRouter();
  const { auth } = useAuth();

  const islogin = () => {
    if (auth.isAuth) {
      router.push('/member');
    } else {
      router.push('member/login');
    }
  };
  return (
    <div
      className="btn btn-primary my-blog m-none"
      type="button"
      onClick={islogin}
    >
      我的部落格
    </div>
  );
}
