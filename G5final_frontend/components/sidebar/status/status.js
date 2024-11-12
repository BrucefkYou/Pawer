import React, { useState } from 'react';
import styles from './status.module.scss';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import pawButton from '@/assets/pawButton.svg';

export default function StatusCard({ oldData, updateData }) {
  const tags = ['即將成團', '開團中', '已成團', '開團截止', '查詢全部'];
  let tagfilter;
  if (oldData) {
    tagfilter = tags.map((e) => {
      return oldData.filter((v) => {
        return v.newStatus == e
      })
    })
  }
  function choosetag(e) {
    console.log(e.target.textContent);
    if (e.target.textContent !== '查詢全部') {
      updateData(tagfilter[tags.indexOf(e.target.textContent)])
    } else {
      updateData(oldData)
    }
  }
  return (
    <div className={`${styles['tag-card']}`}>
      <SideBarCard
        title="標籤"
        img={pawButton}
        content={
          <div className={`d-flex flex-wrap ${styles['tag-section']}`}>
            {tags.map((tag, index) => (
              <div key={index} className={styles.tag} type="button" onClick={choosetag}>
                {tag}
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
}
