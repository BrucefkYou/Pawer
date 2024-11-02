import React, { useState, useEffect } from 'react';
// import joins from '@/data/Joins.json';
import JiCard from './item/ji-card';
import Banner from '@/components/join/banner/banner';
import SearchBar from '@/components/sidebar/search/search-bar';
import LatestCard from '@/components/sidebar/latest-post/latest-post';
import StatusCard from '@/components/sidebar/status/status';
import JiCreateCta from '@/components/join/ji-create-cta/ji-create-cta';
import SelectDate from '@/components/sidebar/select-date/select-date';
// page
import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';
// page
import { v4 as uuidv4 } from 'uuid';

export default function JoinCard() {
  // ----------------------------------------
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
  } = usePagination({
    url: 'http://localhost:3005/api/join-in',
    onDataChange: handleDataChange,
    needSort: [
      { way: 'asc-ID', name: ' 舊 > 新' },
      { way: 'desc-ID', name: ' 新 > 舊' },
      // { way: 'asc-SalePrice', name: '價格 低 > 高' },
      // { way: 'desc-SalePrice', name: '價格 高 > 低' },
    ],
  });
  console.log(nowPageItems);
  // 當子元件產生變化時重新抓取資料
  function handleDataChange(data) {}
  // -----------------------------------------

  // 初始化狀態，將每個加入的項目設置為fav: false
  // const initState = joins.map((v) => {
  //   return { ...v, fav: false };
  // });

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
        <div className={`d-md-flex gap-3`}>
          <aside className="col-md-4 px-md-0 ji-aside">
            <div className="mb-4">
              <SearchBar />
            </div>
            <div className="mb-4">
              <JiCreateCta />
            </div>
            <div className="mb-4">
              <SelectDate />
            </div>
            <div className=" mb-4 d-none d-md-block">
              <StatusCard />
            </div>
            <div className="mb-4 d-none d-md-block">
              <LatestCard />
            </div>
          </aside>
          <div className="col-md-8 flex-shrink-1">
            <div className="row choose-page">
              <div className="join-sort d-flex align-items-center justify-content-lg-end justify-content-md-center text-body-tertiary">
                <span className="d-none d-md-block">顯示第1-12筆 / 共60筆</span>
                <div className="text-body-tertiary d-none d-md-block mx-3">
                  <PerPageDom
                    itemsperPage={itemsperPage}
                    choosePerpage={choosePerpage}
                  />
                </div>
                <div className="text-body-tertiary">
                  <SortDom
                    sortWay={sortWay}
                    chooseSort={chooseSort}
                    needSort={needSort}
                  />
                </div>
              </div>
              {/* <div className="d-flex justify-content-center align-items-center mt-5 mb-5"></div> */}
              <div className="d-flex flex-wrap justify-content-lg-end justify-content-md-center gap-4">
                {nowPageItems.map((data) => {
                  return (
                    <JiCard
                      key={uuidv4()}
                      iconfillcolor="#f4b13e"
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
    </>
  );
}
