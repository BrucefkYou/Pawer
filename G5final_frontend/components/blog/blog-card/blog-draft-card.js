import React from 'react';
import styles from './blog-card.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

import Account from '../account/account';
import BlogDate from '../date/blog-date';
import BlogFav from '../blog-like/blog-favorite';
import BlogLike from '../blog-like/blog-like';

// React-Bs-icon
import {
  BsHeartFill,
  BsHeart,
  BsBookmarkFill,
  BsBookmark,
} from 'react-icons/bs';

export default function BlogDraftCard({
  id,
  title,
  blogImg,
  updateDate,
  likeCount,
  favoriteCount,
  blogId,
  avatar,
  name,
  status,
}) {
  // 暫時換一下，之後會改上傳圖片的路徑
  const imagePath = blogImg ? blogImg.replace('../', '/') : '';
  const { auth } = useAuth();

  const avatarPath = auth.memberData.avatar
    ? `http://localhost:3005/member/${auth.memberData.avatar}`
    : auth.memberData.google_avatar
    ? auth.memberData.google_avatar
    : `http://localhost:3005/member/avatar-default.png`;

  return (
    <div className={`card shadow ${styles['blog-card']}`}>
      <Image
        className={`${styles['card-image']}`}
        width={367}
        height={321}
        src={imagePath}
        alt={title}
      />

      <div
        className={`card-body d-flex flex-column justify-content-between ${styles['card-body']}`}
      >
        <div className="sec-1 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-end mb-3">
            {/* 帳號、日期  */}
            <div
              className={`text-secondary d-flex flex-column row-gap-2 ${styles.status}`}
            >
              <Account avatar={avatarPath} name={name} w={18} h={18} />
              <BlogDate updateDate={updateDate} />
            </div>
            {/* 按讚儲存 */}
            {status === 1 && (
              <div className="text-body-tertiary d-flex column-gap-2">
                <BlogLike
                  IconFilled={BsHeartFill}
                  IconOutline={BsHeart}
                  count={likeCount}
                  id={id}
                />
                <BlogFav
                  IconFilled={BsBookmarkFill}
                  IconOutline={BsBookmark}
                  count={favoriteCount}
                  id={id}
                />
              </div>
            )}
          </div>
          {/* 標題 */}
          <h4
            className={`card-title text-primary mb-3 ${styles['card-title']}`}
          >
            {title}
          </h4>
        </div>

        <div className="text-end">
          <Link
            href={`http://localhost:3000/blog/edit/${id}`}
            className="btn text-warning p-0 text-decoration-none"
          >
            開始編輯
          </Link>
        </div>
      </div>
    </div>
  );
}
