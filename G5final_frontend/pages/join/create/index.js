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
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

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
                  <CKEditor placeholder="請輸入活動內容" />
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
                        onClick={handleDecrement}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Text input with 2 dropdown buttons"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                      />
                      <button
                        className="btn btn-secondary"
                        type="button"
                        aria-expanded="false"
                        onClick={handleIncrement}
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
              </div>
              <div className="mb-3">
                <label htmlFor="eventTag" className="form-label col-3">
                  活動標籤
                </label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="TagInput"
                    placeholder="輸入或選擇標籤"
                    list="TagOptions"
                  />
                  <datalist id="TagOptions">
                    <option value="貓皇" />
                    <option value="狗" />
                    <option value="基礎保健" />
                    <option value="皮毛保養" />
                    <option value="肝臟保養" />
                    <option value="眼睛保護" />
                    <option value="寵物" />
                  </datalist>
                </div>
              </div>
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
