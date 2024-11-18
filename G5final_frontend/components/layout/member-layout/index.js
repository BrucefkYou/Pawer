import React, { useState } from 'react';
import Navbar from '../default-layout/navbar';
import Footer from '../default-layout/footer';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from '@/hooks/use-auth';
// 會員中心側邊欄
import MbSideBar from '@/components/member/sidebar';
// 側邊欄的offcanvas
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function MemberLayout({ children }) {
  const { auth } = useAuth();

  // 定義會員中心側邊欄offcanvas開關狀態
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleOpenOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  // activeMenu 同步兩個sidebar的選單狀態
  const [activeMenu, setActiveMenu] = useState(1);

  if (!auth.isAuth) {
    return <div></div>;
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="container my-5">
          <Breadcrumbs />
          <div className="row">
          {/* 側邊欄 start*/}
            <aside className="col-lg-3 d-none d-lg-block">
            <MbSideBar
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                handleCloseOffcanvas={handleCloseOffcanvas}
              />
            </aside>
            <aside className="col-12 d-lg-none mb-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleOpenOffcanvas}
              >
              <span><RxHamburgerMenu className='me-2 h-100'/><strong>會員中心</strong></span>
             
              </button>
            </aside>
            <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement='start' className="mb-offcanvas">
            {/* <Offcanvas.Header closeButton></Offcanvas.Header> */}
              <Offcanvas.Body onHide={handleCloseOffcanvas}>
              <MbSideBar
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                handleCloseOffcanvas={handleCloseOffcanvas}
              />
              </Offcanvas.Body>
            </Offcanvas>
            {/* 側邊欄 end*/}
            {/* 會員頁面主要內容 */}
            <article className="col-lg-9">{children}</article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
