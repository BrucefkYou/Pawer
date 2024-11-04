import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import JoinCard from '@/components/join/card/join-card/join-card';
import SearchBar from '@/components/sidebar/search/search-bar';
import LatestCard from '@/components/sidebar/latest-post/latest-post';
import StatusCard from '@/components/sidebar/status/status';
import JiCreateCta from '@/components/join/ji-create-cta/ji-create-cta';
import SelectDate from '@/components/sidebar/select-date/select-date';
import Pagination from '@/components/pagination/pagination';
import Banner from '@/components/join/banner/banner';
import { PageNav } from '@/components/PageNav';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';

export default function Join() {
  return (
    <>
      {/* <Banner bgImgUrl="/join/banner-jism.jpg" ImgCover="cover" />
      <div className="container ji-list-container px-3">
        <Breadcrumbs />
        <div className={`d-md-flex gap-3`}>
          <aside className="col-md-4 px-md-0 ji-aside">
            <div className="mb-4">
              <SearchBar />
            </div>
            <div className="mb-4">
              <JiCreateCta />
            </div>
            <div className="mb-4">
              <SelectDate />
            </div>
            <div className=" mb-4 d-none d-md-block">
              <StatusCard />
            </div>
            <div className="mb-4 d-none d-md-block">
              <LatestCard />
            </div>
          </aside>
          <div className="col-md-8 flex-shrink-1">
            <div className="join-sort d-flex align-items-center justify-content-lg-end justify-content-md-center text-body-tertiary">
              <span className="d-none d-md-block">顯示第1-12筆 / 共60筆</span>
              {/* <select
                defaultValue="0"
                className="text-body-tertiary form-select d-none d-md-block mx-3"
                aria-label="Default select example"
              >
                <option value="0">每頁幾筆</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select> */}
      {/* <select
                defaultValue="0"
                className="form-select text-body-tertiary"
                aria-label="Default select example"
              >
                <option value="0">排序</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select> */}
      {/* </div> */}
      {/* <div className="d-flex flex-wrap justify-content-lg-end justify-content-md-center gap-4"> */}{' '}
      {/* */}
      <JoinCard className="" />
      {/* </div>
            <div className="d-flex justify-content-center my-5">
              <Pagination />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
