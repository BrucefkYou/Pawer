import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart/use-cart-state';
import Image from 'next/image';
import LOGO from '@/public/LOGO.svg';
import { MdCancel } from 'react-icons/md';

export default function InfoList(props) {
  const { cart, items, decrement, increment } = useCart();
  return (
    <>
      {/* 這邊在map的時候新增一個條件適用filter過濾checked為true的商品 */}
      {items.length ? (
        items
          .filter((item) => item.checked)
          .map((item) => {
            return (
              <div className="row row-cols-12 product-block" key={item.id}>
                {/* 產品圖 */}
                <div className="col-3 col-lg-1 d-flex justify-content-start g-0">
                  <Image
                    alt="產品圖片"
                    width={100}
                    height={100}
                    className="product-svg"
                    src={`/product/sqlimg/${item.img}`}
                  />
                </div>
                {/* 產品訊息 */}
                <div className="col-9 col-lg-7 product-info">
                  <div className="product-title">{item.name}</div>
                  <div className="d-flex justify-content-between product-title2">
                    <div>NT$ {Math.round(item.price)}</div>
                    <div>數量：{item.quantity}</div>
                  </div>
                </div>
                <div className="col-2 d-lg-block d-none g-0" />
                <div className="col-lg-2 d-lg-flex align-items-center justify-content-center d-none">
                  NT$ {item.quantity * item.price}
                </div>
              </div>
            );
          })
      ) : (
        <>
          <div className="text-center">購物車是空的</div>
        </>
      )}
    </>
  );
}
