import React, { useState, useEffect } from 'react'
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import Image from 'next/image';
import { usePagination } from '@/hooks/usePagination';
import { useAuth } from '@/hooks/use-auth';
Detail.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function Detail(props) {
  const { auth } = useAuth();
  const id = auth.memberData.id;
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
      {nowPageItems.map((mydata) =>
        <React.Fragment key={mydata.ID || i}>
        <div className="PT-mydetail">
          {/* 第一張卡 */}
          <div className="sec1 p-4">
            {/* 標題 */}
            <PageTitle title={"溝通師資料"} subTitle={"Communicator"} />
            {/* 主介紹 */}
            <div className="row content-1">
              <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                <div className="avatar d-flex justify-content-center align-items-center">
                  <Image alt='avatar' src={`/pet/images/${mydata.Img}`} width={200} height={200} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="col-12 col-md-8">
                <div className="row my-4">
                  <div className="col">溝通師刊登名稱</div>
                  <div className="col">{mydata.Name}</div>
                </div>
                <div className="row my-4">
                  <div className="col">服務項目</div>
                  <div className="col">{mydata.Service}</div>
                </div>
                <div className="row my-4">
                  <div className="col">Email</div>
                  <div className="col">{mydata.Email}</div>
                </div>
                <div className="row my-4">
                  <div className="col">預約費用</div>
                  <div className="col">
                    {mydata.Fee}
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col">進行方式</div>
                  <div className="col">
                    <p className="way">{mydata.Approach}</p>
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col">證書編號</div>
                  <div className="col">{mydata.Certificateid}</div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-center mt-3 content-title">介紹</h3>
          {/* 第二張卡 */}
          <div className="sec2 mt-3">
            {mydata.Introduction}
          </div>
          </div>
          </React.Fragment>
      )}
      

    </>
  )
}
