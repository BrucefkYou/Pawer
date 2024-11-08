/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import styles from './click-icon.module.scss';
import { useAuth } from '@/hooks/use-auth';
import toast from 'react-hot-toast';
import Image from 'next/image';
import logo from 'public/LOGO.svg';

const IconToggle = ({ iconStatus, IconFilled, IconOutline }) =>
  iconStatus ? <IconFilled /> : <IconOutline />;

export default function ClickIcon({ IconFilled, IconOutline, count, pd }) {
  const { auth } = useAuth();
  const id = auth.memberData.id;
  const [iconStatus, setIconStatus] = useState(false);
  const [currentCount, setCurrentCount] = useState(count);

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

    const addFv = async () => {
      console.log({ pid: pd, uid: id });
      try {
        const response = await fetch(
          'http://localhost:3005/api/product/favorite',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json', // 設置 Content-Type
            },
            body: JSON.stringify({ pid: pd, uid: id }),
          }
        );
        if (!response.ok) throw new Error('加入收藏失敗');
        const result = await response.json();
        console.log('加入收藏成功', result);
        setCurrentCount((prevCount) => prevCount + 1); // 更新計數
      } catch (error) {
        console.error(error);
        toast.error('新增收藏時發生錯誤');
      }
    };

    const delFv = async () => {
      console.log({ pid: pd, uid: id });
      try {
        const response = await fetch(
          'http://localhost:3005/api/product/favorite',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json', // 設置 Content-Type
            },
            body: JSON.stringify({ pid: pd, uid: id }),
          }
        );
        if (!response.ok) throw new Error('取消收藏失敗');
        const result = await response.json();
        console.log('取消收藏成功', result);
        setCurrentCount((prevCount) => prevCount - 1); // 更新計數
      } catch (error) {
        console.error(error);
        toast.error('刪除收藏時發生錯誤');
      }
    };

    setIconStatus((prevStatus) => {
      const newStatus = !prevStatus;
      if (newStatus) {
        addFv();
        toast('您已加入收藏', {
          icon: <Image width={95} height={53} src={logo} alt="logo" priority />,
          duration: 1800,
          style: {
            borderRadius: '10px',
            background: 'rgba(84, 124, 215, 1)',
            color: '#fff',
            marginTop: '80px',
          },
        });
      } else {
        delFv();
        toast('您已取消收藏', {
          icon: <Image width={95} height={53} src={logo} alt="logo" priority />,
          duration: 1800,
          style: {
            borderRadius: '10px',
            background: 'rgba(193, 69, 69, 1)',
            color: '#fff',
            marginTop: '80px',
          },
        });
      }
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
      <span>
        {currentCount ||
          (count && <span className={styles['count']}>{currentCount}</span>)}
      </span>
    </div>
  );
}
