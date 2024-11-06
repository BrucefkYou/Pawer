import React, { useEffect, useState } from 'react';
import styles from './tags.module.scss';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import { useRouter } from 'next/router';
import pawButton from '@/assets/pawButton.svg';

export default function TagCard() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    setSelectedTag(router.query.tag || '');
  }, [router.query.tag]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const url = 'http://localhost:3005/api/blog/tags';
        const response = await fetch(url);
        const data = await response.json();
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
        title="標籤"
        img={pawButton}
        content={
          <div className={styles['tag-section']}>
            {tags.map((tag) => (
              <div
                key={tag.ID}
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
