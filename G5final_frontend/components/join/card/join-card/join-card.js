import React, { useState, useEffect } from 'react';
// import joins from '@/data/Joins.json';
import JiCard from './item/ji-card';

export default function JoinCard() {
  // 初始化狀態，將每個加入的項目設置為fav: false
  // const initState = joins.map((v) => {
  //   return { ...v, fav: false };
  // });

  // 宣告加入資料的狀態
  const [joinin, setJoinin] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/join-in');
        if (!response.ok) {
          throw new Error('網路回應不成功：' + response.status);
        }
        const data = await response.json();
        // console.log(data);
        setJoinin(data);
      } catch (err) {
        console.error('錯誤：', err);
      }
    };
    fetchData();
  }, []);

  const handleToggleFav = (id) => {
    const nextJoin = joinin.map((v) => {
      // 根據 id 切換 fav 布林值

      if (v.id === id) {
        return { ...v, fav: false };
      } else {
        return v;
      }
    });

    setJoinin(nextJoin);
  };

  return (
    <>
      {joinin.map((data) => (
        <JiCard
          key={data.ID}
          iconfillcolor="#f4b13e"
          data={data}
          handleToggleFav={handleToggleFav}
        />
      ))}
    </>
  );
}
