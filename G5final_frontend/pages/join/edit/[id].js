import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import pawButton from '@/assets/pawButton.svg';
import Banner from '@/components/join/banner/banner';
import moment from 'moment';
import AroundJoinCard from '@/components/join/detail/around-join-card/around-join-card';
import ClickIcon from '@/components/icons/click-icon/click-icon';
import ImgPutArea from '@/components/join/img-put-area/img-put-area';
import Tag from '@/components/join/form/tag';
import TWZipCode from '@/components/join/controlled-form/tw-zipcode';
import { useAuth } from '@/hooks/use-auth';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Swal from 'sweetalert2';
// react-datepicker套件 與其他相關設定
// moment 處理時間格式
import { BsCalendar } from 'react-icons/bs';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zhCN } from 'date-fns/locale';
registerLocale('zhCN', zhCN);

import {
  BsClock,
  BsGeoAlt,
  BsBookmarkFill,
  BsChevronRight,
  BsBookmark,
} from 'react-icons/bs';

export default function JiDetail(props) {
  const router = useRouter();

  // 參考範例
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // 保存編輯後的資料
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // 刪除活動
  const handleDeletClick = async () => {
    const result = await Swal.fire({
      title: '確定要刪除這個活動嗎？',
      text: '這個操作無法撤銷！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認刪除',
      cancelButtonText: '取消',
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

  const updateImageTags = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img');

    images.forEach((img) => {
      img.classList.add('img-fluid');
    });

    return doc.body.innerHTML;
  };

  // 判斷是否登入
  const { auth } = useAuth();
  const islogin = () => {
    if (auth.isAuth) {
      router.push(`/`);
    } else {
      router.push(`/member/login`);
    }
  };

  const [join, setjoin] = useState({});
  const getTitle = async (id) => {
    const url = `http://localhost:3005/api/join-in/${id}`;
    try {
      const res = await fetch(url);
      const resjoin = await res.json();
      // 檢查資料類型是否正確，維持設定到狀態中都一定是所需的物件資料類型
      if (typeof resjoin === 'object') {
        const updatedjoin = {
          ...resjoin,
          Info: updateImageTags(resjoin.Info), // Update the <img> tags before setting the state
        };
        setjoin(updatedjoin);
        setError(null);
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

  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const fetchImageUrl = () => {
      if (join.ImageName) {
        const url = `http://localhost:3005/join/${join.ImageName}`;
        setImageUrl(url);
      }
    };

    fetchImageUrl();
  }, [join.ImageName]);

  //------------- 編輯表單內容----------------//
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handleCountChange = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      Swal.fire('請輸入數字');
      // alert('請輸入數字');
      setCount(1);
    } else {
      setCount(Number(value));
    }
  };
  // 只需要上傳圖片名字，不需要圖片本身，也不用imgUrl
  const handleImageChange = (imgUrl, imageName) => {
    setImageName(imageName);
  };
  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const handleStartTimeChange = (date) => {
    const currentTime = moment();
    if (moment(date).isBefore(currentTime)) {
      Swal.fire('開始時間不得早於當前時間');
      setStartTime(newTime(currentTime));
    } else {
      setStartTime(newTime(date));
    }
  };

  const handleEndTimeChange = (date) => {
    if (moment(date).isBefore(startTime)) {
      Swal.fire('不得早於開始時間');
      setEndTime(startTime);
    } else {
      setEndTime(newTime(date));
    }
  };

  const handleSignEndDateChange = (date) => {
    if (moment(date).isAfter(endTime)) {
      Swal.fire('不得晚於結束時間');
      setSignEndDate(startTime);
    } else {
      setSignEndDate(newTime(date));
    }
  };

  //  表單資料
  const newTime = (time) => moment(time).format('YYYY/MM/DD HH:mm');
  const [imageName, setImageName] = useState('');
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(newTime);
  const [endTime, setEndTime] = useState(newTime);
  const [count, setCount] = useState(0);
  const [signEndDate, setSignEndDate] = useState(newTime);
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState('');
  const [township, setTownship] = useState('');
  const [location, setLocation] = useState('');

  // useEffect 獲取原始資料
  useEffect(() => {
    fetch(`http://localhost:3005/api/join-in/${router.query.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.Title || '');
        setCount(data.ParticipantLimit || 0);
        setStartTime(data.StartTime || '');
        setEndTime(data.EndTime || '');
        setSignEndDate(data.SignEndTime || '');
        setCity(data.City || '');
        setTownship(data.Township || '');
        setLocation(data.Location || '');
        setTags(data.Tags ? data.Tags.split(',') : []);
        console.log(data);
      })
      .catch((error) => console.error('Error:', error));
  }, [router.query.id]);

  // 處理時間格式，但後來新增的有使用moment()先處理，之後可以換掉
  const StartTime = join.StartTime
    ? join.StartTime.replace(/-/g, '/').slice(0, 16)
    : '';
  const EndTime = join.StartTime
    ? join.StartTime.replace(/-/g, '/').slice(0, 16)
    : '';
  const address = join.City + join.Township + join.Location;
  const tag = join.Tags ? join.Tags.split(',') : [];

  const display = (
    <div className="container ji-edit-container">
      <Breadcrumbs />
      <form className="ji-ed-form bg-white" action="" method="POST">
        <div className="ji-ed-btngroup d-grid gap-3 d-flex">
          {isEditing ? (
            <>
              <button
                className="btn btn-success"
                type="button"
                onClick={handleSaveClick}
              >
                保存
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleCancelClick}
              >
                取消
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        {isEditing ? (
          <div className="ji-edit-form">
            {/* 編輯表單內容 */}
            <div className="card mb-3">
              <div className="card-body">
                <ImgPutArea onImageChange={handleImageChange} />
              </div>
            </div>

            {/* <div className="mb-3">
              <label htmlFor="info" className="form-label">
                活動內容
              </label>     
            </div> */}
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label
                    htmlFor="EventTitle"
                    className="form-label col-3 required"
                  >
                    活動標題
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="EventTitle"
                      name="EventTitle"
                      placeholder="輸入活動標題"
                      defaultValue={join.Title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 mt-1">
                  <label
                    htmlFor="editor-container"
                    className="ji-content mb-2 required"
                  >
                    活動內容
                  </label>
                  <div id="full"></div>
                  <input
                    type="hidden"
                    id="EventInfo"
                    name="EventInfo"
                    required
                  />
                  {/* <Myeditor
                    name="article"
                    onChange={(data) => {
                      setData(data);
                    }}
                    editorLoaded={editorLoaded}
                  /> */}
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="StartTime" className="form-label col-3">
                        活動開始時間
                      </label>
                      <DatePicker
                        showIcon
                        icon={<BsCalendar />}
                        selected={startTime}
                        onChange={handleStartTimeChange}
                        timeInputLabel="Time:"
                        dateFormat="yyyy/MM/dd HH:mm"
                        showTimeInput
                      />
                    </div>

                    <div className=" col">
                      <label htmlFor="EndTime" className="form-label col-3">
                        活動結束時間
                      </label>
                      <DatePicker
                        showIcon
                        icon={<BsCalendar />}
                        selected={endTime}
                        onChange={handleEndTimeChange}
                        timeInputLabel="Time:"
                        dateFormat="yyyy/MM/dd HH:mm"
                        showTimeInput
                        defaultValue={EndTime}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="ParticipantLimit" className="form-label">
                        人數上限
                      </label>
                      <div className="input-group">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          aria-expanded="false"
                          onClick={handleDecrement}
                        >
                          －
                        </button>
                        <input
                          id="ParticipantLimit"
                          name="ParticipantLimit"
                          type="text"
                          className="form-control"
                          aria-label="Text input with 2 dropdown buttons"
                          value={count}
                          onChange={handleCountChange}
                        />
                        <button
                          className="btn btn-secondary"
                          type="button"
                          aria-expanded="false"
                          onClick={handleIncrement}
                        >
                          ＋
                        </button>
                      </div>
                    </div>
                    <div className=" col">
                      <label htmlFor="SignEndTime" className="form-label col-3">
                        截團時間
                      </label>
                      <DatePicker
                        showIcon
                        icon={<BsCalendar />}
                        selected={signEndDate}
                        onChange={handleSignEndDateChange}
                        timeInputLabel="Time:"
                        dateFormat="yyyy/MM/dd HH:mm"
                        showTimeInput
                      />
                    </div>
                  </div>
                </div>
                <div id="join-address" className="mb-3">
                  <TWZipCode
                    city={city}
                    township={township}
                    location={location}
                    setCity={setCity}
                    setTownship={setTownship}
                    setLocation={setLocation}
                  />
                  {/* <MySelect data={addressData} setData={setAddressData} /> */}
                </div>
                <div className="mb-2">
                  <Tag
                    label="活動標籤"
                    placeholder="輸入活動＃標籤，最多三個"
                    tagLength={3}
                    tags={tags}
                    setTags={handleTagsChange}
                  />
                </div>
                {/* Tag 輸入框區 */}
              </div>
            </div>
          </div>
        ) : (
          <div className="ji-view-form">
            {/* 原本的顯示內容 */}
            <div className="ji-image">
              {/* eslint-disable  */}
              <Image
                className="ji-img1"
                width={1176}
                height={532}
                src={imageUrl}
                alt={`${join.Title}首圖`}
              />
            </div>
            <div className="detail-section1 px-3">
              <div className="d-flex flex-wrap flex-sm-nowrap py-4">
                <div className="w-100">
                  <h4 className="h4 text-secondary-emphasis">{join.Title}</h4>
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
                          <ClickIcon className="" IconFilled={BsBookmarkFill} IconOutline={BsBookmark} count={join.joinFavCount}/>
                        </div>
                      </div>
                      <div className="ji-sidecard-info text-secondary-emphasis">
                        <div className="row">
                          <p className="col card-text mb-3 ji-info-content">
                            目前參加人數
                          </p>
                          <p className="col text-end">
                            {join.SignCount}<span>人</span>
                          </p>
                        </div>
                        <div className="row">
                          <p className="col card-text mb-3 ji-info-content">
                            剩餘報名人數
                          </p>
                          <p className="col text-end">
                            {join.ParticipantLimit-join.SignCount}<span>人</span>
                          </p>
                        </div>
                      </div>
                      <button 
                        className="btn btn-primary w-100" 
                        onClick={islogin} 
                        disabled
                      >
                        {join.ParticipantLimit - join.SignCount > 0 ? "立即報名" : "報名已額滿"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-section2 mb-5">
              <h5 className="h5">活動內容</h5>
              <div dangerouslySetInnerHTML={{ __html: join.Info }} />
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
          </div>
        )}
      </form>

     {isEditing? "":(<div className="my-5">
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
      </div>)}
    </div>
  );

  return (
    <>
      <Banner bgImgUrl="/join/banner-jism.jpg" ImgCover="cover" />
      {display}
    </>
  );
}
