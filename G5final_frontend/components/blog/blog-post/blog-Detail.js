import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';

// componentes
import Account from '@/components/blog/account/account';
import BlogDate from '@/components/blog/date/blog-date';
import DelBtn from '@/components/blog/blog-btn/del-btn';
import BlogCom from './blog-com';
import BlogPageBtn from '@/components/blog/blog-btn/pagebtn';
import BlogLike from '../blog-like/blog-like';
import BlogFav from '../blog-like/blog-favorite';

// react-Bs-icon
import {
  BsHeartFill,
  BsHeart,
  BsBookmarkFill,
  BsBookmark,
} from 'react-icons/bs';

export default function BlogDetail({
  blogImg,
  title,
  content,
  tags,
  updateDate,
  likeCount,
  favoriteCount,
  id,
  avatar,
  name,
}) {
  const { auth } = useAuth();

  const imagePath = blogImg ? blogImg.replace('../', '/') : '';
  const avatarPath = avatar
    ? `http://localhost:3005/member/${avatar}`
    : `http://localhost:3005/member/avatar-default.png`;
  return (
    <div className="blog-post">
      {/* 封面 */}
      <div className="blog-cover-container">
        <Image
          src={imagePath}
          alt="文章封面"
          className="blog-cover"
          width={733}
          height={433.12}
        />
      </div>
      {/* 帳號 */}
      <div className="blog-header">
        <Account avatar={avatarPath} w={50} h={50} name={name} />
        <BlogDate updateDate={updateDate} />
      </div>
      {/* 內文 */}
      <h2 className="blog-title">{title}</h2>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* 標籤 */}
      <div className="tag-section">
        <div>標籤：</div>
        {tags.map((tag, index) => (
          <div key={index} className="tag" type="button">
            {tag}
          </div>
        ))}
      </div>

      {/* 按讚儲存 */}
      <div className="count-section">
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
        {/* 刪除 */}
        <DelBtn />
      </div>

      {/* 上下頁 */}
      <BlogPageBtn id={id} />
      {/* 留言 */}
      <BlogCom id={id} />
    </div>
  );
}
