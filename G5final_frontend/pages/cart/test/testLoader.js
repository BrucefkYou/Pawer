// pages/testLoader.js
import React, { useEffect } from 'react';
import { useLoader } from '@/hooks/use-loader';

export default function TestLoader() {
  const { loading, setLoading } = useLoader();

  useEffect(() => {
    // 初始設置為 false
    setLoading(false);

    // 模擬一個 API 請求或異步操作
    const timer = setTimeout(() => {
      console.log('testLoader: setLoading(true)');
      setLoading(true);
    }, 1000);

    // 清除定時器以避免內存洩漏
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div>
      <h1>Loader 測試頁面</h1>
      <div>{loading ? <div>Loader 已啟動</div> : <div>Loader 未啟動</div>}</div>
    </div>
  );
}
