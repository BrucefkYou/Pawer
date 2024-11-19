import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { setHours, setMinutes, setSeconds } from 'date-fns';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
export default function PetReservetable({ fetchOne, memberID, memberEmail }) {
  const router = useRouter();
  const petCommID = router.query.id;
  
  const [from, setFrom] = useState({
    ReserveName: '',
    Phone: '',
    PetType: '狗',
    PetName: '',
    Approach: '遠距語音溝通',
    Time: '',
    Remark: '',
  });

  //表單監聽
  function onChange(event) {
    const { name, value } = event.target;
    setFrom({
      ...from,
      [name]: value,
    });
  }
  // 日期處理
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  // 送出表單
  function submitForm(event) {
    event.preventDefault();

    // emailJS自動發送郵件
    const SERVICE_ID = 'service_y1soora';
    const TEMPLATE_ID = 'template_jqmhk8c';
    const PUBLIC_ID = 'uGgKuam9nMvWLqpjN';
    //寫入資料庫
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('網路回應不成功');
      })
      .then((data) => {
        //確認成功後
        console.log('提交成功：', data);
        // 發送信件
        emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: 'PAWER',
            to_name: from.ReserveName,
            to_email: memberEmail,
            message: `預約溝通師：${fetchOne.Name}
        預約者姓名：${from.ReserveName}
        聯繫電話：${from.Phone}
        寵物類型：${from.PetType}
        寵物名稱：${from.PetName}
        進行方式：${from.Approach}
        備註：${from.Remark}
        預約時段：${formattedDateTime}`,
          },
          PUBLIC_ID
        );
        //提示成功訊息
        toast('已寄發Email,即將跳轉至預約列表頁...')
        //轉頁
        setTimeout(() => {
          router.push('/member/communicator/memReserve');
        }, 3000);
      })
      .catch((error) => {
        console.error('提交失敗：', error);
      });
  }
  return (
    <>
      <div className="container col-12 col-md-8 justify-content-center align-content-center">
        {/* 標題 */}
        <h4 className="pt-3 ps-3">
          寵物溝通師預約{' '}
          <span style={{ color: '#f4b13e' }}>{fetchOne.Name}</span>
        </h4>
        <p className="px-3">
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
          <input type="hidden" name="petCommID" value={`${petCommID}`} />
          <input type="hidden" name="memberID" value={memberID} />
          <div className="d-flex flex-wrap contain justify-content-between container">
            <div className="col-12 col-lg-5">
              <label className="form-control-label" htmlFor="Name">
                預約者姓名<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="reservName"
                className="form-control"
                type="text"
                name="ReserveName"
                required
                onChange={onChange}
              />
            </div>
            <div className="col-12 col-lg-5">
              <label className="form-control-label" htmlFor="phone">
                聯絡電話<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="phone"
                className="form-control"
                type="text"
                name="Phone"
                required
                onChange={onChange}
              />
            </div>
            <div className="col-12 col-lg-5">
              <label className="form-control-label" htmlFor="pet">
                寵物類型<span style={{ color: 'red' }}>*</span>
              </label>
              <select
                className="form-select"
                name="PetType"
                onChange={onChange}
              >
                <option>狗</option>
                <option>貓</option>
              </select>
            </div>
            <div className="col-12 col-lg-5">
              <label className="form-control-label" htmlFor="petname">
                寵物名稱<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="petname"
                className="form-control"
                type="text"
                name="PetName"
                required
                onChange={onChange}
              />
            </div>
            <div className="col-12 col-lg-5">
              <label className="form-control-label" htmlFor="torun">
                進行方式<span style={{ color: 'red' }}>*</span>
              </label>
              <select
                className="form-select"
                name="Approach"
                onChange={onChange}
              >
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
                onChange={(date) => {
                  setStartDate(date);
                  onChange({
                    target: {
                      name: 'Time',
                      value: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
                    },
                  });
                }}
                showTimeSelect
                timeFormat="HH:mm:ss"
                injectTimes={[
                  setHours(setMinutes(setSeconds(new Date(), 10), 1), 0),
                  setHours(setMinutes(new Date(), 5), 12),
                  setHours(setMinutes(new Date(), 59), 23),
                ]}
                dateFormat="MMMM d, yyyy h:mm aa"
                required
                placeholderText="請選擇日期和時間"
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
                name="Remark"
                onChange={onChange}
              />
            </div>
            <div className="col-12 col-lg-5 d-flex justify-content-center">
              <button className="btnn my-2 my-md-3" type="submit">
                預約寵物溝通師
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
