import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import style from '@/components/join/banner/banner.module.scss';

export default function Banner({ bgImgUrl = '', imgCover = 'cover' }) {
  const router = useRouter();
  const menuItems = [
    { id: 1, title: '商品', href: '/product' },
    { id: 2, title: '萌寵揪團活動', href: '/join' },
    { id: 3, title: '部落格專區', href: '/blog' },
    { id: 4, title: '寵物溝通師', href: '/communicator' },
  ];

  const [data, setData] = useState({ ID: 0, Title: '' });

  //   用useEffect監聽router.isReady變動，當true時代表query中可以獲得動態屬性值
  useEffect(() => {
    if (router.isReady) {
      // 在這裡可以確保得到router.query
      getTitle(router.query.id);
      //   console.log('router.query', router.query);
    }
    // eslint-disable-next-line
  }, [router.query.id]);

  const FTitle = menuItems.map((v, i) => {
    if (v.href === router.pathname) {
      return v.title;
    }
    return null;
  });

  const getTitle = async (id) => {
    const url = `http://localhost:3005/api/join-in/${id}`;

    try {
      const res = await fetch(url);
      const resData = await res.json();
      // 檢查資料類型是否正確，維持設定到狀態中都一定是所需的物件資料類型
      if (typeof resData === 'object') {
        setData(resData);
      } else {
        console.log('資料格式錯誤');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const display = (
    <>
      <div className={`${style['ji-banner']} text-center`}>
        <div className={style['image-container']}>
          <Image
            src={bgImgUrl}
            alt="Banner Image"
            fill
            quality={100}
            style={{ objectFit: imgCover }}
            priority
          />
          <div className={style['overlay']}></div>
          <h2 className={`${style['banner-title']}`}>
            {data.Title ? data.Title : FTitle}
          </h2>
        </div>
      </div>
    </>
  );

  return <>{display}</>;
}
