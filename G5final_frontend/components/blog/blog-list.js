import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SortedCard from '@/components/sidebar/sorted-card/sorted-card';
import TagCard from '@/components/sidebar/tags/tags';
import SearchBar from '@/components/sidebar/search/search-bar';
import BlogCard from '@/components/blog/blog-card/blog-card';
import CreateBtn from '@/components/blog/blog-btn/create-btn/create-btn';
import BlogBtn from './blog-btn/myBlog-btn';

import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';

import { BsHeartFill } from 'react-icons/bs';

export default function BlogList() {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState('');
  const { keyword, tag } = router.query;

  const url = `http://localhost:3005/api/blog?keyword=${keyword || ''}&tag=${
    selectedTag || ''
  }`;

  const {
    nowPageItems,
    nowPage,
    totalPage,
    itemsperPage,
    sortWay,
    needSort,
    next,
    prev,
    choosePerpage,
    chooseSort,
  } = usePagination({
    url,
    needFilter: [],
    needSort: [
      { way: 'desc-likeCount', name: '熱門文章' },
      { way: 'desc-favoriteCount', name: '最多收藏' },
      { way: 'desc-CreateDate', name: '最新發佈' },
    ],
  });

  useEffect(() => {
    setSelectedTag(tag || '');
  }, [tag]);
  // console.log('頁面結果:', nowPageItems);
  return (
    <div className="list-container container">
      <Breadcrumbs className="breadcrumb" />

      <div className="main-section">
        <div className="sidebar">
          <div className="btn-sec">
            <BlogBtn />
            <CreateBtn />
          </div>
          <div className="s-card">
            <SearchBar />
          </div>
          <div className="m-none">
            <TagCard />
          </div>

          <div className="m-none">
            <SortedCard
              title="熱門文章"
              id="ID"
              api="http://localhost:3005/api/blog"
              link="http://localhost:3000/blog"
              img="blogImg"
              content="Title"
              date="CreateDate"
              count="likeCount"
              IconComponent={BsHeartFill}
              sorted="count"
              limit={5}
            />
          </div>
          <div className="m-none">
            <SortedCard
              title="最新發佈"
              id="ID"
              api="http://localhost:3005/api/blog"
              link="http://localhost:3000/blog"
              img="blogImg"
              content="Title"
              date="CreateDate"
              count="likeCount"
              IconComponent={BsHeartFill}
              sorted="date"
              limit={5}
            />
          </div>
        </div>
        <div className="blog-list">
          <div className="col-12 d-flex justify-content-end gap-3 bl-sort">
            <div className="col-12 col-lg-3">
              <PerPageDom
                itemsperPage={itemsperPage}
                choosePerpage={choosePerpage}
              />
            </div>
            <div className="col-12 col-lg-3">
              <SortDom
                sortWay={sortWay}
                chooseSort={chooseSort}
                needSort={needSort}
              />
            </div>
          </div>

          <div className="card-section">
            {nowPageItems && nowPageItems.length > 0 ? (
              nowPageItems
                .filter(
                  (blog) =>
                    selectedTag === '' ||
                    (blog.tags && blog.tags.includes(selectedTag))
                )
                .map((blog) => {
                  return (
                    <BlogCard
                      key={blog.ID}
                      id={blog.ID}
                      title={blog.Title}
                      blogImg={blog.blogImg}
                      createDate={blog.CreateDate}
                      likeCount={blog.likeCount}
                      favoriteCount={blog.favoriteCount}
                      avatar={blog.MemberAvatar || 'avatar-default.png'}
                      name={blog.Nickname}
                    />
                  );
                })
            ) : (
              <p>沒有符合關鍵字的搜尋結果</p>
            )}
          </div>
          <div className="d-flex justify-content-center">
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
      </div>
    </div>
  );
}
