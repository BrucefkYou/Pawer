import React, { useState, useEffect } from 'react';
import { PageNav } from '@/components/PageNav';
import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';

export default function Ttttt(props) {
  const {
    nowPageItems,
    newdata,
    nowPage,
    totalPage,
    prev,
    next,
    itemsperPage,
    choosePerpage,
    setFilterData,
  } = usePagination({
    url: 'http://localhost:3005/api/join-in/',
    needSort: [],
    needFilter: [],
  });
  const a = newdata.filter((item) => {
    return item.newStatus === '報名中';
  });
  // setFilterData(a);
  // console.log(a.length);
  // console.log(a);
  // console.log(newdata);
  const StatusFilter = (status) => {
    setFilterData(a);
    // useEffect(() => {
    //   setFilterData(a);
    // }, []);
  };

  return (
    <>
      <PageNav
        nowPage={nowPage}
        totalPage={totalPage}
        prev={prev}
        next={next}
      />
      <PerPageDom itemsperPage={itemsperPage} choosePerpage={choosePerpage} />
      {nowPageItems.map((item) => {
        return (
          <div key={item.ID}>
            <div>{item.ID}</div>
            <div>{item.Title}</div>
            <div>{item.StartTime}</div>
            <div>{item.EndTime}</div>
            <div>{item.City}</div>
            <div>{item.Township}</div>
            <div>{item.Location}</div>
            <div>{item.newStatus}</div>
          </div>
        );
      })}
      <button onClick={StatusFilter}>報名中</button>
    </>
  );
}
