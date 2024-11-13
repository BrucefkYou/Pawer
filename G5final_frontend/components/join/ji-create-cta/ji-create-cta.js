import React, { useState, useEffect } from 'react';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import style from '@/components/join/ji-create-cta/ji-create-cta.module.scss';
import Image from 'next/image';
// eslint-disable-next-line import/no-unresolved
import logo from 'public/LOGO.svg';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

// 判斷會員是否登入
import { useAuth } from '@/hooks/use-auth';

export default function JiCreateCta() {
  const router = useRouter();
  const { auth } = useAuth();

  // const islogin = () => {
  //   if (auth.isAuth) {
  //     router.push('/member');
  //   } else {
  //     router.push('/member/login');
  //   }
  // };

  const handleCreate = () => {
    if (!auth.isAuth) {
      toast('您需要登入才能創建', {
        icon: <Image width={95} height={53} src={logo} alt="logo" priority />,
        duration: 1800,
        style: {
          borderRadius: '10px',
          background: 'rgba(34, 53, 92, 1)',
          color: '#fff',
          marginTop: '80px',
        },
      });
      setTimeout(() => {
        router.push('/member/login');
      }, 1000);
    } else {
      router.push('/join/create');
    }
  };

  return (
    <>
      <SideBarCard
        content={
          <button
            className={`text-primary ${style['cta']}`}
            onClick={handleCreate}
          >
            <h3>創建你的活動</h3>
            <h3> pet party</h3>
            <Image
              width={272}
              height={272}
              className={`${style['cta-img']}`}
              src={'/join/c-cta.png'}
              alt="創建你的活動"
            />
          </button>
        }
      />
    </>
  );
}
