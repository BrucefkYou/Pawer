// pages/special-page.js
import React from 'react';
import AdminLayout from '@/components/layout/admin-layout';

const memberpage = () => {
  return (
    <div>
      <h1>會員佈局頁</h1>
      <p>這個頁面使用 AdminLayout佈局。</p>
    </div>
  );
};

// 定義 getLayout 方法來指定使用 AdminLayout
memberpage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default memberpage;
