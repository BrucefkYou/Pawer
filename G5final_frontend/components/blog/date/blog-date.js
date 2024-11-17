import React from 'react';
import { BsCalendar } from 'react-icons/bs';
import styles from './date.module.scss';

export default function BlogDate({ updateDate }) {
  const formatDate = (dateString) => {
    return dateString ? dateString.split(' ')[0].replace(/-/g, '/') : '無日期';
  };

  return (
    <div className={styles['blog-date']}>
      <BsCalendar />
      <p className={styles['date']}>{formatDate(updateDate)}</p>
    </div>
  );
}
