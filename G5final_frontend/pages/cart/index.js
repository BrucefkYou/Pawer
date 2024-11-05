import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart/use-cart-state';
import List from '@/components/cart/list';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { set } from 'lodash';
import { useRouter } from 'next/router';

export default function Cart(props) {
  const router = useRouter();
  const { auth } = useAuth();
  const { cart, setCartItems } = useCart();
  const [discountPrice, setDiscountPrice] = useState(10); // 折抵金額，初始值為0
  const [selectedDiscount, setSelectedDiscount] = useState(''); // 選擇的優惠券，初始值設為空字串
  const [discount, setDiscount] = useState(); // 優惠券數據
  const [checkPrice, setCheckPrice] = useState(0); // 結帳金額

  // 取得優惠券資料
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
  const calculateDiscountPrice = () => {
    if (selectedDiscount) {
      if (selectedDiscount.CalculateType === 1) {
        // 百分比折扣，僅保存折扣金額
        setDiscountPrice(
          Math.round(checkPrice * (1 - Number(selectedDiscount.Value) / 100))
        );
      } else if (selectedDiscount.CalculateType === 2) {
        // 固定金額折扣
        setDiscountPrice(Number(selectedDiscount.Value));
      }
    } else {
      setDiscountPrice(0); // 如果沒有選擇優惠券，折扣金額為 0
    }
  };

  // 處理選擇優惠券
  const handleCouponChange = (e) => {
    const selected = discount.find(
      (item) => item.ID === parseInt(e.target.value)
    );
    setSelectedDiscount(selected);
  };

  // 將選擇的優惠券帶到下一頁
  const bringDiscount = () => {
    const updatedDiscount = { ...selectedDiscount, checked: true };
    setSelectedDiscount(updatedDiscount);
    window.localStorage.setItem('discount', JSON.stringify(updatedDiscount));
  };

  // 當選擇優惠券發生變化時計算折扣
  useEffect(() => {
    calculateDiscountPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDiscount, cart.totalPrice]);

  // 當購物車內容有變化時，計算勾選商品的總價
  useEffect(() => {
    const checkedItems = cart.items.filter((item) => item.checked === true);
    setCheckPrice(
      checkedItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      )
    );
  }, [cart]);
  // 第一次進到頁面就要初始化購物車
  useEffect(() => {
    // if (router.isReady) initCart();
  }, [router.isReady]);
  // 一進頁面就要讀取優惠券資料
  useEffect(() => {
    getDiscount();
  }, []);
  return (
    <>
      {auth.isAuth ? (
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
                          value={selectedDiscount?.ID || ''}
                          onChange={handleCouponChange}
                        >
                          {/* //! 這邊缺少一個function將以選取的優惠券帶到下一頁  */}
                          <option value="">選擇優惠券</option>
                          {/* 篩選只有滿足優惠券最低金額的優惠券會顯示 */}
                          {discount
                            ? discount.map((item) => {
                                if (item.ConditionMinValue <= checkPrice) {
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
                      <Link
                        href="/product"
                        className="btn btn-sm btn-keepShoping btn-border-main text-decoration-none set-middle"
                      >
                        繼續購物
                      </Link>
                    </div>
                    <div className="d-flex flex-column w100per">
                      <div className="cart-check d-flex justify-content-between mb-4">
                        <div className="total-price">總金額</div>
                        <div className="price">NT$ {checkPrice}</div>
                      </div>
                      <div className="cart-check d-flex justify-content-between mb-4">
                        <div className="total-price">折抵金額</div>
                        <div className="price">NT$ {discountPrice}</div>
                      </div>
                      <div className="cart-check d-flex justify-content-between mb-4">
                        <div className="total-price">優惠券</div>
                        <div className="price">
                          {selectedDiscount?.Name || '沒有選擇優惠券'}
                        </div>
                      </div>
                      <hr className="mb-4" />
                      <div className="cart-check d-flex justify-content-between mb-4">
                        <div className="total-price">結帳金額</div>
                        <div className="price">
                          NT$ {Math.max(0, checkPrice - discountPrice)}
                        </div>
                      </div>
                      <div className="set-middle">
                        <Link
                          href="/cart/cart-info"
                          className="btn bg-second-color btn-checkd text-decoration-none set-middle"
                          // 將選擇的優惠券帶到下一頁
                          onClick={bringDiscount}
                        >
                          去結帳
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* cart-desktop */}
        </>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center my-3 gap-4">
          <div className="text-center">請先登入會員</div>
          <button className="btn btn-warning">
            <Link className="text-decoration-none" href={'/member/login'}>
              去登入
            </Link>
          </button>
        </div>
      )}
    </>
  );
}
