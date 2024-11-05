/* eslint-disable no-undef */
//! 樣式切換選擇與取消 寵物類別使用 如果有用到樣式切換可以參考

import { useState } from 'react';

const useCategory = () => {
  // null 一開始預設都沒點選
  const [active, setActive] = useState(null);

  // c=category v=value(類別名稱)
  //! 如果 active 的 c 和 v 與傳入的參數一致，代表目前的分類已被選擇，所以將 setActive 設為 null，表示取消選擇。
  //! 不然的話點了一次就會保持active
  const ActiveChange = (c, v) => {
    if (active?.c === c && active.v === v) {
      setActive(null);
    } else {
      setActive({ c, v });
    }
  };

  return {
    active, // 目前狀態 預設 null
    ActiveChange, // 改變狀態 (選取或是取消)
  };
};

export default useCategory;

// import useCategory from '@/hooks/useCategory';  要使用的話 先導入這個hook
// const { active, ActiveChange } = useCategory(); 解構出來使用
// activeIndex={active?.c === 'cat' ? active.v : null} onActiveChange={(v) => ActiveChange('cat', v)}
// activeIndex是抓取 CategoryCat CategoryDog的元件
