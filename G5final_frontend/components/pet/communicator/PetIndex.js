import React, { useState, useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';
import PetList from './PetList';
import SearchBar from '@/components/searchBar/searchbar';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
export default function PetIndex(props) {
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
    updateSearch,
  } = usePagination({
    url: 'http://localhost:3005/api/pet/list',
    needSearchbar: ['ID', 'Name', 'CertificateDate'],
    needSort: [
      { way: 'desc-Name', name: '名稱英文開頭' },
      { way: 'asc-Name', name: '名稱中文開頭' },
      { way: 'asc-Sex', name: '性別女' },
      { way: 'desc-Sex', name: '性別男' },
      { way: 'asc-CertificateDate', name: '取證日期-遠' },
      { way: 'desc-CertificateDate', name: '取證日期-近' },
    ],
  });
  return (
    <>
      <div className="container py-2">
        {/* 麵包屑 */}
        <Breadcrumbs />
        <div className="row d-flex justify-content-end">
          {/* 搜尋框 */}
          <div className="col-12 col-md-6 mb-3">
            <SearchBar updateSearch={updateSearch} />
          </div>
          {/* 每頁筆數 */}
          <div className="col-6 col-md-3">
            <PerPageDom
              itemsperPage={itemsperPage}
              choosePerpage={choosePerpage}
            />
          </div>
          {/* 排序 */}
          <div className="col-6 col-md-3">
            <SortDom
              sortWay={sortWay}
              chooseSort={chooseSort}
              needSort={needSort}
            />
          </div>
        </div>
        {/* 師資列表*/}
        <div className="row d-flex justify-content-center bgheight">
          <PetList nowPageItems={nowPageItems} />
        </div>
        {/* 分頁 */}
          <div className="d-flex justify-content-center my-5">
            <PageNav
              nowPage={nowPage}
              totalPage={totalPage}
              next={next}
              prev={prev}
            />
          </div>
      </div>
    </>
  );
}
