import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import MemberNav from '@/components/memberNav';
import { usePagination } from '@/hooks/usePagination';
import { PageNav } from '@/components/PageNav';
import { useAuth } from '@/hooks/use-auth';
import JoinListCard from '@/components/join/list/item/join-list-card';
import JoinCCBtn from '@/components/join/join-circle-btn/join-c-c-btn';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

Index.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Index(props) {
  const { auth } = useAuth();
  const uid = auth.memberData.id;

  // const [url, setUrl] = useState(
  //   `http://localhost:3005/api/join-in/status?memberId=${id}`
  // );
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
    url: `http://localhost:3005/api/join-in/status?memberId=${uid}`,
    //!這裡更改需要的排序狀態
    needSort: [],
    //!這裡更改需要的按鈕數量及篩選欄位與值
    needFilter: [
      {
        id: 1,
        label: '已發佈',
        filterRule: '1',
        filterName: 'Status',
      },
      { id: 2, label: '草稿', filterRule: '0', filterName: 'Status' },
    ],
  });
  console.log('nowPageItems:', nowPageItems);

  return (
    <>
      <Head>
        <title>會員中心 - 已發起活動</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="ji-member">
        <div className="card-favorite d-flex justify-content-between">
          <PageTitle title={'已發起活動'} subTitle={'Release'} />
          <MemberNav
            newdata={newdata}
            chooseFilter={chooseFilter}
            needFilter={needFilter}
          />
        </div>
        <div className="mb-card d-flex flex-column">
          {nowPageItems.length > 0 ? (
            <>
              {/* d-flex flex-wrap justify-content-evenly */}
              <div className="ji-mb-content d-flex flex-wrap justify-content-evenly gap-4">
                {nowPageItems.map((data) => (
                  <JoinListCard
                    key={uuidv4()}
                    data={data}
                    linkTo={`http://Localhost:3000/join/${data.id}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="m-0">
              沒有活動？
              <Link href="/join/create" className="">
                立即發布
              </Link>
            </p>
          )}
          <JoinCCBtn show />
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
