import React, { useState, useEffect } from 'react';

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
      console.log(communicator);
    };

    fetchData();
  }, []);
  return (
    <>
      {communicator.map((v) => {
        return (
          <div
            className="col-lg-3 col-5 pet-teachercard-yen position-relative"
            key={v.ID}
          >
            <img className="hover-img" src="./pet/images/teacher.png" alt="1" />
            <div className="contain">
              <h4>{v.Name}</h4>
              <p className="text">
                服務項目： <br />
                {v.Service}
              </p>
              <p className="hover-btn">我要預約</p>
            </div>
            <div className="contain-hover">
              <p className="text-center">Hi, 我是{v.Name}</p>
              <div className="">
                <p>服務項目：{v.Service}</p>
                <p className="none-2">進行方式：{v.Approach}</p>
                <p className="none-2">預約費用：{v.Fee}</p>
                <p className="none-1">證書編號：{v.Certificateid}</p>
                <p className="none-1">通過日期：{v.CertificateDate}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
