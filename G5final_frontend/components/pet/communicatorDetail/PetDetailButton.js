import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BsXLg } from "react-icons/bs";
import PetReservetable from './PetReservetable';
import { useAuth } from '@/hooks/use-auth';
import toast from 'react-hot-toast';
import logo from 'public/LOGO.svg';
export default function PetDetailButton({ fetchOne }) {
  const { auth } = useAuth()
  
  const router = useRouter();
  const [window, setWindow] = useState();
  const goBack = () => {
    router.push('/communicator');
  };
  const showWindow = () => {
    if (auth.isAuth) {
      setWindow(true);
    } else { 
      toast('尚未登入會員無法預約', {
        icon: <Image width={95} height={53} src={logo} alt="logo" priority />,
        duration: 1800,
        style: {
          borderRadius: '10px',
          background: 'rgba(193, 69, 69, 1)',
          color: '#fff',
          marginTop: '80px',
        },
      });
    }
    
  };
  const closeWindow = () => {
    setWindow(false);
  };
  return (
    <>
      <div className="row py-5">
        <div className="col btn-rwd-none">
          <button className="btnn" onClick={goBack}>
            ←返回列表
          </button>
        </div>
        <div className="col btn-rwd-flex">
          <button className="btnn" onClick={showWindow}>
            預約寵物溝通師
          </button>
        </div>
      </div>
      {/* 彈窗 */}
      {window && (
        <div className="PT-alert container">
          <div className="alert d-flex container">
            {/* 關閉按鈕 */}
            <button className="close" onClick={closeWindow}>
              <BsXLg size={30} />
            </button>
            {/* 照片 */}
            <div className='row d-flex '>
              <div className="col-3 imgg">
                <Image
                  className=""
                  src="/pet/images/Frame 407.png"
                  alt="1"
                  width={300}
                  height={500}
                />
              </div>
              {/* 欄位 */}
              <PetReservetable fetchOne={fetchOne} />
            </div>
          </div>
        </div>
      )}
      {window && <div className="bgdark"></div>}
    </>
  );
}
