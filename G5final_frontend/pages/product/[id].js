/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

export default function Id(props) {
  return (
    <>
      <main className="productdetail">
        {/* 麵包屑 */}
        <div className="productdetail-crumb-wei d-flex">
          <a href="../">首頁</a>
          <div>&nbsp;/&nbsp;</div>
          <a className="active" href="../product">
            犬貓通用
          </a>
          <div>&nbsp;/&nbsp;</div>
          <a className="active" href="../product/[id]">
            鮮三精
          </a>
        </div>
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
                <h1 className="detail-title">陪心食補｜鮮三精-犬貓通用</h1>
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
                    <p className="detail-text">
                      木入森排毛粉是用科學排毛的專業排毛粉，不只單純添加各種專利纖維與酵素排毛，且是真正破解「水溶性纖維
                      與 非水溶纖維
                      黃金比例」的排毛粉。克服排毛粉需要多喝水、易卡便腹脹等缺陷，經千位見證者有感回饋，兼具美味營養與顯著速效排毛。還在吃化毛膏幫貓咪排毛嗎?
                      不如試試更天然、更安全健康，但同樣美味的排毛粉吧！
                    </p>
                  </div>
                </div>
                {/* 價格 加入購物車 */}
                <div className="d-flex flex-column align-items-star add-card">
                  <div className="col ">
                    <form action="true">
                      <div>
                        <p className="detail-nt">NT.520</p>
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
                          <p className="detail-p detail-rwd-none">還剩87件</p>
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
        {/* 評論 */}
        <div className="container mt-5 mb-5">
          <div>
            <p className="pd-comment">商品評論</p>
          </div>
          <div className="row">
            {/* 留下評論 */}
            <form action="true">
              <div className="col d-flex justify-content-center">
                <div className="card mb-3 mt-5 comment-send-range">
                  <div className="row g-0">
                    <div className="col-md-2 d-flex justify-content-center">
                      <img
                        className="commentimg"
                        src="../product/commentIng4.png"
                        alt="1"
                      />
                    </div>
                    <div className="col-md-10 col-12">
                      <div className="card-body">
                        {/* title要抓會員名稱 */}
                        <h5 className="pd-comment-title">世界第一等</h5>
                        {/* 星級  */}
                        <div className="d-flex">
                          <img src="../product/star=1.png" alt="1" />
                          <img src="../product/star=1.png" alt="1" />
                          <img src="../product/star=1.png" alt="1" />
                          <img src="../product/star=1.png" alt="1" />
                          <img src="../product/star=0.png" alt="1" />
                        </div>
                        {/* 要抓商品名稱 */}
                        <p className="pd-comment-name">
                          陪心食補｜鮮三精-犬貓通用
                        </p>
                        {/* 留下評論輸入欄位 */}
                        <div className="d-flex flex-column">
                          <label className="pd-comment-content">
                            留下您的評論
                          </label>
                          <input className="pd-input" type="text" />
                        </div>
                        <div className="d-flex pd-comment-send">
                          <button className="comment-cancel">取消</button>
                          <button className="comment-send">送出</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            {/* 評論卡片 評論後新增 超過三個顯示 看更多 */}
            <div className="col d-flex justify-content-center">
              <div className="card mb-3 mt-5 pd-comment-shadow">
                <div className="row g-0">
                  <div className="col-md-2 d-flex justify-content-center align-items-center">
                    <img
                      className="commentimg"
                      src="../product/commentIng1.png"
                      alt="1"
                    />
                  </div>
                  <div className="col-md-10 col-12">
                    <div className="card-body">
                      {/* title要抓會員名稱 */}
                      <h5 className="pd-comment-title">北區小辣椒</h5>
                      {/* 星級  */}
                      <div className="d-flex">
                        <img src="../product/star=1.png" alt="1" />
                        <img src="../product/star=1.png" alt="1" />
                        <img src="../product/star=1.png" alt="1" />
                        <img src="../product/star=1.png" alt="1" />
                        <img src="../product/star=0.png" alt="1" />
                      </div>
                      {/* 要抓商品名稱 */}
                      <p className="pd-comment-name">
                        陪心食補｜鮮三精-犬貓通用
                      </p>
                      <p className="pd-comment-content">
                        第一次購買這個品牌，還不知道效果如何。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="pd-comment-more">看更多</p>
          </div>
        </div>
      </main>
    </>
  );
}
