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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
