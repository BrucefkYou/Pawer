import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import Image from 'next/image';
import { usePagination } from '@/hooks/usePagination';
import { useAuth } from '@/hooks/use-auth';
import Router, { useRouter } from 'next/router';
Edit.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function Edit(props) {
  const router = useRouter()
  const { auth } = useAuth()
  const id = auth.memberData.id
  const processData = (items) => {
    return items.filter((item) => item.ID === id);
  };
  const { nowPageItems } = usePagination({
    url: 'http://localhost:3005/api/pet',
    processData,
  });
 
  
  // 處理表單
  async function submitForm(event) { 
    event.preventDefault();
    const form = document.querySelector("#edit")
    const formData = new FormData(form);
    try { 
      const response = await fetch('http://localhost:3005/api/pet/communicatorEdit', {
        method: 'POST',
        body: formData
      })
      if (!response.ok) {
        throw new Error('網路回應不成功：' + response.status);
      }
      router.push('/member/communicator/detail')
    } catch (err){ 
      console.log(err);
    }
  }
  return (
  <>
      {nowPageItems.map((mydata) => < React.Fragment key={mydata.ID || i} >
        <div className="PT-mydetail-edit">

          <form id='edit' onSubmit={submitForm}>
            {/* 第一張卡 */}
            <div className="sec1 p-4">
              {/* 標題 */}
              <PageTitle title={"刊登資料編輯"} subTitle={"Communicator Edit"} />
              {/* 主資料 */}
              <div className="row content-1">
                <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                  {/* 頭像 */}
                  <div className="avatar d-flex justify-content-center ">
                    <Image alt='avtar' src={`/pet/images/${mydata.Img}`} width={200} height={200} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    type="hidden"
                    defaultValue={mydata.ID}
                    name='ID'
                  />
                  <div className="row my-3">
                    
                    <div className="col-4">
                      溝通師刊登名稱
                      <span style={{ color: 'red' }}>*</span>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={mydata.Name}
                        name='Name'
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-4">
                      服務項目<span style={{ color: 'red' }}>*</span>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={mydata.Service}
                        name='Service'
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-4">
                      Email<span style={{ color: 'red' }}>*</span>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={mydata.Email}
                        name='Email'
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-4">
                      預約費用<span style={{ color: 'red' }}>*</span>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={mydata.Fee}
                        name='Fee'
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-4">
                      進行方式<span style={{ color: 'red' }}>*</span>
                    </div>
                    <div className="col">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked={mydata.Approach === '遠距語音溝通'}
                          value='遠距語音溝通'
                          name='Approach'
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          遠距語音溝通
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked={mydata.Approach === '遠距文字溝通'}
                          value='遠距文字溝通'
                          id="flexCheckDefault"
                          name='Approach'
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          遠距文字溝通
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked={mydata.Approach === '現場溝通'}
                          value='現場溝通'
                          name='Approach'
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          現場溝通
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-4">
                      證書編號
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control bg-dark text-white"
                        defaultValue={mydata.Certificateid}
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                  {/* 送出按鈕 */}
                  <button className='btn btn-primary' type='submit'>完成</button>
                </div>
              </div>
            </div>
            {/* 第二張卡 */}
            <div className="sec2 mt-3">
              <div className="form-floating">
                <h3 className="text-center mt-3 content-title">介紹</h3>
                {/* 介紹 */}
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                  style={{ height: 400, color: '#646464' }}
                  defaultValue={mydata.Introduction}
                  name='Introduction'
                />
              </div>
            </div>
          </form>
        </div>
      </React.Fragment >)}
    </>
    )
}
