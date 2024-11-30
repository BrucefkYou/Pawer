import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import toast from 'react-hot-toast';

// styles
import styles from '@/components/icons/click-icon/click-icon.module.scss';

const IconToggle = ({ iconStatus, IconFilled, IconOutline }) =>
  iconStatus ? <IconFilled /> : <IconOutline />;

export default function BlogLike({ IconFilled, IconOutline, count, id }) {
  const { auth } = useAuth();
  const uid = auth.memberData.id;
  const [iconStatus, setIconStatus] = useState(false);
  const [currentCount, setCurrentCount] = useState(count);

  const CountIcon = () => {
    if (!uid) {
      toast('您需要登入才能按讚', {
        duration: 1800,
      });
      return;
    }

    const addLike = async () => {
      // console.log({ blogId: id, uid: uid });
      try {
        const response = await fetch('http://localhost:3005/api/blog/likes', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ blogId: id, uid: uid }),
        });
        if (!response.ok) throw new Error('按讚失敗');
        const result = await response.json();
        // console.log('按讚成功', result);
        setCurrentCount((prevCount) => prevCount + 1);
      } catch (error) {
        console.error(error);
      }
    };

    const delLike = async () => {
      // console.log({ blogId: id, uid: uid });
      try {
        const response = await fetch('http://localhost:3005/api/blog/likes', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ blogId: id, uid: uid }),
        });
        if (!response.ok) throw new Error('取消按讚');
        const result = await response.json();
        // console.log('取消按讚成功', result);
        setCurrentCount((prevCount) => prevCount - 1);
      } catch (error) {
        console.error(error);
      }
    };

    setIconStatus((prevStatus) => {
      const newStatus = !prevStatus;
      if (newStatus) {
        addLike();
      } else {
        delLike();
      }
      return newStatus;
    });
  };

  useEffect(() => {
    setCurrentCount(count);
  }, [count]);

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/blog/likes-status?blogId=${id}&uid=${uid}`
        );
        if (!response.ok) throw new Error('無法確認按讚狀態');
        const result = await response.json();
        setIconStatus(result.Liked);
      } catch (error) {
        console.error('檢查按讚狀態時發生錯誤', error);
      }
    };

    if (uid) {
      checkLikeStatus();
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
