import React, { useState, useEffect } from 'react';
import InfoList from '@/components/cart/info-list';
import { set } from 'lodash';
import { useCart } from '@/hooks/use-cart/use-cart-state';
import Image from 'next/image';

export default function CartInfo(props) {
  const { items } = useCart();
  const [selectedCity, setSelectedCity] = useState(false); // 初始值設為空字串
  const [selectedDelivery, setSelectedDelivery] = useState(''); // 被選中的運送方式
  const [selectedPayment, setSelectedPayment] = useState(''); // 被選中的付款方式
  const [selectedBill, setSelectedBill] = useState(''); // 被選中的發票方式

  const [checkedPrice, setCheckedPrice] = useState(0); // 進到結帳資訊的商品的總價
  const [discountPrice, setDiscountPrice] = useState(0); // 折抵金額，初始值為0
  const [discount, setDiscount] = useState(); // 優惠券數據

  const getDiscount = () => {
    setDiscount(window.localStorage.getItem('discount'));
    console.log(discount);
  }

  // 處理運送方式變化
  const handleDeliveryChange = (event) => {
    setSelectedDelivery(event.target.value);
  };
  // 處理付款方式變化
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  // 處理發票方式變化
  const handleBillChange = (event) => {
    setSelectedBill(event.target.value);
  };
  // 處理城市變化
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  const [selectedArea, setSelectedArea] = useState(''); // 初始值設為空字串

  const handleAreaChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // 當離開頁面的時候，將 localStorage 裡面的 discount 移除
  useEffect(() => {
    // 清理函數會在組件卸載時執行
    return () => {
      localStorage.removeItem('discount');
    };
  }, []);

  useEffect(() => {
    setCheckedPrice(
      items
        .filter((item) => item.checked)
        .reduce((total, item) => total + item.quantity * item.price, 0)
    );
  }, [items]);

  // 一進頁面就要讀取localStorage的優惠券資料
  useEffect(() => {
    getDiscount();
  }, []);
  return (
    <>
      <div className="cart">
        <div className="container">
          <form action="">
            <div className="row">
              {/* 麵包屑 */}
              <div className="productList-crumb-wei col-sm-9 col-5">
                <a href="./index">首頁</a>/
                <a className="active" href="./cart">
                  購物車
                </a>
                /
                <a className="active" href="./cart-info">
                  結帳
                </a>
              </div>
            </div>
            <div className="cart-info">
              {/* cart-info */}
              <section className="info-product">
                {/* 產品列表 */}
                {/* 列表標題 */}
                <div className="productList-title row">
                  <div className="col text-center">商品</div>
                  <div className="col text-center">單價</div>
                  <div className="col text-center">數量</div>
                  <div className="col text-center">總價</div>
                </div>
                <hr className="desktop-hr" />
                {/* 購物車列表 */}
                <InfoList />
                <hr className="desktop-hr" />
                {/* 優惠券 */}
                <div className="info-discount">
                  <div className="d-flex align-items-center">
                    <div className="discount-check-box mr50 d-flex align-items-center">
                      <input
                        className="mr20 checkbox-block"
                        type="checkbox"
                        name="discountCheck"
                        id="discountCheck"
                      />
                      優惠券
                    </div>
                    <div className="checked mr50">已選擇優惠券</div>
                    <div className="discount-svg">
                      <Image width={288} height={123} src={"/member/coupon-bg.png"}/>
                    </div>
                  </div>
                </div>
                <hr className="desktop-hr" />
                {/* 寄送方式 */}
                <section className="deliver-block mt-3">
                  {/* 寄送方式-標題 */}
                  <div className="home-delivery">
                    <span className="delivery-title">
                      寄送方式 <span className="text-danger">*</span>
                    </span>
                  </div>
                  {/* 寄送方式-選項 */}
                  {/* 寄送方式-宅配 */}
                  {/* !待新增效果-點擊後才出現下面的欄位 */}
                  <div className="d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block"
                      type="radio"
                      name="delivery-way"
                      value="home"
                      checked={selectedDelivery === 'home'}
                      onChange={handleDeliveryChange}
                    />
                    <span className="delivery-title">宅配</span>
                  </div>
                  {/* 基本資訊 */}
                  {selectedDelivery === 'home' ? (
                    <>
                      <div className="row row-cols-1 row-cols-lg-3 input-block-block">
                        <div>
                          <input
                            className="mt10 w-100 h-36p input-block"
                            type="text"
                            placeholder="姓名"
                          />
                        </div>
                        <div>
                          <input
                            className="mt10 w-100 h-36p input-block"
                            type="text"
                            placeholder="收貨人"
                          />
                        </div>
                        <div>
                          <input
                            className="mt10 w-100 h-36p input-block"
                            type="text"
                            placeholder="市話(非必填)"
                          />
                        </div>
                      </div>
                      {/* 地址 */}
                      <div className="mt20">
                        <span className="delivery-title">寄送地址</span>
                      </div>
                      <div className="row row-cols-2">
                        <div className="col w-50 mt10">
                          <select
                            className="form-select input-block"
                            name="chooseCity"
                            id="chooseCity"
                            value={selectedCity}
                            onChange={handleCityChange}
                          >
                            <option value="">請選擇縣市</option>
                            <option value="taipei">台北市</option>
                            <option value="New">新北市</option>
                          </select>
                        </div>
                        <div className="col w-50 mt10">
                          <select
                            className="form-select input-block"
                            name="area"
                            id="area"
                            value={selectedArea}
                            onChange={handleAreaChange}
                          >
                            <option value="">請選擇區域</option>
                            <option value="area1">大安區</option>
                            <option value="area2">中正區</option>
                          </select>
                        </div>
                        <div className="col w-100 mt10">
                          <input
                            className="mt10 w-100 h-36p input-block"
                            type="text"
                            placeholder="請輸入地址"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    ' '
                  )}

                  {/* 寄送方式-超商取貨 */}
                  {/* !待新增效果-點擊後才出現便利商店選項 */}
                  <div className="mt20 d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block"
                      type="radio"
                      name="delivery-way"
                      value="convenience"
                      checked={selectedDelivery === 'convenience'}
                      onChange={handleDeliveryChange}
                    />
                    <span className="delivery-title">超商取貨</span>
                  </div>
                  {selectedDelivery === 'convenience' ? (
                    <>
                      {/* 選擇超商 */}
                      <div className="row row-cols-2 row-cols-lg-4">
                        <div className="col mt10">
                          <button className="btn btn-convenience w-100">
                            <Image width={30} height={30} className='mr10' objectFit='cover' src={"/cart/sevenEleven.png"}/>
                            <span className="delivery-title">7-11超商</span>
                          </button>
                        </div>
                        <div className="col mt10">
                          <button className="btn btn-convenience w-100">
                          <Image width={30} height={30} className={"mr10"} objectFit='cover' src={"/cart/faimilyMart.png"}/>
                            <span className="delivery-title">全家超商</span>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    ' '
                  )}
                </section>
                <hr className="desktop-hr" />
                {/* 付款方式 */}
                <section className="payment-block">
                  {/* 付款方式-標題 */}
                  <div className="home-delivery">
                    <span className="delivery-title">
                      付款方式 <span className="text-danger">*</span>
                    </span>
                  </div>
                  {/* !待新增效果-點擊後才出現下面的欄位 */}
                  {/* 信用卡 */}
                  <div className="mt20 d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block"
                      type="radio"
                      name="payment-way"
                      value="credit-card"
                      checked={selectedPayment === 'credit-card'}
                      onChange={handlePaymentChange}
                    />
                    <span className="delivery-title">信用卡</span>
                  </div>
                  {selectedPayment === 'credit-card' ? (
                    <>
                      {/* 信用卡資訊 */}
                      <div className="row row-cols-12 row-cols-lg-3">
                        <div className="col-12">
                          <input
                            className="mt10 w-100 h-36p input-block"
                            type="text"
                            placeholder="卡號"
                          />
                        </div>
                        <div className="col-6">
                          <input
                            className="mt10 w-100 h-36p input-block"
                            type="text"
                            placeholder="有效日期"
                          />
                        </div>
                        <div className="col-6">
                          <input
                            className="mt10 w-100 h-36p input-block"
                            type="text"
                            placeholder="安全碼 CVC"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    ' '
                  )}
                  {/* 超商取貨付款 */}
                  <div className="mt20 d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block"
                      type="radio"
                      name="payment-way"
                      value="store"
                      checked={selectedPayment === 'store'}
                      onChange={handlePaymentChange}
                    />
                    <span className="delivery-title">超商取貨付款</span>
                  </div>
                  {selectedPayment === 'store' ? (
                    <>
                      {/* 基本資訊 */}
                      <div className="row row-cols-1 row-cols-lg-3">
                        <div className="col">
                          <input
                            className="mt10 w-100 h-36p input-block"
                            type="text"
                            placeholder="收貨人姓名"
                          />
                        </div>
                        <div className="col">
                          <input
                            className="mt10 w-100 h-36p input-block"
                            type="text"
                            placeholder="手機號碼"
                          />
                        </div>
                        <div className="col">
                          <input
                            className="mt10 w-100 h-36p input-block"
                            type="text"
                            placeholder="市話(非必填)"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    ' '
                  )}
                </section>
                <hr className="desktop-hr" />
                {/* 發票資訊 */}
                <section className="receipt-block">
                  {/* 發票資訊-標題 */}
                  <div className="home-delivery">
                    <span className="delivery-title">
                      發票資訊 <span className="text-danger">*</span>
                    </span>
                  </div>
                  {/* !待新增效果-點擊後才出現下面的欄位 */}
                  {/* 捐贈發票 */}
                  <div className="mt20 d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block"
                      type="radio"
                      name="bill-way"
                      value="donate"
                      checked={selectedBill === 'donate'}
                      onChange={handleBillChange}
                    />
                    <span className="delivery-title">捐贈發票</span>
                  </div>
                  {/* 手機載具 */}
                  <div className="mt20 d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block"
                      type="radio"
                      name="bill-way"
                      value="phone"
                      checked={selectedBill === 'phone'}
                      onChange={handleBillChange}
                    />
                    <span className="delivery-title">手機載具</span>
                  </div>
                  {selectedBill === 'phone' ? (
                    <>
                      {/* 載具資訊 */}
                      <div className="row row-cols-1">
                        <div className="col">
                          <input
                            className="mt10 w-100 h-36p input-block"
                            type="text"
                            placeholder="手機載具號碼"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    ' '
                  )}

                  {/* 紙本發票 */}
                  <div className="mt20 d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block"
                      type="radio"
                      name="bill-way"
                      value="paper"
                      checked={selectedBill === 'paper'}
                      onChange={handleBillChange}
                    />
                    <span className="delivery-title">紙本發票</span>
                  </div>
                </section>
                {/* <hr class="desktop-hr"> */}
                {/* 訂單金額 */}
                <section className="bill-block">
                  <div className="row row-cols-lg-4 justify-content-lg-end">
                    <div className="col">
                      <div className="d-flex flex-column">
                        <div className="price-block d-flex justify-content-between w-100">
                          <div className="price-font set-middle">總金額</div>
                          <div className="price-font set-middle">
                            NT${checkedPrice}
                          </div>
                        </div>
                        <div className="price-block d-flex justify-content-between w-100">
                          <div className="price-font set-middle">優惠券</div>
                          <div className="price-font set-middle d-flex flex-column">
                            <div className="discount-icon">會員註冊禮</div>
                            <div>-NT$100</div>
                          </div>
                        </div>
                        <hr />
                        <div className="price-block d-flex justify-content-between w-100">
                          <div className="price-font set-middle">結帳金額</div>
                          <div className="price-font set-middle">
                            NT${checkedPrice - discountPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </div>
            {/* 結帳&回購物車按鈕 */}
            <section
              className="check-btn-block d-flex justify-content-lg-center 
				justify-content-md-center justify-content-between"
            >
              <div>
                <button className="btn check-btn">會購物車</button>
              </div>
              <div>
                <button className="btn check-btn">確認付款</button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}
