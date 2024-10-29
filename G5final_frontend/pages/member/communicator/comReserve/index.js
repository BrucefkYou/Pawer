import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/admin-layout';
Index.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default function Index(props) {
  return (
    <>
      <div className="PT-reserve-card">
        <div className="container p-4">
          {/* 標題/篩選按鈕 */}
          {/* !#功能 篩選 */}
          <div className="row d-flex justify-content-center align-items-center">
            {/* 標題 */}
            <div className="col-12 col-sm-3">
              <h4>
                預約查詢 <span style={{ color: '#f4b13e' }}>Reserve</span>
              </h4>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={64}
                  height={2}
                  viewBox="0 0 64 2"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 2H0V0H10V2Z"
                    fill="#F4B13E"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M64 2H14V0H64V2Z"
                    fill="#22355C"
                  />
                </svg>
              </p>
            </div>
            {/* 按鈕 */}
            <div className="col-12 col-sm-9 navbutton">
              <div className="btn-bg">
                <button type="button" className="btnn">
                  進行中
                  <span className="count">10</span>
                </button>
                <button type="button" className="btnn">
                  歷史
                  <span className="count">10</span>
                </button>
              </div>
            </div>
          </div>
          {/* 清單標題 */}
          <div className="row none title text-center py-2">
            <div className="col-1">序號</div>
            <div className="col-2">會員暱稱</div>
            <div className="col-2 d-none d-lg-block">寵物名稱</div>
            <div className="col d-none d-lg-block">狀態</div>
            <div className="col">預約日期</div>
            <div className="col">預約時段</div>
            <div className="col-1" />
          </div>
          {/* !map */}
          {/* 清單明細(已預約) */}
          {/* !#功能 下拉onclick */}
          <div className="row none text-center justify-content-center align-items-center my-3 pb-3 border-bottom">
            <div className="col-1">1</div>
            <div className="col-2">王大陸</div>
            <div className="col-2 d-none d-lg-block">小白</div>
            <div className="col d-none d-lg-block">
              {/* ! */}
              <span className="PT-sp-1">已預約 </span>
            </div>
            <div className="col">2024/10/20</div>
            <div className="col">19:00-20:00</div>
            {/* ! */}
            <div className="col-1">
              <svg
                className="d-inline"
                xmlns="http://www.w3.org/2000/svg"
                width={19}
                height={3}
                viewBox="0 0 19 3"
                fill="none"
              >
                <path
                  d="M1.33337 1.12012L17.3334 1.12012"
                  stroke="#22355C"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="PT-sp-none"
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.55963 7.15987C3.12117 6.71792 3.95574 6.78957 4.42369 7.31992L13.3334 17.4176L22.2431 7.31992C22.711 6.78957 23.5456 6.71792 24.1071 7.15987C24.6687 7.60183 24.7445 8.39003 24.2766 8.92037L14.3501 20.1703C14.0987 20.4553 13.7262 20.6201 13.3334 20.6201C12.9406 20.6201 12.5681 20.4553 12.3166 20.1703L2.39017 8.92037C1.92222 8.39003 1.99809 7.60183 2.55963 7.15987Z"
                  fill="#22355C"
                />
              </svg>
            </div>
          </div>
          {/* !＃判斷 已結束反灰PT-sp-3 */}
          {/* 清單下拉卡片(已預約) */}
          <div className="row detail-card d-flex">
            {/* 頭像 */}
            {/* !＃判斷 若取得資料為結束且於手機版?PT-sp-none-rwd */}
            <div className="col-4 col-md-3 d-flex justify-content-center align-items-center ps-0">
              <div className="imgg d-flex py-2">
                <img src="./images/pic/teacher.png" alt="1" />
              </div>
            </div>
            {/* 內容 */}
            <div className="col-6 col-md-9 py-2 px-0 d-flex main-1">
              <div className="col d-flex flex-column justify-content-center align-items-start">
                <h5 className="text text-1 m-1">王大陸</h5>
                {/* ! */}
                <p className="m-1 text-2">遠距溝通</p>
                {/* ! */}
                <p className="text text-3 m-1">寵物溝通預約｜小白｜貓</p>
                {/* ! */}
                <p className="text text-4 m-1">2024/10/20 19:30~20:30</p>
              </div>
              {/* 按鈕 */}
              {/* !功能 取消/1v1 */}
              <div className="col d-flex btnn-group-position align-items-center">
                {/* !＃判斷 ?PT-sp-block:PT-sp-none */}
                <div className="btnn-group me-3">
                  <button className="btnn btnn-1 m-0 PT-sp-block">
                    取消預約
                  </button>
                  <button className="btnn btnn-2 m-0 PT-sp-block">
                    聯繫毛孩爸媽
                  </button>
                  <button className="btnn btnn-3 m-0 PT-sp-none">
                    聯繫毛孩爸媽
                  </button>
                </div>
              </div>
            </div>
            {/* 手機版狀態 */}
            {/* !＃判斷 若狀態為進行中?PT-sp-1 : PT-sp-2*/}
            <div className="PT-sp-1 col-2 status d-block d-md-none py-2 px-0 text-end">
              已預約
              {/* !PT-sp-4 */}
              <p className="d-none">遠距溝通</p>
            </div>
          </div>
          {/* 清單明細(已結束) */}
          <div className="row none text-center justify-content-center align-items-center my-3 pb-3 border-bottom">
            <div className="col-1">1</div>
            <div className="col-2">王大陸</div>
            <div className="col-2 d-none d-lg-block">小白</div>
            <div className="col d-none d-lg-block">
              <span className="PT-sp-2">已結束</span>
            </div>
            <div className="col">2024/10/20</div>
            <div className="col">19:00-20:00</div>
            <div className="col-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.55963 7.15987C3.12117 6.71792 3.95574 6.78957 4.42369 7.31992L13.3334 17.4176L22.2431 7.31992C22.711 6.78957 23.5456 6.71792 24.1071 7.15987C24.6687 7.60183 24.7445 8.39003 24.2766 8.92037L14.3501 20.1703C14.0987 20.4553 13.7262 20.6201 13.3334 20.6201C12.9406 20.6201 12.5681 20.4553 12.3166 20.1703L2.39017 8.92037C1.92222 8.39003 1.99809 7.60183 2.55963 7.15987Z"
                  fill="#22355C"
                />
              </svg>
            </div>
          </div>
          {/* demo2(已結束) */}
          <div className="row detail-card d-flex mt-3 PT-sp-3">
            {/* 頭像 */}
            <div className="col-4 col-md-3 d-flex justify-content-center align-items-center PT-sp-none-rwd">
              <div className="imgg d-flex py-2">
                <img src="./images/pic/teacher.png" alt="1" />
              </div>
            </div>
            {/* 內容 */}
            <div className="col-6 col-md-9 py-2 px-0 d-flex main-1">
              <div className="col d-flex flex-column justify-content-center align-items-start">
                <h5 className="text text-1 mb-2">王大陸</h5>
                <p className="m-1 text-2 PT-sp-none-rwd">遠距溝通</p>
                <p className="text text-3 m-1 PT-sp-none-rwd">
                  寵物溝通預約｜小白｜貓
                </p>
                <p className="text text-4 m-1">2024/10/20 19:30~20:30</p>
              </div>
              <div className="col d-flex btnn-group-position align-items-center">
                {/* 按鈕 */}
                <div className="btnn-group me-3">
                  <button className="btnn btnn-1 m-0 PT-sp-none">
                    取消預約
                  </button>
                  <button className="btnn btnn-2 m-0 PT-sp-none">
                    聯繫毛孩爸媽
                  </button>
                  <button className="btnn btnn-3 m-0 PT-sp-block">
                    聯繫毛孩爸媽
                  </button>
                </div>
              </div>
            </div>
            {/* 手機版狀態 */}
            <div className="col status d-block d-md-none py-2 px-0 text-end">
              <p>已結束</p>
              <p className="PT-sp-4">遠距溝通</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
