import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './create-btn.module.scss';

export default function MemCreateBtn({ url = '/', children, className = ''  }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(url);
  };

  return (
    <button
      className={`btn btn-warning ${styles['mem-create-btn']} ${className}`}
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
