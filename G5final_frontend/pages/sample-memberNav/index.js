import React, { useState, useEffect } from 'react';
//!------------------------- 以下為會員頁頁籤使用範例------------------------
import MemberNav from '@/components/memberNav';
import { usePagination } from '@/hooks/usePagination';
import { PageNav } from '@/components/PageNav';
export default function Index(props) {
    const {
        chooseFilter,
        newdata,
        nowPageItems,
        needFilter,
        nowPage,
        totalPage,
        next,
        prev
    } = usePagination({
        //!這裡更改路由
        url: 'http://localhost:3005/api/pet',
        //!這裡更改需要的排序狀態
        needSort: [],
        //!這裡更改需要的按鈕數量及篩選欄位與值
        needFilter: [
        { id: 1, label: '男的', filterRule: 'Male', filterName: 'Sex' },
        { id: 2, label: '女的', filterRule: 'Female', filterName: 'Sex'},
      ]
  });
  return (
    <>
          <div className="container">
              {/* 會員頁籤 */}
              <MemberNav
                  newdata={newdata}
                  chooseFilter={chooseFilter}
                  needFilter={needFilter}
              />
              {/* 資料放這裡 */}
        {nowPageItems.map((v) => {
            return (
                <>
                    <li key={v.ID}>{v.ID}</li>
                    <li>{v.Sex}</li>
                </>
          )
        })}
              <PageNav nowPage={nowPage} totalPage={totalPage} next={next} prev={prev} />
      </div>
    </>
  );
}
