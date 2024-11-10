import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import { usePagination } from '@/hooks/usePagination';
import MemberNav from '@/components/memberNav';
import { PageNav } from '@/components/PageNav';
import { BsDashLg, BsChevronDown } from 'react-icons/bs';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth'; 
MemReserve.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
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
  const [iconStates, setIconStates] = useState({});

  const handleClick = (index) => {
    setIconStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index] // 切換圖示狀態
    }));
  };


  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    // 定義監聽函數
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // 更新狀態為當前視窗寬度
    };
    // 添加監聽器
    window.addEventListener('resize', handleResize);
    // 清除監聽器，防止記憶體洩漏
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <div className="PT-reserve-card p-4 shadow">
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
        {/* 清單標題 */}
        <div className="row none title text-center mt-3 py-2">
          <div className="col-1">序號</div>
          <div className="col-2">溝通師</div>
          <div className="col-2 d-none d-lg-block">寵物名稱</div>
          <div className="col d-none d-lg-block">狀態</div>
          <div className="col">預約日期</div>
          <div className="col">預約時段</div>
          <div className="col-1" />
        </div>
        {/* !map */}
        {/* 清單明細(已預約) */}
        {/* !#功能 下拉onclick */}
        {nowPageItems.map((v, i) => (
          <React.Fragment key={v.ID || i}>
            <div className="row none text-center justify-content-center align-items-center my-3 pb-3 border-bottom">
              <div className="col-1">{i + 1}</div>
              <div className="col-2">{v.Name}</div>
              <div className="col-2 d-none d-lg-block">{v.PetName}</div>
              <div className="col d-none d-lg-block">
                <span className={`${v.Status == 1 ? 'PT-sp-1' : 'PT-sp-2'}`}>{v.Status == 1 ? '預約中' : '已結束'}</span>
              </div>
              <div className="col">{v.Time.split(' ')[0]}</div>
              <div className="col">{v.Time.split(' ')[1]}</div>
              {/* 下拉按鈕 */}
              <div className="col-1 PT-myicon">
                <div
                  onClick={() => handleClick(i)}
                  style={{ cursor: 'pointer' }}
                >
                  {iconStates[i] ? <BsDashLg /> : <BsChevronDown />}
                </div>
              </div>
            </div>
            {/* 下拉卡片(已預約) */}
            {iconStates[i] == true || windowWidth < 430 ?
              <div className={`row detail-card d-flex ${v.Status == 0 ? 'PT-sp-3' : ''} ${iconStates[i] ? 'active' : ''
                }`}>
                {/* 頭像 */}
                <div className={`col-4 col-md-3 d-flex justify-content-center align-items-center ps-0 PT-sp-none-rwd`}>
                  <div className="imgg d-flex py-2">
                    <Image src={`http://localhost:3005/pet/${v.Img}`} alt="1" width={100} height={100} style={{
                      borderRadius: '5px',
                      objectFit: 'cover'
                    }} />
                  </div>
                </div>
                {/* 內容 */}
                <div className="col-6 col-md-9 py-2 px-0 d-flex main-1">
                  <div className="col d-flex flex-column justify-content-center align-items-start">
                    <h5 className="text text-1 m-1">{v.Name}</h5>
                    {/* ! */}
                    <p className="m-1 text-2 PT-sp-none-rwd">{v.Approach}</p>
                    {/* ! */}
                    <p className="text text-3 m-1 PT-sp-none-rwd">寵物溝通預約｜{v.PetType}｜{v.PetName}</p>
                    {/* ! */}
                    <p className="text text-4 m-1">2024/10/20 19:30~20:30</p>
                  </div>
                  {/* 按鈕 */}
                  {/* !功能 取消/1v1 */}
                  <div className="col d-flex btnn-group-position align-items-center">
                    {/* !＃判斷 ?PT-sp-block:PT-sp-none */}
                    <div className="btnn-group me-3">
                      <button className={`btnn btnn-1 m-0 ${v.Status == 1 ? 'PT-sp-block' : 'PT-sp-none'}`}>
                        取消預約
                      </button>
                      <button className={`btnn btnn-2 m-0 ${v.Status == 1 ? 'PT-sp-block' : 'PT-sp-none'}`}>
                        聯繫毛孩爸媽
                      </button>
                      <button className={`btnn btnn-3 m-0 ${v.Status == 1 ? 'PT-sp-none' : 'PT-sp-block'} PT-sp-none-rwd`}>
                        聯繫毛孩爸媽
                      </button>
                    </div>
                  </div>
                </div>
                {/* 手機版狀態 */}
                <div className="col status d-block d-md-none py-2 px-0 text-end">
                  <p>{v.Status == 0 ? '已結束' : ''}</p>
                  <p className="PT-sp-4">{v.Approach}</p>
                </div>
              </div> : ''}
          </React.Fragment>
        ))}
        <PageNav nowPage={nowPage} totalPage={totalPage} next={next} prev={prev} />
      </div>
    </>
  );
}
