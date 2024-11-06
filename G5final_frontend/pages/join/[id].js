import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import pawButton from '@/assets/pawButton.svg';
import Banner from '@/components/join/banner/banner';
import AroundJoinCard from '@/components/join/detail/around-join-card/around-join-card';
import ClickIcon from '@/components/icons/click-icon/click-icon';
import { useAuth } from '@/hooks/use-auth';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import {
  BsClock,
  BsGeoAlt,
  BsBookmarkFill,
  BsChevronRight,
  BsBookmark,
} from 'react-icons/bs';

export default function JiDetail(props) {
  const router = useRouter();
  const { auth } = useAuth();

  const islogin = () => {
    if (auth.isAuth) {
      router.push(`/member`);
    } else {
      router.push(`/member/login`);
    }
  };
  const [data, setData] = useState({ ID: 0, Title: '' });
  const getTitle = async (id) => {
    const url = `http://localhost:3005/api/join-in/${id}`;

    try {
      const res = await fetch(url);
      const resData = await res.json();
      // 檢查資料類型是否正確，維持設定到狀態中都一定是所需的物件資料類型
      if (typeof resData === 'object') {
        setData(resData);
      } else {
        console.log('資料格式錯誤');
      }
    } catch (err) {
      console.log(err);
    }
  };
  //   用useEffect監聽router.isReady變動，當true時代表query中可以獲得動態屬性值
  useEffect(() => {
    if (router.isReady) {
      // 在這裡可以確保得到router.query
      getTitle(router.query.id);
      //   console.log('router.query', router.query);
    }
    // eslint-disable-next-line
  }, [router.isReady]);
  const StartTime = data.StartTime
    ? data.StartTime.replace(/-/g, '/').slice(0, 16)
    : '';
  const EndTime = data.StartTime
    ? data.StartTime.replace(/-/g, '/').slice(0, 16)
    : '';
  const address = data.City + data.Township + data.Location;
  const display = (
    <div className="container ji-detail-container">
      <Breadcrumbs />
      <form className="ji-form bg-white" action="" method="POST">
        <div className="ji-image">
          {/* eslint-disable  */}
        <Image
          className="ji-img1"
          width={1176}
          height={532}
          src={`/join/${data.ImageName}`}
          alt={`${data.Title}首圖`}
        />
      </div>
      <div className="detail-section1 px-3">
        <div className="d-flex flex-wrap flex-sm-nowrap py-4">
          <div className="w-100">
            <h4 className="h4 text-secondary-emphasis">{data.Title}</h4>
            <div className="d-flex pt-3 pb-2 text-secondary-emphasis align-items-center">
              <BsClock className="mx-2" />
              <p className="m-0">{StartTime} - {EndTime} </p>
            </div>
            <div className="d-flex pt-2 pb-3 text-secondary-emphasis align-items-center">
              <BsGeoAlt className="mx-2" />
              <p className="m-0">{address}</p>
            </div>
            <div className="d-flex gap-2 ms-2 py-3">
              <div
                type="button"
                className="btn btn-warning text-white py-0 px-1"
              >
                123
              </div>
              <div
                type="button"
                className="btn btn-warning text-white py-0 px-1"
              >
                123
              </div>
              <div
                type="button"
                className="btn btn-warning text-white py-0 px-1"
              >
                123
              </div>
            </div>
          </div>
          <div className="flex-shrink-1">
            {/* 側邊活動狀態小卡 */}
            <div className="card ji-detail-side-card shadow ms-auto">
              <div className="card-body">
                <div className=" d-flex align-items-center gap-2 ">
                  <div className="ji-sidecard-imgbox rounded-circle">
                    <img className="object-fit-cover" src="/join/t1.jpg" alt="1" />
                  </div>
                  <p className="my-auto text-primary">
                    想哭的我戴上貓的面具
                  </p>
                </div>
                <div className="row py-3 text-secondary-emphasis">
                  <h5 className="col-9 card-title">快樂小狗的聚會</h5>
                  <div className="col-3 ps-0 mt-1 ">
                   <ClickIcon className="" IconFilled={BsBookmarkFill} IconOutline={BsBookmark} count={data.joinFavCount}/>
                  </div>
                </div>
                <div className="ji-sidecard-info text-secondary-emphasis">
                  <div className="row">
                    <p className="col card-text mb-3 ji-info-content">
                      目前參加人數
                    </p>
                    <p className="col text-end">
                      {data.SignCount}<span>人</span>
                    </p>
                  </div>
                  <div className="row">
                    <p className="col card-text mb-3 ji-info-content">
                      剩餘報名人數
                    </p>
                    <p className="col text-end">
                      {data.ParticipantLimit-data.SignCount}<span>人</span>
                    </p>
                  </div>
                </div>
                <button 
                  // href="#" 
                  className="btn btn-primary w-100" 
                  onClick={islogin} 
                  disabled={data.ParticipantLimit - data.SignCount <= 0}
                >
                  {data.ParticipantLimit - data.SignCount > 0 ? "立即報名" : "報名已額滿"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-section2 mb-5">
        <h5 className="h5">活動內容</h5>
        <p>
         {data.Info}
        </p>
        <div className="ji-image">
          <Image
            className="ji-img1"
            width={1144}
            height={500}
            src="/join/t3.jpg"
            alt="1"
          />
        </div>
        <div className="ji-image">
          <Image
            className="ji-img1"
            width={1144}
            height={500}
            src="/join/t4.jpg"
            alt="1"
          />
        </div>
        <div className="ji-image">
          <Image
            className="ji-img1"
            width={1144}
            height={500}
            src="/join/t2.jpg"
            alt="1"
          />
        </div>
      </div>
      <div className="detail-section3">
        <h5 className="h5">活動地點</h5>
        <iframe
          title="join-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8966.073942951458!2d121.29819338747815!3d24.99313490692153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34681f04c6c50adb%3A0xbfb45e5968b03888!2z5qGD5ZyS5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1730031675652!5m2!1szh-TW!2stw"
          className="join-map"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <p className="py-1 text-center">{address}</p>
      </div>
    </form>
    {/* join活動內頁下方的附近活動 */}
    <div className="my-5">
      <SideBarCard
        title={'附近的活動'}
        img={pawButton}
        content={
          <div className="row flex-nowrap overflow-scroll">
           <AroundJoinCard/>
           <AroundJoinCard/>
           <AroundJoinCard/>
           <AroundJoinCard/>
          </div>
        }
      />
    </div>
  </div>);
  return (
    <>
      <Banner bgImgUrl="/join/banner-jism.jpg" ImgCover="cover" />
      {display}
   
    </>
  );
}
