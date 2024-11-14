/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import ProductDetail from '@/components/product/detail/productDetail';

export default function Id(props) {
  return (
    <>
      <Head>
        <title>Pawer寶沃-商品明細</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="productdetail">
        {/* 麵包屑 */}
        <div className="container py-3">
          <Breadcrumbs />
        </div>
        {/* 商品細節內容 */}
        <ProductDetail />
      </div>
    </>
  );
}
