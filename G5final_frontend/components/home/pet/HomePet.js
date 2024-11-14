import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
export default function HomePet(props) {
  return (
    <>
          <section>
              {/* 溝通師表單會等同於一個大按紐 點下去 彈跳預約表單 */}
              <img
                  className="sec5-banner z-0"
                  src="./home/petCombanner.png"
                  alt="寵物溝通師"
              />
              
              <div className="container sec5-place">
                  <div className="d-flex sec5-shadow position-relative hover-container">
                      <Image src={'/pet/icon/dog1.png'} width={80} height={80} className='pet-pawer-icon-1' />
                      <Image src={'/pet/icon/dog2.png'} width={80} height={80} className='pet-pawer-icon-2' />
                      <Image src={'/pet/icon/pawericon.png'} width={50} height={50} className='pet-pawer-icon' />
                      <div className="overlay">
                          <Link href='/communicator' className="overlay-btn text-decoration-none">前往瀏覽寵物溝通師</Link>
                      </div>
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
    </>
  )
}
