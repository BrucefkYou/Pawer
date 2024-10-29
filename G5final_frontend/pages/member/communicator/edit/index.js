import React, { useState, useEffect } from 'react';

export default function Index(props) {
  return (
    <>
      <div className="PT-mydetail-edit">
        <div className="container">
          <div className="row">
            {/* 左側 */}
            <div className="col-3 sidebar" />
            {/* 右側 */}
            <div className="col right-block">
              <div className="PT-mydetail-card">
                <div className="container p-3 m-2">
                  <form action="">
                    {/* 第一張卡 */}
                    <div className="sec1 p-3">
                      {/* 標題 */}
                      <div className="row">
                        <div className="col-12 col-sm-3">
                          <h4>
                            溝通師資料
                            <span style={{ color: '#f4b13e' }}>
                              Communicator
                            </span>
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
                      </div>
                      {/* 主介紹 */}
                      <div className="row content-1">
                        <div className="col-12 col-md-4">
                          <div className="avatar">
                            <svg
                              className="icon"
                              xmlns="http://www.w3.org/2000/svg"
                              width={190}
                              height={190}
                              viewBox="0 0 190 190"
                              fill="none"
                            >
                              <path
                                d="M161.456 161.456C198.162 124.749 198.162 65.2363 161.456 28.5299C124.749 -8.17662 65.2363 -8.17662 28.5299 28.5299C-8.17662 65.2363 -8.17662 124.749 28.5299 161.456C65.2363 198.162 124.749 198.162 161.456 161.456Z"
                                fill="#E9ECEF"
                                stroke="#E9ECEF"
                                strokeWidth={2}
                              />
                              <path
                                d="M95.0007 126.54C114.978 126.54 131.173 105.601 131.173 79.7712C131.173 53.9413 114.978 33.002 95.0007 33.002C75.0236 33.002 58.8289 53.9413 58.8289 79.7712C58.8289 105.601 75.0236 126.54 95.0007 126.54Z"
                                fill="white"
                              />
                              <path
                                d="M95.0008 130.002C64.7451 130.002 38.1081 139.25 22.5422 153.265C39.5871 174.431 65.7072 187.986 95.0008 187.986C124.294 187.986 150.415 174.431 167.459 153.265C151.908 139.25 125.271 130.002 95.0008 130.002Z"
                                fill="white"
                              />
                              <path
                                d="M99.0645 94.9922H90.9657C83.3364 94.9922 77.1517 101.177 77.1517 108.806V140.239C77.1517 147.869 83.3364 154.053 90.9657 154.053H99.0645C106.694 154.053 112.878 147.869 112.878 140.239V108.806C112.878 101.177 106.694 94.9922 99.0645 94.9922Z"
                                fill="white"
                              />
                              <path
                                d="M63.826 81.9395C65.9369 87.9992 65.0897 93.8005 61.9593 94.8918C58.8289 95.9832 54.5785 91.9481 52.4676 85.8884C50.3567 79.8286 51.2039 74.0273 54.3343 72.936C57.4647 71.8447 61.7152 75.8797 63.826 81.9395Z"
                                fill="white"
                              />
                              <path
                                d="M126.19 81.9395C124.079 87.9992 124.926 93.8005 128.057 94.8918C131.187 95.9832 135.437 91.9481 137.548 85.8884C139.659 79.8286 138.812 74.0273 135.681 72.936C132.551 71.8447 128.301 75.8797 126.19 81.9395Z"
                                fill="white"
                              />
                              <path
                                d="M63.3379 81.7397C58.6423 73.1958 53.8031 64.1205 54.0472 54.356C54.2913 44.6058 61.7152 34.31 71.4654 34.6546C73.1598 34.712 74.8686 35.0854 76.5631 34.8556C79.9376 34.3817 82.4361 31.6247 85.1645 29.5856C91.3391 25.0049 99.9261 23.928 107.049 26.8142C111.443 28.6092 115.162 31.7396 119.455 33.7786C127.439 37.5696 137.29 37.1819 144.944 32.7448C143.35 35.7459 140.65 38.144 137.477 39.3789C140.406 40.3123 143.637 40.2261 146.509 39.1348C144.786 42.2652 141.914 44.7637 138.582 46.0418C141.052 46.2141 143.536 46.3864 146.006 46.5587C143.895 49.5455 140.88 51.8861 137.448 53.1928C139.386 53.2503 141.325 53.3221 143.263 53.3795C141.813 57.6587 138.065 61.0906 133.671 62.1389C134.921 62.1532 136.17 62.1676 137.419 62.1963C133.327 68.1125 129.22 74.0286 125.127 79.9448C123.95 81.6392 122.744 83.3624 121.006 84.4824C119.57 85.4014 117.876 85.8322 116.21 86.2056C104.062 88.9339 91.497 89.7524 79.1047 88.618C74.8686 88.2303 70.4315 87.541 67.057 84.9276C63.6825 82.3141 61.8875 77.2308 64.1994 73.6696"
                                fill="white"
                              />
                              <path
                                d="M71.6808 138.847C71.9536 133.936 72.5567 129.053 73.5044 124.229C75.9312 127 80.0524 127.345 83.7285 127.503C89.3 127.732 94.8715 127.962 100.457 128.177C101.104 131.983 101.563 136.449 98.8061 139.162C97.5281 140.412 95.7762 141.044 94.053 141.517C90.2908 142.566 86.3994 143.111 82.5079 143.126C77.8841 143.154 72.37 141.762 70.891 137.382C71.3936 136.965 71.8962 136.563 72.3987 136.147"
                                fill="white"
                              />
                              <path
                                d="M118.321 138.847C118.048 133.936 117.445 129.053 116.497 124.229C114.07 127 109.949 127.345 106.273 127.503C100.702 127.732 95.13 127.962 89.5441 128.177C88.8979 131.983 88.4384 136.449 91.1955 139.162C92.4735 140.412 94.2253 141.044 95.9485 141.517C99.7107 142.566 103.602 143.111 107.494 143.126C112.117 143.154 117.632 141.762 119.111 137.382C118.608 136.965 118.105 136.563 117.603 136.147"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="col-12 col-md-8">
                          <div className="row my-3">
                            <div className="col">
                              溝通師刊登名稱
                              <span style={{ color: 'red' }}>*</span>
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="IVY"
                              />
                            </div>
                          </div>
                          <div className="row my-3">
                            <div className="col">
                              服務項目<span style={{ color: 'red' }}>*</span>
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="p******1@testmail.com"
                              />
                            </div>
                          </div>
                          <div className="row my-3">
                            <div className="col">
                              Email<span style={{ color: 'red' }}>*</span>
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="IVY"
                              />
                            </div>
                          </div>
                          <div className="row my-3">
                            <div className="col">
                              預約費用<span style={{ color: 'red' }}>*</span>
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="一般溝通：TWD 1500/hr遠距靈氣：TWD 500/20min"
                              />
                            </div>
                          </div>
                          <div className="row my-3">
                            <div className="col">
                              進行方式<span style={{ color: 'red' }}>*</span>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="flexCheckDefault"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  遠距語音溝通
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="flexCheckDefault"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  遠距文字溝通
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row my-3">
                            <div className="col">
                              證書編號<span style={{ color: 'red' }}>*</span>
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="溝通師證字第10273649"
                                readOnly=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 介紹title */}
                    <h3 className="text-center mt-3 content-title">介紹</h3>
                    {/* 第二張卡 */}
                    <div className="sec2 mt-3">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a comment here"
                          id="floatingTextarea"
                          style={{ height: 400 }}
                          defaultValue={''}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
