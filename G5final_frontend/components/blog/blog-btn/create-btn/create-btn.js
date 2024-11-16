// import { BsPencilFill } from 'react-icons/bs'
// import { useState, useEffect } from 'react'
// import styles from './create-btn.module.scss'
// import Link from 'next/link'
// import { useAuth } from '@/hooks/use-auth';
// import { useRouter } from 'next/router';
// import toast from 'react-hot-toast';
// // import logo from '@/assets/logo.png';

// export default function CreateBtn({ btnName }) {
//   const router = useRouter();
//   const { auth } = useAuth();

//   const islogin = () => {
//     if (auth.isAuth) {
//       router.push('/blog/create');
//     } else {
//       toast('請先登入會員', {
//         // icon: <Image width={95} height={53} src={logo} alt="logo" priority />,
//         duration: 1800,
//         style: {
//           borderRadius: '10px',
//           borderTop: '15px #22355C solid',
//           background: '#F5F5F5',
//           color: '#646464',
//           marginTop: '80px',
//           width:'300px',
//           height:'100px',
//         },
//       });
//       router.push('member/login');
//     }
//   }

//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const resize = () => setIsMobile(window.innerWidth < 768)
//     resize()
//     window.addEventListener('resize', resize)
//     return () => window.removeEventListener('resize', resize)
//   }, [])

//   return (
//     <div
//       // href={`http://localhost:3000/blog/create`}
//       className={`btn btn-warning ${styles['create-btn']}`}
//       type="button"
//       onClick={islogin}
//     >
//       {isMobile ? <BsPencilFill size={20} color="white" /> : btnName}
//     </div>
//   )
// }

import { BsPencilFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import styles from './create-btn.module.scss';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';
import toast from 'react-hot-toast';

export default function CreateBtn({ btnName }) {
  const router = useRouter();
  const { id } = router.query; //文章ID
  const { auth } = useAuth();
  const [ownerId, setOwnerId] = useState(null); //存作者ID
  const uid = auth.memberData.id;

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

  const isOwner = uid === ownerId;

  const islogin = () => {
    // console.log('目前登入的會員 ID:', uid);
    if (auth.isAuth) {
      router.push(isOwner ? `/blog/edit/${id}` : '/blog/create');
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
