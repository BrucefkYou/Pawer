import React, { useState, useEffect } from 'react';
//!------------------------- 以下為會員頁頁籤使用範例------------------------
import MemberNav from '@/components/memberNav';
import { usePagination } from '@/hooks/usePagination';
import { PageNav } from '@/components/PageNav';
export default function Index(props) {
  const [url, setUrl] = useState('http://localhost:3005/api/pet');
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
    needFilter: [],
  });
  console.log(filterData);
  // 測試url值
  function changeUrl() {
    const url = 'http://localhost:3005/api/product';
    setUrl(url);
  }
  // gpt大神做的搜尋
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const find = filterData.filter((item) => {
      return (
        item.Name.replace(/\s+/g, '').toLowerCase() ===
        inputValue.replace(/\s+/g, '').toLowerCase()
      );
    });
    const a = [];
    setFilterData(a);
    console.log(inputValue); // 在這裡你可以處理搜尋邏輯
  };
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
              <li>{v.Name}</li>
            </>
          );
        })}
        <PageNav
          nowPage={nowPage}
          totalPage={totalPage}
          next={next}
          prev={prev}
        />
      </div>
      {/* 搜尋框測試 */}
      <button onClick={changeUrl}>change</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="搜尋..."
        />
        <button type="submit">搜尋</button>
      </form>
    </>
  );
}
