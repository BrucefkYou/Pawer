import React, { useState, useEffect } from 'react';
import List from '@/components/cart/list';

export default function Cart(props) {
  const [selectedCoupon, setSelectedCoupon] = useState(''); // 初始值設為空字串

  const handleCouponChange = (e) => {
    setSelectedCoupon(e.target.value);
  };
  return (
    <>
      <div className="cart">
        <div className="container">
          {/* 麵包屑 */}
          <div className="row">
            <div className="productList-crumb-wei col-sm-9 col-5">
              <a href="./index">首頁</a>/
              <a className="active" href="./cart">
                購物車
              </a>
            </div>
          </div>
          {/* cart */}
          <div className="cart-main">
            {/* title */}
            <div className="cart-title">
              <h1>我的購物車</h1>
              <hr />
            </div>
            {/* product */}
            <div className="cart-product">
              {/* 購物車商品列表-桌機 */}
              {/* 桌機 */}
              <div className="row row-cols-lg-12 product-card d-none d-sm-flex">
                <div className="col-5 text-center">商品</div>
                <div className="col text-center mr-40">單價</div>
                <div className="col ">數量</div>
                <div className="col text-center">總價</div>
                <div className="col" />
              </div>
              <hr className="cart-hr d-none d-sm-block" />
              {/* 購物車商品列表 */}
              <List />
              {/* 優惠券 & 分頁 grid */}
              <div className="cart-section2">
                <div className="row row-cols-lg-2">
                  <div className="col mt-lg-4 choose-discount set-mobile-middle">
                    <select
                      className="bg-main-color btn-coupon-size border-0 text-white"
                      name="coupon"
                      id="coupon"
                      value={selectedCoupon}
                      onChange={handleCouponChange}
                    >
                      <option value="">選擇優惠券</option>
                      <option value="會員註冊禮">會員註冊禮</option>
                      <option value="10週年優惠">10週年優惠</option>
                      <option value="雙11周年慶">雙11周年慶</option>
                    </select>
                    {/* <button type="button"
									class="btn btn-sm bg-main-color btn-coupon-size border-0 text-white">選擇優惠券</button> */}
                  </div>
                  <div className="col mt-lg-4 justify-content-end cart-page">
                    <button type="button" className="btn btn-sm">
                      <svg
                        width={14}
                        height={15}
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.3377 1.46671C10.5852 1.78117 10.5451 2.24853 10.2481 2.51058L4.59343 7.5L10.2481 12.4894C10.5451 12.7515 10.5852 13.2188 10.3377 13.5333C10.0902 13.8478 9.64885 13.8902 9.35186 13.6282L3.05187 8.06939C2.89228 7.92857 2.8 7.71997 2.8 7.5C2.8 7.28003 2.89228 7.07143 3.05187 6.93062L9.35186 1.37181C9.64885 1.10976 10.0902 1.15224 10.3377 1.46671Z"
                          fill="#888888"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-page-size bg-second-color"
                    >
                      1
                    </button>
                    <button type="button" className="btn btn-sm btn-page-size">
                      2
                    </button>
                    <button type="button" className="btn btn-sm">
                      <svg
                        width={14}
                        height={15}
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.66226 13.5333C3.41477 13.2188 3.45489 12.7515 3.75189 12.4894L9.40657 7.5L3.75189 2.51058C3.45489 2.24852 3.41477 1.78117 3.66226 1.46671C3.90976 1.15224 4.35115 1.10975 4.64814 1.37181L10.9481 6.93061C11.1077 7.07143 11.2 7.28003 11.2 7.5C11.2 7.71997 11.1077 7.92857 10.9481 8.06938L4.64814 13.6282C4.35115 13.8902 3.90976 13.8478 3.66226 13.5333Z"
                          fill="#888888"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* 繼續購物 & 總金額 */}
              <div className="cart-section3 d-flex justify-content-lg-between">
                <div className="keep-shopping">
                  <button
                    type="button"
                    className="btn btn-sm btn-keepShoping btn-border-main"
                  >
                    繼續購物
                  </button>
                </div>
                <div className="d-flex flex-column w100per">
                  <div className="cart-check d-flex justify-content-between mb-4">
                    <div className="total-price">總金額</div>
                    <div className="price">NT$800</div>
                  </div>
                  <div className="cart-check d-flex justify-content-between mb-4">
                    <div className="total-price">折抵金額</div>
                    <div className="price">NT$160</div>
                  </div>
                  <div className="cart-check d-flex justify-content-between mb-4">
                    <div className="total-price">優惠券</div>
                    <div className="price">會員註冊禮</div>
                  </div>
                  <hr className="mb-4" />
                  <div className="cart-check d-flex justify-content-between mb-4">
                    <div className="total-price">折抵金額</div>
                    <div className="price">NT$640</div>
                  </div>
                  <div className="set-middle">
                    <button
                      type="button"
                      className="btn bg-second-color text-white btn-checkd"
                    >
                      去結帳
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* cart-desktop */}
    </>
  );
}
