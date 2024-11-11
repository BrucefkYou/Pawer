import React, { useState, useEffect } from 'react';
import { PageNav } from '@/components/PageNav';
import { usePagination } from '@/hooks/usePagination';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import JoinListCard from '@/components/join/list/item/join-list-card';
import Link from 'next/link';

import MemberNav from '@/components/memberNav';

Index.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Index() {
  const [url, setUrl] = useState(
    'http://localhost:3005/api/join-in/member/favorite'
  );
  
  // setUrl 第一層在父層 帶下去商品卡片頁第二層子層

  const {
    newdata,
    needFilter,
    nowPageItems,
    nowPage,
    totalPage,
    next,
    prev,
    chooseFilter,
  } = usePagination({
    url: url,
    needFilter: [{ id: 1, label: '已收藏' }],
  });
  return (
    <div className="productList">
      <div className="card-favorite d-flex justify-content-between">
        <PageTitle title={'收藏活動'} subTitle={'Favorite'} />
        <MemberNav
          newdata={newdata}
          chooseFilter={chooseFilter}
          needFilter={needFilter}
        />
      </div>

      <div className="mb-card d-flex flex-wrap gap-4">
        {' '}
        {nowPageItems.length === 0 ? (
          <>
            <p className="mt-2">您沒有收藏的商品</p>
            <Link href="/product" className="pet-choose-status no-underline">
              去逛逛
            </Link>
          </>
        ) : (
          <div className="d-flex flex-wrap gap-5">
            {nowPageItems.map((data) => (
              <JoinListCard key={data.id} data={data} setUrl={setUrl} />
            ))}
          </div>
        )}
        {/* 頁碼 */}
        <div className=" mt-2 w-100">
          {nowPageItems.length === 0 ? (
            <div></div>
          ) : (
            <PageNav
              nowPage={nowPage}
              totalPage={totalPage}
              next={next}
              prev={prev}
            />
          )}
        </div>
      </div>
    </div>
  );
}
