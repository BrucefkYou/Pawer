/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import ProductList from '@/components/product/productList';
import Clean from '@/components/product/clean/clean';
import CategoryOther from '@/components/product/category/other/categoryOther';
import CategoryCat from '@/components/product/category/cat/categoryCat';
import CategoryDog from '@/components/product/category/dog/categoryDog';
import useCategory from '@/hooks/useCategory';
import TagCat from '@/components/product/tag/tagCat/tagCat';
import TagDog from '@/components/product/tag/tagDog/tagDog';
import TagOther from '@/components/product/tag/tagOther/tagOther';
export default function Index(props) {
  const [url, setUrl] = useState('http://localhost:3005/api/product');
  const { active, ActiveChange } = useCategory();
  const {
    nowPageItems,
    nowPage,
    totalPage,
    itemsperPage,
    sortWay,
    needSort,
    nowPageLastItems,
    nowPageFirstItems,
    filterData,
    next,
    prev,
    choosePerpage,
    chooseSort,
    updateSearch,
  } = usePagination({
    url: url,
    needFilter: [],
    needSearchbar: [
      'Name',
      'CategoryName',
      'SubCategory',
      'OriginPrice ',
      'SalePrice',
    ],
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
          <div>
            <Breadcrumbs />
          </div>
          <div className="row d-none rwd-select">
            <div className="col d-flex justify-content-center align-items-center selectpd rwd-select ">
              <div className="rwd-select col d-flex justify-content-center">
                <p className="howmaney howmaney-rwd col mt-3">
                  顯示第{nowPageFirstItems + 1}-
                  {Math.min(nowPageLastItems, filterData.length)} 筆 / 共{' '}
                  {filterData.length} 筆
                </p>
                <div className="d-flex justify-content-between align-items-center p-3">
                  <PerPageDom
                    itemsperPage={itemsperPage}
                    choosePerpage={choosePerpage}
                  />
                  <SortDom
                    sortWay={sortWay}
                    chooseSort={chooseSort}
                    needSort={needSort}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 商品內容 */}
        <div className="container d-flex justify-content-between">
          {/* 側邊欄 */}
          <div className="row left mb-5 bg-white">
            {/* 文字搜尋 */}
            <div className="col search-text-mp">
              <div className="search-category">
                <Clean
                  updateSearch={updateSearch}
                  searchResults={filterData}
                  setUrl={setUrl}
                />
                <div className="row d-flex flex-column align-items-start">
                  <div className="col mt-3">
                    <p className="searchcategory">種類</p>
                    <p className="line" />
                    {/* 狗貓標籤預設 false 灰色 點選後true橘色 */}
                    <div className="d-flex pet-choose">
                      <TagCat
                        setUrl={setUrl}
                        activeIndex={active?.c === 'tagcat' ? active.v : null}
                        onActiveChange={(v) => ActiveChange('tagcat', v)}
                      />
                      <TagDog
                        setUrl={setUrl}
                        activeIndex={active?.c === 'tagdog' ? active.v : null}
                        onActiveChange={(v) => ActiveChange('tagdog', v)}
                      />
                      <TagOther
                        setUrl={setUrl}
                        activeIndex={active?.c === 'tagother' ? active.v : null}
                        onActiveChange={(v) => ActiveChange('tagother', v)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row d-flex flex-column align-items-start category-mal mx-0">
                  <div>
                    <p className="searchpro col">類別</p>
                    {/* <p className="searchpro">-</p> */}
                  </div>
                  {/* 類別細節 */}
                  <div className="row category-detail d-flex flex-column mx-0">
                    {/* 貓貓專區 + 點開會顯示下列細節再次點選會收起 預設false收起 */}
                    <CategoryCat
                      setUrl={setUrl}
                      activeIndex={active?.c === 'cat' ? active.v : null}
                      onActiveChange={(v) => ActiveChange('cat', v)}
                    />
                    {/* 狗狗專區 + 點開會顯示下列細節再次點選會收起 預設false收起 */}
                    <CategoryDog
                      setUrl={setUrl}
                      activeIndex={active?.c === 'dog' ? active.v : null}
                      onActiveChange={(v) => ActiveChange('dog', v)}
                    />
                    {/* 其他專區 + 點開會顯示下列細節再次點選會收起 預設false收起 */}
                    <CategoryOther
                      setUrl={setUrl}
                      activeIndex={active?.c === 'other' ? active.v : null}
                      onActiveChange={(v) => ActiveChange('other', v)}
                    />
                  </div>
                </div>
                {/* 清除搜尋 */}
                {/* <Clean updateSearch={updateSearch} /> */}
              </div>
              <div className="row category-mt"></div>
            </div>
          </div>
          {/* 商品 */}
          <div className="row d-flex align-items-start right">
            {/* 顯示數量 每頁幾筆 排序 */}
            <div className="row">
              {/* 顯示數量 每頁幾筆 排序 內容 */}
              <div className="row choose-page">
                <p className="howmaney col mt-3">
                  顯示第{nowPageFirstItems + 1}-
                  {Math.min(nowPageLastItems, filterData.length)} 筆 / 共{' '}
                  {filterData.length} 筆
                </p>
                <div className="col selectpd rwd-none px-0">
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
              <div className="row ms-4 d-flex justify-content-start">
                {/* 若 filterData 為空，顯示提示文字 */}
                {filterData.length === 0 ? (
                  <p className="no-results">沒有符合關鍵字的搜尋結果</p>
                ) : (
                  // 若有結果，顯示 ProductList
                  nowPageItems.map((pd) => {
                    return <ProductList key={pd.ID} pd={pd} setUrl={setUrl} />;
                  })
                )}
              </div>
              {/* 頁籤 */}
              <div className="d-flex justify-content-center align-items-center mb-5 mt-5">
                <div className="rwd-block">
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
      </div>
    </>
  );
}
