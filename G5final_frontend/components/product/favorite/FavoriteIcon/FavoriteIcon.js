/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import styles from '@/components/product/favorite/FavoriteIcon/FavoriteIcon.module.scss';
import { useAuth } from '@/hooks/use-auth';
import toast from 'react-hot-toast';

const IconToggle = ({ iconStatus, IconFilled, IconOutline, setUrl }) =>
  iconStatus ? <IconFilled /> : <IconOutline />;
// 這邊是最後一層第四層 有兩個地方要帶 IconToggle 跟 CountIcon
export default function FavoriteIcon({
  IconFilled,
  IconOutline,
  count,
  pd,
  setUrl,
}) {
  const { auth } = useAuth();
  const id = auth.memberData.id;
  const [iconStatus, setIconStatus] = useState(false);
  const [currentCount, setCurrentCount] = useState(count);

  const CountIcon = () => {
    if (!id) {
      toast('您需要登入才能收藏', {
        duration: 1500,
      });
      return;
    }

    // setUrl('http://localhost:3005/api/product/member/favorites');
    // 有bug 會員頁移除 列表頁就壞掉 看要reload重整還是要繼續研究立即執行

    const addFv = async () => {
      try {
        const response = await fetch(
          'http://localhost:3005/api/product/favorite',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json', // 變字串
            },
            body: JSON.stringify({ ProductID: pd, MemberID: id }),
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
      try {
        const response = await fetch(
          'http://localhost:3005/api/product/favorite',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ProductID: pd, MemberID: id }),
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
        toast.success('您已加入收藏', {
          duration: 1500,
        });
      } else {
        delFv();
        toast.error('您已取消收藏', {
          duration: 1500,
        });
      }
      return newStatus;
    });
  };

  useEffect(() => {
    setCurrentCount(count);
  }, [count]); // 活動 部落格要使用記數 把count相依即可

  useEffect(() => {
    // 檢查該商品是否已被收藏
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/product/check-favorite?ProductID=${pd}&MemberID=${id}`
        );
        if (!response.ok) throw new Error('無法確認收藏狀態');
        const result = await response.json();
        setIconStatus(result.isFavorite); // 根據回傳值設定收藏狀態
      } catch (error) {
        console.error('檢查收藏狀態時發生錯誤', error);
      }
    };

    if (id) {
      checkFavoriteStatus();
    }
  }, [id, pd]); // 當 id 或商品 ID 發生變化時重新檢查

  return (
    <div className={styles['click-icon']}>
      <div type="button" className={styles['icon-btn']} onClick={CountIcon}>
        <IconToggle
          setUrl={setUrl}
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
