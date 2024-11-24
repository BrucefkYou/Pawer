import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Banner from '@/components/join/banner/banner';
import moment from 'moment';
import ImgPutArea from '@/components/join/img-put-area/img-put-area';
import Tag from '@/components/join/form/tag';
import AreaSelect from '@/components/join/form/area-select';
import GoogleMapComponent from '@/components/join/googleMap/GoogleMapComponent';
import { useAuth } from '@/hooks/use-auth';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Myeditor from '@/components/join/CKEditorTest';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

// react-datepicker套件 與其他相關設定
// moment 處理時間格式
import { BsCalendar } from 'react-icons/bs';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zhCN } from 'date-fns/locale';
registerLocale('zhCN', zhCN);

export default function JiEdit(props) {
  const router = useRouter();

  // 參考範例
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const handleSaveClick = () => {
    // 保存編輯後的資料
    setIsEditing(false);
  };

  const [userLocation, setUserLocation] = useState({
    lat: 25.033964,
    lng: 121.562321,
  });
  const markers = []; // 根據需要設置標記數據

  const handleUserLocationChange = (newLocation) => {
    console.log('User location changed:', newLocation);
    setUserLocation(newLocation);
  };

  const handleCancelClick = async () => {
    const result = await Swal.fire({
      title: '取消將不會保留您的修改',
      text: '確定取消嗎?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#22355c;',
      confirmButtonText: '確認取消',
      cancelButtonText: '返回修改',
    });
    if (result.isConfirmed) {
      setLoading(true);
      try {
        router.push(`/join/${router.query.id}`);
      } catch (error) {
        console.log(error);
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
  useEffect(() => {
    if (join.PositionX && join.PositionY) {
      setUserLocation({
        lat: parseFloat(join.PositionX),
        lng: parseFloat(join.PositionY),
      });
    }
  }, [join.PositionX, join.PositionY]);

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
      toast.error('請輸入數字');
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
      toast.error('開始時間不得早於當前時間');
      setStartTime(newTime(currentTime));
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

  //  表單資料

  // CKEditor
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState('');
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

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

  const { auth } = useAuth();

  const saveUpdate = async () => {
    const joinTitle = document.getElementById('join-title');
    if (!title) {
      toast('請輸入活動標題', {
        duration: 1800,
      });
      joinTitle.focus();
      joinTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const { lat, lng } = userLocation;
    try {
      const response = await fetch(
        `http://localhost:3005/api/join-in/update/${router.query.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageName,
            memberId: auth.memberData.id,
            title,
            status: 0,
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
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast('已儲存草稿', {
          duration: 1800,
        });
        router.push('http://localhost:3000/member/join/release');
      } else {
        alert(`寫入失敗: ${result.message}`);
      }
    } catch (error) {
      console.error('寫入資料失敗', error);
      alert('寫入發生錯誤，稍後再試。');
    }
  };

  // 發佈活動
  const savePublish = async () => {
    console.log(join.ImageName);
    if (!imageName && data.ImageName) {
      toast.error('請上傳封面', {
        duration: 1800,
      });
      window.scrollTo(0, 150);
      return;
    }
    const joinTitle = document.getElementById('join-title');
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
    try {
      const { lat, lng } = userLocation;
      const response = await fetch(
        `http://localhost:3005/api/join-in/update/${router.query.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageName,
            memberId: auth.memberData.id,
            title,
            status: 1,
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
        }
      );
      const result = toast('已發佈活動', {
        duration: 1800,
      });
      if (response.ok) {
        router.push('/join');
      } else {
        alert(`寫入失敗: ${result.message}`);
      }
    } catch (error) {
      console.error('寫入資料失敗', error);
      alert('寫入發生錯誤，稍後再試。');
    }
  };

  return (
    <>
      <Banner bgImgUrl="/join/banner-jism.jpg" ImgCover="cover" />
      <div className="container ji-edit-container">
        <Breadcrumbs />
        <form className="ji-ed-form " action="" method="POST">
          <div className="ji-ed-btngroup d-grid gap-3 d-flex"></div>

          <div className="card mb-3">
            <div className="card-body">
              <ImgPutArea
                onImageChange={handleImageChange}
                imageUrl={imageUrl}
              />
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
                <input type="hidden" id="EventInfo" name="EventInfo" required />
                <Myeditor
                  name="article"
                  value={join.Info}
                  onChange={(data) => {
                    setData(data);
                  }}
                  editorLoaded={editorLoaded}
                />
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
                      defaultValue={endTime}
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
                      {/* eslint-disable-next-line */}
                      <div
                        className="btn btn-secondary btn-dec"
                        aria-expanded="false"
                        onClick={handleDecrement}
                      >
                        －
                      </div>
                      <input
                        id="ParticipantLimit"
                        name="ParticipantLimit"
                        type="text"
                        className="form-control"
                        aria-label="Text input with 2 dropdown buttons"
                        value={count}
                        onChange={handleCountChange}
                      />
                      {/* eslint-disable-next-line */}
                      <div
                        className="btn btn-secondary btn-inc"
                        aria-expanded="false"
                        onClick={handleIncrement}
                      >
                        ＋
                      </div>
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
                <AreaSelect
                  city={city}
                  township={township}
                  location={location}
                  setCity={setCity}
                  setTownship={setTownship}
                  setLocation={setLocation}
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
              id="send"
              // type="submit"
              className="btn btn-danger rounded-2"
              onClick={(e) => {
                e.preventDefault();
                handleCancelClick();
              }}
            >
              取消
            </button>
            <div>
              <button
                id="send"
                // type="submit"
                className="btn btn-outline-primary rounded-2 me-3"
                onClick={(e) => {
                  e.preventDefault();
                  saveUpdate();
                }}
              >
                草稿
              </button>
              <button
                id="send"
                // type="submit"
                className="btn btn-primary rounded-2 "
                onClick={(e) => {
                  e.preventDefault();
                  savePublish();
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
}
