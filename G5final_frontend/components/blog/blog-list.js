import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Components
import LatestCard from '@/components/sidebar/latest-post/latest-post';
import TagCard from '@/components/sidebar/tags/tags';
import SearchBar from '@/components/sidebar/search/search-bar';
import POPCard from '@/components/blog/pop-post/pop-post';
import BlogCard from '@/components/blog/blog-card/blog-card';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import CreateBtn from '@/components/blog/create-btn/create-btn';

import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';

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
      { way: 'dsc-likeCount', name: '熱門文章' },
      { way: 'desc-favoriteCount', name: '最多收藏' },
      { way: 'asc-UpdateDate', name: '最新發佈' },
    ],
  });

  // 將router中的tag解構出來 去重新查找匹配的資料 無則為空
  useEffect(() => {
    setSelectedTag(tag || '');
  }, [tag]);

  return (
    <div className="list-container container">
      <Breadcrumbs className="breadcrumb" />

      <div className="main-section">
        <div className="sidebar">
          <div className="btn-sec">
            <Link
              href={`http://localhost:3000/member/blog`}
              className="btn btn-primary my-blog m-none"
              type="button"
            >
              我的部落格
            </Link>
            <CreateBtn btnName={'建立文章'} />
          </div>
          <div className="s-card">
            <SearchBar />
          </div>
          <div className="m-none">
            <TagCard />
          </div>

          <div className="m-none">
            <LatestCard />
          </div>
          <div className="m-none">
            <POPCard />
          </div>
        </div>
        <div className="blog-list">
          <div className="col-12 d-flex justify-content-end gap-3">
            <div className="col-md-3">
              <PerPageDom
                itemsperPage={itemsperPage}
                choosePerpage={choosePerpage}
              />
            </div>
            <div className="col-12 col-md-3">
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
          <div className="d-flex justify-content-center">
            <PageNav
              nowPage={nowPage}
              totalPage={totalPage}
              next={next}
              prev={prev}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
