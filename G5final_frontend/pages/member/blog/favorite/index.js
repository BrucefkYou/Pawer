import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import MemberNav from '@/components/memberNav';
import { usePagination } from '@/hooks/usePagination';
import { useAuth } from '@/hooks/use-auth';
import BlogCard from '@/components/blog/blog-card/blog-card';

import { PageNav } from '@/components/PageNav';
OrderDetail.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function OrderDetail() {
  const { auth } = useAuth();
  const uid = auth.memberData.id;
  // console.log(uid);
  const [data, setNewData] = useState(false);

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
    url: `http://localhost:3005/api/blog/mem-favorite?memberId=${uid}`,
    needSort: [{ way: 'desc-UpdateDate', name: '最新發佈' }],
    needFilter: [{ id: 1, label: '已收藏' }],
  });

  return (
    <>
      <Head>
        <title>會員中心 - 收藏部落格</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="col-md-10">
        <div className="mb-content d-flex justify-content-between">
          <PageTitle title={'我的部落格'} subTitle={'Blog'} />
          <ul
            className="nav nav-tabs member-nav-tabs"
            id="myTab"
            role="tablist"
          >
            <MemberNav
              newdata={newdata}
              chooseFilter={chooseFilter}
              needFilter={needFilter}
            />
          </ul>
        </div>
        <div className="mb-card d-flex flex-column justify-content-center align-items-center gap-4 p-0">
          <div className="card-section d-flex flex-wrap justify-content-center gap-3 ">
            {nowPageItems && nowPageItems.length > 0 ? (
              nowPageItems.map((blog) => {
                return (
                  <BlogCard
                    key={blog.ID}
                    id={blog.ID}
                    title={blog.Title}
                    blogImg={blog.blogImg}
                    updateDate={blog.UpdateDate}
                    likeCount={blog.likeCount}
                    favoriteCount={blog.favoriteCount}
                    avatar={blog.MemberAvatar}
                    name={blog.Nickname}
                  />
                );
              })
            ) : (
              <Link
                href={'http://localhost:3000/blog/'}
                style={{ textDecoration: 'none' }}
              >
                去收藏喜歡的文章
              </Link>
            )}
          </div>
          <div>
            <PageNav
              nowPage={nowPage}
              totalPage={totalPage}
              next={next}
              prev={prev}
            />
          </div>
        </div>
      </article>
    </>
  );
}
