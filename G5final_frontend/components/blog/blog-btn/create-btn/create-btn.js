import { BsPencilFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import styles from './create-btn.module.scss';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';
import toast from 'react-hot-toast';

export default function CreateBtn({ btnName }) {
  const router = useRouter();
  const { id } = router.query; //文章ID
  const { auth, setNextRoute } = useAuth();
  const [ownerId, setOwnerId] = useState(null); //存作者ID
  const uid = auth.memberData.id;
  const [bottomOffset, setBottomOffset] = useState(20);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`http://localhost:3005/api/blog/${id}`);
          const data = await response.json();
          const blogData = data[0];
          const memberId = blogData.MemberID;

          // console.log('文章建立者的會員 ID:', memberId);
          // console.log('部落格 ID:', blogData.ID);
          // console.log('目前登入的會員ID：', uid);
          setOwnerId(memberId);
        } catch (error) {
          console.error('無法獲取文章資料', error);
        }
      };
      fetchArticle();
    }
  }, [id, uid]);

  useEffect(() => {
    const handleScroll = () => {
      const footerHeight = document.querySelector('footer')?.offsetHeight || 0;
      const windowHeight = window.innerHeight;
      const buttonHeight = 50;

      const scrollBottom =
        document.documentElement.scrollHeight - window.scrollY - windowHeight;

      let newBottomOffset = 20;
      if (scrollBottom < footerHeight + buttonHeight) {
        newBottomOffset = footerHeight + buttonHeight - scrollBottom;
      }

      setBottomOffset(newBottomOffset);
      // console.log(newBottomOffset);
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 500); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isOwner = uid === ownerId;

  const islogin = () => {
    // console.log('目前登入的會員 ID:', uid);
    if (auth.isAuth) {
      
      router.push(isOwner ? `/blog/edit/${id}` : '/blog/create');
    } else {
      toast('請先登入會員');
      router.push('/member/login');
    }
    setNextRoute('/blog/create');
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 770);
    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <button
      className={`btn btn-warning ${styles['create-btn']}`}
      type="button"
      onClick={islogin}
      style={{ bottom: `${bottomOffset}px` }}
    >
      {isMobile ? (
        <BsPencilFill size={20} color="white" />
      ) : isOwner ? (
        '編輯文章'
      ) : (
        '建立文章'
      )}
    </button>
  );
}
