import { useEffect, useState } from 'react';
import styles from '@/components/icons/click-icon/click-icon.module.scss';
import { useAuth } from '@/hooks/use-auth';
import toast from 'react-hot-toast';

const IconToggle = ({ iconStatus, IconFilled, IconOutline }) =>
  iconStatus ? <IconFilled /> : <IconOutline />;

export default function BlogFav({ IconFilled, IconOutline, count, id }) {
  const { auth } = useAuth();
  const uid = auth.memberData.id;
  const [iconStatus, setIconStatus] = useState(false);
  const [currentCount, setCurrentCount] = useState(count);

  const CountIcon = () => {
    if (!uid) {
      toast('您需要登入才能收藏');
      return;
    }

    const addLike = async () => {
      // console.log({ blogId: id, uid: uid });
      try {
        const response = await fetch(
          'http://localhost:3005/api/blog/favorite',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blogId: id, uid: uid }),
          }
        );
        if (!response.ok) throw new Error('收藏失敗');
        const result = await response.json();
        // console.log('收藏成功', result);
        setCurrentCount((prevCount) => prevCount + 1);
      } catch (error) {
        console.error(error);
        toast.error('收藏時發生錯誤');
      }
    };

    const delLike = async () => {
      // console.log({ blogId: id, uid: uid });
      try {
        const response = await fetch(
          'http://localhost:3005/api/blog/favorite',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blogId: id, uid: uid }),
          }
        );
        if (!response.ok) throw new Error('取消收藏');
        const result = await response.json();
        // console.log('取消收藏成功', result);
        setCurrentCount((prevCount) => prevCount - 1);
      } catch (error) {
        console.error(error);
        toast.error('取消收藏時發生錯誤');
      }
    };

    setIconStatus((prevStatus) => {
      const newStatus = !prevStatus;
      if (newStatus) {
        addLike();
        toast.success('您已收藏');
      } else {
        delLike();
        toast.error('您已取消收藏');
      }
      return newStatus;
    });
  };

  useEffect(() => {
    setCurrentCount(count);
  }, [count]);

  useEffect(() => {
    const checFavStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/blog/favorite-status?blogId=${id}&uid=${uid}`
        );
        if (!response.ok) throw new Error('無法確認收藏狀態');
        const result = await response.json();
        setIconStatus(result.Favorite);
      } catch (error) {
        console.error('檢查收藏狀態時發生錯誤', error);
      }
    };

    if (uid) {
      checFavStatus();
    }
  }, [uid, id]);

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
