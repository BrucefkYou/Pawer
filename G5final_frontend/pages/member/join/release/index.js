import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import MemberNav from '@/components/memberNav';
import { usePagination } from '@/hooks/usePagination';
Index.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Index(props) {
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
      { id: 1, label: '已發佈', filterRule: '報名', filterName: 'newStatus' },
      { id: 2, label: '草稿', filterRule: '報名', filterName: 'newStatus' },
    ],
  });
  return (
    <>
      <article className="col-md-9">
        <div className="mb-content d-flex justify-content-between">
          <PageTitle title={'我的活動'} subTitle={'Join'} />
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
