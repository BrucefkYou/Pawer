/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
// 測試從資料庫拉資料出來
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/pagination/pagination';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import ProductList from '@/components/product/productList';

export default function Products(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3005/api/productList/productList'
        );
        if (!response.ok) {
          throw new Error('網路回應不成功：' + response.status);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
      console.log(products);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="productList">
        <div className="container d-flex justify-content-between">
          {/* 麵包屑 */}
          {/* <div className="row">
            <div className="productList-crumb-wei">
              <a href="./index.js">首頁</a>/
              <a className="active" href="./product">
                商品總覽
              </a>
            </div>
          </div> */}
          <Breadcrumbs />
          <div className="row justify-content-center align-items-center">
            <select
              name="phsort"
              id="phsort"
              className="col selectpd rwd-select form-select me-3"
            >
              <option value="DESC">新到舊</option>
              <option value="ASC">舊到新</option>
            </select>
          </div>
        </div>
        {/* 商品內容 */}
        <div className="container d-flex justify-content-between">
          {/* 側邊欄 */}
          <div className="row left">
            {/* 文字搜尋 */}
            <div className="row">
              <div className="col search-text-mp">
                <div className="ms-2">
                  <div className="btn d-flex search-text-mp">
                    <img
                      className="search-bg"
                      // src="./product/searchIcon.png"
                      alt="搜尋按鈕"
                    />
                    <input
                      className="form-control search-shadow"
                      type="text"
                      placeholder="請輸入關鍵字"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 進階搜尋區 */}
            <div className="row">
              <div className="row d-flex flex-column align-items-start">
                <div className="col d-flex mt-5">
                  <p className="searchpro col">進階搜尋</p>
                  <p className="searchpro">+</p>
                </div>
                <div className="col">
                  <p className="searchcategory">種類</p>
                  <p className="line" />
                  {/* 狗貓標籤預設 false 灰色 點選後true橘色 */}
                  <div className="d-flex pet-choose">
                    <div className="pet-choose-status1 btn">狗</div>
                    <div className="pet-choose-status2 btn">貓</div>
                  </div>
                </div>
                {/* 年齡 */}
                <div className="col">
                  <p className="searchcategory mt-2">年齡</p>
                  <p className="line" />
                  {/* 篩選年齡 */}
                  <div className="d-flex pet-choose">
                    <div className="pet-choose-status1 btn">全年齡</div>
                    <div className="pet-choose-status2 btn">老貓(7歲以上)</div>
                    <div className="pet-choose-status2 btn">成貓(1~7歲)</div>
                  </div>
                  <div className="d-flex pet-choose">
                    <div className="pet-choose-status2 btn">幼貓(0~1歲)</div>
                    <div className="pet-choose-status2 btn">老犬(7歲以上)</div>
                  </div>
                  <div className="d-flex pet-choose">
                    <div className="pet-choose-status2 btn">成犬(1~7歲)</div>
                    <div className="pet-choose-status2 btn">幼犬(0~1歲)</div>
                  </div>
                </div>
              </div>
            </div>
            {/* 清除搜尋 */}
            <div className="btn d-flex justify-content-start align-items-center p-0">
              <p className="clean">清除搜尋</p>
            </div>
            <div className="row">
              {/* 類別 */}
              <div className="row category-layout d-flex flex-column align-items-start">
                <div className="col">
                  <div className="d-flex justify-content-between">
                    <p className="category">類別</p>
                    <p className="category-add">+</p>
                  </div>
                  <p className="line" />
                </div>
              </div>
            </div>
            {/* 類別細節 */}
            <div className="row category-detail d-flex flex-column">
              {/* 貓貓專區 + 點開會顯示下列細節再次點選會收起 預設false收起 */}
              <div className="row category-detail">
                <div className="col d-flex justify-content-between category-font">
                  <p>貓貓專區</p>
                  <p>+</p>
                </div>
                {/* 排毛粉 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>排毛粉</p>
                  </div>
                </div>
                {/* 魚油粉 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>魚油粉</p>
                  </div>
                </div>
                {/* 鈣保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>鈣保健</p>
                  </div>
                </div>
                {/* 腸胃保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>腸胃保健</p>
                  </div>
                </div>
                {/* 皮膚保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>皮膚保健</p>
                  </div>
                </div>
                {/* 關節保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>關節保健</p>
                  </div>
                </div>
                {/* 口腔保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>口腔保健</p>
                  </div>
                </div>
                {/* 眼睛保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>眼睛保健</p>
                  </div>
                </div>
                {/* 心臟保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>心臟保健</p>
                  </div>
                </div>
                {/* 胰臟保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>胰臟保健</p>
                  </div>
                </div>
              </div>
              {/* 狗狗專區 + 點開會顯示下列細節再次點選會收起 預設false收起 */}
              <div className="row category-detail">
                <div className="col d-flex justify-content-between category-font">
                  <p>狗狗專區</p>
                  <p>+</p>
                </div>
                {/* 魚油粉 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>魚油粉</p>
                  </div>
                </div>
                {/* 鈣保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>鈣保健</p>
                  </div>
                </div>
                {/* 腸胃保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>腸胃保健</p>
                  </div>
                </div>
                {/* 皮膚保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>皮膚保健</p>
                  </div>
                </div>
                {/* 關節保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>關節保健</p>
                  </div>
                </div>
                {/* 口腔保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>口腔保健</p>
                  </div>
                </div>
                {/* 眼睛保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>眼睛保健</p>
                  </div>
                </div>
                {/* 心臟保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>心臟保健</p>
                  </div>
                </div>
                {/* 胰臟保健 */}
                <div className="row category-detail">
                  <div className="col category-font">
                    <p>胰臟保健</p>
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
                <p className="howmaney col me-3 mt-2">顯示第1-12筆 / 共60筆</p>
                <select
                  name="perpage"
                  id="perpage"
                  className="col selectpd form-select rwd-none me-3"
                >
                  <option value="5">每頁5筆</option>
                  <option value="10">每頁10筆</option>
                  <option value="15">每頁15筆</option>
                  <option value="20">每頁20筆</option>
                </select>
                <select
                  name="sort"
                  id="sort"
                  className="col rwd-none form-select selectpd"
                >
                  <option value="DESC">新到舊</option>
                  <option value="ASC">舊到新</option>
                </select>
              </div>
              {/* 商品卡片 導入react 會是一張 跑迴圈出來*/}
              <div className="row mt-5 ms-4">
                {/* 卡片內容 */}
                <ProductList />
              </div>
              {/* 頁籤 */}
              <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
