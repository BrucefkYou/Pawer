import React, { useState, useEffect } from 'react';
import Navbar from '../default-layout/navbar';
import Footer from '../default-layout/footer';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useAuth } from '@/hooks/use-auth';
// 會員中心側邊欄
import MbSideBar from '@/components/member/sidebar';
// 側邊欄的offcanvas
import Offcanvas from 'react-bootstrap/Offcanvas';
// Loader
import { useRouter } from 'next/router';

export default function MemberLayout({ children }) {
  const { auth } = useAuth();

  // 定義會員中心側邊欄offcanvas開關狀態
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleOpenOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  // activeMenu 同步兩個sidebar的選單狀態
  const [activeMenu, setActiveMenu] = useState(1);
  // Loader
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
  }, [router.pathname]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [loading]);

  if (!auth.isAuth) {
    return <div></div>;
  }

  return loading ? (
    <div className="Loader2">
      <div className="loaderBox">
        <svg id="svg-sprite">
          <symbol id="paw" viewBox="0 0 249 209.32">
            <ellipse
              cx="27.917"
              cy="106.333"
              strokeWidth={0}
              rx="27.917"
              ry="35.833"
            />
            <ellipse
              cx="84.75"
              cy="47.749"
              strokeWidth={0}
              rx="34.75"
              ry="47.751"
            />
            <ellipse
              cx={162}
              cy="47.749"
              strokeWidth={0}
              rx="34.75"
              ry="47.751"
            />
            <ellipse
              cx="221.083"
              cy="106.333"
              strokeWidth={0}
              rx="27.917"
              ry="35.833"
            />
            <path
              strokeWidth={0}
              d="M43.98 165.39s9.76-63.072 76.838-64.574c0 0 71.082-6.758 83.096 70.33 0 0 2.586 19.855-12.54 31.855 0 0-15.75 17.75-43.75-6.25 0 0-7.124-8.374-24.624-7.874 0 0-12.75-.125-21.5 6.625 0 0-16.375 18.376-37.75 12.75 0 0-28.29-7.72-19.77-42.86z"
            />
          </symbol>
        </svg>
        <div className="ajax-loader">
          <div className="paw">
            <svg className="icon">
              <use xlinkHref="#paw" />
            </svg>
          </div>
          <div className="paw">
            <svg className="icon">
              <use xlinkHref="#paw" />
            </svg>
          </div>
          <div className="paw">
            <svg className="icon">
              <use xlinkHref="#paw" />
            </svg>
          </div>
          <div className="paw">
            <svg className="icon">
              <use xlinkHref="#paw" />
            </svg>
          </div>
          <div className="paw">
            <svg className="icon">
              <use xlinkHref="#paw" />
            </svg>
          </div>
          <div className="paw">
            <svg className="icon">
              <use xlinkHref="#paw" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  ) : (
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
                <span>
                  <RxHamburgerMenu className="me-2 h-100" />
                  <strong>會員中心</strong>
                </span>
              </button>
            </aside>
            <Offcanvas
              show={showOffcanvas}
              onHide={handleCloseOffcanvas}
              placement="start"
              className="mb-offcanvas"
            >
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
