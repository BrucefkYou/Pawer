// pages/test.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// 動態導入 GoogleMapComponent，並禁用 SSR
const GoogleMapComponent = dynamic(
  () => import('@/components/join/googleMap/GoogleMapComponent.js'),
  { ssr: false }
);

export default function Test() {
  const router = useRouter();
  const [locationData, setLocationData] = useState([]);

  // 獲取活動地點資料
  const fetchEventLocation = async () => {
    try {
      const url = 'http://localhost:3005/api/join-in/location';
      const res = await fetch(url);
      const resData = await res.json();

      if (res.status === 200 && resData.status === 'success') {
        console.log(resData);
        setLocationData(resData.rows);
      } else if (res.status === 500) {
        console.log('伺服器錯誤');
      }
    } catch (error) {
      console.error('請求出錯:', error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchEventLocation();
    }
  }, [router.isReady]);

  return (
    <div>
      <h1>測試地圖顯示</h1>
      <GoogleMapComponent markers={locationData} />
      {/* 其他內容 */}
    </div>
  );
}
