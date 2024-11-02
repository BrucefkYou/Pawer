import React, { useState, useEffect } from 'react'

//!------------------------- 以下為分頁.排序.每頁幾筆使用範例------------------------

import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';

export default function Index(props) {
    const {
        nowPageItems,
        nowPage,
        totalPage,
        itemsperPage,
        sort,
        next,
        prev,
        choosePerpage,
      chooseSort,
//!                 API路由要改自己的
    } = usePagination({ url: 'http://localhost:3005/api/pet這裡改網址', onDataChange: handleDataChange });

    // 當子元件產生變化時重新抓取資料
    function handleDataChange(data) {
    }
  return (
      <>
          {/* 排序.每頁筆數 */}
          <PerPageDom itemsperPage={itemsperPage} choosePerpage={choosePerpage} />
          {/* 排序 */}
          <SortDom sort={sort} chooseSort={chooseSort} />
//!          {/* 要撈資料的地方 */}
          {nowPageItems.map((v) => {
              return (
                  <li>test</li>)
          })}
            {/* 分頁 */ }
            <PageNav nowPage={nowPage} totalPage={totalPage} next={next} prev={prev} />
    </>
  )
}
