import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import pawButton from '@/assets/pawButton.svg';
import Banner from '@/components/join/banner/banner';
import { v4 as uuidv4 } from 'uuid';
import AroundJoinCard from '@/components/join/detail/around-join-card/around-join-card';
import ClickIcon from '@/components/icons/click-icon/click-icon';
import GoogleMapComponent from '@/components/join/googleMap/GoogleMapComponent';
import { useAuth } from '@/hooks/use-auth';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SignStatusCard from '@/components/join/detail/sign-status-card/sign-status-card';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  BsClock,
  BsGeoAlt,
  BsBookmarkFill,
  BsChevronRight,
  BsBookmark,
} from 'react-icons/bs';
import { join } from 'lodash';
import { da } from 'date-fns/locale';

export default function JiDetail(props) {
  const router = useRouter();
  // 抓取登入會員id
  const { auth } = useAuth();
  const uid = auth.memberData.id;
  const [data, setData] = useState({});
  const [joinin, setJoinin] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [currentCity, setCurrentCity] = useState(data.City);

  // 參考範例
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 更新CKEditor HTML內容中的圖片標籤
  const updateImageTags = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img');

    images.forEach((img) => {
      img.classList.add('img-fluid');
    });

    return doc.body.innerHTML;
  };

  const getTitle = async () => {
    const url = `http://localhost:3005/api/join-in/${router.query.id}`;
    try {
      const res = await fetch(url);
      const resData = await res.json();
      // 檢查資料類型是否正確，維持設定到狀態中都一定是所需的物件資料類型
      if (typeof resData === 'object') {
        const updatedData = {
          ...resData,
          Info: updateImageTags(resData.Info),
        };
        setData(updatedData);
        setError(null);
      } else {
        console.log('資料格式錯誤');
      }
    } catch (err) {
      console.log(err);
    }
  };
  //   用useEffect監聽router.isReady變動，當true時代表query中可以獲得動態屬性值

  // 編輯活動
  const handleEditClick = () => {
    router.push(`/join/edit/${router.query.id}`);
  };

  // 刪除活動
  const handleDeletClick = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger mx-1 text-white',
        cancelButton: 'btn btn-secondary text-secondary-emphasis mx-1',
      },
      buttonsStyling: false,
    });

    const result = await await swalWithBootstrapButtons.fire({
      // title: '確定要取消報名這個活動嗎？',
      text: '確定要刪除此項活動嗎？',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3005/api/join-in/${router.query.id}`,
          {
            method: 'PUT',
          }
        );
        if (response.ok) {
          console.log('活動已刪除');
          // 跳轉回到活動列表頁
          router.push('/join');
        } else {
          console.log('刪除失敗');
        }
      } catch (error) {
        console.error('刪除活動時發生錯誤', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // 處理時間格式，但後來新增的有使用moment()先處理，之後可以換掉
  const StartTime = data.StartTime
    ? data.StartTime.replace(/-/g, '/').slice(0, 16)
    : '';
  const EndTime = data.StartTime
    ? data.StartTime.replace(/-/g, '/').slice(0, 16)
    : '';
  const address = data.City + data.Township + data.Location;
  const tag = data.Tags ? data.Tags.split(',') : [];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    accessibility: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  const markers = [
    {
      PositionX: data.PositionX,
      PositionY: data.PositionY,
      FullLocation: address,
      type: 'main',
      id: data.ID,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/join-in/');
        if (!response.ok) {
          throw new Error('網路回應不成功：' + response.status);
        }
        const data = await response.json();
        if (currentCity) {
          const filteredData = data.filter(
            (v) => v.Status === 1 && v.City === currentCity
          );
          setJoinin(filteredData);
        }
        // console.log(data);
      } catch (err) {
        console.error('錯誤：', err);
      }
    };
    fetchData();
  }, [currentCity]);

  useEffect(() => {
    if (router.isReady) {
      // 在這裡可以確保得到router.query
      getTitle(router.query.id);
      //   console.log('router.query', router.query);
    }
    // eslint-disable-next-line
  }, [router.query.id]);
  useEffect(() => {
    if (data && data.City) {
      setCurrentCity(data.City);
    }
  }, [data]);

  useEffect(() => {
    const fetchImageUrl = () => {
      if (data.ImageName) {
        const url = `http://localhost:3005/join/${data.ImageName}`;
        setImageUrl(url);
      }
    };

    fetchImageUrl();
  }, [data.ImageName]);

  const handleMarkerClick = (marker) => {
    if (marker.type === 'nearby') {
      router.push(`/join/${marker.id}`); // 假設每個活動都有唯一的 id
    }
  };
  console.log(markers);

  const display = (
    <div className="container ji-detail-container">
      <Breadcrumbs />
      <form className="ji-form bg-white" action="" method="POST">
        {uid === data.MemberID ? (
          <>
            <div className="ji-detail-btngroup d-grid gap-3 d-flex">
              <button
                className="btn btn-warning"
                type="button"
                onClick={handleEditClick}
              >
                修改活動
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleDeletClick}
              >
                刪除活動
              </button>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* eslint-disable  */}
        <Image
          className="ji-img1"
          width={1176}
          height={532}
          src={imageUrl}
          alt={`${data.Title}首圖`}
        />
      
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
              {tag.map((t, index) => (
                <div key={index} type="button" className="btn btn-warning text-white py-0 px-2">
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-1">
            {/* 側邊活動狀態小卡 */}
            <SignStatusCard
           data={data}
           disabled={uid === data.MemberID}
           SignNum={data.ParticipantLimit - data.SignCount}
           btnText={uid === data.MemberID ? "團主無法報名" : ""}
          />
          </div>
        </div>
      </div>
      <div className="detail-section2 mb-5">
        <h5 className="h5">活動內容</h5>
        {/* CKEditor帶入內容 前面要記得加dangerouslySetInnerHTML 解析HTML語法 */}
       <div dangerouslySetInnerHTML={{ __html: data.Info }} />
      </div>
      <div className="detail-section3">
        <h5 className="h5">活動地點</h5>
        <GoogleMapComponent
        markers={[
          ...markers,
          ...joinin.filter(around => 
            !markers.some(marker => 
              marker.PositionX === around.PositionX && marker.PositionY === around.PositionY
            )
          ).map(around => ({
            PositionX: around.PositionX,
            PositionY: around.PositionY,
            FullLocation: around.City + around.Township + around.Location,
            type: 'nearby',
            title: around.Title,
            id: around.ID, // 假設每個活動都有唯一的 id
          }))
        ]}
      
        onMarkerClick={handleMarkerClick}
      />
        {/* <GoogleMapComponent markers={markers} /> */}
        <p className="py-1 text-center">{address}</p>
      </div>
    </form>
    {/* join活動內頁下方的附近活動 */}
    <div className="my-5">
      <SideBarCard
        title={'附近的活動'}
        img={pawButton}
        content={
          <Slider {...settings}>
          {joinin.map((data) => {
            return (
              <AroundJoinCard
                key={uuidv4()}
                iconfillcolor="#FFD700"
                data={data}
              />
            );
          })}
        </Slider>
        }
      />
    </div>
  </div>);
  if (!data) return <p>活動已下架</p>;
  return (
    <>
    <Head>
        <title>Pawer寶沃-活動明細</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner bgImgUrl="/join/banner-jism.jpg" ImgCover="cover" />
      {display}
   
    </>
  );
}
