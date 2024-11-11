/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import toast from 'react-hot-toast';
import logo from 'public/LOGO.svg';

export default function Productcomment({ pd }) {
  const { auth } = useAuth();
  const id = auth.memberData.id;
  const [comment, setComment] = useState(''); // input狀態
  const avatar = auth.memberData.avatar;

  // 要是會員才能送出
  const CountIcon = () => {
    if (!id) {
      toast('您需要登入才能收藏', {
        icon: <Image width={95} height={53} src={logo} alt="logo" priority />,
        duration: 1800,
        style: {
          borderRadius: '10px',
          background: 'rgba(34, 53, 92, 1)',
          color: '#fff',
          marginTop: '80px',
        },
      });
      return;
    }
  };
  // 清空input內容
  const clear = () => {
    setComment(''); // 清空輸入框的內容
  };

  return (
    <>
      <div className="productdetail">
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
                          <input
                            className="pd-input"
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <div className="d-flex pd-comment-send">
                          <div className="comment-cancel" onClick={clear}>
                            清除
                          </div>
                          <div className="comment-send" onClick={CountIcon}>
                            送出
                          </div>
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
            <div className="pd-comment-more">看更多</div>
          </div>
        </div>
      </div>
    </>
  );
}
