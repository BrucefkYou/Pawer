import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import style from '@/components/join/banner/banner.module.scss';

export default function Banner({
  bgImgUrl = '',
  imgCover = 'cover',
  url = '',
}) {
  const router = useRouter();
  const menuItems = [
    { id: 1, title: '商品', href: '/product' },
    { id: 2, title: '萌寵揪團活動', href: '/join' },
    { id: 3, title: '部落格專區', href: '/blog' },
    { id: 4, title: '寵物溝通師', href: '/communicator' },
  ];

  const [data, setData] = useState({ ID: 0, Title: '' });

  useEffect(() => {
    if (router.isReady && router.query.id) {
      console.log('ID:', router.query.id);
      if (url) {
        getTitle(router.query.id);
      }
    }
  }, [router.isReady, router.query.id, url]);

  const currentTitle =
    menuItems.find((item) => item.href === router.pathname)?.title || '';

  const getTitle = async (id) => {
    const apiUrl = `${url}/${id}`;
    try {
      const res = await fetch(apiUrl);
      const resData = await res.json();

      if (Array.isArray(resData) && resData.length > 0) {
        const blogData = resData[0];
        setData(blogData);
        // console.log('取得的文章標題:', blogData.Title);
      } else {
        console.log('資料格式錯誤');
      }
    } catch (err) {
      console.log('無法取得文章資料:', err);
    }
  };

  const bannerTitle = data.Title ? data.Title : currentTitle;

  return (
    <div className={`${style['ji-banner']} text-center`}>
      <div className={style['image-container']}>
        <Image
          src={bgImgUrl}
          alt="Banner Image"
          fill
          quality={100}
          style={{ objectFit: imgCover }}
        />
        <div className={style['overlay']}></div>
        <h2 className={`${style['banner-title']}`}>{bannerTitle}</h2>
      </div>
    </div>
  );
}
