import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import FavoriteIcon from '@/components/join/list/item/favorite/FavoriteIcon/FavoriteIcon';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { ca } from 'date-fns/locale';
import { result } from 'lodash';

export default function SignStatusCard({ data = {}, disabled }) {
  const router = useRouter();
  const { auth } = useAuth();
  const uid = auth.memberData.id;
  const [numStatus, setNumStatus] = useState(false);
  const CanSignNum = Number(data.ParticipantLimit - data.SignCount);
  const [canSign, setCanSign] = useState(CanSignNum);
  const [isFull, setIsFull] = useState(CanSignNum <= 0);
  

  const handleSignUp = async () => {
    if (auth.isAuth) {
      try {
        if (isFull) {
          toast.error('報名已滿');
          return;
        }
        const response = await fetch('http://localhost:3005/api/join-in/joined', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ joininId: data.ID, memberId: uid }),
        });
        setCanSign(canSign - 1);

        if (response.ok) {
          toast.success('報名成功', {
            duration: 1800,
            style: {
              borderRadius: '10px',
              borderTop: '15px #22355C solid',
              background: '#F5F5F5',
              color: '#646464',
            },
          });
          
        } else {
          throw new Error('報名失敗');
        }
      } catch (error) {
        console.log('error', error);
        toast.error('報名失敗，請稍後再試。');
      }
    } else {
      toast('請先登入會員', {
        duration: 1800,
        style: {
          borderRadius: '10px',
          borderTop: '15px #22355C solid',
          background: '#F5F5F5',
          color: '#646464',
          marginTop: '80px',
          width: '240px',
          height: '80px',
        },
      });
      router.push('/member/login');
    }
  };


  useEffect(() => {
    // 檢查是否已報名
    const checkJoined = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/join-in/joined?memberId=${uid}&joininId=${data.ID}`
        );
        if (!response.ok) throw new Error('無法確認報名狀態');
        const result = await response.json();
        
        // 假設 result 返回的數據包含是否報名的布林值，例如 result.joined
        setNumStatus(result.joined); // 更新狀態
      } catch (error) {
        console.error('檢查報名狀態時發生錯誤', error);
      }
    };
    if (uid && data.ID) {
      checkJoined();
    }
  }, [uid, data]);

  return (
    <div className="card ji-detail-side-card shadow ms-auto">
      <div className="card-body">
        <div className=" d-flex align-items-center gap-2 ">
          <div className="rounded-circle">
            <Image
              width={50}
              height={50}
              src={
                data.Avatar
                  ? `/http://localhost:3005/member/${auth.memberData.avatar}`
                  : '/member/member-avatar/member-profile.png'
              }
              alt="1"
            />
          </div>
          <p className="my-auto text-primary">
            {data.Nickname ? `${data.Nickname}` : `${data.Account}`}
          </p>
        </div>
        <div className="row py-3 text-secondary-emphasis">
          <h5 className="col-9 card-title">{data.Title}</h5>
          <div className="col-3 ps-0 mt-1 ">
            <FavoriteIcon
              IconFilled={BsBookmarkFill}
              IconOutline={BsBookmark}
              data={data.ID}
              count={data.joinFavCount}
            />
          </div>
        </div>
        <div className="ji-sidecard-info text-secondary-emphasis">
          <div className="row mx-1">
            <p className="col card-text mb-3 ji-info-content">成團人數</p>
            <p className="col text-end">
              {data.ParticipantLimit}
              <span>人</span>
            </p>
          </div>
          <div className="row mx-1">
            <p className="col card-text mb-3 ji-info-content">還差幾人</p>
            <p className="col text-end">
              {canSign}
              <span>人</span>
            </p>
          </div>
        </div>
        <div
          className={`w-100 btn ${isFull || disabled ? 'btn-secondary' : 'btn-primary'}`}
          onClick={!isFull && !disabled ? handleSignUp : undefined}
        >
          {isFull ? '報名已額滿' : '立即報名'}
        </div>
      </div>
    </div>
  );
}
