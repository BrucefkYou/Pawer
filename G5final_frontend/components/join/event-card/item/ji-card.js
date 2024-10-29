import React from 'react';
import Image from 'next/image';
import { BsPersonPlusFill } from 'react-icons/bs';
import ColIcon from './col-icon';
import styles from '@/components/Join/event-card/join-card.module.scss';

export default function JiCard({
  iconfillcolor = '',
  join = {},
  handleToggleFav = () => {},
}) {
  return (
    <div className={`card shadow ${styles['ji-card']}`}>
      <Image
        className={`${styles['card-image']}`}
        width={367}
        height={321}
        src={`/joins/${join.photos.split(',')[0]}`}
        alt={join.title}
      />
      <div className={`card-body ${styles['card-body']}`}>
        <div className="d-flex justify-content-between">
          <div
            className={`text-secondary d-flex justify-content-start column-gap-2 ${styles.status}`}
          >
            <p className="bg-warning px-2 mb-2 rounded-1">{join.city}</p>
            <p className="bg-primary px-2 mb-2 rounded-1">{join.status}</p>
            <p className="text-body-tertiary mb-2">
              <BsPersonPlusFill className="me-1" />
              <span className="align-middle">
                {join.participants} / {join.maxParticipants}
              </span>
            </p>
          </div>
          <div
            type="button"
            className={`text-body-tertiary  ${styles['colicon']}`}
          >
            <ColIcon
              color={`${iconfillcolor}`}
              id={join.id}
              fav={join.fav}
              handleToggleFav={handleToggleFav}
            />
          </div>
        </div>
        <p className="card-text mb-4 text-body-tertiary">{join.dateRange}</p>
        <h4 className={`card-title text-primary mb-4 ${styles['card-title']}`}>
          {join.title}
        </h4>
        <div className="text-end">
          <a href="../join/1" className="btn text-warning p-0">
            查看更多
          </a>
        </div>
      </div>
    </div>
  );
}
