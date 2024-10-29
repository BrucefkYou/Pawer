import React from 'react';
import styles from './latest.module.scss';
import Image from 'next/image';
import { BsCalendar4Event, BsBookmark, BsHeart } from 'react-icons/bs';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import pawButton from '@/assets/pawButton.svg';

const LatestCard = () => {
  return (
    <div className={`${styles['latest-card']}`}>
      <SideBarCard
        title="最新發佈"
        img={pawButton}
        content={
          <div className={styles['latest-content']}>
            <div className={styles['latest-cover-container']}>
              <Image src="" alt="Latest Cover" fill />
            </div>
            <div className={styles['card-content']}>
              <span>
                最新發佈最新發佈最新發佈最新發佈最新發佈最新發佈最新發佈最新發佈...
              </span>
              <div className={styles['bottom-section']}>
                <div className={styles['date-section']}>
                  <BsCalendar4Event className="me-1" color="#f4b13e" />
                  <div className={styles.date}>2024/11/11</div>
                </div>
                <div className={styles['count-section']}>
                  <BsBookmark className="me-1" color="#f4b13e" />
                  <div className={styles.count}>123</div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default LatestCard;
