import React from 'react';
import Image from 'next/image';
import { BsPersonPlusFill, BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import ClickIcon from '@/components/icons/click-icon/click-icon';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/components/join/list/join-list.module.scss';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import FavoriteIcon from '@/components/join/list/item/favorite/FavoriteIcon/FavoriteIcon';

export default function JoinListCard({
  data = {},
  setUrl,
  // handleToggleFav = () => {},
}) {
  const router = useRouter();
  const { auth } = useAuth();
  const id = auth.memberData.id;
  // console.log(id);
  const StartTime = data.StartTime
    ? data.StartTime.replace(/-/g, '/').slice(0, 16)
    : '';
  const EndTime = data.StartTime
    ? data.StartTime.replace(/-/g, '/').slice(0, 16)
    : '';
  // console.log(data.ID, data.SignCount);

  // 從後端資料庫取得圖片
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const fetchImageUrl = () => {
      if (data.ImageName) {
        const url = `http://localhost:3005/join/${data.ImageName}`;
        setImageUrl(url);
      }
    };

    fetchImageUrl();
  }, [data.ImageName]);
  return (
    <>
      <div className={`card shadow ${styles['ji-card']}`}>
        <Image
          className={`${styles['card-image']}`}
          width={367}
          height={321}
          src={imageUrl}
          alt={data.ImageName}
        />
        <div className={`card-body ${styles['card-body']}`}>
          <div className="d-flex justify-content-between">
            <div
              className={`text-secondary d-flex justify-content-start column-gap-2 ${styles.status}`}
            >
              <p className="bg-warning px-2 mb-2 rounded-1">{data.City}</p>
              <p className="bg-primary px-2 mb-2 rounded-1">{data.newStatus}</p>
              <p className="text-body-tertiary mb-2">
                <BsPersonPlusFill className="me-1" />
                <span className="align-middle">
                  {data.SignCount} / {data.ParticipantLimit}
                </span>
              </p>
            </div>
            <div
              type="button"
              className={`text-body-tertiary  ${styles['colicon']}`}
            >
              <FavoriteIcon
                setUrl={setUrl}
                IconFilled={BsBookmarkFill}
                IconOutline={BsBookmark}
                data={data.ID}
              />
            </div>
          </div>
          <p className="card-text mb-4 text-body-tertiary">
            {StartTime}&nbsp;-&nbsp;{EndTime}
          </p>
          <h4
            className={`card-title text-primary mb-4 ${styles['card-title']}`}
          >
            {data.Title}
          </h4>
          <div className="text-end">
            <Link
              href={
                id === data.MemberID
                  ? `./join/edit/${data.ID}`
                  : `./join/${data.ID}`
              }
              // onClick={() => router.push(`./join/${data.ID}`)}
              className="btn text-warning p-0"
            >
              查看更多
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
