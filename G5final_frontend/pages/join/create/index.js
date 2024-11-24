import ImgPutArea from '@/components/join/img-put-area/img-put-area';
import Image from 'next/image';
import Head from 'next/head';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import titlebottomLine from '@/assets/titleBottomLine.svg';
import AreaSelect from '@/components/join/form/area-select';
import GoogleMapComponent from '@/components/join/googleMap/GoogleMapComponent';
import Tag from '@/components/join/form/tag';
import Myeditor from '@/components/join/CKEditorTest';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import saveToDo from '@/pages/join/create/savetodo';

import { useAuth } from '@/hooks/use-auth';

// react-datepicker套件 與其他相關設定
// moment 處理時間格式
import { BsCalendar } from 'react-icons/bs';
import moment from 'moment';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zhCN } from 'date-fns/locale';
import toast from 'react-hot-toast';
registerLocale('zhCN', zhCN);

const Publish = () => {
  const router = useRouter();
  // 要先解構出來，才能使用
  const { auth } = useAuth();
  // console.log(auth.memberData.id);

  // 人數上限 +1 -1 按鈕設定
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
      toast.error('請輸入數字');
      // alert('請輸入數字');
      setCount(1);
    } else {
      setCount(Number(value));
    }
  };

  // CKEditor 設定
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState('');

  // 用moment套件 更改送入資料庫的日期顯示格式
  const newTime = (time) => moment(time).format('YYYY/MM/DD HH:mm');
  //  表單資料
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
  const [userLocation, setUserLocation] = useState({
    lat: 25.033964,
    lng: 121.562321,
  });
  const markers = []; // 根據需要設置標記數據

  const handleUserLocationChange = (newLocation) => {
    console.log('User location changed:', newLocation);
    setUserLocation(newLocation);
  };

  useEffect(() => {
    if (city && township && location) {
      const address = `${city}${township}${location}`;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setUserLocation({ lat, lng });
            console.log('新的座標:', { lat, lng });
          }
        })
        .catch((error) => console.error('獲取座標失敗', error));
    }
  }, [city, township, location]);

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
      toast.error('開始時間不得早於當前時間');
      setStartTime(newTime(currentTime));
      // } else if(moment(date).isAfter(endTime)){
      //   Swal.fire('開始時間不得晚於結束時間');
      //   setStartTime(newTime(currentTime));
    } else {
      setStartTime(newTime(date));
    }
  };

  const handleEndTimeChange = (date) => {
    if (moment(date).isBefore(startTime)) {
      toast.error('結束時間不得早於開始時間');
      setEndTime(startTime);
    } else {
      setEndTime(newTime(date));
    }
  };

  const handleSignEndDateChange = (date) => {
    if (moment(date).isAfter(endTime)) {
      toast.error('截止時間不得晚於結束時間');
      setSignEndDate(startTime);
    } else {
      setSignEndDate(newTime(date));
    }
  };

  // 執行送出表單;
  const saveToDo = async () => {
    if (!imageName) {
      toast.error('請上傳封面', {
        duration: 1800,
      });
      window.scrollTo(0, 150);
      return;
    }
    const joinTitle = document.querySelector('#join-title');
    if (!title) {
      // 標題必填
      toast.error('請輸入活動標題', {
        duration: 1800,
      });
      joinTitle.focus();
      joinTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!data) {
      // 內容必填
      toast.error('請輸入活動內容', {
        duration: 1800,
      });
      window.scrollTo(0, 900);
      return;
    }
    if (startTime > endTime) {
      // 開始時間不得早於結束時間
      toast.error('開始時間不得早於結束時間', {
        duration: 1800,
      });
      window.scrollTo(0, 1100);
      return;
    }
    if (count < 1) {
      toast.error('人數上限不得小於1', {
        duration: 1800,
      });
      window.scrollTo(0, 1200);
      return;
    }
    if (city === '' || township === '' || location === '') {
      toast.error('請輸入活動地點', {
        duration: 1800,
      });
      window.scrollTo(0, 1400);
      return;
    }

    const { lat, lng } = userLocation;
    try {
      const response = await fetch('http://localhost:3005/api/join-in/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageName,
          memberId: auth.memberData.id,
          title,
          info: data,
          startTime,
          endTime,
          count,
          signEndDate,
          city,
          township,
          location,
          tags,
          lat,
          lng,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        toast('發佈成功', {
          duration: 1800,
        });
        router.push('/join');
      } else {
        alert(`寫入失敗: ${result.message}`);
      }
    } catch (error) {
      console.error('寫入文章失敗', error);
      alert('寫入發生錯誤，稍後再試。');
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const saveDraft = async () => {
    const joinTitle = document.querySelector('#join-title');
    if (!title) {
      // 草稿需要標題
      toast.error('請輸入活動標題', {
        duration: 1800,
      });
      joinTitle.focus();
      joinTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const { lat, lng } = userLocation;
    try {
      const response = await fetch('http://localhost:3005/api/join-in/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageName,
          memberId: auth.memberData.id,
          status: 0,
          title,
          info: data,
          startTime,
          endTime,
          count,
          signEndDate,
          city,
          township,
          location,
          tags,
          lat,
          lng,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        toast('已儲存為草稿', {
          duration: 1800,
        });
        router.push('/join');
      } else {
        alert(`寫入失敗: ${result.message}`);
      }
    } catch (error) {
      console.error('寫入文章失敗', error);
      alert('寫入發生錯誤，稍後再試。');
    }
  };

  return (
    <>
      <Head>
        <title>Pawer寶沃-活動創建</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container ji-create-container">
        <Breadcrumbs />
        <form
          id="join-form"
          action="."
          method="POST"
          encType="multipart/form-data"
        >
          <div className="ji-title" id="ji-title">
            <h3 className="h3 text-primary">創建你的活動</h3>
            <Image src={titlebottomLine} />
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <ImgPutArea id={'join-img'} onImageChange={handleImageChange} />
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label
                  htmlFor="join-title"
                  className="form-label col-3 required"
                >
                  活動標題
                </label>
                <div className="col">
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="join-title"
                    name="join-title"
                    placeholder="輸入活動標題"
                    required
                    onChange={(e) => setTitle(e.target.value)}
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
                  name="joinInfo"
                  defaultValue="?"
                  id="join-info"
                />
                <Myeditor
                  name="join-info"
                  onChange={(data) => {
                    setData(data);
                  }}
                  editorLoaded={editorLoaded}
                  required
                />
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <label
                      htmlFor="StartTime"
                      className="form-label col-3 required"
                    >
                      開始時間
                    </label>
                    <DatePicker
                      showIcon
                      icon={<BsCalendar />}
                      selected={startTime}
                      onChange={handleStartTimeChange}
                      timeInputLabel="Time:"
                      dateFormat="yyyy/MM/dd HH:mm"
                      showTimeInput
                      required
                    />
                  </div>

                  <div className=" col">
                    <label
                      htmlFor="EndTime"
                      className="form-label col-3 required"
                    >
                      結束時間
                    </label>
                    <DatePicker
                      showIcon
                      icon={<BsCalendar />}
                      selected={endTime}
                      onChange={handleEndTimeChange}
                      timeInputLabel="Time:"
                      dateFormat="yyyy/MM/dd HH:mm"
                      showTimeInput
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <label
                      htmlFor="ParticipantLimit"
                      className="form-label required"
                    >
                      人數上限
                    </label>
                    <div className="input-group">
                      <button
                        className="btn btn-secondary btn-dec"
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
                        className="btn btn-secondary btn-inc"
                        type="button"
                        aria-expanded="false"
                        onClick={handleIncrement}
                      >
                        ＋
                      </button>
                    </div>
                  </div>
                  <div className=" col">
                    <label
                      htmlFor="SignEndTime"
                      className="form-label col-3 required"
                    >
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
                      required
                    />
                  </div>
                </div>
              </div>
              <div id="join-address" className="mb-3">
                <AreaSelect
                  city={city}
                  township={township}
                  location={location}
                  setCity={setCity}
                  setTownship={setTownship}
                  setLocation={setLocation}
                  required
                />
                <GoogleMapComponent
                  markers={markers}
                  userLocation={userLocation}
                  onUserLocationChange={handleUserLocationChange}
                />
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
          <div className="d-flex justify-content-between my-5">
            <button
              className="ji-preview-btn btn btn-danger rounded-2"
              onClick={(e) => {
                e.preventDefault();
                saveDraft();
              }}
            >
              取消
            </button>
            <div>
              <button
                className="ji-preview-btn btn btn-outline-primary rounded-2 me-3"
                onClick={(e) => {
                  e.preventDefault();
                  saveDraft();
                }}
              >
                草稿
              </button>
              <button
                id="send"
                // type="submit"
                className="btn btn-primary rounded-2"
                onClick={(e) => {
                  e.preventDefault();
                  saveToDo();
                }}
              >
                發佈
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Publish;
