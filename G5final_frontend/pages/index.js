/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import { Inter } from 'next/font/google';
import Banner from '@/components/home/banner';
import SectionTwo from '@/components/home/section-two';
import SectionSix from '@/components/home/section-six';
import Hotproduct from '@/components/home/hotproduct/hotproduct';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="height">
          {/* section-one  */}
          <Banner />
          {/* section-two */}
          <SectionTwo />
          {/* section-three */}
          <Hotproduct />
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
          <SectionSix />
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
