import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './create-btn.module.scss';

export default function MemCreateBtn({ url = '/', children }) {
  const router = useRouter();
  const [bottomOffset, setBottomOffset] = useState(20);
  const handleClick = () => {
    router.push(url);
  };

  useEffect(() => {
    const handleScroll = () => {
      const footerHeight = document.querySelector('footer')?.offsetHeight || 0;
      const windowHeight = window.innerHeight;
      const buttonHeight = 50;

      const scrollBottom =
        document.documentElement.scrollHeight - window.scrollY - windowHeight;

      let newBottomOffset = 20;

      if (scrollBottom < footerHeight + buttonHeight) {
        newBottomOffset = footerHeight + buttonHeight - scrollBottom + 20;
      }

      setBottomOffset(newBottomOffset);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <button
      style={{ bottom: `${bottomOffset}px` }}
      className={`btn btn-warning ${styles['mem-create-btn']}`}
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
