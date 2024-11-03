/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import ProductDetail from '@/components/product/productDetail';

export default function Id(props) {
  return (
    <>
      <main className="productdetail">
        {/* 麵包屑 */}
        <div className="container">
          <Breadcrumbs />
        </div>
        {/* 商品細節內容 */}
        <ProductDetail />
        {/* 評論 */}
        <div className="container mt-5 mb-5">
          <div>
            <p className="pd-comment" id="comment">
              商品評論
            </p>
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
