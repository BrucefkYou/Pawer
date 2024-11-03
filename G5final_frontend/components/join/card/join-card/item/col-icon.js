import { useAuth } from '@/hooks/use-auth';
// import { addFav, removeFav } from '@/hooks/use-Favicon';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import toast from 'react-hot-toast';

export default function ColIcon({ id = '', iconfillcolor = '' }) {
  // const { auth, collect, setFavorites } = useAuth();

  // const handleTriggerFav = (id) => {
  //   if (collect.includes(id)) {
  //     setFavorites(collect.filter((v) => v !== id));
  //   } else {
  //     //不在陣列中加入
  //     setFavorites([...collect, id]);
  //   }
  // };
  // const handleAddFav = async (id) => {
  //   const res = await addFav(id);

  //   if (res.data.status === 'success') {
  //     // 伺服器成功後，更新context中favorites的狀態，頁面上的圖示才會對應更動
  //     handleTriggerFav(id);
  //     toast.success(`商品 id=${id} 新增成功!`);
  //   }
  // };

  // const handleRemoveFav = async (id) => {
  //   const res = await removeFav(id);

  //   if (res.data.status === 'success') {
  //     // 伺服器成功後，更新context中favorites的狀態，頁面上的圖示才會對應更動
  //     handleTriggerFav(id);
  //     toast.success(`商品 id=${id} 刪除成功!`);
  //   }
  // };

  return (
    <>
      {/* {collect.includes(id) ? ( */}
      <button
        style={{
          all: 'unset', // 移除所有預設樣式
          cursor: 'pointer',
        }}
        onClick={() => {
          console.log('111');
          // if (!auth.isAuth) {
          //   return toast.error('請先登入會員');
          // }
          // handleRemoveFav(id);
        }}
      >
        <BsBookmarkFill />
      </button>
      :
      <button
        style={{
          all: 'unset', // 移除所有預設樣式
          cursor: 'pointer',
          color: `${iconfillcolor}`,
        }}
        onClick={() => {
          console.log('222');
          // if (!auth.isAuth) {
          //   return toast.error('請先登入會員');
          // }
          // handleAddFav(id);
        }}
      >
        <BsBookmark />
      </button>
    </>
  );
}
