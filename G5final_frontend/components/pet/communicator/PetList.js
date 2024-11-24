import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsFillChatFill } from 'react-icons/bs';
export default function PetList({ nowPageItems }) {
  if (nowPageItems.length < 1) {
    return <div className="m-5 text-center text-body-tertiary">查無資料...</div>;
  }
  return (
    <>
      {nowPageItems.map((v) => (
        <Link
          key={v.ID}
          className="col-lg-4 col-12 no-underline p-1"
          href={`/communicator/${v.ID}`}
          passHref
        >
          <div
            className="pet-teachercard-yen shadow position-relative m-3"
            key={v.ID}
          ><div className='p-4'>
            {/* 頭像 */}
            <Image
                className="imgg"
                src={`http://localhost:3005/pet/${v.Img}`}
                alt="1"
                layout="responsive"
                width={400}
                height={400}
                style={{borderRadius:'5px'}}
              />
            </div>
            {/* 外部 */}
            <div className="contain">
              <h4>{v.Name}</h4>
              <p className="text">
                證書編號：
                <br />
                {v.Certificateid}
              </p>
              <p className="text">
                通過日期：
                <br />
                {v.CertificateDate}
              </p>
              <p className="hover-btn">&nbsp;</p>
              <p className="hover-btn">
                <BsFillChatFill /> 我要預約
              </p>
            </div>
            {/* hover效果 */}
            <div className="contain-hover">
              <p className="hover-text">Hi , I'm〈{v.Name}〉</p>
              <ul>
                <li>
                  <p>
                    服務項目：
                    <br />
                    {v.Service}
                  </p>
                </li>
                <li>
                  <p>
                    進行方式：
                    <br />
                    {v.Approach}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
