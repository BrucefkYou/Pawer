import ImgPutArea from '@/components/join/img-put-area/img-put-area';
import Image from 'next/image';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import titlebottomLine from '@/assets/titleBottomLine.svg';
import TWZipCode from '@/components/join/controlled-form/tw-zipcode';
import Tag from '@/components/join/form/tag';
import Myeditor from '@/components/join/CKEditorTest';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import { useAuth } from '@/hooks/use-auth';

// react-datepicker套件 與其他相關設定
// moment 處理時間格式
import { BsCalendar } from 'react-icons/bs';
import moment from 'moment';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zhCN } from 'date-fns/locale';
registerLocale('zhCN', zhCN);

const Publish = () => {
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
      Swal.fire('請輸入數字');
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
  const router = useRouter();

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

  // 執行送出表單
  const saveToDo = async () => {
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
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert('資料寫入成功');
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

  return (
    <>
      <div className="container ji-create-container">
        <Breadcrumbs />
        <form
          id="join-form"
          action="."
          method="POST"
          encType="multipart/form-data"
        >
          <input type="hidden" name="id" defaultValue="?" />

          <div className="ji-create-title">
            <h3 className="h3 text-primary">創建你的活動</h3>
            <Image src={titlebottomLine} />
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <ImgPutArea onImageChange={handleImageChange} />
            </div>
          </div>

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
                <input type="hidden" id="EventInfo" name="EventInfo" required />
                <Myeditor
                  name="article"
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
          <div className="d-flex justify-content-center my-5">
            <button
              id="send"
              // type="submit"
              className="btn btn-primary rounded-2 ji-pr-btn"
              onClick={(e) => {
                e.preventDefault();
                saveToDo();
              }}
            >
              {/* 預覽 */}
              預覽
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Publish;
