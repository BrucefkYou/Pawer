import React, { useState, useEffect } from 'react';

//!------------------------- 以下為分頁.排序.每頁幾筆使用範例------------------------

import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';

export default function communicator(props) {
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
    //!這裡改自己的路由
    url: 'http://localhost:3005/api/pet',
    needFilter:[],
    needSort: [
      //!這裡客製化要的選單項目,way: asc-ID(升序-欄位名稱),name:(下拉選單要顯示的名稱)
      { way: 'desc-Name', name: 'ID由小到大' },
      { way: 'desc-ID', name: 'ID由大到小' },
      { way: 'asc-Name', name: '名稱中文開頭' },
      { way: 'desc-Name', name: '名稱英文開頭' },
      { way: 'asc-Sex', name: '性別女' },
      { way: 'desc-Sex', name: '性別男' },
      { way: 'asc-CertificateDate', name: '取證日期-遠' },
      { way: 'desc-CertificateDate', name: '取證日期-近' },
    ],
  });
  return (
    <>
      
      <div className="container">
        <h1 className='text-danger'>以下為頁碼+排序+每頁幾筆範例</h1>
        {/* //!每頁筆數選擇框,依照頁面需求擺放位置 */}
        <PerPageDom itemsperPage={itemsperPage} choosePerpage={choosePerpage} />
        {/* //!排序選擇框,依照頁面需求擺放位置 */}
        <SortDom
          sortWay={sortWay}
          chooseSort={chooseSort}
          needSort={needSort}
        />
        {/* //!要撈資料的地方v.ID 即代表ID欄位,也可將{nowPageItems}變數帶入元件在內部map */}
        {nowPageItems.map((v) => {
          return (
            <>
              <li>{v.ID} </li>
              <li>{v.Name} </li>
            </>
          );
        })}
        {/* //!分頁nav,依照頁面需求擺放位置 */}
        <PageNav
          nowPage={nowPage}
          totalPage={totalPage}
          next={next}
          prev={prev}
        />
      </div>
    </>
  );
}
