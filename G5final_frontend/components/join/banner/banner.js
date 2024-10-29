import React from 'react';
import style from '@/components/Join/banner/banner.module.scss';
import { useRouter } from 'next/router';

export default function Banner({ bgImgUrl = '' }) {
  const router = useRouter();
  const menuItems = [
    { id: 1, title: '商品', href: '/product' },
    { id: 2, title: '萌寵揪團活動', href: '/join' },
    { id: 3, title: '部落格專區', href: '/blog' },
    { id: 4, title: '寵物溝通師', href: '/communicator' },
  ];

  const pageTitle = menuItems.find((item) => item.href === router.pathname);

  const isDetailPage = router.pathname.includes('/join/');
  const detailTitle = isDetailPage ? '活動明細' : '';

  return (
    <div
      className={`${style['ji-banner']} text-center`}
      style={{ backgroundImage: `url(${bgImgUrl})` }}
    >
      {/* 顯示 pageTitle 或明細頁標題 */}
      <h2 className={`${style['banner-title']}`}>
        {pageTitle ? pageTitle.title : detailTitle}
      </h2>
    </div>
  );
}
