import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { PageNav } from '@/components/PageNav';
import { usePagination } from '@/hooks/usePagination';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import JoinListCard from '@/components/join/list/item/join-list-card';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

import MemberNav from '@/components/memberNav';

Index.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Index() {
  // const [url, setUrl] = useState(
  //   'http://localhost:3005/api/join-in/member/favorite'
  // );

  // setUrl 第一層在父層 帶下去商品卡片頁第二層子層
  const { auth } = useAuth();
  const uid = auth.memberData.id;

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
    url: `http://localhost:3005/api/join-in/member/favorite?memberId=${uid}`,
    needFilter: [{ id: 1, label: '已收藏' }],
  });
  return (
    <>
      <Head>
        <title>會員中心 - 收藏活動</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="ji-member">
        <div className="card-favorite d-flex justify-content-between rounded-2">
          <PageTitle title={'已收藏活動'} subTitle={'Favorite'} />
          <MemberNav
            newdata={newdata}
            chooseFilter={chooseFilter}
            needFilter={needFilter}
          />
        </div>

        <div className=" mb-card d-flex flex-wrap gap-4 my-3">
          {nowPageItems.length > 0 ? (
            <>
              <div className=" d-flex flex-wrap justify-content-evenly gap-4">
                {nowPageItems.map((data) => (
                  <JoinListCard key={data.id} data={data} />
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="m-0">
                沒有收藏活動？
                <Link href="/join" className="">
                  去逛逛
                </Link>
              </p>
            </>
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
    </>
  );
}
