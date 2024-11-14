import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart/use-cart-state';
import List from '@/components/cart/list';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import toast from 'react-hot-toast';
import logo from '@/public/LOGO.svg';
import Image from 'next/image';
import PageTitle from '@/components/member/page-title/page-title';

export default function Cart(props) {
  const { auth, getMember } = useAuth();
  const router = useRouter();
  const { cart, addItem } = useCart();
  const [discountPrice, setDiscountPrice] = useState(10); // 折抵金額，初始值為0
  const [selectedDiscount, setSelectedDiscount] = useState(''); // 選擇的優惠券，初始值設為空字串
  const [discount, setDiscount] = useState(); // 優惠券數據
  const [checkPrice, setCheckPrice] = useState(0); // 結帳金額

  // 要待到下一頁的優惠券的初始值
  const defaultDiscount = {
    ID: 0,
    Name: '',
    StartTime: '',
    EndTime: '',
    CalculateType: 0,
    Value: 0,
    checked: false,
  };
  // 取得優惠券資料
  const getDiscount = async () => {
    try {
      const disCountData = await fetch(
        'http://localhost:3005/api/discount/getMemberDicount',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(auth.memberData.ID),
        }
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
    if (selectedDiscount) {
      const updatedDiscount = { ...selectedDiscount, checked: true };
      setSelectedDiscount(updatedDiscount);
      window.localStorage.setItem('discount', JSON.stringify(updatedDiscount));
    } else {
      localStorage.setItem('discount', JSON.stringify(defaultDiscount));
    }
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
              <div className="mobile-bread-margin">
                <Breadcrumbs />
              </div>
              {/* cart */}
              <div className="cart-main">
                {/* title */}
                <div className="cart-index-title mb-3">
                  <PageTitle title={'購物車'} subTitle={'Cart'} />
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
                          className="bg-main-color text-white form-select mt-3"
                          name="coupon"
                          id="coupon"
                          value={selectedDiscount?.ID || ''}
                          onChange={handleCouponChange}
                        >
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
                      </div>
                    </div>
                  </div>
                  {/* 繼續購物 & 總金額 */}
                  <div className="cart-section3 d-flex justify-content-lg-between">
                    <div className="keep-shopping">
                      <Link
                        href="/product"
                        className="btn btn-sm btn-keepShoping btn-main-border text-decoration-none set-middle"
                      >
                        繼續購物
                      </Link>
                    </div>
                    <div className="d-flex flex-column w100per">
                      <div className="cart-check d-flex justify-content-between mb-4">
                        <div className="total-price">商品合計</div>
                        <div className="price">NT$ {checkPrice}</div>
                      </div>
                      <div className="cart-check d-flex justify-content-between mb-4">
                        <div className="total-price">折抵金額</div>
                        <div className="price">NT$ {discountPrice}</div>
                      </div>
                      <div className="cart-check d-flex justify-content-between mb-4">
                        <div className="total-price">優惠券</div>
                        <div className="price">
                          {selectedDiscount?.Name || '未選擇優惠券'}
                        </div>
                      </div>
                      <hr className="mb-4" />
                      <div className="cart-check d-flex justify-content-between mb-4">
                        <div className="total-price">訂單總計</div>
                        <div className="price">
                          NT$ {Math.max(0, checkPrice - discountPrice)}
                        </div>
                      </div>
                      <div className="set-middle">
                        <button
                          href="/cart/cart-info"
                          className="btn bg-second-color btn-checkd text-decoration-none set-middle"
                          // 將選擇的優惠券帶到下一頁
                          onClick={(e) => {
                            if (cart.items.length === 0) {
                              toast('購物車內沒有商品', {
                                icon: (
                                  <Image
                                    width={95}
                                    height={53}
                                    src={logo}
                                    alt="logo"
                                    priority
                                  />
                                ),
                                duration: 1800,
                                style: {
                                  borderRadius: '10px',
                                  background: 'rgba(84, 124, 215, 1)',
                                  color: '#fff',
                                  marginTop: '80px',
                                },
                              });
                              e.preventDefault();
                            } else if (
                              cart.items.filter((item) => item.checked === true)
                                .length === 0
                            ) {
                              toast('請勾選商品', {
                                icon: (
                                  <Image
                                    width={95}
                                    height={53}
                                    src={logo}
                                    alt="logo"
                                    priority
                                  />
                                ),
                                duration: 1800,
                                style: {
                                  borderRadius: '10px',
                                  background: 'rgba(84, 124, 215, 1)',
                                  color: '#fff',
                                  marginTop: '80px',
                                },
                              });
                              e.preventDefault();
                            } else {
                              bringDiscount();
                              router.push('/cart/cart-info');
                            }
                          }}
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
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center my-3 gap-4">
          <div className="text-center">請先登入會員</div>
          <button
            className="btn btn-warning text-decoration-none"
            onClick={() => {
              router.push('/member/login');
            }}
          >
            去登入
          </button>
        </div>
      )}
    </>
  );
}
