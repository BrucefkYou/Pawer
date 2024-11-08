import React, { useState, useEffect } from 'react'
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import Image from 'next/image';
import { usePagination } from '@/hooks/usePagination';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
Detail.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function Detail(props) {
  const { auth } = useAuth();
  const id = auth?.memberData?.id;
  const processData = (items) => {
    if (!id) return []; 
    return items.filter((item) => item.ID === id);
  };
  
  const [loading, setLoading] = useState(true);
  

  const { nowPageItems } = usePagination({
    url: 'http://localhost:3005/api/pet',
    needSort: [],
    needFilter: [],
    processData,
  });

  // 确保 mydata 存在
  useEffect(() => {
    if (nowPageItems.length > 0) {
      setLoading(false); // 数据加载完成
    }
  }, [nowPageItems,auth]);

  const mydata = nowPageItems.length > 0 ? nowPageItems[0] : null;

  // 如果数据还在加载中，则显示“加载中...”提示
  if (loading) {
    return <div>資料加載中...</div>;
  }

  // 如果加载完成，但数据不存在，显示错误提示
  if (!mydata) {
    return <div>沒有找到相應的資料</div>;
  }
  return (
    <>
      <div className="PT-mydetail">
          {/* 第一張卡 */}
          <div className="sec1 p-4">
          {/* 標題 */}
          <div className="d-flex justify-content-between">
            <PageTitle title={"溝通師資料"} subTitle={"Communicator"} />
            <Link href={'/member/communicator/edit'} className='btn btn-primary'>編輯</Link>
          </div>
            {/* 主介紹 */}
            <div className="row content-1">
            <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                <div className="avatar d-flex justify-content-center align-items-center">
                <Image alt='avatar' src={`http://localhost:3005/pet/${mydata.Img}`} width={200} height={200} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="col-12 col-md-8">
                <div className="row my-4">
                  <div className="col-4">溝通師刊登名稱</div>
                <div className="col">{mydata.Name}</div>
                </div>
                <div className="row my-4">
                <div className="col-4">服務項目</div>
                <div className="col">{mydata.Service}</div>
                </div>
                <div className="row my-4">
                <div className="col-4">Email</div>
                <div className="col">{mydata.Email}</div>
                </div>
                <div className="row my-4">
                <div className="col-4">預約費用</div>
                  <div className="col">
                  {mydata.Fee}
                  </div>
                </div>
                <div className="row my-4">
                <div className="col-4">進行方式</div>
                  <div className="col">
                  <p className="way">{mydata.Approach}</p>
                  </div>
                </div>
                <div className="row my-4">
                <div className="col-4">證書編號</div>
                <div className="col">{mydata.Certificateid }</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 第二張卡 */}
        <div className="sec2 mt-3">
          <h3 className="text-center mt-3 content-title">介紹</h3>
          <hr/>
          {mydata.Introduction}
          </div>
      </div>

    </>
  )
}
