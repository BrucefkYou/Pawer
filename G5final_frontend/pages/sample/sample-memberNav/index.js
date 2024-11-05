import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
import Search from '@/components/searchBar/searchbar';
//!------------------------- 以下為會員頁頁籤使用範例------------------------
import MemberNav from '@/components/memberNav';
import { usePagination } from '@/hooks/usePagination';
import { PageNav } from '@/components/PageNav';
export default function Index(props) {
  const {
    nowPageItems,
    nowPage,
    totalPage,
    next,
    prev,
    //!解構三個必要參數chooseFilter,needFilter
    newdata,
    chooseFilter,
    needFilter,
  } = usePagination({
    //!這裡更改路由
    url: 'http://localhost:3005/api/pet',
    //!這裡needFilter更改需要的按鈕數量及篩選欄位與值
    needFilter: [
      // { id: 必要不得重複, label: '顯示的按鈕名稱', filterRule: '篩選欄位值', filterName: '篩選欄位' },
      { id: 1, label: '男生', filterRule: 'Male', filterName: 'Sex' },
      { id: 2, label: '女生', filterRule: 'Female', filterName: 'Sex' }
    ]
  });
  return (
    <>
      <div className="container">
        <h1 className='text-danger'>以下為會員頁籤範例</h1>
        {/* 會員頁籤 */}
        <MemberNav
          newdata={newdata}
          chooseFilter={chooseFilter}
          needFilter={needFilter}
        />

        {/* 資料放這裡 */}
        {nowPageItems.map((v) => (
          <ul key={uuidv4()}>
            <li>{v.ID}</li>
            <li>{v.Name}</li>
            <li>{v.CertificateDate}</li>
          </ul>
        ))}
        {/* 頁碼 */}
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
