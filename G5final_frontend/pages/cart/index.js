import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart/use-cart-state';
import List from '@/components/cart/list';

export default function Cart(props) {
  const { cart } = useCart();
  const [discountPrice, setDiscountPrice] = useState(10); // 折抵金額，初始值為0
  const [seletctedDiscount, setSelectedDiscount] = useState(''); // 選擇的優惠券，初始值設為空字串
  const [discount, setDiscount] = useState(); // 優惠券數據

  const getDiscount = async () => {
    try {
      const disCountData = await fetch(
        'http://localhost:3005/api/discount/getValidDiscount'
      );
      if (!disCountData.ok) {
        throw new Error('網路回應不成功：' + disCountData.status);
      }
      const disCount = await disCountData.json();
      setDiscount(disCount);
    } catch (e) {
      console.log(e);
    }
  };

  // 計算折扣金額
  // 計算折扣金額
  const calculateDiscountPrice = () => {
    if (seletctedDiscount) {
      if (seletctedDiscount.CalculateType === 1) {
        // 百分比折扣，僅保存折扣金額
        setDiscountPrice(
          // cart.totalPrice * Math.round(Number(seletctedDiscount.Value) / 100)
          Math.round(
            cart.totalPrice * (1 - Number(seletctedDiscount.Value) / 100)
          )
        );
      } else if (seletctedDiscount.CalculateType === 2) {
        // 固定金額折扣
        setDiscountPrice(Number(seletctedDiscount.Value));
      }
    } else {
      setDiscountPrice(0); // 如果沒有選擇優惠券，折扣金額為 0
    }
  };

  // 當選擇優惠券發生變化時計算折扣
  useEffect(() => {
    calculateDiscountPrice();
    console.log(seletctedDiscount);
  }, [seletctedDiscount, cart.totalPrice]);

  // 處理選擇優惠券
  const handleCouponChange = (e) => {
    const selected = discount.find(
      (item) => item.ID === parseInt(e.target.value)
    );
    setSelectedDiscount(selected);
  };

  useEffect(() => {
    getDiscount();
  }, []);
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
              <List />
              {/* 優惠券 & 分頁 grid */}
              <div className="cart-section2">
                <div className="row row-cols-lg-2">
                  <div className="col mt-lg-4 choose-discount set-mobile-middle">
                    <select
                      className="bg-main-color btn-coupon-size border-0 text-white"
                      name="coupon"
                      id="coupon"
                      value={seletctedDiscount?.ID || ''}
                      onChange={handleCouponChange}
                    >
                      <option value="">選擇優惠券</option>
                      {discount
                        ? discount.map((item) => {
                            if (item.ConditionMinValue <= cart.totalPrice) {
                              return (
                                <option key={item.ID} value={item.ID}>
                                  {item.Name}
                                </option>
                              );
                            }
                          })
                        : '沒有符合條件的優惠券'}
                    </select>
                    {/* <button type="button"
									class="btn btn-sm bg-main-color btn-coupon-size border-0 text-white">選擇優惠券</button> */}
                  </div>
                  {/* 分頁功能，目前暫時隱藏 */}
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
                    <div className="price">NT$ {cart.totalPrice}</div>
                  </div>
                  <div className="cart-check d-flex justify-content-between mb-4">
                    <div className="total-price">折抵金額</div>
                    <div className="price">NT$ {discountPrice}</div>
                  </div>
                  <div className="cart-check d-flex justify-content-between mb-4">
                    <div className="total-price">優惠券</div>
                    <div className="price">
                      {seletctedDiscount?.Name || '沒有選擇優惠券'}
                    </div>
                  </div>
                  <hr className="mb-4" />
                  <div className="cart-check d-flex justify-content-between mb-4">
                    <div className="total-price">結帳金額</div>
                    <div className="price">
                      NT$ {Math.max(0, cart.totalPrice - discountPrice)}
                    </div>
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
