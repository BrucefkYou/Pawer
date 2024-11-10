import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import MemberNav from '@/components/memberNav';
import { usePagination } from '@/hooks/usePagination';
import BlogCard from '@/components/blog/blog-card/blog-card';

import { PageNav } from '@/components/PageNav';
OrderDetail.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function OrderDetail() {
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
    url: 'http://localhost:3005/api/blog/status',
    needSort: [{ way: 'desc-UpdateDate', name: '最新發佈' }],
    //!這裡更改需要的按鈕數量及篩選欄位與值
    needFilter: [
      { id: 1, label: '已發布', filterRule: '1', filterName: 'Status' },
      { id: 2, label: '草稿', filterRule: '0', filterName: 'Status' },
    ],
  });
  return (
    <>
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
              <p>沒有符合關鍵字的搜尋結果</p>
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
