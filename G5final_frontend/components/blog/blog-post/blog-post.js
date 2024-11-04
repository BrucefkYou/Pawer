import React from 'react';
import Image from 'next/image';
import Account from '@/components/blog/account/account';
import BlogDate from '@/components/blog/date/blog-date';
import ClickIcon from '@/components/icons/click-icon/click-icon';
import PostCom from './blog-com';

// react-Bs-icon
import {
  BsHeartFill,
  BsHeart,
  BsBookmarkFill,
  BsBookmark,
  BsArrowLeft,
  BsArrowRight,
} from 'react-icons/bs';

export default function PostDetail({
  blogImg,
  title,
  content,
  tags,
  updateDate,
  likeCount,
  favoriteCount,
}) {
  const imagePath = blogImg ? blogImg.replace('../', '/') : '';

  return (
    <div className="blog-post">
      {/* 封面 */}
      <div className="blog-cover-container">
        <Image
          src={imagePath}
          alt="文章封面預覽"
          className="blog-cover"
          width={733}
          height={433.12}
        />
      </div>
      {/* 帳號 */}
      <div className="blog-header">
        <Account w={50} h={50} name="wang" />
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
        <ClickIcon
          IconFilled={BsHeartFill}
          IconOutline={BsHeart}
          count={likeCount}
        />
        <ClickIcon
          IconFilled={BsBookmarkFill}
          IconOutline={BsBookmark}
          count={favoriteCount}
        />
      </div>

      {/* 上下頁 */}
      <div className="prev-next">
        <a href="" className="prev">
          <div className="arrow-container">
            <BsArrowLeft className="arrow-icon" />
          </div>
          <div className="prev-content">
            <div className="prev-title">
              <span>上一篇</span>
            </div>
            <h5 className="article-title">
              這是文章標題這是文章標題這是文章標題這是文章標題
            </h5>
          </div>
        </a>
        <a href="" className="next">
          <div className="arrow-container">
            <BsArrowRight className="arrow-icon" />
          </div>
          <div className="next-content">
            <div className="next-title">下一篇</div>
            <h5 className="article-title">
              這是文章標題這是文章標題這是文章標題這是文章標題
            </h5>
          </div>
        </a>
      </div>
      <PostCom />
    </div>
  );
}
