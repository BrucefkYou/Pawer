/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import style from '@/components/product/category/cat/categoryCat.module.scss';
import { BsPlusLg, BsDashLg } from 'react-icons/bs';

const CategoryCat = ({ activeIndex, onActiveChange }) => {
  const [Open, setOpen] = useState(false);

  const open = () => {
    setOpen(!Open);
  };

  return (
    <div className="row category-detail">
      <div className="col d-flex justify-content-between category-font">
        <p>貓貓專區</p>
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
              {[
                '排毛粉',
                '魚油粉',
                '鈣保健',
                '腸胃保健',
                '皮膚保健',
                '關節保健',
                '口腔保健',
                '眼睛保健',
                '心臟保健',
                '胰臟保健',
              ].map((item, index) => (
                <li
                  key={index}
                  className={activeIndex === index ? 'active' : ''}
                  onClick={() => onActiveChange(index)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCat;
