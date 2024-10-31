import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';

export default function PetList(props) {
  const [communicator, setCommunicator] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/pet');
        if (!response.ok) {
          throw new Error('網路回應不成功：' + response.status);
        }
        const data = await response.json();

        setCommunicator(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {communicator.map((v, i) => {
        return (
          <Link
            className="col-lg-4 col-5"
            href={`/communicator/${v.ID}`}
            key={v.ID}
            passHref
          >
            <div className=" pet-teachercard-yen position-relative" key={v.ID}>
              <div className="img-box">
                <Image
                  className="imgg"
                  src={`/pet/images/${v.Img}`}
                  alt="1"
                  width={400}
                  height={300}
                />
              </div>
              <div className="contain">
                <h4>{v.Name}</h4>
                <p className="">證書編號：{v.Certificateid}</p>
                <p className="text">通過日期：{v.CertificateDate}</p>
                <p className="hover-btn">我要預約</p>
              </div>
              <div className="contain-hover">
                <p className="text-center">Hi, 我是{v.Name}</p>
                <div className="">
                  <p>
                    服務項目：
                    <br />
                    {v.Service}
                  </p>
                  <p className="">
                    進行方式：
                    <br />
                    {v.Approach}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
