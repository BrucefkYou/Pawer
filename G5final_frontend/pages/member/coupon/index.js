import React, { useEffect, useState } from 'react';
import Coupon from '@/components/member/coupon/coupon';
import PageTitle from '@/components/member/page-title/page-title';
import { useAuth } from '@/hooks/use-auth';
import { getCouponsByUser } from '@/services/member';
import MemberLayout from '@/components/layout/member-layout';
MyCoupon.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function MyCoupon() {
  const { auth } = useAuth();
  const id = auth.memberData.id;
  const [coupons, setCoupons] = useState([]);

  const getCouponsData = async () => {
    const res = await getCouponsByUser(id);
    if (res.data.status === 'success') {
      const coupons = res.data.coupons;
      setCoupons(coupons);
    }
  };
  // 每次刷新頁面時，取得優惠券資料
  useEffect(() => {
    if (id) getCouponsData();
  }, [id]);

  return (
    <>
      <div className="mb-content d-flex justify-content-between">
        <PageTitle title={'我的優惠券'} subTitle={'Coupon'} />
      </div>

      {coupons ? (
        <div className="d-flex flex-wrap gap-4 pt-4 justify-content-evenly">
          {coupons.map((coupon) => (
            <Coupon key={coupon.ID} coupon={coupon} />
          ))}
        </div>
      ) : (
        <div className="mb-card text-primary">目前未獲得優惠券。</div>
      )}
    </>
  );
}
