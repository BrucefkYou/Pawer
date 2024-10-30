import React, { useState, useEffect } from 'react';
import Banner from '@/components/join/banner/banner';
import {
  BsClock,
  BsChevronRight,
  BsGeoAlt,
  BsBookmarkFill,
} from 'react-icons/bs';
import Image from 'next/image';

export default function Preview(props) {
  return (
    <>
      <Banner
        title="萌寵揪團聚會"
        bgImgUrl="/join/banner-jism.jpg"
        alt="萌寵揪團聚會"
      />
      <div className="container ji-detail-container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">首頁</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <a href="#">活動</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <a href="#">活動明細</a>
            </li>
          </ol>
        </nav>

        <form className="ji-form" action="" method="POST">
          <div className="ji-pr-card bg-white rounded-2s">
            <div className="ji-image">
              {/* eslint-disable  */}
            <Image
              className="ji-img1"
              width={1176}
              height={532}
              src="/join/t5.jpg"
              alt=""
            />
          </div>
          <div className="detail-section1 px-3">
            <div className="d-flex flex-wrap flex-sm-nowrap py-4">
              <div className="w-100">
                <h4 className="h4 text-secondary-emphasis">快樂小狗的聚會</h4>
                <div className="d-flex pt-3 pb-2 text-secondary-emphasis align-items-center">
                  <BsClock className="mx-2" />
                  <p className="m-0">2024.10.09 14:00 - 2024.10.09 16:00</p>
                </div>
                <div className="d-flex pt-2 pb-3 text-secondary-emphasis align-items-center">
                  <BsGeoAlt className="mx-2" />
                  <p className="m-0">台北市大安區大安森林公園</p>
                </div>
                <div className="d-flex gap-2 ms-2 py-3">
                  <div
                    type="button"
                    className="btn btn-warning text-white py-0 px-1"
                  >
                    123
                  </div>
                  <div
                    type="button"
                    className="btn btn-warning text-white py-0 px-1"
                  >
                    123
                  </div>
                  <div
                    type="button"
                    className="btn btn-warning text-white py-0 px-1"
                  >
                    123
                  </div>
                </div>
              </div>
              <div className="flex-shrink-1">
                {/* 側邊活動狀態小卡 */}
                <div className="card ji-detail-side-card shadow ms-auto">
                  <div className="card-body">
                    <div className=" d-flex align-items-center gap-2 ">
                      <div className="ji-sidecard-imgbox rounded-circle">
                        <img className="" src="" alt="" />
                      </div>
                      <p className="my-auto text-primary">
                        想哭的我戴上貓的面具
                      </p>
                    </div>
                    <div className="row py-3 text-secondary-emphasis">
                      <h5 className="col-8 card-title">快樂小狗的聚會</h5>
                      <div className="col-4 text-end ps-0 ji-side-colicon">
                        <BsBookmarkFill className="me-1" />
                        999
                      </div>
                    </div>
                    <div className="ji-sidecard-info text-secondary-emphasis">
                      <div className="row">
                        <p className="col card-text mb-3 ji-info-content">
                          目前參加人數
                        </p>
                        <p className="col text-end">
                          99<span>人</span>
                        </p>
                      </div>
                      <div className="row">
                        <p className="col card-text mb-3 ji-info-content">
                          剩餘報名人數
                        </p>
                        <p className="col text-end">
                          1<span>人</span>
                        </p>
                      </div>
                    </div>
                    <a href="#" className="btn btn-primary w-100">
                      立即報名
                      <BsChevronRight />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-section2 mb-5">
            <h5 className="h5">活動內容</h5>
            <p>
              請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內容請填寫活動內
            </p>
            <div className="ji-image">
              <Image
                className="ji-img1"
                width={1144}
                height={500}
                src="/join/t3.jpg"
                alt=""
              />
            </div>
            <div className="ji-image">
              <Image
                className="ji-img1"
                width={1144}
                height={500}
                src="/join/t4.jpg"
                alt=""
              />
            </div>
            <div className="ji-image">
              <Image
                className="ji-img1"
                width={1144}
                height={500}
                src="/join/t2.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="detail-section3">
            <h5 className="h5">活動地點</h5>
            <iframe
              title="join-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8966.073942951458!2d121.29819338747815!3d24.99313490692153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34681f04c6c50adb%3A0xbfb45e5968b03888!2z5qGD5ZyS5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1730031675652!5m2!1szh-TW!2stw"
              className="join-map"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="py-1 text-center">會顯示地址的地方</p>
          </div>
          </div>
          <div className="ji-pr-btngroup d-grid gap-3 d-flex mb-3 justify-content-between">
            <button className="btn btn-outline-primary " type="button">
              返回編輯
            </button>
            <div className='d-grid gap-3 d-flex'> <button className="btn btn-outline-primary" type="button">
              儲存活動
            </button>
            <button className="btn btn-primary" type="button">
              立即發布
            </button></div>
           
          </div>
        </form>
        </div>
    </>
  );
}
