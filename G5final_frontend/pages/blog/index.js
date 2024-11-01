import React from 'react';

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

export default function BlogList(props) {
  const tags = ['1', '2'];

  return (
    <div className="bl-list">
      <Banner bgImgUrl="/blog/blog-banner.svg" />
      <div className="list-container container">
        <Breadcrumbs className="breadcrumb" />
        <div className="main-section">
          <div className="sidebar">
            <div className="btn-sec">
              <button className="btn btn-primary my-blog m-none">
                我的部落格
              </button>
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
            <div className="card-section">
              <BlogCard />
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
