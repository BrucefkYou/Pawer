import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// styles
import styles from './tags.module.scss';
// components
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
// svg
import pawButton from '@/assets/pawButton.svg';

export default function TagCard() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  // 更新選擇的標籤內容
  useEffect(() => {
    setSelectedTag(router.query.tag || '');
  }, [router.query.tag]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const url = 'http://localhost:3005/api/blog/tags';
        const response = await fetch(url);
        const data = await response.json();
        console.log('前五個標籤', data);
        setTags(data);
      } catch (error) {
        console.error('無法獲取標籤資料:', error);
      }
    };
    fetchTags();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    router.push({
      pathname: router.pathname,
      query: { tag, keyword: '' },
    });
  };

  return (
    <div className={`${styles['tag-card']}`}>
      <SideBarCard
        title="熱門標籤"
        img={pawButton}
        content={
          <div className={styles['tag-section']}>
            {tags.map((tag) => (
              <div
                key={tag.Name}
                className={`btn btn-primary ${styles['tag']}`}
                type="button"
                onClick={() => handleTagClick(tag.Name)}
              >
                {tag.Name}
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
}
