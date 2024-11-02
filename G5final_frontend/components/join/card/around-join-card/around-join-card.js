import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsClock, BsGeoAlt } from 'react-icons/bs';
import style from '@/components/join/card/around-join-card/around-join-card.module.scss';
import Image from 'next/image';

export default function AroundJoinCard(props) {
  // const router = useRouter();
  // const [data, setData] = useState({ ID: 0, Title: '' });
  // const getTitle = async (id) => {
  //   const url = `http://localhost:3005/api/join-in/${id}`;

  //   try {
  //     const res = await fetch(url);
  //     const resData = await res.json();
  //     // 檢查資料類型是否正確，維持設定到狀態中都一定是所需的物件資料類型
  //     if (typeof resData === 'object') {
  //       setData(resData);
  //     } else {
  //       console.log('資料格式錯誤');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // //   用useEffect監聽router.isReady變動，當true時代表query中可以獲得動態屬性值
  // useEffect(() => {
  //   if (router.isReady) {
  //     // 在這裡可以確保得到router.query
  //     getTitle(router.query.id);
  //     //   console.log('router.query', router.query);
  //   }
  //   // eslint-disable-next-line
  // }, [router.isReady]);
  // const StartTime = data.StartTime
  //   ? data.StartTime.replace(/-/g, '/').slice(0, 16)
  //   : '';
  // const EndTime = data.StartTime
  //   ? data.StartTime.replace(/-/g, '/').slice(0, 16)
  //   : '';
  return (
    <>
      <div className="col-md-6 col-lg-4 py-2 ">
        <div
          className={`card shadow border border-secondary ${style['ji-around-card']}`}
        >
          <div className="card-body py-4">
            <div className="d-flex justify-content-between mb-3">
              <h4
                className={`card-title ${style['card-title-mg']} text-secondary-emphasis m-0`}
              >
                快樂小狗的聚會
              </h4>
              <span className="bg-primary text-white px-2 py-1 rounded-1 my-auto">
                開團中
              </span>
            </div>
            <div className="ji-info">
              <p className="card-text mb-3 ji-info-content text-secondary-emphasis">
                <BsClock className="ms-1 me-2" />
                2024.10.09 14:00 - 2024.10.09 16:00
              </p>
              <p className="card-text m-0 ji-info-content text-secondary-emphasis">
                <BsGeoAlt className="ms-1 me-2" />
                2024.10.09 14:00 - 2024.10.09 16:00
              </p>
            </div>
            <div className="ji-member d-flex align-items-center gap-2">
              <div className={`rounded-circle ${style['ji-img']}`}>
                <Image
                  width={100}
                  height={100}
                  className="object-fit-cover"
                  src="/#"
                  alt="1"
                />
              </div>
              <p className="my-auto text-primary">想哭的我戴上貓的面具</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
