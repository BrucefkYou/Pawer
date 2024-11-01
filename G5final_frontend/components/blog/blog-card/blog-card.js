import React, { useState, useEffect } from 'react';
import styles from './blog-card.module.scss';
import Image from 'next/image';
import Link from 'next/link';

// components
import ClickIcon from '@/components/icons/click-icon/click-icon';
import Account from '../account/account';
import BlogDate from '../date/blog-date';

// react-Bs-icon
import {
  BsHeartFill,
  BsHeart,
  BsBookmarkFill,
  BsBookmark,
} from 'react-icons/bs';

export default function BlogCard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/blog');
        const result = await response.json();
        console.log('成功讀取資料', result);
        setBlogs([]);
        if (
          response.ok &&
          result.status === 'success' &&
          Array.isArray(result.data.blogs)
        ) {
          setBlogs(result.data.blogs);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error('讀取資料失敗', error);
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      {blogs.map((blog) => {
        return (
          <div key={blog.ID} className={`card shadow ${styles['blog-card']}`}>
            <Image
              className={`${styles['card-image']}`}
              width={367}
              height={321}
              src={`/blog/${blog.photos ? blog.photos.split(',')[0] : ''}`}
            />
            <div
              className={`card-body d-flex flex-column justify-content-between  ${styles['card-body']}`}
            >
              <div className="sec-1  d-flex flex-column ">
                <div className="d-flex justify-content-between align-items-end mb-3">
                  {/* 帳號、日期 */}
                  <div
                    className={`text-secondary d-flex  flex-column row-gap-2 ${styles.status}`}
                  >
                    <Account name="wang" w={18} h={18} />
                    <BlogDate updateDate={blog.UpdateDate} />
                  </div>
                  {/* 按讚儲存 */}
                  <div className="text-body-tertiary d-flex column-gap-2">
                    <ClickIcon
                      IconFilled={BsHeartFill}
                      IconOutline={BsHeart}
                      count={blog.likeCount}
                    />
                    <ClickIcon
                      IconFilled={BsBookmarkFill}
                      IconOutline={BsBookmark}
                      count={blog.favoriteCount}
                    />
                  </div>
                </div>
                {/* 標題 */}
                <h4
                  className={`card-title text-primary mb-3 ${styles['card-title']}`}
                >
                  {blog.Title}
                </h4>
              </div>

              <div className="text-end">
                <Link href="./blog/${blog.ID}" className="btn text-warning p-0">
                  查看更多
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
