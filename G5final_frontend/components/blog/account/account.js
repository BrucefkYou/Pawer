import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './account.module.scss';

export default function Account({ avatar, w, h, name, className }) {
  return (
    <div className={`${styles['blog-account']} ${className}`}>
      <Image
        src={avatar}
        alt="帳號頭像"
        className={styles['avatar']}
        width={w}
        height={h}
      />
      <div>
        <p className={styles['text']}>{name}</p>
      </div>
    </div>
  );
}
