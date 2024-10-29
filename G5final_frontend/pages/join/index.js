import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import JoinCard from '@/components/join/event-card/join-card';
import JoinCard2 from '@/components/join/event-card/join-card2';
import SearchBar from '@/components/sidebar/search/search-bar';
import LatestCard from '@/components/sidebar/latest-post/latest-post';
import TagCard from '@/components/sidebar/tags/tags';
import JiCreateCta from '@/components/join/ji-create-cta/ji-create-cta';
import Pagination from '@/components/pagination/pagination';
import Banner from '@/components/join/banner/banner';

export default function Join() {
  return (
    <>
      <Banner title="萌寵揪團聚會" bgImgUrl="/joins/banner-jism.jpg" />
      <div className="container ji-list-container px-3">
        {/* <p className="breadcrumb">首頁/活動</p> */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">首頁</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              活動
            </li>
          </ol>
        </nav>

        <div className={`d-md-flex gap-3`}>
          <aside className="col-md-4 px-md-0 ji-aside">
            <div className="mb-4">
              <SearchBar />
            </div>
            <div className="mb-4">
              <JiCreateCta />
            </div>
            <div className="mb-4 d-none d-md-block">
              <LatestCard />
            </div>
            <div className=" mb-4 d-none d-md-block">
              <TagCard />
            </div>
          </aside>
          <div className="col-md-8 flex-shrink-1">
            <div className="join-sort d-flex align-items-center justify-content-lg-end justify-content-md-center">
              <span className="d-none d-md-block">顯示第1-12筆 / 共60筆</span>
              <select
                defaultValue="0"
                className="form-select d-none d-md-block mx-3"
                aria-label="Default select example"
              >
                <option value="0">每頁幾筆</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <select
                defaultValue="0"
                className="form-select"
                aria-label="Default select example"
              >
                <option value="0">排序</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="d-flex flex-wrap justify-content-lg-end justify-content-md-center gap-4">
              <JoinCard2 className="" />
            </div>
            <div className="d-flex justify-content-center my-5">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
