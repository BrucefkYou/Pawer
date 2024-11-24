import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { usePagination } from '@/hooks/usePagination';
import Link from 'next/link';
import Head from 'next/head';

import { PageNav } from '@/components/PageNav';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import MemberNav from '@/components/memberNav';
import BlogDraftCard from '@/components/blog/blog-card/blog-draft-card';
import MemCreateBtn from '@/components/blog/blog-btn/create-btn/mem-create-btn';

import { BsPencilFill } from 'react-icons/bs';

OrderDetail.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function OrderDetail() {
  const { auth } = useAuth();
  const uid = auth.memberData.id;
  // console.log(uid);

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
    url: `http://localhost:3005/api/blog/mem-blog?memberId=${uid}`,
    needSort: [{ way: 'desc-UpdateDate', name: '最新發佈' }],
    needFilter: [
      { id: 1, label: '已發布', filterRule: '1', filterName: 'Status' },
      { id: 2, label: '草稿', filterRule: '0', filterName: 'Status' },
    ],
  });
  return (
    <>
      <Head>
        <title>會員中心 - 我的部落格</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div
          className="bl-mem-content d-flex justify-content-between "
        >
          <PageTitle title={'我的部落格'} subTitle={'Blog'} />

          <MemberNav
            newdata={newdata}
            chooseFilter={chooseFilter}
            needFilter={needFilter}
          />
        </div>
        <div className="mb-card d-flex flex-column pt-5 px-4">
          <div className="card-section d-flex flex-wrap gap-3 justify-content-evenly ">
            {nowPageItems && nowPageItems.length > 0 ? (
              nowPageItems.map((blog) => {
                return (
                  <BlogDraftCard
                    key={blog.ID}
                    id={blog.ID}
                    title={blog.Title}
                    blogImg={blog.blogImg}
                    createDate={blog.CreateDate}
                    likeCount={blog.likeCount}
                    favoriteCount={blog.favoriteCount}
                    avatar={blog.MemberAvatar}
                    name={blog.Nickname}
                    status={blog.Status}
                  />
                );
              })
            ) : (
              <p className="m-0">
                開始建立文章！
                <Link href={'http://localhost:3000/blog/create'}>立即發布</Link>
              </p>
            )}
          </div>
          <MemCreateBtn
            url="http://localhost:3000/blog/create"
            className="ms-auto"
          >
            <BsPencilFill />
          </MemCreateBtn>

          <div className="pt-5 justify-content-center ">
            {nowPageItems && nowPageItems.length > 0 && (
              <div>
                <PageNav
                  nowPage={nowPage}
                  totalPage={totalPage}
                  next={next}
                  prev={prev}
                />
              </div>
            )}
          </div>
        </div>
    </>
  );
}
