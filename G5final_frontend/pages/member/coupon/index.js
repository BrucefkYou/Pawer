import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Coupon from '@/components/member/coupon/coupon';
import PageTitle from '@/components/member/page-title/page-title';
import { useAuth } from '@/hooks/use-auth';
import { getCouponsByUser } from '@/services/member';
import MemberLayout from '@/components/layout/member-layout';
//分頁
import Pagination from '@/components/member/pagination';
MyCoupon.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function MyCoupon() {
  const { auth } = useAuth();
  const id = auth.memberData.id;
  const [totalCoupons, setTotalCoupons] = useState([]);
  const [nowCoupons, setNowCoupons] = useState([]);
  const [paginatedCoupons, setPaginatedCoupons] = useState([]);

  // 取得優惠券資料
  const getCouponsData = async () => {
    const res = await getCouponsByUser(id);
    if (res.data.status === 'success') {
      const coupons = res.data.coupons;
      setTotalCoupons(coupons);
    }
  };
  // 每次刷新頁面時，取得優惠券資料
  useEffect(() => {
    if (id) getCouponsData();
  }, [id]);

  console.log(`totalCoupons`, totalCoupons);

  // 定義頁籤資料
  const now = new Date();
  // 未使用優惠券
  const UnusedCoupons = totalCoupons.filter(
    (coupon) => coupon.Used_Date === null && new Date(coupon.EndTime) > now
  );
  // 已使用優惠券
  const usedCoupons = totalCoupons.filter(
    (coupon) => coupon.Used_Date !== null
  );
  // 已過期優惠券
  const expiredCoupons = totalCoupons.filter(
    (coupon) => coupon.Used_Date === null && new Date(coupon.EndTime) < now
  );
  // 設定初始值為未使用優惠券
  useEffect(() => {
    setNowCoupons(UnusedCoupons);
  }, [totalCoupons]);

  console.log(`paginatedCoupons`, paginatedCoupons);

  return (
    <>
      <Head>
        <title>會員中心 - 我的優惠券</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-content d-flex justify-content-between">
        <PageTitle title={'我的優惠券'} subTitle={'Coupon'} />
        <ul
          class="nav nav-tabs member-nav-tabs justify-content-center"
          id="myTab"
          role="tablist"
        >
          <li class="nav-item m-auto" role="presentation">
            <button
              class="nav-link m-1 active"
              data-bs-toggle="tab"
              onClick={() => {
                setNowCoupons(UnusedCoupons);
                setPaginatedCoupons([]); // 清空分頁資料
              }}
            >
              未使用<span class="tab-count">{UnusedCoupons.length}</span>
            </button>
          </li>
          <li class="nav-item m-auto" role="presentation">
            <button
              class="nav-link m-1 "
              data-bs-toggle="tab"
              onClick={() => {
                setNowCoupons(usedCoupons);
                setPaginatedCoupons([]); // 清空分頁資料
              }}
            >
              已使用<span class="tab-count">{usedCoupons.length}</span>
            </button>
          </li>
          <li class="nav-item m-auto" role="presentation">
            <button
              class="nav-link m-1 "
              data-bs-toggle="tab"
              onClick={() => {
                setNowCoupons(expiredCoupons);
                setPaginatedCoupons([]); // 清空分頁資料
              }}
            >
              已過期<span class="tab-count">{expiredCoupons.length}</span>
            </button>
          </li>
        </ul>
      </div>

      {nowCoupons.length > 0 ? (
        <>
          <div className="d-flex flex-wrap gap-4 pt-4 justify-content-evenly">
            {paginatedCoupons.map((coupon) => (
              <Coupon key={coupon.ID} coupon={coupon} />
            ))}
          </div>
          <div className="mt-2 w-100">
            <Pagination
              filterData={nowCoupons}
              onPageChange={setPaginatedCoupons}
            />
          </div>
        </>
      ) : (
        <div className="mb-card text-primary">目前無優惠券。</div>
      )}
    </>
  );
}
