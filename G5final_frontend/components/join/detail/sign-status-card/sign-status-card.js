import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import FavoriteIcon from '@/components/join/list/item/favorite/FavoriteIcon/FavoriteIcon';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function SignStatusCard({
  data = {},
  disabled,
  SignNum,
  btnText,
}) {
  const router = useRouter();
  const { auth } = useAuth();
  const uid = auth.memberData.id;
  const CanSignNum = Number(data.ParticipantLimit - data.SignCount);
  const [canSign, setCanSign] = useState(SignNum);
  const [isJoined, setIsJoined] = useState(false);
  const buttonText = canSign === 0 ? '報名已額滿' : '立即報名';

  // console.log(CanSignNum);
  // console.log(canSign);

  useEffect(() => {
    // 檢查是否已報名
    const checkJoined = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/join-in/joined?memberId=${uid}&joininId=${data.ID}`
        );
        if (!response.ok) throw new Error('無法確認報名狀態');
        const result = await response.json();
        console.log(result);

        // 判斷是否已經報名
        // 如果有資料 Length>0，代表已經報名
        if (result.length > 0) {
          setIsJoined(true);
        }
      } catch (error) {
        console.error('檢查報名狀態時發生錯誤', error);
      }
    };
    if (uid && data.ID) {
      checkJoined();
    }
  }, [uid, data]);

  const handleSignUp = async () => {
    if (auth.isAuth) {
      try {
        const response = await fetch(
          'http://localhost:3005/api/join-in/joined',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ joininId: data.ID, memberId: uid }),
          }
        );
        setCanSign((prevCount) => prevCount - 1);
        setIsJoined(true);

        if (response.ok) {
          toast('報名成功!請至信箱確認報名成功通知', {
            // icon: '',
            duration: 2500,
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
      });
      router.push('/member/login');
    }
  };

  useEffect(() => {
    setCanSign(SignNum);
  }, [SignNum]);

  // useEffect(() => {
  //   setIsJoined(true);
  // }, [canSign]);

  return (
    <div className="card ji-detail-side-card shadow ms-auto">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <div className=" d-flex align-items-center gap-2 ">
            <div className="rounded-circle">
              <Image
                className="rounded-circle"
                width={50}
                height={50}
                src={
                  data.Avatar
                    ? `http://localhost:3005/member/${data.Avatar}`
                    : '/member/member-avatar/member-profile.png'
                }
                alt="1"
              />
            </div>
            <p className="my-auto text-primary">
              {data.Nickname ? `${data.Nickname}` : `${data.Account}`}
            </p>
          </div>
          <span className="btn bg-primary text-white p-1 mb-2 rounded-2">
            {data.newStatus}
          </span>
        </div>
        <div className="row py-2 text-secondary-emphasis">
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
              {SignNum && canSign}
              <span>人</span>
            </p>
          </div>
        </div>
        {/* eslint-disable-next-line */}
        <div
          className={`w-100 btn ${
            canSign <= 0 || disabled || isJoined
              ? 'btn-secondary'
              : 'btn-primary'
          }`}
          onClick={
            !disabled && canSign > 0 && !isJoined ? handleSignUp : undefined
          }
        >
          {isJoined ? '已報名' : btnText || buttonText}
        </div>
      </div>
    </div>
  );
}
