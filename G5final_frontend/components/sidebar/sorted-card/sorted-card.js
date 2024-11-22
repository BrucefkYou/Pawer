import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './sorted-card.module.scss';
import Image from 'next/image';
import moment from 'moment';
import pawButton from '@/assets/pawButton.svg';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import BlogDate from '@/components/blog/date/blog-date';
export default function SortedCard({
  title,
  api,
  link,
  id,
  img,
  content,
  date,
  count,
  IconComponent,
  sorted,
  limit,
}) {
  // sidebarCard的標題,抓資料的api,每篇內容導向的開頭連結,內容ID,封面圖,內容摘要,日期,儲存/按讚數,icon,排序(選擇count(數量)或date(日期)),呈現筆數
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(api);
        const allBlogs = await response.json();

        const sortedBlogs = allBlogs
          .sort((a, b) => {
            if (sorted === 'date') {
              return moment(b[date], 'YYYY/MM/DD') - moment(a[date]);
            } else if (sorted === 'count') {
              return b[count] - a[count];
            }
          })

          .slice(0, limit);
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('error', error);
      }
    };

    fetchBlogs();
  }, [api, sorted, date, count, limit]);

  return (
    <div className={`${styles['sorted-card']}`}>
      <SideBarCard
        title={title}
        img={pawButton}
        content={
          <>
            {blogs.map((blog, index) => (
              <Link
                key={blog['id'] ?? index}
                href={`${link}/${blog[id]}`}
               className ={`text-decoration-none ${styles['sorted-sec']}`}
              >
                <div className={styles['sorted-content']}>
                  <div className={styles['sorted-cover-container']}>
                    <Image
                      src={blog[img] || '/blog/cover.svg'}
                      alt="Cover"
                      fill
                    />
                  </div>

                  <div className={styles['card-content']}>
                    <span className={styles['article-title']}>
                      {blog[content]}
                    </span>

                    <div className={styles['bottom-section']}>
                      <div className={styles['date-section']}>
                        <BlogDate updateDate={blog[date]} />
                      </div>

                      <div className={styles['count-section']}>
                        {<IconComponent />}
                        <span className={styles['count']}>{blog[count]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </>
        }
      />
    </div>
  );
}
