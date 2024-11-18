/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import ProductList from '@/components/product/list/productList';

export default function Cat({ activeIndex, onActiveChange, setUrl }) {
  const [products, setProducts] = useState([]); // 儲存篩選分類結果

  const handleClick = (index, category) => {
    if (activeIndex === index) {
      // 有索引值的時候再次點擊回到初始狀態 不應該用index === null 應該要注意下面結構我用activeIndex
      onActiveChange(null);
      setUrl('http://localhost:3005/api/tagcat');
    } else if (index >= 0) {
      onActiveChange(index); // 通知父組件 activeIndex 已更新
      setUrl(`http://localhost:3005/api/product/tagcat`);
    }
  };
  return (
    <>
      <div
        className={`pet-choose-status btn ${activeIndex === 0 ? 'active' : ''}`}
      >
        <div onClick={() => handleClick(0, 'tagcat')}>貓貓</div>
      </div>

      {/* 渲染篩選結果 */}
      <div>
        {products.map((pd) => {
          return <ProductList key={pd.ID} pd={pd} />;
        })}
      </div>
    </>
  );
}
