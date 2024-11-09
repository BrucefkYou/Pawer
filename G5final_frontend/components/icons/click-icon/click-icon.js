/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import styles from './click-icon.module.scss';
import { useAuth } from '@/hooks/use-auth';
import toast, { Toaster } from 'react-hot-toast';
import logo from 'public/LOGO.svg';
import Image from 'next/image';

const IconToggle = ({ iconStatus, IconFilled, IconOutline }) =>
  iconStatus ? <IconFilled /> : <IconOutline />;

export default function ClickIcon({ IconFilled, IconOutline, count }) {
  const { auth } = useAuth();
  const id = auth.memberData.id;
  const [iconStatus, setIconStatus] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);

  const CountIcon = () => {
    if (!id) {
      toast('您需要登入才能收藏', {
        icon: <Image width={95} height={53} src={logo} alt="logo" priority />,
        duration: 1800,
        style: {
          borderRadius: '10px',
          background: 'rgba(34, 53, 92, 1)',
          color: '#fff',
          marginTop: '80px',
        },
      });
      return;
    }

    setIconStatus((prevStatus) => {
      const newStatus = !prevStatus;
      setCurrentCount((prevCount) => {
        if (newStatus) {
          toast('您已加入收藏', {
            icon: (
              <Image width={95} height={53} src={logo} alt="logo" priority />
            ),
            duration: 1800,
            style: {
              borderRadius: '10px',
              background: 'rgba(84, 124, 215, 1)',
              color: '#fff',
              marginTop: '80px',
            },
          });
          return prevCount + 1;
        } else {
          toast('您已取消收藏', {
            icon: (
              <Image width={95} height={53} src={logo} alt="logo" priority />
            ),
            duration: 1800,
            style: {
              borderRadius: '10px',
              background: 'rgba(193, 69, 69, 1)',
              color: '#fff',
              marginTop: '80px',
            },
          });
          return prevCount - 1;
        }
      });
      return newStatus;
    });
  };

  useEffect(() => {
    setCurrentCount(count);
  }, [count]);

  return (
    <div className={styles['click-icon']}>
      <div type="button" className={styles['icon-btn']} onClick={CountIcon}>
        <IconToggle
          iconStatus={iconStatus}
          IconFilled={IconFilled}
          IconOutline={IconOutline}
        />
      </div>
      {currentCount ||
        (count && <span className={styles['count']}>{currentCount}</span>)}
    </div>
  );
}
