import React, { useState, useEffect } from 'react';
import { BsDashLg, BsChevronDown } from 'react-icons/bs';
import Image from 'next/image';
import ComListButton from './ComListButton';
export default function ComReserveList({ nowPageItems, setMessage }) {
  const [iconStates, setIconStates] = useState({});
  const handleClick = (index) => {
    setIconStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 切換圖示狀態
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
      {nowPageItems.map((v, i) => (
        <React.Fragment key={v.ID || i}>
          <div className="row none text-center justify-content-center align-items-center my-3 pb-3 border-bottom">
            <div className="col-1 d-none d-lg-block">{i + 1}</div>
            <div className="col-3 col-3 col-md-2">{v.ReserveName}</div>
            <div className="col-2 d-none d-lg-block">{v.PetName}</div>
            <div className="col d-none d-lg-block">
              <span className={`${v.Status == 1 ? 'PT-sp-1' : 'PT-sp-2'}`}>
                {v.Status == 1 ? '預約中' : '已結束'}
              </span>
            </div>
            <div className="col">{v.Time.split(' ')[0]}</div>
            <div className="col">{v.Time.split(' ')[1]}</div>
            {/* 下拉按鈕 */}
            <div className="col-1 PT-myicon d-flex justify-content-center">
              <button
                onClick={() => handleClick(i)}
                style={{
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                }}
              >
                {iconStates[i] ? <BsDashLg /> : <BsChevronDown />}
              </button>
            </div>
          </div>
          {/* 下拉卡片(已預約) */}
          {iconStates[i] == true || windowWidth < 430 ? (
            <div
              className={`row detail-card d-flex my-3 ${
                v.Status == 0 ? 'PT-sp-3' : ''
              } ${iconStates[i] ? 'active' : ''}`}
            >
              {/* 頭像 */}
              <div
                className={`col-4 col-md-3 d-flex justify-content-center align-items-center ps-0 PT-sp-none-rwd`}
              >
                <div className="imgg d-flex py-2">
                  {v.Avatar && v.Avatar != '' ? (
                    <Image
                      src={`http://localhost:3005/member/${v.Avatar}`}
                      alt="1"
                      width={100}
                      height={100}
                      style={{
                        borderRadius: '5px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Image
                      src={`http://localhost:3005/pet/avatar-default.png`}
                      alt="1"
                      width={100}
                      height={100}
                      style={{
                        borderRadius: '5px',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </div>
              </div>
              {/* 內容 */}
              <div className="col-8 col-md-9 py-2 px-0 d-flex main-1">
                <div className="col d-flex flex-column justify-content-center align-items-start p-3">
                  <h5 className="text text-1 m-1">{v.ReserveName}</h5>
                  <p className="m-1 text-2 PT-sp-none-rwd">{v.Approach}</p>
                  <p className="text text-3 m-1 PT-sp-none-rwd">
                    寵物溝通預約｜{v.PetType}｜{v.PetName}
                  </p>
                  <p className="text text-4 m-1">
                    {v.Time.split(' ')[0]} {v.Time.split(' ')[1]}
                  </p>
                </div>
                {/* 按鈕 */}
                <ComListButton v={v} setMessage={setMessage} />
              </div>
              {/* 手機版狀態 */}
              <div className="col status d-block d-md-none p-3 m-2 px-0 text-end">
                <p>{v.Status == 0 ? '已結束' : ''}</p>
                <p className="PT-sp-4">{v.Approach}</p>
              </div>
            </div>
          ) : (
            ''
          )}
        </React.Fragment>
      ))}
    </>
  );
}
