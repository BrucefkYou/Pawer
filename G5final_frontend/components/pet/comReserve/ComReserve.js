import React, { useState, useEffect } from 'react';
import PageTitle from '@/components/member/page-title/page-title';
import MemberNav from '@/components/memberNav';
import { usePagination } from '@/hooks/usePagination';
import { PageNav } from '@/components/PageNav';
import { useAuth } from '@/hooks/use-auth';
import ComReserveList from './ComReserveList';
import Link from 'next/link';
import Message from '../message';
export default function ComReserve(props) {
  const { auth } = useAuth();
  const id = auth.memberData.id;
  // 篩選應該為登入者的ID
  const processData = (fetchedData) => {
    return fetchedData.filter((item) => {
      return item.PetCommID == id;
    });
  };
  const {
    chooseFilter,
    newdata,
    nowPageItems,
    needFilter,
    nowPage,
    totalPage,
    oldData,
    next,
    prev,
  } = usePagination({
    url: 'http://localhost:3005/api/pet/comreserve',
    needFilter: [
      { id: 1, label: '預約中', filterRule: '1', filterName: 'Status' },
      { id: 2, label: '歷史', filterRule: '0', filterName: 'Status' },
    ],
    needSort: [{ way: 'asc-Time', name: '' }],
    processData,
  });
  // 提示頁面狀態
  const [message, setMessage] = useState('');
  if (message == 'ok') {
    return (
      <Message
        status="ok"
        title="取消預約完成"
        content=""
        button="返回"
        url="/member/communicator/comReserve"
      />
    );
  } else if (message == 'warn') {
    return (
      <Message
        status="warn"
        title=""
        content=""
        button="返回"
        url="/member/communicator/comReserve"
      />
    );
  } else if (message == 'no') {
    return (
      <Message
        status="no"
        title="失敗"
        content=""
        button="返回"
        url="/member/communicator/comReserve"
      />
    );
  }
  return (
    <>
      <div className="PT-reserve-card p-4 shadow">
        <div className="d-flex justify-content-between">
            {/* 標題 */}
            <PageTitle title={'師資 ｜ 預約清單'} subTitle={'Reserve'} />
            {/* 頁籤 */}
            <MemberNav
              newdata={newdata}
              chooseFilter={chooseFilter}
              needFilter={needFilter}
            />
        </div>
      </div>
      <div className="PT-reserve-card p-4 shadow mt-3">
        {/* 清單明細 */}
        {nowPageItems.length < 1 ? (
          <>
            <div className="">無會員預約紀錄</div>
          </>
        ) : (
          <>
            <div className="row none title text-center py-2">
              <div className="col-1 d-none d-lg-block">序號</div>
              <div className="col-3 col-md-2">暱稱</div>
              <div className="col-2 d-none d-lg-block">寵物名稱</div>
              <div className="col d-none d-lg-block">狀態</div>
              <div className="col">預約日期</div>
              <div className="col">預約時段</div>
              <div className="col-1" />
            </div>
            <ComReserveList
              nowPageItems={nowPageItems}
              oldData={oldData}
              setMessage={setMessage}
            />
            <div className="d-flex justify-content-center">
              <PageNav
                nowPage={nowPage}
                totalPage={totalPage}
                next={next}
                prev={prev}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
