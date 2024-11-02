import React from 'react';
import styles from './status.module.scss';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import pawButton from '@/assets/pawButton.svg';

export default function StatusCard() {
  const tags = ['即將成團', '開團中', '已成團', '開團截止', '查詢全部'];
  return (
    <div className={`${styles['tag-card']}`}>
      <SideBarCard
        title="標籤"
        img={pawButton}
        content={
          <div className={`d-flex flex-wrap ${styles['tag-section']}`}>
            {tags.map((tag, index) => (
              <div key={index} className={styles.tag} type="button">
                {tag}
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
}
