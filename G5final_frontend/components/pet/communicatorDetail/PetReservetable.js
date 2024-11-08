import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import DatePicker from "react-datepicker";
import moment from 'moment';
import { setHours, setMinutes,setSeconds } from 'date-fns';


import "react-datepicker/dist/react-datepicker.css";
export default function PetReservetable({ fetchOne }) {
    
    const router = useRouter()
    const petCommID = router.query.id
    const { auth } = useAuth()
    const memberID = auth.memberData.id
    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 16),
    );
    // 送出表單
    function submitForm(event) {
        event.preventDefault();
        const form = document.querySelector('#reserve');
        // 用表單元素創建 FormData 物件
        const formData = new FormData(form); 
        // 格式化成適合 SQL 的格式
        const formattedDateTime = moment(startDate).format('YYYY-MM-DD HH:mm:ss'); 
        // 將日期時間加入 FormData
        formData.append('Time', formattedDateTime);
        fetch('http://localhost:3005/api/pet/reserve', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('網路回應不成功');
            })
            .then(data => {
                console.log('提交成功：', data);
                router.push('/member/communicator/memReserve')
            })
            .catch(error => {
                console.error('提交失敗：', error);
            });
    }
  return (
      <>
          
          <div className="container col-12 col-md-8 justify-content-center align-content-center">
              {/* 標題 */}
              <h4>
                  寵物溝通師預約{' '}
                  <span style={{ color: '#f4b13e' }}>{fetchOne.Name}</span>
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
              {/* 表單 */}
              <form id="reserve" onSubmit={submitForm}>
                  <input type="hidden" name='petCommID' value={`${petCommID}`}/>
                  <input type="hidden" name='memberID' value={memberID} />
                  <div className="d-flex flex-wrap contain justify-content-between container">
                      <div className="col-12 col-lg-5">
                          <label className="form-control-label" htmlFor="Name">
                              預約者姓名<span style={{ color: 'red' }}>*</span>
                          </label>
                          <input id="reservName" className="form-control" type="text" name='ReservName' required/>
                      </div>
                      <div className="col-12 col-lg-5">
                          <label className="form-control-label" htmlFor="phone" >
                              聯絡電話<span style={{ color: 'red' }}>*</span>
                          </label>
                          <input id="phone" className="form-control" type="text" name='Phone' required />
                      </div>
                      <div className="col-12 col-lg-5">
                          <label className="form-control-label" htmlFor="pet">
                              寵物類型<span style={{ color: 'red' }}>*</span>
                          </label>
                          <select className="form-select" name='PetType'>
                              <option>狗</option>
                              <option>貓</option>
                          </select>
                      </div>
                      <div className="col-12 col-lg-5">
                          <label className="form-control-label" htmlFor="petname">
                              寵物名稱<span style={{ color: 'red' }}>*</span>
                          </label>
                          <input id="petname" className="form-control" type="text" name='PetName' required />
                      </div>
                      <div className="col-12 col-lg-5">
                          <label className="form-control-label" htmlFor="torun">
                              進行方式<span style={{ color: 'red' }}>*</span>
                          </label>
                          <select className="form-select" name='Approach'>
                              <option>遠距語音溝通</option>
                              <option>遠距文字溝通</option>
                          </select>
                      </div>
                      <div className="col-12 col-lg-5">
                          <label className="form-control-label" htmlFor="time">
                              預約時段<span style={{ color: 'red' }}>*</span>
                          </label>
                          <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              showTimeSelect
                              timeFormat="HH:mm:ss"
                              injectTimes={[
                                  setHours(setMinutes(setSeconds(new Date(), 10), 1), 0),
                                  setHours(setMinutes(new Date(), 5), 12),
                                  setHours(setMinutes(new Date(), 59), 23),
                              ]}
                              dateFormat="MMMM d, yyyy h:mm aa"
                          />
                      </div>
                      <div className="col-12 col-lg-5">
                          <label className="form-control-label" htmlFor="remark">
                              備註
                          </label>
                          <textarea
                              id="remark"
                              className="form-control"
                              type="text"
                              name='Remark'
                          />
                      </div>
                      <div className="col-12 col-lg-5">
                          <button className="btnn" type='submit'>預約寵物溝通師</button>
                      </div>
                  </div>
              </form>
          </div>
    </>
  )
}
