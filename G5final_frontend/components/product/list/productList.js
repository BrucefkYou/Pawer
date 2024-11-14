import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import style from '@/components/product/list/productList.module.scss';

import { BsPersonPlusFill, BsBookmarkFill, BsBookmark } from 'react-icons/bs';

import FavoriteIcon from '@/components/product/favorite/FavoriteIcon/FavoriteIcon';

export default function ProductList({ pd, setUrl }) {
  // console.log(pd);
  // setUrl 第一層在父層 帶下去商品卡片頁第二層子層 要再帶下去FavoriteIcon第三層子層
  return (
    <>
      <div className="col-4 card-layout no-underline">
        <div className="card shadow card-size">
          <Link
            key={`${pd.ID}-${pd.Name}`}
            href={`/product/${pd.ID}`}
            className="no-underline"
          >
            <Image
              className="card-img-top card-img-topme"
              alt="商品列表圖"
              src={`/product/sqlimg/${pd.Img}`}
              width={640}
              height={640}
              priority
            />
            <div className="card-body">
              <div className="pd-card-text no-underline">{pd.Name}</div>
              <div className="pd-card-textD no-underline">{pd.Name}</div>
            </div>
          </Link>

          <div className="d-flex justify-content-between">
            <div className="card-text">
              <small className="be-nt ms-4">{'NT$' + pd.OriginPrice}</small>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="new-nt ms-4">{'NT$' + pd.SalePrice}</div>
            {/* 收藏icon */}
            <div className={`${style['pdsvg-favorite']} me-2`}>
              <FavoriteIcon
                setUrl={setUrl}
                IconFilled={BsBookmarkFill}
                IconOutline={BsBookmark}
                pd={pd.ID}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
