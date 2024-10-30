// components/layout/SpecialLayout.js
import React from 'react';
import Link from 'next/link';
import Navbar from '../default-layout/navbar';
import Footer from '../default-layout/footer';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <div className="container my-5 d-flex gap-4">
          <aside className="col-3 d-none d-lg-block">
            <div className="mb-sidebar">
              <h5 className="title">會員中心</h5>
              <img src="/pawButton.png" alt="1" className="img" />
              <ul className="nav flex-column gap-3 mt-3">
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    <MdOutlineArrowForwardIos />
                    會員資料
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <MdOutlineArrowForwardIos />
                    訂單查詢
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <MdOutlineArrowForwardIos />
                    我的優惠券
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <MdOutlineArrowForwardIos />
                    收藏商品
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <MdOutlineArrowForwardIos />
                    我的活動
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <MdOutlineArrowForwardIos />
                    我的部落格
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <MdOutlineArrowForwardIos />
                    寵物溝通師
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <MdOutlineArrowForwardIos />
                    訂單查詢
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <div className="col">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
