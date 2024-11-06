import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function PetDetailButton({ Name }) {
  const router = useRouter();
  const [window, setWindow] = useState();
  const goBack = () => {
    router.push('/communicator');
  };
  const showWindow = () => {
    setWindow(true);
  };

  const closeWindow = () => {
    setWindow(false);
  };
  return (
    <>
      <div className="row py-5">
        <div className="col btn-rwd-none">
          <button className="btnn" onClick={goBack}>
            ←返回列表
          </button>
        </div>
        <div className="col btn-rwd-flex">
          <button className="btnn" onClick={showWindow}>
            預約寵物溝通師
          </button>
        </div>
      </div>
      {/* 彈窗 */}
      {window && (
        <div className="PT-alert container">
          <div className="alert d-flex">
            {/* 關閉按鈕 */}
            <button className="close" onClick={closeWindow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={29}
                height={29}
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  d="M2 26.8933L26.8933 2M27 27.1434L2.1067 2.25011"
                  stroke="#22355C"
                  strokeWidth={3}
                />
              </svg>
            </button>
            {/* 照片 */}
            <div className="imgg">
              <Image
                className=""
                src="/pet/images/Frame 407.png"
                alt="1"
                width={300}
                height={100}
              />
            </div>
            {/* 欄位 */}

            <div className="container m-3 p-3 justify-content-center align-content-center">
              <div>
                <h4>
                  寵物溝通師預約{' '}
                  <span style={{ color: '#f4b13e' }}>{Name}</span>
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
              {/* 表單 */}
              <form action="">
                <div className="d-flex flex-wrap contain justify-content-between">
                  <div className="col-12 col-lg-5">
                    <label className="form-control-label" htmlFor="Name">
                      預約者姓名<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input id="Name" className="form-control" type="text" />
                  </div>
                  <div className="col-12 col-lg-5">
                    <label className="form-control-label" htmlFor="phone">
                      聯絡電話<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input id="phone" className="form-control" type="text" />
                  </div>
                  <div className="col-12 col-lg-5">
                    <label className="form-control-label" htmlFor="pet">
                      寵物類型<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input id="pet" className="form-control" type="text" />
                  </div>
                  <div className="col-12 col-lg-5">
                    <label className="form-control-label" htmlFor="petname">
                      寵物名稱<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input id="petname" className="form-control" type="text" />
                  </div>
                  <div className="col-12 col-lg-5">
                    <label className="form-control-label" htmlFor="torun">
                      進行方式<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input id="torun" className="form-control" type="text" />
                  </div>
                  <div className="col-12 col-lg-5">
                    <label className="form-control-label" htmlFor="time">
                      預約時段<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input id="time" className="form-control" type="text" />
                  </div>
                  <div className="col-12 col-lg-5">
                    <label className="form-control-label" htmlFor="remark">
                      備註
                    </label>
                    <textarea
                      id="remark"
                      className="form-control"
                      type="text"
                      defaultValue={'1'}
                    />
                  </div>
                  <div className="col-12 col-lg-5">
                    <button className="btnn">預約寵物溝通師</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {window && <div className="bgdark"></div>}
    </>
  );
}
