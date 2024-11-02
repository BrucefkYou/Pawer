import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import style from '@/components/join/banner/banner.module.scss';

export default function Banner({ bgImgUrl = '', ImgCover = '' }) {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(
            `http://localhost:3005/api/join-in/${id}`
          );
          if (!response.ok) {
            throw new Error('網路回應不成功：' + response.status);
          }
          const data = await response.json();
          console.log('獲取的資料：', data);
          setData(data);
        }
      } catch (err) {
        console.error('錯誤：', err);
      }
    };

    if (router.pathname.includes('/join/')) {
      fetchData();
    }
  }, [id, router.pathname]);

  const menuItems = [
    { id: 1, title: '商品', href: '/product' },
    { id: 2, title: '萌寵揪團活動', href: '/join' },
    { id: 3, title: '部落格專區', href: '/blog' },
    { id: 4, title: '寵物溝通師', href: '/communicator' },
  ];

  const pageTitle = menuItems.find((item) => item.href === router.pathname);
  // eslint-disable-next-line no-undef
  const isDetailPage = router.pathname.includes('join');
  // 先判斷有沒有抓取到data的值
  const detailTitle = isDetailPage && data && data.ID ? data.Title : '';

  return (
    <div
      className={`${style['ji-banner']} text-center`}
      style={{
        backgroundImage: `url(${bgImgUrl})`,
        backgroundSize: `${ImgCover}`,
      }}
    >
      <h2 className={`${style['banner-title']}`}>
        {pageTitle ? pageTitle.title : detailTitle}
      </h2>
    </div>
  );
}
