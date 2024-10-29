import React, { useState, useEffect } from 'react';
import ImgPutArea from '@/components/join/img-put-area/img-put-area';
import Image from 'next/image';
import { BsClock, BsPinMap, BsGeoAlt } from 'react-icons/bs';
import titlebottomLine from '@/assets/titleBottomLine.svg';
import dynamic from 'next/dynamic';
import MySelect from '@/components/join/controlled-form/my-select';

// 動態導入 CKEditor 組件
const CKEditor = dynamic(
  // eslint-disable-next-line import/no-unresolved
  () => import('@/components/join/CKEditorComponent'),
  { ssr: false }
);

export default function JoinCreatForm(props) {
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  return (
    <>
      <div className="container ji-create-container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">首頁</a>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <a href=""> 我的活動</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <a href="#">創建活動</a>
            </li>
          </ol>
        </nav>
        <form
          id="join-form"
          action="."
          method="POST"
          encType="multipart/form-data"
        >
          <input type="hidden" name="id" defaultValue="?" />
          <div className="page-heading">
            <div className="page-title">
              <div className="ji-create-title">
                <h3 className="h3 text-primary">創建你的活動</h3>
                <Image src={titlebottomLine} />
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <ImgPutArea />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label
                  htmlFor="EventTitle"
                  className="form-label col-3 required"
                >
                  活動標題
                </label>
                <div className="col">
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="EventTitle"
                    name="EventTitle"
                    placeholder="輸入活動標題"
                    required
                  />
                </div>
              </div>
              <div className="mb-3 mt-1">
                <label
                  htmlFor="editor-container"
                  className="ji-content mb-2 required"
                >
                  活動內容
                </label>
                <div id="full"></div>
                <input type="hidden" id="EventInfo" name="EventInfo" require />
                <div className="ji-ck">
                  <CKEditor />
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <label htmlFor="eventTime" className="form-label col-3">
                      活動開始時間
                    </label>
                    <input
                      id="EventStartTime"
                      name="EventStartTime"
                      type="date"
                      className="form-control flatpickr-no-config flatpickr-input active"
                      placeholder="活動開始時間"
                      required
                    />
                  </div>

                  <div className=" col">
                    <label htmlFor="eventTime" className="form-label col-3">
                      活動結束時間
                    </label>
                    <input
                      id="EventEndTime"
                      name="EventEndTime"
                      type="date"
                      className="form-control  flatpickr-no-config flatpickr-input active "
                      placeholder="結束時間"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <label
                      htmlFor="EventParticipantLimit"
                      className="form-label"
                    >
                      人數上限
                    </label>
                    <div className="input-group">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        aria-expanded="false"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Text input with 2 dropdown buttons"
                      />
                      <button
                        className="btn btn-secondary"
                        type="button"
                        aria-expanded="false"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className=" col">
                    <label htmlFor="eventTime" className="form-label col-3">
                      截團時間
                    </label>
                    <input
                      id="EventEndTime"
                      name="EventEndTime"
                      type="date"
                      className="form-control  flatpickr-no-config flatpickr-input active "
                      placeholder="截團時間"
                      required
                    />
                  </div>
                </div>
              </div>
              <div id="join-address" className="mb-3">
                <MySelect />
                {/* <label htmlFor="join-address" className="form-label col-3">
                  活動地點
                </label>
                <div className="row g-3">
                  <div className="col-md-2">
                    <select
                      className="form-select"
                      id="EventRegion"
                      name="EventRegion"
                    >
                      <option selected disabled>
                        請選擇區域
                      </option>
                      <option value="north">北部</option>
                      <option value="central">中部</option>
                      <option value="south">南部</option>
                      <option value="east">東部</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      id="EventCity"
                      name="EventCity"
                    >
                      <option selected disabled>
                        選擇縣市
                      </option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                  <div className="col-md">
                    <input
                      type="text"
                      className="form-control"
                      id="EventLocation"
                      name="EventLocation"
                      placeholder="請輸入詳細地址"
                    />
                  </div>
                </div> */}
              </div>
              <div className="mb-3">
                <label htmlFor="eventTag" className="form-label col-3">
                  活動標籤
                </label>
                <div className="form-group">
                  <select
                    className="choices form-select multiple-remove"
                    multiple="multiple"
                    id="eventTag"
                    name="eventTag"
                  >
                    <option value="cat">貓皇</option>
                    <option value="dog">狗</option>
                    <option value="basicHealth">基礎保健</option>
                    <option value="skin">皮毛保養</option>
                    <option value="innerHealth">肝臟保養</option>
                    <option value="eyeHealth">眼睛保護</option>
                    <option value="pet">寵物</option>
                  </select>
                </div>
              </div>
              {/* 選擇發佈狀態radio */}
              {/* <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-3 mb-0" htmlFor="EventStatus">
                  發布狀態
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="EventStatus"
                      id="eventStatusPublished"
                      defaultValue="published"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="eventStatusPublished"
                    >
                      發布活動
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="EventStatus"
                      id="eventStatusDraft"
                      defaultValue="draft"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="eventStatusDraft"
                    >
                      儲存草稿
                    </label>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="d-flex justify-content-center my-5">
            <button
              id="send"
              type="submit"
              className="btn btn-primary rounded-2 ji-pr-btn"
            >
              預覽
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
