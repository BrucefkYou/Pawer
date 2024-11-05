/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import ProductList from '@/components/product/productList';
import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';
import SearchSideBar from '@/components/searchsidebar/search-side-bar';
import CategoryCat from '@/components/product/category/cat/categoryCat';
import CategoryDog from '@/components/product/category/dog/categoryDog';

export default function Index(props) {
  const {
    nowPageItems,
    nowPage,
    totalPage,
    itemsperPage,
    sortWay,
    needSort,
    next,
    prev,
    choosePerpage,
    chooseSort,
  } = usePagination({
    url: 'http://localhost:3005/api/product',
    needFilter: [],
    needSort: [
      { way: 'asc-ID', name: '商品 舊 > 新' },
      { way: 'desc-ID', name: '商品 新 > 舊' },
      { way: 'asc-SalePrice', name: '價格 低 > 高' },
      { way: 'desc-SalePrice', name: '價格 高 > 低' },
    ],
  });
  return (
    <>
      <div className="productList">
        <div className="container d-flex justify-content-between">
          {/* 麵包屑 */}
          <Breadcrumbs />
          <div className="row justify-content-center align-items-center">
            <div className="col selectpd rwd-select form-select me-3">
              <SortDom
                sortWay={sortWay}
                chooseSort={chooseSort}
                needSort={needSort}
              />
            </div>
          </div>
        </div>
        {/* 商品內容 */}
        <div className="container d-flex justify-content-between">
          {/* 側邊欄 */}
          <div className="row left">
            {/* 文字搜尋 */}
            <div className="col search-text-mp mt-2">
              <SearchSideBar />
              <div className="row category-mt">
                <div className="row d-flex flex-column align-items-start">
                  <div>
                    <p className="searchpro col">類別</p>
                    {/* <p className="searchpro">-</p> */}
                  </div>
                  {/* 類別細節 */}
                  <div className="row category-detail d-flex flex-column">
                    {/* 貓貓專區 + 點開會顯示下列細節再次點選會收起 預設false收起 */}
                    <CategoryCat />
                    {/* 狗狗專區 + 點開會顯示下列細節再次點選會收起 預設false收起 */}
                    <CategoryDog />
                    {/* 清除搜尋 */}
                    <div className="btn p-0">
                      <p className="clean">清除搜尋</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 商品 */}
          <div className="row d-flex align-items-start right">
            {/* 顯示數量 每頁幾筆 排序 */}
            <div className="row">
              {/* 顯示數量 每頁幾筆 排序 內容 */}
              <div className="row choose-page">
                <p className="howmaney col me-3 mt-3">顯示第1-12筆 / 共60筆</p>
                <div className="col selectpd rwd-none me-3">
                  <PerPageDom
                    itemsperPage={itemsperPage}
                    choosePerpage={choosePerpage}
                  />
                </div>
                <div className="col rwd-none selectpd">
                  <SortDom
                    sortWay={sortWay}
                    chooseSort={chooseSort}
                    needSort={needSort}
                  />
                </div>
              </div>
              {/* 商品卡片 導入react 會是一張 跑迴圈出來*/}
              <div className="row ms-4">
                {/* 卡片內容 */}
                {nowPageItems.map((pd) => {
                  return <ProductList key={pd.ID} pd={pd} />;
                })}
              </div>
              {/* 頁籤 */}
              <div className="d-flex justify-content-center align-items-center mb-5 mt-5">
                <PageNav
                  nowPage={nowPage}
                  totalPage={totalPage}
                  next={next}
                  prev={prev}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
