/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import { Inter } from 'next/font/google';
import Pagination from '@/components/pagination/pagination';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="height">
          {/* section-one  */}
          <section>
            <div className="container">
              {/* banner react時只顯示一個變成輪播 */}
              <div className="row">
                <div className="position-relative">
                  <div className="bg-banner">
                    <img src="./home/aboutBanner.png" alt="" />
                  </div>
                  <div className="d-flex btnGap-wei">
                    <div className="btn btnPrimary-wei">關於我們</div>
                    <div className="btn btnWhite-wei">連絡我們</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section-two */}
          <section>
            <div className="container">
              <div className="row">
                {/* 開頭文字區 */}
                <div className="textCP-wei col-12 d-flex justify-content-center align-items-center">
                  <p className="textCaring-wei">Caring for every&nbsp;</p>
                  <p className="textPaw-wei">paw</p>
                </div>
                <div className="col d-flex justify-content-center">
                  <p className="textLife-wei">健康生活，從爪爪呵護</p>
                </div>
              </div>
            </div>
            <div className="container sctNone-wei">
              {/* 圖文區 */}
              <div className="row pdgap10-wei">
                {/* 關於 PAWER */}
                <div className="col d-flex mat50">
                  <div className="col">
                    <div className="col d-flex align-items-center">
                      <img src="./home/light.png" alt="" />
                      <div className="col secms-4">
                        <p className="mb-2 textAB-wei">關於 PAWER</p>
                        <p className="mt-2 textAB-content-wei">
                          PAWER致力於成為寵物與主人之間的橋樑，提供高品質的犬貓保健產品。通過提供高品質的寵物保健食品、專業的寵物溝通服務，以及豐富的社群互動，打造一個讓寵物和主人都能健康快樂生活的專屬平台，讓每一隻「爪子」都充滿力量與健康。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row servings-wei">
                  {/* 服務 */}
                  <div className="col d-flex mat50">
                    <div className="col">
                      <div className="col d-flex align-items-center">
                        <img src="./home/bow.png" alt="" />
                        <div className="col secms-4">
                          <p className="mb-2 textAB-wei">服務</p>
                          <div className="d-flex">
                            <p className="mt-2 serving-wei">
                              寵物保健 |&nbsp;
                              <span className="serving-content-wei">
                                &nbsp;提供多樣化且經過嚴格審核的寵物保健食品，滿足不同品種與年齡層的寵物需求。
                              </span>
                            </p>
                          </div>
                          <div className="d-flex">
                            <p className="mt-2 serving-wei">
                              寵物聚會 |&nbsp;
                              <span className="serving-content-wei">
                                &nbsp;會員可創建專屬活動，提供平台讓寵物主人互相交流與學習，共同提升飼養技巧與寵物關懷知識。
                              </span>
                            </p>
                          </div>
                          <div className="d-flex">
                            <p className="mt-2 serving-wei">
                              寵物溝通 |&nbsp;
                              <span className="serving-content-wei">
                                &nbsp;提供專業寵物溝通師預約服務，協助會員了解寵物的需求與情感，並與寵物建立更深層的聯繫。
                              </span>
                            </p>
                          </div>
                          <div className="d-flex">
                            <p className="mt-2 serving-wei">
                              部落格區 |&nbsp;
                              <span className="serving-content-wei">
                                &nbsp;會員可發表與寵物相關的文章、分享經驗與心得，並透過按讚與收藏功能，促進社群互動與知識交流。
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row servings-wei">
                  {/* 願景 */}
                  <div className="col d-flex mat50">
                    <div className="col">
                      <div className="col d-flex align-items-center">
                        <img src="./home/heart.png" alt="" />
                        <div className="col secms-4">
                          <p className="mb-2 textAB-wei">願景</p>
                          <p className="mt-3 serving-content-wei">
                            提供全方位的寵物健康與交流平台，不僅滿足會員在寵物健康上的需求，還提供一個溫暖的社群環境，讓寵物主
                            <span className="serving-contents-wei">
                              人可以互相支持、學習，並通過與專業寵物溝通師的合作，深入了解寵物的內心世界，提升彼此的生活品質。
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* 貓咪圖片 */}
                <div className="col rcat-wei">
                  <img src="./home/rightCat.png" alt="" />
                </div>
              </div>
            </div>
          </section>
          {/* section-three */}
          <section className="sec-3">
            <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 hotbg-text d-flex flex-column justify-content-center align-items-center">
              {/* 文字區 */}
              <p className="hot-text">熱門商品</p>
              <p className="BestSale">Best Sale</p>
            </div>
            <div className="sec-3">
              {/* 卡片區 react RWD時只顯示一個變成輪播*/}
              <div className="col d-flex sec-3-gap">
                <div className="card sec-3-card-mg col">
                  {/* 卡片 */}
                  <img
                    className="sec3-img"
                    src="./home/HotCard.png"
                    alt="產品圖片"
                  />
                  <div className="card-body">
                    <div className="sec-3-card-text">
                      貓草風味 1盒 (30包/盒)
                    </div>
                    <div className="sec-3-card-textD">
                      貓草風味 1盒 (30包/盒)
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <div className="card-text">
                        <small className="be-nt">NT$1,650</small>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={25}
                        height={26}
                        viewBox="0 0 25 26"
                        fill="none"
                      >
                        {/* 收藏icon */}
                        <g clipPath="url(#clip0_6088_3313)">
                          <path
                            d="M3.12463 4.02539C3.12463 3.19659 3.45387 2.40173 4.03992 1.81568C4.62598 1.22963 5.42083 0.900391 6.24963 0.900391H18.7496C19.5784 0.900391 20.3733 1.22963 20.9593 1.81568C21.5454 2.40173 21.8746 3.19659 21.8746 4.02539V25.1191C21.8746 25.2605 21.8362 25.3991 21.7635 25.5203C21.6909 25.6415 21.5867 25.7408 21.4621 25.8075C21.3376 25.8742 21.1972 25.9058 21.0561 25.8991C20.9149 25.8923 20.7782 25.8474 20.6606 25.7691L12.4996 21.3707L4.3387 25.7691C4.22105 25.8474 4.08437 25.8923 3.94321 25.8991C3.80206 25.9058 3.66172 25.8742 3.53713 25.8075C3.41255 25.7408 3.30839 25.6415 3.23575 25.5203C3.16311 25.3991 3.12471 25.2605 3.12463 25.1191V4.02539ZM6.24963 2.46289C5.83523 2.46289 5.4378 2.62751 5.14478 2.92054C4.85175 3.21356 4.68713 3.61099 4.68713 4.02539V23.6598L12.0668 19.7816C12.195 19.6963 12.3456 19.6508 12.4996 19.6508C12.6536 19.6508 12.8042 19.6963 12.9324 19.7816L20.3121 23.6598V4.02539C20.3121 3.61099 20.1475 3.21356 19.8545 2.92054C19.5615 2.62751 19.164 2.46289 18.7496 2.46289H6.24963Z"
                            fill="#888888"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6088_3313">
                            <rect
                              width={25}
                              height={25}
                              fill="white"
                              transform="translate(0 0.901367)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="new-nt">NT$550</div>
                  </div>
                </div>
                <div className="card sec-3-card-mg col sec4-none">
                  {/* 卡片 */}
                  <img
                    className="sec3-img"
                    src="./home/HotCard.png"
                    alt="產品圖片"
                  />
                  <div className="card-body">
                    <div className="sec-3-card-text">
                      貓草風味 1盒 (30包/盒)
                    </div>
                    <div className="sec-3-card-textD">
                      貓草風味 1盒 (30包/盒)
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <div className="card-text">
                        <small className="be-nt">NT$1,650</small>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={25}
                        height={26}
                        viewBox="0 0 25 26"
                        fill="none"
                      >
                        {/* 收藏icon */}
                        <g clipPath="url(#clip0_6088_3313)">
                          <path
                            d="M3.12463 4.02539C3.12463 3.19659 3.45387 2.40173 4.03992 1.81568C4.62598 1.22963 5.42083 0.900391 6.24963 0.900391H18.7496C19.5784 0.900391 20.3733 1.22963 20.9593 1.81568C21.5454 2.40173 21.8746 3.19659 21.8746 4.02539V25.1191C21.8746 25.2605 21.8362 25.3991 21.7635 25.5203C21.6909 25.6415 21.5867 25.7408 21.4621 25.8075C21.3376 25.8742 21.1972 25.9058 21.0561 25.8991C20.9149 25.8923 20.7782 25.8474 20.6606 25.7691L12.4996 21.3707L4.3387 25.7691C4.22105 25.8474 4.08437 25.8923 3.94321 25.8991C3.80206 25.9058 3.66172 25.8742 3.53713 25.8075C3.41255 25.7408 3.30839 25.6415 3.23575 25.5203C3.16311 25.3991 3.12471 25.2605 3.12463 25.1191V4.02539ZM6.24963 2.46289C5.83523 2.46289 5.4378 2.62751 5.14478 2.92054C4.85175 3.21356 4.68713 3.61099 4.68713 4.02539V23.6598L12.0668 19.7816C12.195 19.6963 12.3456 19.6508 12.4996 19.6508C12.6536 19.6508 12.8042 19.6963 12.9324 19.7816L20.3121 23.6598V4.02539C20.3121 3.61099 20.1475 3.21356 19.8545 2.92054C19.5615 2.62751 19.164 2.46289 18.7496 2.46289H6.24963Z"
                            fill="#888888"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6088_3313">
                            <rect
                              width={25}
                              height={25}
                              fill="white"
                              transform="translate(0 0.901367)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="new-nt">NT$550</div>
                  </div>
                </div>
                <div className="card sec-3-card-mg col sec4-none">
                  {/* 卡片 */}
                  <img
                    className="sec3-img"
                    src="./home/HotCard.png"
                    alt="產品圖片"
                  />
                  <div className="card-body">
                    <div className="sec-3-card-text">
                      貓草風味 1盒 (30包/盒)
                    </div>
                    <div className="sec-3-card-textD">
                      貓草風味 1盒 (30包/盒)
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <div className="card-text">
                        <small className="be-nt">NT$1,650</small>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={25}
                        height={26}
                        viewBox="0 0 25 26"
                        fill="none"
                      >
                        {/* 收藏icon */}
                        <g clipPath="url(#clip0_6088_3313)">
                          <path
                            d="M3.12463 4.02539C3.12463 3.19659 3.45387 2.40173 4.03992 1.81568C4.62598 1.22963 5.42083 0.900391 6.24963 0.900391H18.7496C19.5784 0.900391 20.3733 1.22963 20.9593 1.81568C21.5454 2.40173 21.8746 3.19659 21.8746 4.02539V25.1191C21.8746 25.2605 21.8362 25.3991 21.7635 25.5203C21.6909 25.6415 21.5867 25.7408 21.4621 25.8075C21.3376 25.8742 21.1972 25.9058 21.0561 25.8991C20.9149 25.8923 20.7782 25.8474 20.6606 25.7691L12.4996 21.3707L4.3387 25.7691C4.22105 25.8474 4.08437 25.8923 3.94321 25.8991C3.80206 25.9058 3.66172 25.8742 3.53713 25.8075C3.41255 25.7408 3.30839 25.6415 3.23575 25.5203C3.16311 25.3991 3.12471 25.2605 3.12463 25.1191V4.02539ZM6.24963 2.46289C5.83523 2.46289 5.4378 2.62751 5.14478 2.92054C4.85175 3.21356 4.68713 3.61099 4.68713 4.02539V23.6598L12.0668 19.7816C12.195 19.6963 12.3456 19.6508 12.4996 19.6508C12.6536 19.6508 12.8042 19.6963 12.9324 19.7816L20.3121 23.6598V4.02539C20.3121 3.61099 20.1475 3.21356 19.8545 2.92054C19.5615 2.62751 19.164 2.46289 18.7496 2.46289H6.24963Z"
                            fill="#888888"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6088_3313">
                            <rect
                              width={25}
                              height={25}
                              fill="white"
                              transform="translate(0 0.901367)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="new-nt">NT$550</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section-four */}
          <section>
            <div className="container sec4-con">
              {/* 活動會是輪播 RWD 顯示一個 變成輪播*/}
              <div className="sec4-event-text">
                <p className="sec4-newtext">
                  最新的<span className="sec4-pet">寵物聚會</span>
                </p>
                <p className="PetParty">Pet Party</p>
              </div>
              <div className="row sec4-card-group">
                {/* 活動卡片父層 */}
                <div className="row sec4-event-card">
                  {/* 活動卡片 */}
                  <div className="sec4-event">
                    <p className="sec4-event-title">快樂小狗的聚會</p>
                    <span className="sec4-event-status">開團中</span>
                  </div>
                  <div className="sec4-event-details">
                    <div className="sec4-event-time">
                      <img src="./home/icon_clock_.png" alt="" />
                      2024.10.09 14:00 - 2024.10.09 16:00
                    </div>
                    <div className="sec4-event-location">
                      <img src="./home/icon_place_.png" alt="" />
                      台北市大安區大安森林公園
                    </div>
                  </div>
                  <div className="sec4-event-image">
                    <img
                      src="./home/eventImg.png"
                      alt="Description Image"
                      className="event-image"
                    />
                    <p className="sec4-event-imgtext">想哭的我戴上貓的面具</p>
                  </div>
                </div>
                <div className="row sec4-event-card sec4-none">
                  {/* 活動卡片 */}
                  <div className="sec4-event">
                    <p className="sec4-event-title">快樂小狗的聚會</p>
                    <span className="sec4-event-status">開團中</span>
                  </div>
                  <div className="sec4-event-details">
                    <div className="sec4-event-time">
                      <img src="./home/icon_clock_.png" alt="" />
                      2024.10.09 14:00 - 2024.10.09 16:00
                    </div>
                    <div className="sec4-event-location">
                      <img src="./home/icon_place_.png" alt="" />
                      台北市大安區大安森林公園
                    </div>
                  </div>
                  <div className="sec4-event-image">
                    <img
                      src="./home/eventImg.png"
                      alt="Description Image"
                      className="event-image"
                    />
                    <p className="sec4-event-imgtext">想哭的我戴上貓的面具</p>
                  </div>
                </div>
                <div className="row sec4-event-card sec4-none">
                  {/* 活動卡片 */}
                  <div className="sec4-event">
                    <p className="sec4-event-title">快樂小狗的聚會</p>
                    <span className="sec4-event-status">開團中</span>
                  </div>
                  <div className="sec4-event-details">
                    <div className="sec4-event-time">
                      <img src="./home/icon_clock_.png" alt="" />
                      2024.10.09 14:00 - 2024.10.09 16:00
                    </div>
                    <div className="sec4-event-location">
                      <img src="./home/icon_place_.png" alt="" />
                      台北市大安區大安森林公園
                    </div>
                  </div>
                  <div className="sec4-event-image">
                    <img
                      src="./home/eventImg.png"
                      alt="Description Image"
                      className="event-image"
                    />
                    <p className="sec4-event-imgtext">想哭的我戴上貓的面具</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section-five */}
          <section>
            {/* 溝通師表單會等同於一個大按紐 點下去 彈跳預約表單 */}
            <img
              className="sec5-banner z-0"
              src="./home/petCombanner.png"
              alt="寵物溝通師"
            />
            <div className="container bg-white sec5-place">
              <div className="d-flex sec5-shadow">
                <img className="sec5-petCom" src="./home/petCom.png" alt="" />
                <div className="container justify-content-center align-content-center bg-white">
                  <div>
                    <h5 className="sec5-petCom-text">預約你的寵物溝通師</h5>
                    <div className="mb-5 sec5-1200petCom">
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
                    </div>
                  </div>
                  {/* 表單 */}
                  <div>
                    <form>
                      <div className="d-flex flex-wrap contain justify-content-between">
                        <div className="col-12 col-lg-5">
                          <label
                            className="form-control-label"
                            htmlFor="nameInput"
                          >
                            預約者姓名<span className="sec5-formstar">*</span>
                          </label>
                          <input
                            id="nameInput"
                            className="form-control"
                            type="text"
                            readOnly
                          />
                        </div>
                        <div className="col-12 col-lg-5">
                          <label
                            className="form-control-label"
                            htmlFor="phoneInput"
                          >
                            聯絡電話<span className="sec5-formstar">*</span>
                          </label>
                          <input
                            id="phoneInput"
                            className="form-control"
                            type="text"
                            readOnly
                          />
                        </div>
                        <div className="col-12 col-lg-5">
                          <label
                            className="form-control-label"
                            htmlFor="petTypeInput"
                          >
                            寵物類型<span className="sec5-formstar">*</span>
                          </label>
                          <input
                            id="petTypeInput"
                            className="form-control"
                            type="text"
                            readOnly
                          />
                        </div>
                        <div className="col-12 col-lg-5">
                          <label
                            className="form-control-label"
                            htmlFor="petNameInput"
                          >
                            寵物名稱<span className="sec5-formstar">*</span>
                          </label>
                          <input
                            id="petNameInput"
                            className="form-control"
                            type="text"
                            readOnly
                          />
                        </div>
                        <div className="col-12 col-lg-5">
                          <label
                            className="form-control-label"
                            htmlFor="methodInput"
                          >
                            進行方式<span className="sec5-formstar">*</span>
                          </label>
                          <input
                            id="methodInput"
                            className="form-control"
                            type="text"
                            readOnly
                          />
                        </div>
                        <div className="col-12 col-lg-5">
                          <label
                            className="form-control-label"
                            htmlFor="notesInput"
                          >
                            備註
                          </label>
                          <textarea
                            id="notesInput"
                            className="form-control no-resize"
                            readOnly
                            defaultValue={''}
                          />
                        </div>
                        <div className="col-12 col-lg-5">
                          <label
                            className="form-control-label"
                            htmlFor="timeInput"
                          >
                            預約時段<span className="sec5-formstar">*</span>
                          </label>
                          <input
                            id="timeInput"
                            className="form-control"
                            type="text"
                            readOnly
                          />
                        </div>
                        <div className="col-12 col-lg-5 pet-button">
                          <button className="petbtn">預約寵物溝通師</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section-six */}
          <section>
            <div className="sec6-layout sec6-bg">
              <div className="row sec6-layout">
                <div className="col mb-5">
                  <img src="./home/sec6icon1.png" alt="" />
                </div>
              </div>
              <div className="row sec6-layout">
                <div className="col mb-5">
                  <img src="./home/sec6icon2.png" alt="" />
                </div>
              </div>
              <div className="row sec6-layout">
                <div className="col mb-5">
                  <img src="./home/sec6icon3.png" alt="" />
                </div>
              </div>
              <div className="row sec6-layout">
                <div className="col mb-5">
                  <img src="./home/sec6icon4.png" alt="" />
                </div>
              </div>
            </div>
          </section>
          {/* section-seven */}
          <section className="sec7-layout">
            <div className="container">
              <div className="row sec7-hot-layout">
                {/* 文字區 */}
                <div className="col sec7-text-layout">
                  <p className="sec7-text-hot">
                    熱門<span className="sec7-span">文章</span>
                  </p>
                </div>
                <div className="col sec7-text-layout">
                  <h3 className="PopularArticle">Popular Article</h3>
                </div>
              </div>
              <div className="row">
                <div className="row sec7-row-card-layout">
                  <div className="col">
                    {/* 卡片 */}
                    <div className="card sec7-card-size sec7-carmar">
                      <img
                        className="sec7-cardimg"
                        src="./home/sec7img.png"
                        alt="文章圖"
                      />
                      <div className="card-body">
                        <p className="card-text sec7-text-head">
                          <img
                            className="sec7-headimg me-2"
                            src="./home/sec7head.png"
                            alt=""
                          />
                          我是拋瓦
                        </p>
                        <div className="sec7-like-comment">
                          <p className="card-text sec7-clock">
                            <img
                              className="me-2"
                              src="./home/icon_clock_.png"
                              alt=""
                            />
                            July 3,2024
                          </p>
                          <div className="d-flex">
                            <p className="sec7-clock">
                              <img
                                className="me-1"
                                src="./home/sec7like.png"
                                alt=""
                              />
                              200
                            </p>
                            <p className="sec7-clock ms-1">
                              <img
                                className="me-1"
                                src="./home/sec7comment.png"
                                alt=""
                              />
                              200
                            </p>
                          </div>
                        </div>
                        <p className="sec7-content-more">
                          寵物教導：改善亂咬、學習社會化、定點大小便這樣做...
                        </p>
                        {/* ...是後面還有文字 */}
                        <p className="sec7-more">看更多</p>
                      </div>
                    </div>
                  </div>
                  <div className="col sce7-none">
                    {/* 卡片 */}
                    <div className="card sec7-card-size sec7-carmar">
                      <img
                        className="sec7-cardimg"
                        src="./home/sec7img.png"
                        alt="文章圖"
                      />
                      <div className="card-body">
                        <p className="card-text sec7-text-head">
                          <img
                            className="sec7-headimg me-2"
                            src="./home/sec7head.png"
                            alt=""
                          />
                          我是拋瓦
                        </p>
                        <div className="sec7-like-comment">
                          <p className="card-text sec7-clock">
                            <img
                              className="me-2"
                              src="./home/icon_clock_.png"
                              alt=""
                            />
                            July 3,2024
                          </p>
                          <div className="d-flex">
                            <p className="sec7-clock">
                              <img
                                className="me-1"
                                src="./home/sec7like.png"
                                alt=""
                              />
                              200
                            </p>
                            <p className="sec7-clock ms-1">
                              <img
                                className="me-1"
                                src="./home/sec7comment.png"
                                alt=""
                              />
                              200
                            </p>
                          </div>
                        </div>
                        <p className="sec7-content-more">
                          寵物教導：改善亂咬、學習社會化、定點大小便這樣做...
                        </p>
                        {/* ...是後面還有文字 */}
                        <p className="sec7-more">看更多</p>
                      </div>
                    </div>
                  </div>
                  <div className="col sce7-none">
                    {/* 卡片 */}
                    <div className="card sec7-card-size sec7-carmar">
                      <img
                        className="sec7-cardimg"
                        src="./home/sec7img.png"
                        alt="文章圖"
                      />
                      <div className="card-body">
                        <p className="card-text sec7-text-head">
                          <img
                            className="sec7-headimg me-2"
                            src="./home/sec7head.png"
                            alt=""
                          />
                          我是拋瓦
                        </p>
                        <div className="sec7-like-comment">
                          <p className="card-text sec7-clock">
                            <img
                              className="me-2"
                              src="./home/icon_clock_.png"
                              alt=""
                            />
                            July 3,2024
                          </p>
                          <div className="d-flex">
                            <p className="sec7-clock">
                              <img
                                className="me-1"
                                src="./home/sec7like.png"
                                alt=""
                              />
                              200
                            </p>
                            <p className="sec7-clock ms-1">
                              <img
                                className="me-1"
                                src="./home/sec7comment.png"
                                alt=""
                              />
                              200
                            </p>
                          </div>
                        </div>
                        <p className="sec7-content-more">
                          寵物教導：改善亂咬、學習社會化、定點大小便這樣做...
                        </p>
                        {/* ...是後面還有文字 */}
                        <p className="sec7-more">看更多</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
