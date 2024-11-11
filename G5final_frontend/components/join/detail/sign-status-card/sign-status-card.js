import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import FavoriteIcon from '@/components/join/list/item/favorite/FavoriteIcon/FavoriteIcon';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';

export default function SignStatusCard({ data = {} }) {
  const router = useRouter();
  const { auth } = useAuth();
  const uid = auth.memberData.id;

  // const islogin = () => {
  //   if (auth.isAuth) {
  //     router.push(`/`);
  //   } else {
  //     router.push(`/member/login`);
  //   }
  // };

  const handleCol = () => {
    if (!auth.isAuth) {
      router.push(`/member/login`);
      return;
    }
    router.push('/join');
  };
  return (
    <>
      <div className="card ji-detail-side-card shadow ms-auto">
        <div className="card-body">
          <div className=" d-flex align-items-center gap-2 ">
            <div className="rounded-circle">
              <Image
                width={50}
                height={50}
                src={
                  data.Avatar
                    ? `/member/member-avatar/${data.Avatar}`
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
                // setUrl={setUrl}
                IconFilled={BsBookmarkFill}
                IconOutline={BsBookmark}
                data={data.ID}
                count={data.joinFavCount}
                onClick={handleCol}
              />
              {/* <ClickIcon
                className=""
                IconFilled={BsBookmarkFill}
                IconOutline={BsBookmark}
                count={data.joinFavCount}
              /> */}
            </div>
          </div>
          <div className="ji-sidecard-info text-secondary-emphasis">
            <div className="row">
              <p className="col card-text mb-3 ji-info-content">目前參加人數</p>
              <p className="col text-end">
                {data.SignCount}
                <span>人</span>
              </p>
            </div>
            <div className="row">
              <p className="col card-text mb-3 ji-info-content">剩餘報名人數</p>
              <p className="col text-end">
                {data.ParticipantLimit - data.SignCount}
                <span>人</span>
              </p>
            </div>
          </div>
          <button
            // href="#"
            className="btn btn-primary w-100"
            onClick={handleCol}
            // disabled={data.ParticipantLimit - data.SignCount <= 0}
          >
            {data.ParticipantLimit - data.SignCount > 0
              ? '立即報名'
              : '報名已額滿'}
          </button>
        </div>
      </div>
    </>
  );
}
