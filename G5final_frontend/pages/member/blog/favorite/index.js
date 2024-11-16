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
  const [url, setUrl] = useState(
    'http://localhost:3005/api/blog/mem-favorite?memberId=${uid}'
  );

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
    url: url,
    needSort: [{ way: 'desc-UpdateDate', name: '最新發佈' }],
    needFilter: [{ id: 1, label: '已收藏' }],
  });

  // 取消收藏後從收藏頁上消失
  useEffect(() => {
    if (newdata) {
      // 利用時間戳產生新的url>>避免快取結果導致無法更新頁面
      setUrl(
        `http://localhost:3005/api/blog/mem-favorite?memberId=${uid}&timestamp=${new Date().getTime()}`
      );
    }
  }, [newdata]);

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
        <div className="mb-card d-flex flex-column justify-content-center pt-5 px-4">
          <div className="card-section d-flex flex-wrap justify-content-center gap-3  ">
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
              <div className="d-flex w-100 align-items-center">
                <Link
                  href={'http://localhost:3000/blog/'}
                  style={{ textDecoration: 'none' }}
                >
                  去收藏喜歡的文章吧!
                </Link>
              </div>
            )}
          </div>
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
      </article>
    </>
  );
}
