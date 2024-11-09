import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import { getOrder } from '@/services/member';
import Image from 'next/image';
OrderDetail.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function OrderDetail() {
  const router = useRouter();
  const { auth } = useAuth();
  const memberId = auth.memberData.id;
  const orderId = router.query.orderid;
  const [order, setOrder] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  const getOrderData = async () => {
    const res = await getOrder(memberId, orderId);
    if (res.data.status === 'success') {
      const dborder = res.data.order;
      setOrder(dborder);
      setOrderProducts(dborder.OrderDetail);
    }
  };
  // 每次刷新頁面時，取得訂單資料
  useEffect(() => {
    if (router.isReady && memberId && orderId) getOrderData();
  }, [router.isReady, memberId, orderId]);

  return (
    <>
      <div className="mb-content d-flex justify-content-between">
        <PageTitle title={'訂單查詢'} subTitle={'Order'} />
      </div>
      <div className="mb-card">
        <div className="row">
          <div className="col-md-2 col-4">
            <span className="title">訂單編號</span>
          </div>
          <div className="col-md-10 col-8 col-8">
            <span className="title">{order['OrderNumber']}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-4">
            <span>訂單日期</span>
          </div>
          <div className="col-md-10 col-8">
            <span>{order['Date']}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-4">
            <span>付款方式</span>
          </div>
          <div className="col-md-10 col-8">
            <span>{order['PaymentMethod']}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-4">
            <span>訂單金額</span>
          </div>
          <div className="col-md-10 col-8">
            <span>${Number(order.TotalPrice).toLocaleString()}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-4">
            <span>付款狀態</span>
          </div>
          <div className="col-md-10 col-8 d-flex justify-content-between align-items-start">
            <span className={`badge ${
                    order.PaymentStatus === '已付款'
                      ? 'text-bg-success text-white'
                      : 'text-bg-warning text-white'
                  }`}>
              {order['PaymentStatus']}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end"></div>
        </div>
      </div>
      <div className="mb-card">
        <div className="row">
          <div className="col-md-2 col-4">
            <span className="title">配送資訊</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-4">
            <span>配送方式</span>
          </div>
          <div className="col-md-10 col-8">
            <span>{order['PaymentMethod']}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-4">
            <span>收貨人</span>
          </div>
          <div className="col-md-10 col-8">
            <span>{order['Receiver']}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-4">
            <span>聯繫電話</span>
          </div>
          <div className="col-md-10 col-8">
            <span>{order['ReceiverPhone']}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-4">
            <span>物流狀態</span>
          </div>
          <div className="col-md-10 col-8">
            <span>{order['DeliveryStatus']}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-4">
            <span>寄送地址</span>
          </div>
          <div className="col-md-10 col-8">
            <span>{order['DeliveryAddress']}</span>
          </div>
        </div>
      </div>
      <div className="mb-card">
        <div className="row">
          <div className="col-md-2 col-4">
            <span className="title">商品資訊</span>
          </div>
        </div>
        <div className="mb-order-product">
          <div className="row header">
            <div className="cell">商品</div>
            <div className="cell">單價</div>
            <div className="cell">數量</div>
            <div className="cell">總價</div>
          </div>
          {orderProducts.map((product) => {
            const price = Number(product.ProductOriginPrice)
            const amount = product.ProductAmount
            
            return (
              
              <div className="row" key={product.ID}>
                <div className="cell justify-content-start">
                <Image 
                  width={100}
                  height={100}
                  src={`/product/sqlimg/${product.ProductImg}`}
                  alt='productimg'
                  className='me-1'
                />
                  {product.ProductName}
                </div>
                <div className="cell">${price.toLocaleString() }</div>
                <div className="cell">{amount}</div>
                <div className="cell text-warning">${price*amount.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-end mt-3">
          <div className="col-md-4 col-12">
            <div className="d-flex justify-content-between mt-3">
              <span>優惠券</span>
              <span>2024九月寵物保健優惠</span>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <span>商品合計</span>
              <span>$1593</span>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <span>優惠券折抵</span>
              <span>-$160</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-3">
              <h5 className="title">訂單總計</h5>
              <span className="title">$1,433</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
