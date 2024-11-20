import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import toast from 'react-hot-toast';
import { BsImage } from 'react-icons/bs';
import Image from 'next/image';
export default function CreateCardTwo({ setMessage }) {
  const { auth } = useAuth();
  const memberID = auth.memberData.id;
  // 表單寫入資料庫
  const submitForm = (event) => {
    event.preventDefault();
    if (!imagePreview) {
      toast.error('請上傳證照')
      return;
    }
    const form = document.querySelector('#create');
    const formData = new FormData(form);
    try {
      fetch('http://localhost:3005/api/pet/communicatorCreate', {
        method: 'POST',
        body: formData,
      });
      toast('註冊成功,待工作人員審核')
      setTimeout(() => {
        setMessage('ok');
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error('失敗請重新再試')
    }
  };
  // 前端照片處理預覽
  const [imagePreview, setImagePreview] = useState();
  const changeImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className="input-card mt-3">
        {/* title */}
        <div className="col-12">
          寵物溝通師證照 <br />
          (驗證用.不公開)
        </div>
        {/* 表單 */}
        <form id="create" onSubmit={submitForm}>
          <div className="row d-flex mt-3">
            {/* 照片 */}
            <div className="col-12 col-lg-4 d-flex pic-wrapper">
              <div className="pic">
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="上傳圖片"
                      width={200}
                      height={200}
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <BsImage style={{ fontSize: '200' }} />
                  )}
                </label>
                <input
                  id="file-upload"
                  style={{ display: 'none' }}
                  type="file"
                  onChange={changeImg}
                  accept="image/*"
                  name="pic"
                />
              </div>
            </div>
            {/* 輸入框 */}
            <div className="col-12 col-lg-8 mt-2">
              <input type="hidden" name="MemberID" value={memberID}></input>
              <label htmlFor="name" className="form-control-label m-2">
                真實姓名<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="RealName"
                required
              />
              <label htmlFor="name" className="form-control-label m-2">
                證照編號<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="Certificateid"
                required
              />
              <label htmlFor="name" className="form-control-label m-2">
                取證日期<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="date"
                className="form-control"
                name="CertificateDate"
                required
              />
            </div>
            {/* 按鈕 */}
            <div className="col-12 d-flex justify-content-center align-items-center mt-5">
              <button className="submit-btn" type="submit">
                送出
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
