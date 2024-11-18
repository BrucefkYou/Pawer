/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import style from '@/components/product/category/categoryTag/other/categoryTagDogOther.module.scss';
import { BsPlusLg, BsDashLg } from 'react-icons/bs';
import ProductList from '@/components/product/list/productList';

const CategoryTagDogOther = ({ activeIndex, onActiveChange, setUrl }) => {
  const [Open, setOpen] = useState(false);
  const [products, setProducts] = useState([]); // 儲存篩選分類結果

  const categories = ['沐浴', '清潔', '免疫力', '基礎保養'];

  const open = () => {
    setOpen(!Open);
  };

  const handleClick = (index, category) => {
    if (activeIndex === index) {
      // 有索引值的時候再次點擊回到初始狀態 不應該用index === null 應該要注意下面結構我用activeIndex
      onActiveChange(null);
      setUrl('http://localhost:3005/api/product/tagdog');
    } else if (index >= 0) {
      onActiveChange(index); // 通知父組件 activeIndex 已更新
      setUrl(`http://localhost:3005/api/product/other?category=${category}`);
    }
  };

  return (
    <div className="row category-detail">
      <div className="col d-flex justify-content-between category-font">
        <p>其他</p>
        <p className={`${style['catClick']}`} onClick={open}>
          {Open ? <BsDashLg /> : <BsPlusLg />}
        </p>
      </div>
      <div
        className={`${style['category-detail']} ${Open ? style['open'] : ''}`}
      >
        <div className="row">
          <div className="col category-font">
            <ul className="list-unstyled mb-2 category-li">
              {categories.map((item, index) => (
                <li
                  key={index}
                  className={activeIndex === index ? 'active' : ''}
                  onClick={() => handleClick(index, item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* 渲染篩選結果 */}
        <div>
          {products.map((pd) => {
            return <ProductList key={pd.ID} pd={pd} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryTagDogOther;
