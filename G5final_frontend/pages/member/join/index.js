import MemberLayout from '@/components/layout/member-layout';
import React, { useState, useEffect } from 'react';
import JoinListCard from '@/components/join/list/item/join-list-card';
import Link from 'next/link';
import Head from 'next/head';
import MemberNav from '@/components/memberNav';
import { usePagination } from '@/hooks/usePagination';
import { PageNav } from '@/components/PageNav';
import PageTitle from '@/components/member/page-title/page-title';
import { useAuth } from '@/hooks/use-auth';

OrderDetail.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function OrderDetail() {
  const { auth } = useAuth();
  const uid = auth.memberData.id;
  // const [url, setUrl] = useState('http://localhost:3005/api/join-in');
  const {
    chooseFilter,
    newdata,
    nowPageItems,
    needFilter,
    nowPage,
    totalPage,
    filterData,
    setFilterData,
    next,
    prev,
  } = usePagination({
    //!這裡更改路由
    url: `http://localhost:3005/api/join-in/member/joined?memberId=${uid}`,
    //!這裡更改需要的排序狀態
    needSort: [],
    //!這裡更改需要的按鈕數量及篩選欄位與值
    needFilter: [{ id: 1, label: '已報名' }],
  });
  return (
    <>
      <Head>
        <title>會員中心 - 已報名活動</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="ji-member">
        <div className="card-favorite d-flex justify-content-between rounded-2">
          <PageTitle title={'已報名活動'} subTitle={'Joined'} />
          <MemberNav
            newdata={newdata}
            chooseFilter={chooseFilter}
            needFilter={needFilter}
          />
        </div>

        <div className="  mb-card d-flex flex-column">
          {nowPageItems.length > 0 ? (
            <>
              <div className=" d-flex flex-wrap gap-4">
                {nowPageItems.map((data) => (
                  <JoinListCard key={data.id} data={data} cancelBtn />
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="m-0 me-auto">
                沒有參加的活動？
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
