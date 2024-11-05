import MemberLayout from '@/components/layout/member-layout';
import React, { useState, useEffect } from 'react';
//!------------------------- 以下為會員頁頁籤使用範例------------------------
import MemberNav from '@/components/memberNav';
import { usePagination } from '@/hooks/usePagination';
import { PageNav } from '@/components/PageNav';

OrderDetail.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function OrderDetail() {
  const [url, setUrl] = useState('http://localhost:3005/api/join-in');
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
    url: url,
    //!這裡更改需要的排序狀態
    needSort: [],
    //!這裡更改需要的按鈕數量及篩選欄位與值
    needFilter: [
      { id: 1, label: '已報名', filterRule: '報名', filterName: 'newStatus' },
    ],
  });
  return (
    <>
      <article className="col-md-9">
        <div className="mb-content d-flex justify-content-between">
          <h5 className="title">
            已報名活動 <span className="text-warning">Join in</span>
            <div className="underline">
              <div className="underline-part1"></div>
              <div className="underline-part2"></div>
            </div>
          </h5>
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
            {/* <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                已報名
                <span className="tab-count">10</span>
              </button>
            </li> */}
          </ul>
        </div>
        <div className="mb-card d-flex flex-wrap gap-4"></div>
      </article>
    </>
  );
}
