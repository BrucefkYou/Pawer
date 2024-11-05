/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import Banner from '@/components/join/banner/banner';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Image from 'next/image';
import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';
import PetList from '@/components/pet/pet-list';
import SearchBar from '@/components/searchBar/searchbar';

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
    updateSearch,
  } = usePagination({
    url: 'http://localhost:3005/api/pet',
    needFilter: [],
    needSearchbar:['ID','Name'],
    needSort: [
      { way: 'asc-ID', name: 'ID由小到大' },
      { way: 'desc-ID', name: 'ID由大到小' },
      { way: 'asc-Name', name: '名稱中文開頭' },
      { way: 'desc-Name', name: '名稱英文開頭' },
      { way: 'asc-Sex', name: '性別女' },
      { way: 'desc-Sex', name: '性別男' },
      { way: 'asc-CertificateDate', name: '取證日期-遠' },
      { way: 'desc-CertificateDate', name: '取證日期-近' },
    ],
    needFilter:[]
  });
  return (
    <>
      <div className="PT-list">
        {/* banner */}
        <Banner bgImgUrl="/pet/images/Banner.jpg" ImgCover="cover" />
        {/* 主要內容 */}
        <div className="container py-2">
          {/* 麵包屑 */}
          <Breadcrumbs />
          {/* 搜尋框 */}
          <div className="row d-flex py-2 justify-content-center">
            <div className="col-8">
              
            </div>
          </div>
          {/* 排序.每頁筆數 */}
          <div className="row d-flex justify-content-end">
            <div className='col-6'><SearchBar updateSearch={updateSearch} /></div>
            <div className="col-6 col-md-3">
              <PerPageDom
                itemsperPage={itemsperPage}
                choosePerpage={choosePerpage}
              />
            </div>
            <div className="col-6 col-md-3">
              <SortDom
                sortWay={sortWay}
                chooseSort={chooseSort}
                needSort={needSort}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            {/* 師資列表*/}
            {nowPageItems.map((v) => {
              return <PetList key={v.ID} v={v} />;
            })}
          </div>
          {/* 分頁 */}
          <div className="d-flex justify-content-center">
            <PageNav
              nowPage={nowPage}
              totalPage={totalPage}
              next={next}
              prev={prev}
            />
          </div>
        </div>
        {/* 廣告 */}
        <div className="pet-advertise-yen py-5 px-5">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-4">
                <div className="advertise-Image">
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/1.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/2.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/3.png"
                    alt="1"
                  />
                  <Image
                    className="Image-none"
                    width="100"
                    height="100"
                    src="/pet/images/4.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/5.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/6.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/7.png"
                    alt="1"
                  />
                  <Image
                    className="Image-none"
                    width="100"
                    height="100"
                    src="/pet/images/8.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/9.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/10.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/11.png"
                    alt="1"
                  />
                  <Image
                    className="Image-none"
                    width="100"
                    height="100"
                    src="/pet/images/12.png"
                    alt="1"
                  />
                </div>
              </div>
              <div className="col-lg-8 mt-3">
                <div className="">
                  <h3 className="text-white my-2">Become a Pet Communicator</h3>
                  <p className="text-white">
                    寵物溝通師擁有神奇的魔力，只要透過一張照片，就能解讀寵物內心真實的想法，讓飼主得到解答。甚至已離世的寵物，也能夠接收到牠們生前想對飼主說的話寵物內心世界有夠難猜！
                    <br />
                    <br />
                    家裡的兔子為什麼突然不喜歡吃飼料了？貓貓總是到處亂尿尿、狗狗狂吠一整晚害我睡不好….毛小孩到底在想什麼？成為寵物溝通師,幫助毛小孩的爸媽們了解牠們的內心吧！
                  </p>
                  <button className="pet-btnApply-yen">
                    申請成為寵物溝通師{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={14}
                      viewBox="0 0 23 14"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.726258 0.539754C1.2878 0.0978 2.12237 0.169455 2.59032 0.6998L11.5 10.7974L20.4097 0.6998C20.8776 0.169455 21.7122 0.0978 22.2737 0.539754C22.8353 0.981708 22.9112 1.76991 22.4432 2.30026L12.5168 13.5502C12.2653 13.8352 11.8928 14 11.5 14C11.1072 14 10.7347 13.8352 10.4832 13.5502L0.556798 2.30026C0.0888472 1.76991 0.164717 0.981708 0.726258 0.539754Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
