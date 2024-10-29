import React, { useState } from 'react';
import joins from '@/data/Joins.json';
import styles from '@/components/Join/event-card/join-card.module.scss';
import JiCard from './item/ji-card';

export default function JoinCard2() {
  // 初始化狀態，將每個加入的項目設置為fav: false
  const initState = joins.map((v) => {
    return { ...v, fav: false };
  });

  // 宣告加入資料的狀態
  const [join, setJoin] = useState(initState);

  const handleToggleFav = (id) => {
    const nextJoin = join.map((v) => {
      // 根據 id 切換 fav 布林值
      if (v.id === id) {
        return { ...v, fav: !v.fav };
      } else {
        return v;
      }
    });

    setJoin(nextJoin);
  };

  return (
    <>
      {join.map((join) => (
        <JiCard
          iconfillcolor="#f4b13e"
          key={join.id}
          join={join}
          handleToggleFav={handleToggleFav}
        />
      ))}
    </>
  );
}
