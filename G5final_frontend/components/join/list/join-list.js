import React, { useState, useEffect } from 'react';
// import joins from '@/data/Joins.json';
import JoinListCard from './item/join-list-card';
import Banner from '@/components/join/banner/banner';
import SearchBar from '@/components/sidebar/search/search-bar';
import LatestCard from '@/components/sidebar/latest-post/latest-post';
import StatusCard from '@/components/sidebar/status/status';
import JiCreateCta from '@/components/join/ji-create-cta/ji-create-cta';
import SelectDate from '@/components/sidebar/select-date/select-date';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';

// page
import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';
import { useRouter } from 'next/router';
// 唯一key值使用
import { v4 as uuidv4 } from 'uuid';

export default function JoinList() {
  const router = useRouter();
  const { keyword } = router.query;
  // ----------------------------------------
  const {
    nowPageItems,
    nowPage,
    totalPage,
    itemsperPage,
    sortWay,
    needSort,
    oldData,
    nowPageFirstItems,
    nowPageLastItems,
    next,
    prev,
    choosePerpage,
    chooseSort,
    updateData,
  } = usePagination({
    url: `http://localhost:3005/api/join-in?keyword=${keyword || ''}`,
    needFilter: [],
    needSort: [
      // { way: 'asc-ID', name: ' 最舊上架' },
      { way: 'desc-ID', name: ' 最新上架' },
      // { way: 'asc-S`http://localhost:3005/api/join-in?keyword=${keyword || ''}`,Price', name: '價格 低 > 高' },
      // { way: 'desc-SalePrice', name: '價格 高 > 低' },
    ],
  });
  // console.log(nowPageItems);
  // -----------------------------------------

  // 宣告加入資料的狀態
  const [joinin, setJoinin] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/join-in');
        if (!response.ok) {
          throw new Error('網路回應不成功：' + response.status);
        }
        const data = await response.json();
        // console.log(data);
        setJoinin(data);
      } catch (err) {
        console.error('錯誤：', err);
      }
    };
    fetchData();
  }, []);

  const handleToggleFav = (id) => {
    const nextJoin = joinin.map((v) => {
      // 根據 id 切換 fav 布林值

      if (v.id === id) {
        return { ...v, fav: false };
      } else {
        return v;
      }
    });

    setJoinin(nextJoin);
  };

  // 排除重複的資料
  // const newJoinin = joinin.filter(
  //   (v, i, t) => i === t.findIndex((p) => p.ID === v.ID)
  // );
  // console.log(joinin);
  // console.log(newJoinin);

  return (
    <>
      <Banner bgImgUrl="/join/banner-jism.jpg" ImgCover="cover" />
      <div className="container ji-list-container px-3">
        <Breadcrumbs />
        <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
          <div className={`d-md-flex gap-3`}>
            <aside className="col-md-4 px-md-0 ji-aside">
              <div className="mb-4">
                <SearchBar />
              </div>
              <div className="mb-4">
                <JiCreateCta />
              </div>
              <div className="mb-4">
                <SelectDate oldData={oldData} updateData={updateData} />
              </div>
              <div className=" mb-4 d-none d-md-block">
                <StatusCard oldData={oldData} updateData={updateData } />
              </div>
              <div className="mb-4 d-none d-md-block">
                <LatestCard />
              </div>
            </aside>
            <div className="col-md-8 flex-shrink-1">
              <div className="row choose-page">
                <div className="join-sort d-flex align-items-center justify-content-lg-end justify-content-md-center text-body-tertiary mb-4">
                  <span className="d-none d-md-block">
                    顯示第{nowPageFirstItems + 1}-{nowPageLastItems}筆 / 共{totalPage}筆
                  </span>
                  <div className="col-3 text-body-tertiary d-none d-md-block mx-3">
                    <PerPageDom
                      itemsperPage={itemsperPage}
                      choosePerpage={choosePerpage}
                    />
                  </div>
                  <div className="col-3 text-body-tertiary">
                    <SortDom
                      sortWay={sortWay}
                      chooseSort={chooseSort}
                      needSort={needSort}
                    />
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-lg-end justify-content-md-center gap-4">
                  {nowPageItems.map((data) => {
                    return (
                      <JoinListCard
                        key={uuidv4()}
                        iconfillcolor="#FFD700"
                        data={data}
                        handleToggleFav={handleToggleFav}
                      />
                    );
                  })}
                </div>
                <div className="d-flex justify-content-center my-5">
                  <PageNav
                    nowPage={nowPage}
                    totalPage={totalPage}
                    next={next}
                    prev={prev}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
