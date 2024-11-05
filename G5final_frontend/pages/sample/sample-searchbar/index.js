import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
import Search from '@/components/searchBar/searchbar';
//!------------------------- 以下為搜尋頁使用範例------------------------
import { usePagination } from '@/hooks/usePagination';
import { PageNav } from '@/components/PageNav';
export default function Index(props) {
    const {
        nowPageItems,
        nowPage,
        totalPage,
        next,
        prev,
        //!新增參數
        updateSearch
    } = usePagination({
        //!這裡更改路由
        url: 'http://localhost:3005/api/pet',
        //!這裡更改搜尋的欄位執行模糊搜尋
        needSearchbar: ['Name', 'ID', 'CertificateDate'],
        needFilter:[]
    });
    return (
        <>
            <div className="container">
                <h1 className='text-danger'>以下為搜尋框範例</h1>
                {/* 元件放這,新增參數updateSearch */}
                <Search updateSearch={updateSearch} />
                {/* 資料放這裡 */}
                {nowPageItems.map((v) => (
                    <ul key={uuidv4()}>
                        <li>{v.ID}</li>
                        <li>{v.Name}</li>
                        <li>{v.CertificateDate}</li>
                    </ul>
                ))}

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
