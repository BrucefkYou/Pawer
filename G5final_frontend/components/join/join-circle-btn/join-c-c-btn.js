import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useAuth } from '@/hooks/use-auth';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import style from './join-c-c-btn.module.scss';

export default function JoinCCBtn({ show = true }) {
  const router = useRouter();
  const { auth } = useAuth();
  const uid = auth.memberData.id;

  const handleCreate = () => {
    if (!auth.isAuth) {
      toast('請先登入後創建', {
        duration: 1500,
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
      {!show ? (
        <></>
      ) : (
        <>
          {/* eslint-disable-next-line */}
      <div key={uuidv4()} className={`btn btn-primary text-white ms-auto mt-auto d-flex justify-content-center align-items-center ${style["create-btn"]}`} onClick={handleCreate}>
            <BsFileEarmarkPlus />
          </div>
        </>
      )}
    </>
  );
}
