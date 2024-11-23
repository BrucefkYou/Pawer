import React from 'react';
import {
  BsPersonPlusFill,
  BsBookmarkFill,
  BsBookmark,
  BsTrash,
} from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/components/join/list/join-list.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteIcon from '@/components/join/list/item/favorite/FavoriteIcon/FavoriteIcon';
import { useAuth } from '@/hooks/use-auth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { ro } from 'date-fns/locale';

export default function JoinListCard({
  cancelBtn = false,
  data = {},
  setUrl,
  linkTo,
  handleToggleFav = () => {},
}) {
  const router = useRouter();
  const { auth } = useAuth();
  const uid = auth.memberData.id;
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

  const handleCancel = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger mx-1 text-white',
        cancelButton: 'btn btn-secondary text-secondary-emphasis mx-1',
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      // title: '確定要取消報名這個活動嗎？',
      text: '確定要取消報名這個活動嗎？',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '返回',
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      if (auth.isAuth) {
        const response = await fetch(
          `http://localhost:3005/api/join-in/joined`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ joininId: data.ID, memberId: uid }),
          }
        );
        window.location.reload();
      }
    }
  };
  return (
    <>
      <div
        className={`card col-6
         shadow ${styles['ji-card']}`}
      >
        <Image
          className={`${styles['card-image']}`}
          width={367}
          height={321}
          src={imageUrl || '/join/t7.jpg'}
          alt={data.Title}
        />

        {cancelBtn ? (
          <button
            type="button"
            className={`btn btn-outline-light ${styles['cancelBtn']} `}
            onClick={handleCancel}
          >
            取消報名
          </button>
        ) : (
          ''
        )}
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
          <Link
            href={`/join/${data.ID}`}
            onClick={() => router.push(`/join/${data.ID}`)}
            className="text-decoration-none"
          >
            <h4
              className={`card-title text-primary mb-4 ${styles['card-title']}`}
            >
              {data.Title}
            </h4>
            <div className="text-end">
              <span className="btn text-warning p-0">查看更多</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
