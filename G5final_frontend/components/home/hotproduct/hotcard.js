import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@/components/product/favorite/FavoriteIcon/FavoriteIcon';
import { BsPersonPlusFill, BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import style from '@/components/home/hotproduct/hotcard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Hotcard({ pd }) {
  return (
    <>
      <div className="card sec-3-card-mg card-size col">
        {/* 卡片 */}
        <Link
          key={`${pd.ID}-${pd.Name}`}
          href={`/product/${pd.ID}`}
          className="no-underline"
        >
          <Image
            className="sec3-img"
            alt="商品列表圖"
            src={`/product/sqlimg/${pd.Img}`}
            width={298}
            height={250}
            priority
          />
        </Link>
        <div className="card-body">
          <div className="sec-3-card-text">{pd.Name}</div>
          <div className="sec-3-card-textD">{pd.Name}</div>
          <div className="d-flex justify-content-between mt-3">
            <div className="card-text">
              <small className="be-nt">{'NT$' + pd.OriginPrice}</small>
            </div>
            <div className={`${style['hotsvg']}`}>
              <FavoriteIcon
                IconFilled={BsBookmarkFill}
                IconOutline={BsBookmark}
                pd={pd.ID}
              />
            </div>
          </div>
          <div className="new-nt">{'NT$' + pd.SalePrice}</div>
        </div>
      </div>
    </>
  );
}
