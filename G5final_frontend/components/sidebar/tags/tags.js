import React from 'react';
import styles from './tags.module.scss';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import pawButton from '@/assets/pawButton.svg';

const TagCard = () => {
  const tags = ['1', '2'];
  return (
    <div className={`${styles['tag-card']}`}>
      <SideBarCard
        title="標籤"
        img={pawButton}
        content={
          <div className={styles['tag-section']}>
            {tags.map((tag, index) => (
              <div key={index} className={styles.tag} type="button">
                {tag}
              </div>
            ))}
            {/* <div className={styles.title}>
        <h5 className={styles.h5}>標籤</h5>
      </div>
      <div className={styles['tag-section']}>
        <div className={styles.tag} type="button">
          1
        </div>
      </div> */}
          </div>
        }
      />
    </div>
  );
};

export default TagCard;
