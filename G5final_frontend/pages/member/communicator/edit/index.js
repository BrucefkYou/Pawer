import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import Image from 'next/image';
import { usePagination } from '@/hooks/usePagination';
import { useAuth } from '@/hooks/use-auth';
Edit.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function Edit(props) {
  const { auth } = useAuth()
  const id = auth.memberData.id
  const processData = (items) => {
    return items.filter((item) => item.ID === id);
  };
  const { nowPageItems } = usePagination({
    url: 'http://localhost:3005/api/pet',
    needSort: [],
    needFilter: [],
    processData,
  });

  return (
  <>
      {nowPageItems.map((mydata) => < React.Fragment key={mydata.ID || i} >
        <div className="PT-mydetail-edit">

          <form action="">
            {/* 第一張卡 */}
            <div className="sec1 p-4">
              {/* 標題 */}
              <PageTitle title={"刊登資料編輯"} subTitle={"Communicator Edit"} />
              {/* 主介紹 */}
              <div className="row content-1">
                <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                  {/* 頭像 */}
                  <div className="avatar d-flex justify-content-center ">
                    <Image alt='avtar' src={`/pet/images/${mydata.Img}`} width={200} height={200} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="row my-3">
                    <div className="col">
                      溝通師刊登名稱
                      <span style={{ color: 'red' }}>*</span>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={mydata.Name}
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col">
                      服務項目<span style={{ color: 'red' }}>*</span>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={mydata.Service}
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col">
                      Email<span style={{ color: 'red' }}>*</span>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={mydata.Email}
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col">
                      預約費用<span style={{ color: 'red' }}>*</span>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={mydata.Fee}
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col">
                      進行方式<span style={{ color: 'red' }}>*</span>
                    </div>
                    <div className="col">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue={mydata.Approach}
                          id="flexCheckDefault"
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
                          defaultValue=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          遠距文字溝通
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col">
                      證書編號
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control bg-dark text-white"
                        defaultValue={mydata.Certificateid}
                        readOnly={ true }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 介紹title */}
            <h3 className="text-center mt-3 content-title">介紹</h3>
            {/* 第二張卡 */}
            <div className="sec2 mt-3">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                  style={{ height: 400, color: '#646464' }}
                  defaultValue={mydata.Introduction}
                />
              </div>
            </div>
          </form>
        </div>
      </React.Fragment >)}
    </>
    )
}
