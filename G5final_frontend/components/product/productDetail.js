/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';

export default function ProductDetail(props) {
  // 使用路由判斷當前動態路由id
  const router = useRouter();
  // 抓取當前動態路由參數
  const myId = router.query.id;
  // 抓取單筆物件存放容器
  const [fetchOne, setFetchOne] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3005/api/productList/productList'
        );
        if (!response.ok) {
          throw new Error('網路回應不成功：' + response.status);
        }
        const data = await response.json();
        // 過濾出符合的資料
        const idData = data.find((pd) => pd.ID == myId);
        // 設定進容器
        setFetchOne(idData);
      } catch (err) {
        console.log(err);
      }
    };
    // 確保外部有抓取到當前路由id
    if (myId) {
      fetchData();
    }
  }, [myId]);

  // 先確保有資料在解構
  if (!fetchOne) {
    return <p>Loading...</p>;
  }
  // 解構資料
  const { Name, Img, OriginPrice, Stock, Info } = fetchOne;
  return (
    <>
      {/* 商品細節 */}
      <div className="container d-flex detail-layout-up">
        {/* 圖片輪播 */}
        <div className="row detail-left">
          {/* 主視圖 */}
          <div className="row">
            <div className="col">
              <div>
                <img
                  className="detail-left-img "
                  src="../product/NU4Petimage/NU4Petimage01/C1.jpg"
                  alt="圖片"
                />
              </div>
            </div>
          </div>
          {/* 輪播點選圖 RWD 圖片隱藏 換成箭頭輪播*/}
          <div className="row mt-3 detail-rwd-none">
            <div className="col d-flex detail-left-turn">
              <div className="col">
                <img
                  className="detail-left-img"
                  src="../product/NU4Petimage/NU4Petimage01/P2.jpg"
                  alt="1"
                />
              </div>
              <div className="col">
                <img
                  className="detail-left-img"
                  src="../product/NU4Petimage/NU4Petimage01/P3.jpg"
                  alt="1"
                />
              </div>
              <div className="col">
                <img
                  className="detail-left-img"
                  src="../product/NU4Petimage/NU4Petimage01/P3.jpg"
                  alt="1"
                />
              </div>
              <div className="col">
                <img
                  className="detail-left-img"
                  src="../product/NU4Petimage/NU4Petimage01/P5.jpg"
                  alt="1"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 商品簡介 */}
        <div className="row detail-right">
          {/* 簡介內容 */}
          <div className="row detail-size">
            {/* 商品名稱 */}
            <div className="col">
              <h1 className="detail-title">{Name}</h1>
              {/* 星級 與 售出 收藏 */}
              <div className="d-flex mt-4">
                <div className="col d-flex align-items-center">
                  {/* 星級文字 */}
                  <div>
                    <p className="star-text">4&nbsp;&nbsp;</p>
                  </div>
                  {/* 星級圖示 */}
                  <div className="star-rwd">
                    <img src="../product/star=1.png" alt="1" />
                    <img src="../product/star=1.png" alt="1" />
                    <img src="../product/star=1.png" alt="1" />
                    <img src="../product/star=1.png" alt="1" />
                    <img src="../product/star=0.png" alt="1" />
                  </div>
                  <div>
                    <p className="star-text sell-how">
                      &nbsp;|&nbsp;10件已售出
                    </p>
                  </div>
                </div>
                {/* 收藏圖 */}
                <div className="col d-flex justify-content-end">
                  <img src="../product/Detailsave.svg" alt="1" />
                </div>
              </div>
              {/* 文字內容簡介 */}
              <div className="detail-text-layout">
                <div className="col">
                  <p className="detail-text">{Info}</p>
                </div>
              </div>
              {/* 價格 加入購物車 */}
              <div className="d-flex flex-column align-items-star add-card">
                <div className="col ">
                  <form action="true">
                    <div>
                      <p className="detail-nt">NT${OriginPrice}</p>
                    </div>
                    <div className="d-flex align-items-star detail-buy">
                      <div>
                        <p className="detail-p">數量</p>
                      </div>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button type="button" className="btn border buy-dash">
                          -
                        </button>
                        <div className="many border">
                          <p className="detail-p">2</p>
                        </div>
                        <button
                          type="button"
                          className="btn border m-0 buy-add"
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <p className="detail-p detail-rwd-none">
                          還剩{Stock}件
                        </p>
                      </div>
                    </div>
                    <div className="d-flex mt-5 detail-brt-gap">
                      <button className="detail-btn1">加入購物車</button>
                      <button className="detail-btn2">立即結帳</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 商品內容 */}
      <div className="container mt-5">
        <div className="d-flex justify-content-center pd-content-me5">
          <img
            className="pd-detail-img"
            src="../product/NU4Petimage/NU4Petimage01/NU4Petimage01.png"
            alt="1"
          />
        </div>
      </div>
    </>
  );
}
