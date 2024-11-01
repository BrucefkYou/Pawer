import React from 'react';
import styles from './latest.module.scss';
import Image from 'next/image';
import { BsHeart, BsCalendar2Event } from 'react-icons/bs';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';

export default function LatestCard() {
  return (
    <div className={`${styles['latest-card']}`}>
      <SideBarCard
        title="最新發佈"
        img="/image/"
        content={
          <div className={styles['latest-content']}>
            <div className={styles['latest-cover-container']}>
              <Image src="" alt="Latest Cover" width={1} height={1} />
            </div>
            <div className={styles['card-content']}>
              <span className={styles['article-title']}>
                最新發佈最新發佈最新發佈最新發佈最新發佈最新發佈最新發佈最新發佈...
              </span>
              <div className={styles['bottom-section']}>
                <div className={styles['date-section']}>
                  <BsCalendar2Event />

                  <div className={styles.date}>2024/11/11</div>
                </div>

                <div className={styles['count-section']}>
                  <BsHeart />
                  <div className={styles.count}>123</div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
