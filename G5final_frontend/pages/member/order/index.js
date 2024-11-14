import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import { getOrdersByUser } from '@/services/member';
import { useAuth } from '@/hooks/use-auth';
Order.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Order() {
  const { auth } = useAuth();
  const id = auth.memberData.id;
  const [orders, setOrders] = useState([]);

  const getOrdersData = async () => {
    const res = await getOrdersByUser(id);
    if (res.data.status === 'success') {
      const orders = res.data.orders;
      setOrders(orders);
    }
  };
  // 每次刷新頁面時，取得訂單資料
  useEffect(() => {
    if (id) getOrdersData();
  }, [id]);

  return (
    <>
      <Head>
        <title>會員中心 - 訂單查詢</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-content d-flex justify-content-between">
        <PageTitle title={'訂單查詢'} subTitle={'Order'} />
      </div>
      {orders.length > 0 ? (
        orders.map((order) => {
          return (
            <div className="mb-card" key={order.ID}>
              <div className="row">
                <div className="col-lg-2 col-4">
                  <span className="title">訂單編號</span>
                </div>
                <div className="col-lg-10 col-8">
                  <span className="title">{order.OrderNumber}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2 col-4">
                  <span>訂單日期</span>
                </div>
                <div className="col-lg-10 col-8">
                  <span>{order['Date']}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2 col-4">
                  <span>訂單金額</span>
                </div>
                <div className="col-lg-10 col-8">
                  <span>${order.TotalPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2 col-4">
                  <span>付款狀態</span>
                </div>
                <div className="col-lg-10 col-8 d-flex justify-content-between align-items-start">
                  <span
                    className={`badge ${
                      order.PaymentStatus === '已付款'
                        ? 'text-bg-success text-white'
                        : 'text-bg-warning text-white'
                    }`}
                  >
                    {order.PaymentStatus}
                  </span>
                  <Link href={`order/detail/${order['ID']}`}>
                    <button type="button" className="btn btn-primary">
                      訂單詳情
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-end"></div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="mb-card text-primary">目前未有訂單。</div>
      )}
    </>
  );
}
