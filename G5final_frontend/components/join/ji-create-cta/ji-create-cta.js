import React, { useState, useEffect } from 'react';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import style from '@/components/join/ji-create-cta/ji-create-cta.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

// 判斷會員是否登入
import { useAuth } from '@/hooks/use-auth';

export default function JiCreateCta() {
  const router = useRouter();
  const { auth } = useAuth();

  const islogin = () => {
    if (auth.isAuth) {
      router.push('/member');
    } else {
      router.push('/member/login');
    }
  };

  const hanleCreate = () => {
    if (!auth.isAuth) {
      islogin();
      return;
    }
    router.push('./join/create');
  };

  return (
    <>
      <SideBarCard
        content={
          <button
            className={`text-primary ${style['cta']}`}
            onClick={hanleCreate}
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
