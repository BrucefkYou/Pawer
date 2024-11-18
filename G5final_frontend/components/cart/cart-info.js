import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import InfoList from '@/components/cart/info-list';
import { useCart } from '@/hooks/use-cart/use-cart-state';
import Image from 'next/image';
import TWZipCode from '@/components/tw-zipcode';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useShip711StoreOpener } from '@/hooks/use-cart/use-ship-711-store';
import { useAuth } from '@/hooks/use-auth';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import { useLoader } from '@/hooks/use-loader';
import toast from 'react-hot-toast';
import logo from '@/public/LOGO.svg';
import { create, remove } from 'lodash';

export default function CartInfo(props) {
  const { loading, setLoading } = useLoader();
  const { auth } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const { items, updateCartItems } = useCart();
  // 選擇便利商店
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    'http://localhost:3005/api/shipment/711',
    { autoCloseMins: 3 } // x分鐘沒完成選擇會自動關閉，預設5分鐘。
  );
  // 設定訂單資訊
  const [selectedDelivery, setSelectedDelivery] = useState(''); // 被選中的運送方式
  const [selectedPayment, setSelectedPayment] = useState(''); // 被選中的付款方式
  const [selectedBill, setSelectedBill] = useState('paper'); // 被選中的發票方式

  // 設定表單內容
  const [tel, setTel] = useState('');
  const [receiver, setReceiver] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [township, setTownship] = useState(0);
  const [carrierNum, setCarrierNum] = useState('');

  // 處理結帳金額與折扣金額
  const [checkedPrice, setCheckedPrice] = useState(0); // 進到結帳資訊的商品的總價
  const [discountPrice, setDiscountPrice] = useState(0); // 折抵金額，初始值為0
  const [discount, setDiscount] = useState({
    ID: 0,
    Name: '',
    StartTime: '',
    EndTime: '',
    Value: 0,
    checked: true,
  }); // 優惠券數據
  // 導向至ECPay付款頁面
  const goECPay = (ID) => {
    window.location.href = `http://localhost:3005/api/ecpay/payment?orderId=${ID}`;
  };

  const goLinepay = (ID) => {
    window.location.href = `http://localhost:3005/api/line-pay/reserve?orderId=${ID}`;
  };

  const handleLinepayConfirm = async (transactionId) => {
    setLoading(true);
    const fetchConfirmUrl = `http://localhost:3005/api/line-pay/confirm?transactionId=${transactionId}`;
    const fetchRes = await fetch(fetchConfirmUrl);
    const resData = await fetchRes.json();
    setLoading(false);
    if (resData.status === 'success') {
      router.push(`/cart/success?orderID=${resData.data.info.packages[0].id}`);
      // toast.success('付款成功');
    } else if (resData.status === 'fail') {
      router.push('/cart/fail');
      // toast.error('付款失敗');
    }
  };

  // `http://localhost:3005/api/ecpay/payment?orderId=${orderID}`;
  // `http://localhost:3005/api/ecpay-test-only?amount=${
  //   items.filter((item) => item.checked).length
  // }`;
  const [orderID, setOrderID] = useState(0);
  // 成立訂單
  const createOrder = async (data) => {
    try {
      const url = 'http://localhost:3005/api/order/createOrder';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (res.status === 201) {
        console.log('訂單建立成功');
      }
      console.log(resData.orderId);
      return resData;

      // 導頁的行為在後端處理
    } catch (error) {
      console.log(error);
    }
  };

  // 從 localStorage 讀取 discount
  const getDiscount = () => {
    const discountString = window.localStorage.getItem('discount');
    if (discountString) {
      try {
        const discountObject = JSON.parse(discountString);
        setDiscount(discountObject);
        console.log(discountObject);
      } catch (error) {
        console.error('解析 discount 時出錯:', error);
        setDiscount({
          ID: 0,
          Name: '',
          StartTime: '',
          EndTime: '',
          CalculateType: 0,
          Value: 0,
          checked: false,
        });
      }
    }
  };

  // 處理運送方式變化
  const handleDeliveryChange = (e) => {
    setSelectedDelivery(e.target.value);
  };
  // 處理付款方式變化
  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };
  // 處理發票方式變化
  const handleBillChange = (e) => {
    setSelectedBill(e.target.value);
  };
  // 處理優惠券勾選框變化
  const handleDiscountChange = (e) => {
    const isChecked = e.target.checked;

    // 更新 discount 狀態
    setDiscount((prevDiscount) => {
      const updatedDiscount = { ...prevDiscount, checked: isChecked };

      // 更新 localStorage
      window.localStorage.setItem('discount', JSON.stringify(updatedDiscount));

      return updatedDiscount;
    });
  };

  // 計算折扣金額
  const calculateDiscountPrice = () => {
    if (discount && discount.checked) {
      if (discount.CalculateType === 1) {
        // 百分比折扣
        setDiscountPrice(
          Math.round(checkedPrice * (1 - Number(discount.Value) / 100))
        );
      } else if (discount.CalculateType === 2) {
        // 固定金額折扣
        setDiscountPrice(Number(discount.Value));
      }
    } else {
      setDiscountPrice(0); // 不適用折扣
    }
  };

  // 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('handleSubmit called');

    if (isSubmittingRef.current) {
      console.log('Already submitting, aborting');
      return;
    }

    if (store711.storename === '' && selectedDelivery === 'convenience') {
      toast.error('請選擇便利商店', {
        icon: <Image width={95} height={53} src={logo} alt="logo" priority />,
        duration: 1800,
        style: {
          borderRadius: '10px',
          background: '#c14545',
          color: '#fff',
          marginTop: '80px',
        },
      });
      return;
    }
    setLoading(true);
    setIsSubmitting(true);
    isSubmittingRef.current = true;
    console.log('Set isSubmitting to true');

    try {
      const orderData = {
        MemberID: auth.memberData.id,
        ProductsAmount: items.filter((item) => item.checked).length,
        CouponID: discount.ID,
        Receiver: receiver,
        ReceiverPhone: phone,
        country: country,
        township: township,
        address: address,
        storeAddress: store711.storeaddress,
        selectedDelivery: selectedDelivery,
        selectedPayment: selectedPayment,
        ReceiptType: selectedBill,
        checkedPrice: checkedPrice,
        DiscountPrice: discountPrice,
        ReceiptCarrier: carrierNum,
        Products: items
          .filter((item) => item.checked)
          .map((item) => ({
            ProductID: item.id,
            ProductName: item.name,
            Quantity: item.quantity,
            Price: item.price,
          })),
      };

      const createOrderData = await createOrder(orderData);
      const createOrderID = createOrderData.orderId;
      const createOrderNum = createOrderData.OrderNumber;

      toast.success('訂單已成功提交！');
      console.log('orderID: ' + createOrderID);

      if (
        selectedPayment === 'credit-card' &&
        createOrderID &&
        createOrderID != 0
      ) {
        console.log('goECPay');
        goECPay(createOrderID);
      } else if (
        selectedPayment === 'LinePay' &&
        createOrderID &&
        createOrderID != 0
      ) {
        console.log('goLinepay');
        goLinepay(createOrderID);
      } else if (selectedPayment === 'store') {
        router.push(`/cart/success?orderID=${createOrderNum}`);
      }

      // 重置表單或執行其他操作
    } catch (error) {
      toast.error('提交訂單時出錯，請稍後再試。');
      console.error(error);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // 一進頁面就要讀取localStorage的優惠券資料
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
    getDiscount();
  }, []);

  // 當離開頁面的時候，將 localStorage 裡面的 discount 移除
  useEffect(() => {
    return () => {
      localStorage.removeItem('discount');
      localStorage.removeItem('store711');
    };
  }, []);

  // 當商品列表有變化時，重新計算總價
  useEffect(() => {
    setCheckedPrice(
      items
        .filter((item) => item.checked)
        .reduce((total, item) => total + item.quantity * item.price, 0)
    );
  }, [items]);

  // localStorage中的優惠券或是金額有變化時就重新計算折扣金額
  useEffect(() => {
    calculateDiscountPrice();
  }, [discount, checkedPrice]);

  useEffect(() => {
    if (router.isReady) {
      // 這裡確保能得到router.query值
      console.log(router.query);
      // http://localhost:3000/order?transactionId=2022112800733496610&orderId=da3b7389-1525-40e0-a139-52ff02a350a8
      // 這裡要得到交易id，處理伺服器通知line pay已確認付款，為必要流程
      // TODO: 除非為不需登入的交易，為提高安全性應檢查是否為會員登入狀態
      const { transactionId, orderId } = router.query;

      // 如果沒有帶transactionId或orderId時，導向至首頁(或其它頁)
      if (!transactionId || !orderId) {
        // 關閉載入狀態
        setLoading(false);
        // 不繼續處理
        return;
      }
      // 向server發送確認交易api
      handleLinepayConfirm(transactionId);
    }

    // eslint-disable-next-line
  }, [router.isReady])

  useEffect(() => {
    isSubmittingRef.current = false;
  }, [router.isReady]);
  return (
    <>
      <Head>
        <title>Pawer寶沃 - 結帳</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="cart">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* 麵包屑 */}
              <Breadcrumbs />
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
                {!discount || discount.ID === 0 ? (
                  ''
                ) : (
                  <div className="info-discount">
                    <div className="d-flex align-items-center">
                      <div className="discount-check-box mr50 d-flex align-items-center">
                        <input
                          className="mr20 checkbox-block"
                          type="checkbox"
                          name="discountCheck"
                          id="discountCheck"
                          checked={discount.checked ? 'checked' : false}
                          onChange={handleDiscountChange}
                        />
                        優惠券
                      </div>
                      <div className="checked mr50">
                        {discount.checked && discount.ID !== 0
                          ? '已選擇優惠券'
                          : '未選擇優惠券'}
                      </div>
                      <div className="discount-svg">
                        <Image
                          width={288}
                          height={123}
                          src={'/member/coupon-bg.png'}
                          alt="coupon"
                        />
                      </div>
                    </div>
                    <hr className="desktop-hr" />
                  </div>
                )}
                {/* 寄送方式 */}
                <section className="deliver-block mt-3">
                  {/* 寄送方式-標題 */}
                  <div className="home-delivery">
                    <span className="delivery-title cartInfo-title">
                      寄送方式
                    </span>
                  </div>
                  {/* 寄送方式-選項 */}
                  {/* 寄送方式-宅配 */}
                  <div className="d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block form-check-input"
                      type="radio"
                      name="delivery-way"
                      value="home"
                      checked={selectedDelivery === 'home'}
                      onChange={handleDeliveryChange}
                      required
                    />
                    <span className="delivery-title form-check-label">
                      宅配
                    </span>
                  </div>
                  {/* 基本資訊 */}
                  {selectedDelivery === 'home' ? (
                    <>
                      <div className="row row-cols-1 row-cols-lg-3">
                        <div className="col">
                          <div className="input-group input-block">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              收貨人 <span className="text-danger">*</span>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              value={receiver}
                              onChange={(e) => setReceiver(e.target.value)}
                              required={selectedDelivery === 'convenience'}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="input-group input-block">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              手機號碼 <span className="text-danger">*</span>
                            </span>
                            <input
                              className="form-control"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required={selectedDelivery === 'convenience'}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="input-group input-block">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              市話
                            </span>
                            <input className="form-control" type="tel" />
                          </div>
                        </div>
                      </div>
                      {/* 地址 */}
                      <div className="mt20">
                        <span className="delivery-title">寄送地址</span>
                      </div>
                      <div className="row row-cols-2">
                        {/* 選取地區 */}
                        <TWZipCode
                          country={setCountry}
                          township={setTownship}
                          nessary={selectedDelivery === 'home'}
                        />
                        <div className="col-12">
                          <div className="input-group input-block">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              地址 <span className="text-danger">*</span>
                            </span>
                            <input
                              className="form-control"
                              type="text"
                              value={address}
                              required={selectedDelivery === 'home'}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
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
                      className="mr10 checkbox-block form-check-input"
                      type="radio"
                      name="delivery-way"
                      value="convenience"
                      checked={selectedDelivery === 'convenience'}
                      onChange={handleDeliveryChange}
                      required
                    />
                    <span className="delivery-title form-check-label">
                      超商取貨
                    </span>
                  </div>
                  {selectedDelivery === 'convenience' ? (
                    <>
                      {/* //!頭 */}
                      {/* 基本資訊 */}
                      <div className="row row-cols-1 row-cols-lg-3">
                        <div className="col">
                          <div className="input-group input-block">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              收貨人 <span className="text-danger">*</span>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              value={receiver}
                              onChange={(e) => setReceiver(e.target.value)}
                              required={selectedDelivery === 'convenience'}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="input-group input-block">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              手機號碼 <span className="text-danger">*</span>
                            </span>
                            <input
                              className="form-control"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required={selectedDelivery === 'convenience'}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="input-group input-block">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              市話
                            </span>
                            <input className="form-control" type="tel" />
                          </div>
                        </div>
                      </div>
                      <div className="mt20">
                        <span className="delivery-title">
                          取貨門市 <span className="text-danger">*</span>
                        </span>
                      </div>
                      {/* 選擇超商 */}
                      <div className="row row-cols-2 row-cols-lg-4">
                        <div className="col mt10">
                          <button
                            type="button"
                            className={`btn btn-convenience w-100 ${
                              store711.storename ? 'btn-warning' : ''
                            }`}
                            onClick={() => openWindow()}
                          >
                            <Image
                              width={30}
                              height={30}
                              className="mr10"
                              src={'/cart/sevenEleven.png'}
                              alt="7-11"
                            />
                            <span className="delivery-title">
                              {store711.storename
                                ? store711.storename
                                : '7-11超商'}
                            </span>
                          </button>
                        </div>

                        <div className="col mt10">
                          <button
                            type="button"
                            className="btn btn-convenience w-100"
                          >
                            <Image
                              width={30}
                              height={30}
                              className={'mr10'}
                              src={'/cart/faimilyMart.png'}
                              alt="familyMart"
                            />
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
                    <span className="delivery-title cartInfo-title">
                      付款方式
                    </span>
                  </div>
                  {/* !待新增效果-點擊後才出現下面的欄位 */}
                  {/* 信用卡 */}
                  <div className="mt20 d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block form-check-input"
                      type="radio"
                      name="payment-way"
                      value="credit-card"
                      checked={selectedPayment === 'credit-card'}
                      onChange={handlePaymentChange}
                      required
                    />
                    <span className="delivery-title">信用卡</span>
                  </div>

                  {/* 超商取貨付款 */}
                  <div className="mt20 d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block form-check-input"
                      type="radio"
                      name="payment-way"
                      value="store"
                      checked={
                        selectedPayment === 'store' &&
                        selectedDelivery === 'convenience'
                      }
                      onChange={handlePaymentChange}
                      required
                    />
                    <span className="delivery-title">超商取貨付款</span>
                  </div>
                  {/* LinePay */}
                  <div className="mt20 d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block form-check-input"
                      type="radio"
                      name="payment-way"
                      value="LinePay"
                      checked={selectedPayment === 'LinePay'}
                      onChange={handlePaymentChange}
                      required
                    />
                    <span className="delivery-title">LinePay</span>
                  </div>
                </section>
                <hr className="desktop-hr" />
                {/* 發票資訊 */}
                <section className="receipt-block">
                  {/* 發票資訊-標題 */}
                  <div className="home-delivery">
                    <span className="delivery-title cartInfo-title">
                      發票資訊
                    </span>
                  </div>
                  {/* !待新增效果-點擊後才出現下面的欄位 */}
                  {/* 捐贈發票 */}
                  <div className="mt20 d-flex align-items-center">
                    <input
                      className="mr10 checkbox-block form-check-input"
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
                      className="mr10 checkbox-block form-check-input"
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
                            value={carrierNum}
                            onChange={(e) => setCarrierNum(e.target.value)}
                            required={selectedBill === 'phone'}
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
                      className="mr10 checkbox-block form-check-input"
                      type="radio"
                      name="bill-way"
                      value="paper"
                      checked={selectedBill === 'paper'}
                      onChange={handleBillChange}
                    />
                    <span className="delivery-title">紙本發票</span>
                  </div>
                </section>
                {/* 訂單金額 */}
                <section className="bill-block">
                  <div className="row row-cols-lg-4 justify-content-lg-end">
                    <div className="col">
                      <div className="d-flex flex-column">
                        <div className="price-block d-flex justify-content-between w-100">
                          <div className="price-font set-middle">商品合計</div>
                          <div className="price-font set-middle">
                            NT${checkedPrice}
                          </div>
                        </div>
                        {discount && discount.ID !== 0 ? (
                          <div className="price-block d-flex justify-content-between w-100">
                            <div className="price-font set-middle">優惠券</div>
                            <div className="price-font set-middle d-flex flex-column">
                              <div className="discount-icon">
                                {discount.checked && discount.Name ? (
                                  discount.Name
                                ) : (
                                  <div>無</div>
                                )}
                              </div>
                              <div>-NT${discountPrice}</div>
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                        <hr />
                        <div className="price-block d-flex justify-content-between w-100">
                          <div className="price-font set-middle">訂單總計</div>
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
                <Link href="/cart" className="btn check-btn">
                  回購物車
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  id="check-btn"
                  className="btn check-btn"
                  onClick={handleSubmit}
                  disabled={isSubmittingRef.current}
                >
                  {isSubmittingRef.current ? '提交中...' : '確認付款'}
                </button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}
