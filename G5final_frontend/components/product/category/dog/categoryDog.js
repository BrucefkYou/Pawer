/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import style from '@/components/product/category/dog/categoryDog.module.scss';

const CategoryDog = () => {
  const [Open, setOpen] = useState(false);

  const open = () => {
    setOpen(!Open);
  };

  return (
    <div className="row category-detail">
      <div className="col d-flex justify-content-between category-font">
        <p>狗狗專區</p>
        <p className={`${style['catClick']}`} onClick={open}>
          {Open ? '一' : '+'}
        </p>
      </div>
      <div
        className={`${style['category-detail']} ${Open ? style['open'] : ''}`}
      >
        <div className="row">
          <div className="col category-font">
            <ul className="list-unstyled mb-2 category-li">
              <li>魚油粉</li>
              <li>鈣保健</li>
              <li>腸胃保健</li>
              <li>皮膚保健</li>
              <li>關節保健</li>
              <li>口腔保健</li>
              <li>眼睛保健</li>
              <li>心臟保健</li>
              <li>胰臟保健</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDog;
