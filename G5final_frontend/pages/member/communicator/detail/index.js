import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Components
import LatestCard from '@/components/sidebar/latest-post/latest-post';
import TagCard from '@/components/sidebar/tags/tags';
import SearchBar from '@/components/sidebar/search/search-bar';
import POPCard from '@/components/blog/pop-post/pop-post';
import Pagination from '@/components/pagination/pagination';
import BlogCard from '@/components/blog/blog-card/blog-card';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Banner from '@/components/join/banner/banner';
import CreateBtn from '@/components/blog/create-btn/create-btn';

export default function BlogList() {
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { keyword } = router.query;
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const url = keyword
          ? `http://localhost:3005/api/blog/qs?keyword=${keyword}`
          : `http://localhost:3005/api/blog`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('成功讀取資料', data);

        if (data.status === 'success') {
          setResults(data.data.blogs);
        } else {
          console.error('搜尋失敗:', data.error);
        }
      } catch (error) {
        console.error('無法獲取數據:', error);
      }
    };

    fetchResults();
  }, [keyword]);
  return (
    <div className="bl-list">
      <Banner bgImgUrl="/blog/blog-banner.svg" />
      <div className="list-container container">
        <Breadcrumbs className="breadcrumb" />
        <div className="main-section">
          <div className="sidebar">
            <div className="btn-sec">
              <Link
                href={`http://localhost:3000/member/blog/index`}
                className="btn btn-primary my-blog m-none"
                type="button"
              >
                我的部落格
              </Link>
              <CreateBtn btnName={'建立文章'} />
            </div>
            <div className="s-card">
              <SearchBar setResults={setResults} />
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
            <div className="card-section">
              {results && results.length > 0 ? (
                results.map((blog) => (
                  <BlogCard
                    key={blog.ID}
                    id={blog.ID}
                    title={blog.Title}
                    blogImg={blog.blogImg}
                    updateDate={blog.UpdateDate}
                    likeCount={blog.likeCount}
                    favoriteCount={blog.favoriteCount}
                  />
                ))
              ) : (
                <p>沒有符合關鍵字的搜尋結果</p>
              )}
            </div>

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
