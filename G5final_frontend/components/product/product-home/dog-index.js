import React, { useState, useEffect } from 'react';
import { BsFilterSquareFill } from 'react-icons/bs';
import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';
import Head from 'next/head';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import ProductList from '@/components/product/list/productList';
import Clean from '@/components/product/clean/clean';
import CategoryTagDogOther from '@/components/product/category/categoryTag/other/categoryTagDogOther';
import CategoryTagDog from '@/components/product/category/categoryTag/categoryTagDog';
import useCategory from '@/hooks/useCategory';
import List from '@/components/product/tag/all/list';
import Dog from '@/components/product/tag/dog/dog';
import OtherDog from '@/components/product/tag/other/otherDog';

export default function DogIndex(props) {
  const [url, setUrl] = useState('http://localhost:3005/api/product/tagdog');
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

  const [showFilters, setShowFilters] = useState(false); // 控制篩選區域顯示的狀態
  const toggleFilters = () => {
    setShowFilters((open) => !open); // 切換顯示狀態
  };
  useEffect(() => {
    const showDown = (event) => {
      const searchCategory = document.querySelector('.search-category');
      const filterIcon = document.querySelector('.filtericon');
      if (
        searchCategory &&
        !searchCategory.contains(event.target) &&
        filterIcon &&
        !filterIcon.contains(event.target)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', showDown);
    return () => {
      document.removeEventListener('mousedown', showDown);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Pawer寶沃-狗狗保健</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="productList">
        <div className="container mt-3">
          {/* 麵包屑 */}
          <div>
            <Breadcrumbs />
          </div>
          <div className="row rwd-select">
            <div className="ms-5 howmaney howmaney-rwd col mt-3 d-flex justify-content-between">
              {filterData.length === 0 ? (
                <p>沒有可顯示的資料 / 共0筆</p>
              ) : (
                <p>
                  顯示第{nowPageFirstItems + 1}-
                  {Math.min(nowPageLastItems, filterData.length)} 筆 / 共{' '}
                  {filterData.length} 筆
                </p>
              )}
              <div
                className="filtericon"
                onClick={toggleFilters}
                onKeyDown={(e) => e.key === 'Enter' && toggleFilters()}
                role="button"
                tabIndex={0}
                aria-expanded={showFilters}
                aria-label="Toggle filters"
              >
                <BsFilterSquareFill />
              </div>
              <div className="row mb-5 bg-white">
                {/* 文字搜尋 */}
                <div className="col search-text-mp">
                  <div
                    className={`search-category ${showFilters ? 'show' : ''}`}
                  >
                    <Clean
                      updateSearch={updateSearch}
                      searchResults={filterData}
                      setUrl={setUrl}
                    />
                    <div className="row d-flex flex-column align-items-start">
                      <div className="col mt-3">
                        <p className="searchcategory">種類</p>
                        <p className="line" />
                        <div className="d-flex pet-choose">
                          <Dog
                            setUrl={setUrl}
                            activeIndex={
                              active?.c === 'tagdog' ? active.v : null
                            }
                            onActiveChange={(v) => ActiveChange('tagdog', v)}
                          />
                          <OtherDog
                            setUrl={setUrl}
                            activeIndex={
                              active?.c === 'tagother' ? active.v : null
                            }
                            onActiveChange={(v) => ActiveChange('tagother', v)}
                          />
                          <List
                            setUrl={setUrl}
                            activeIndex={active?.c === 'list' ? active.v : null}
                            onActiveChange={(v) => ActiveChange('list', v)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row d-flex flex-column align-items-start category-mal mx-0">
                      <div>
                        <p className="searchpro col">類別</p>
                      </div>
                      <div className="row category-detail d-flex flex-column mx-0">
                        <CategoryTagDog
                          setUrl={setUrl}
                          activeIndex={active?.c === 'dog' ? active.v : null}
                          onActiveChange={(v) => ActiveChange('dog', v)}
                        />
                        <CategoryTagDogOther
                          setUrl={setUrl}
                          activeIndex={active?.c === 'other' ? active.v : null}
                          onActiveChange={(v) => ActiveChange('other', v)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center py-3 ps-5">
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

            {/* RWD側邊欄 */}

            {/* RWD側邊欄 */}
          </div>
        </div>
        {/* 商品內容 */}
        <div className="container d-flex justify-content-between">
          {/* 側邊欄 */}
          <div className="row left mb-5 bg-white">
            {/* 文字搜尋 */}
            <div className="col search-text-mp">
              <div className="search-category">
                <Clean updateSearch={updateSearch} searchResults={filterData} />
                <div className="row d-flex flex-column align-items-start">
                  <div className="col mt-3">
                    <p className="searchcategory">種類</p>
                    <p className="line" />
                    {/* 狗貓標籤預設 false 灰色 點選後true橘色 */}
                    <div className="d-flex pet-choose">
                      <Dog
                        setUrl={setUrl}
                        activeIndex={active?.c === 'tagdog' ? active.v : null}
                        onActiveChange={(v) => ActiveChange('tagdog', v)}
                      />
                      <OtherDog
                        setUrl={setUrl}
                        activeIndex={active?.c === 'tagother' ? active.v : null}
                        onActiveChange={(v) => ActiveChange('tagother', v)}
                      />
                      <List
                        setUrl={setUrl}
                        activeIndex={active?.c === 'list' ? active.v : null}
                        onActiveChange={(v) => ActiveChange('list', v)}
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
                    {/* 狗狗專區 + 點開會顯示下列細節再次點選會收起 預設false收起 */}
                    <CategoryTagDog
                      setUrl={setUrl}
                      activeIndex={active?.c === 'dog' ? active.v : null}
                      onActiveChange={(v) => ActiveChange('dog', v)}
                    />
                    {/* 其他專區 + 點開會顯示下列細節再次點選會收起 預設false收起 */}
                    <CategoryTagDogOther
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
                {filterData.length === 0 ? (
                  <p className="howmaney col mt-3">沒有可顯示的資料 / 共0筆</p>
                ) : (
                  <p className="howmaney col mt-3">
                    顯示第{nowPageFirstItems + 1}-
                    {Math.min(nowPageLastItems, filterData.length)} 筆 / 共{' '}
                    {filterData.length} 筆
                  </p>
                )}
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
                  <p className="no-results">查無資料</p>
                ) : (
                  // 若有結果，顯示 ProductList
                  nowPageItems.map((pd) => {
                    return <ProductList key={pd.ID} pd={pd} />;
                  })
                )}
              </div>
              {/* 頁籤 */}
              {filterData.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center mb-5 mt-5 no-results-minheight">
                  <div className="rwd-block">
                    <PageNav
                      nowPage={nowPage}
                      totalPage={totalPage}
                      next={next}
                      prev={prev}
                    />
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center mb-5 mt-5 ms-4">
                  <div className="rwd-block">
                    <PageNav
                      nowPage={nowPage}
                      totalPage={totalPage}
                      next={next}
                      prev={prev}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
