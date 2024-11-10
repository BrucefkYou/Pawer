import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth';
import { usePagination } from '@/hooks/usePagination';
import PageTitle from '@/components/member/page-title/page-title';
import MemberNav from '@/components/memberNav';
import { PageNav } from '@/components/PageNav';
import MemReserveList from './MemReserveList';
import Link from 'next/link';
export default function MemReserve(props) {
    const { auth } = useAuth()
    const id = auth.memberData.id
    // 定義資料處理函數
    const processData = (fetchedData) => {
        return fetchedData.filter((item) => {
            return item.MemberID == id
        });
    };
    const {
        chooseFilter,
        newdata,
        nowPageItems,
        needFilter,
        nowPage,
        totalPage,
        next,
        prev,
    } = usePagination({
        url: 'http://localhost:3005/api/pet/memreserve',
        needFilter: [
            { id: 1, label: '預約中', filterRule: '1', filterName: 'Status' },
            { id: 2, label: '歷史', filterRule: '0', filterName: 'Status' },
        ],
        needSort: [{ way: 'desc-ID', name: '' }],
        processData
    });

    return (
        <>
            <div className="d-flex justify-content-between">
                {/* 標題 */}
                <PageTitle title={'預約清單'} subTitle={'Reserve'} />
                {/* 頁籤 */}
                <MemberNav
                    newdata={newdata}
                    chooseFilter={chooseFilter}
                    needFilter={needFilter}
                />
            </div>
            {/* 清單明細 */}
            {nowPageItems.length < 1 ?
                (<Link href={'/communicator'} className='btn btn-danger mt-3'>＜ 目前無紀錄 ＞</Link>) :
                <>
                    <div className="row none title text-center mt-3 py-2">
                        <div className="col-1">序號</div>
                        <div className="col-2">溝通師</div>
                        <div className="col-2 d-none d-lg-block">寵物名稱</div>
                        <div className="col d-none d-lg-block">狀態</div>
                        <div className="col">預約日期</div>
                        <div className="col">預約時段</div>
                        <div className="col-1" />
                    </div>
                    <MemReserveList nowPageItems={nowPageItems} />
                    <PageNav nowPage={nowPage} totalPage={totalPage} next={next} prev={prev} />
                </>
            }
        </>
    )
}
