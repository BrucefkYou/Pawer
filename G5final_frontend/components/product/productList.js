import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { BsPersonPlusFill, BsBookmarkFill, BsBookmark } from 'react-icons/bs';

import ClickIcon from '@/components/icons/click-icon/click-icon';

export default function ProductList({ pd }) {
  // console.log(pd);
  return (
    <>
      <div className="col-4 card-layout no-underline">
        <div className="card shadow card-size">
          <Image
            className="card-img-top card-img-topme"
            alt="商品列表圖"
            src={`/product/sqlimg/${pd.Img}`}
            width={640}
            height={640}
            priority
          />
          <div className="card-body">
            <Link
              key={`${pd.ID}-${pd.Name}`}
              href={`/product/${pd.ID}`}
              className="pd-card-text pd-card-textD no-underline"
            >
              <div className="pd-card-text no-underline">{pd.Name}</div>
              <div className="pd-card-textD no-underline">{pd.Name}</div>
            </Link>

            <div className="d-flex justify-content-between mt-3">
              <div className="card-text">
                <small className="be-nt">{'NT$' + pd.OriginPrice}</small>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="new-nt">{'NT$' + pd.SalePrice}</div>
              {/* 收藏icon */}
              <ClickIcon
                fontsize="32px"
                IconFilled={BsBookmarkFill}
                IconOutline={BsBookmark}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
