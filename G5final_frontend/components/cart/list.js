import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart/use-cart-state';
import Image from 'next/image';
import LOGO from '@/public/LOGO.svg';
import { MdCancel } from 'react-icons/md';
export default function List(props) {
  // 引入購物車相關的狀態與方法
  const { cart, items, decrement, increment, removeItem } = useCart();
  useEffect(() => {
    console.log(items);
  }, []);
  // 測試新的分支
  //! 這邊有可能會遇到 Next hydration 問題，如果有遇到再補充上去解決辦法
  return (
    <>
      {/* porduct-1 */}
      {items.map((item) => {
        return (
          <div
            className="row row-cols-12 row-cols-md-12 row-cols-8 product-card product-card-block"
            key={item.id}
          >
            <div className="col-lg-2 col-4 gap-2 set-middle d-flex justify-content-center align-items-center p-1">
              <input type="checkbox" />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                alt="產品圖片"
                width={100}
                height={100}
                // layout="responsive"
                // objectFit="cover"
                className="product-svg"
                src={`/product/sqlimg/${item.img}`}
              />
              {/* svg */}
            </div>
            <div className="mobile-column col-lg-6 col-7 d-flex justify-content-between align-items-center g-0">
              <div className="product-title">{item.name}</div>
              <div className="choose-quantity-btn">
                <div className="mr-55">{item.price}</div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-secondary btn-increase bg-main-color"
                    onClick={() => decrement(item.id)}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="btn btn-light border btn-quantity border-primary"
                    disabled
                  >
                    {item.quantity}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-increase  bg-main-color"
                    onClick={() => increment(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="col d-none d-sm-flex set-middle">
              {item.price * item.quantity}
            </div>
            <div className="col-1 set-middle">
              <button
                className="border-0 bg-transparent"
                type="button border-0"
                onClick={() => removeItem(item.id)}
              >
                <MdCancel className="text-danger" />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
