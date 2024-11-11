/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import ProductDetail from '@/components/product/productDetail';
import Productcomment from '@/components/product/productcomment/productcomment';

export default function Id(props) {
  return (
    <>
      <main className="productdetail">
        {/* 麵包屑 */}
        <div className="container">
          <Breadcrumbs />
        </div>
        {/* 商品細節內容 */}
        <ProductDetail />
        {/* 評論 */}
        <Productcomment />
      </main>
    </>
  );
}
