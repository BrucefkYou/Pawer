import Head from 'next/head';
import ImgPutArea from '@/components/join/img-put-area/img-put-area';
import Image from 'next/image';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import titlebottomLine from '@/assets/titleBottomLine.svg';
import dynamic from 'next/dynamic';
import MySelect from '@/components/join/controlled-form/my-select';
import Tag from '@/components/join/form/tag';
// import styles from '@/styles/Articles.module.sass';
import Link from 'next/link';
import Myeditor from '@/components/join/CKEditorTest';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Publish = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();

  const saveToDb = async () => {
    try {
      const response = await fetch('/api/joinin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          joinin: data,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('資料寫入成功');
        router.push('/');
        // 測試先帶入的路徑，之後要改成正確的路徑
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
          <div className="page-heading">
            <div className="page-title">
              <div className="ji-create-title">
                <h3 className="h3 text-primary">創建你的活動</h3>
                <Image src={titlebottomLine} />
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <ImgPutArea />
              </div>
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
                <input type="hidden" id="EventInfo" name="EventInfo" require />
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
                    <input
                      id="StartTime"
                      name="StartTime"
                      type="datetime-local"
                      className="form-control flatpickr-no-config flatpickr-input active"
                      placeholder="活動開始時間"
                      required
                    />
                  </div>

                  <div className=" col">
                    <label htmlFor="EndTime" className="form-label col-3">
                      活動結束時間
                    </label>
                    <input
                      id="EndTime"
                      name="EndTime"
                      type="datetime-local"
                      className="form-control  flatpickr-no-config flatpickr-input active "
                      placeholder="結束時間"
                      required
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
                        -
                      </button>
                      <input
                        id="ParticipantLimit"
                        name="ParticipantLimit"
                        type="text"
                        className="form-control"
                        aria-label="Text input with 2 dropdown buttons"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                      />
                      <button
                        className="btn btn-secondary"
                        type="button"
                        aria-expanded="false"
                        onClick={handleIncrement}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className=" col">
                    <label htmlFor="SignEndTime" className="form-label col-3">
                      截團時間
                    </label>
                    <input
                      id="SignEndTime"
                      name="SignEndTime"
                      type="datetime-local"
                      className="form-control  flatpickr-no-config flatpickr-input active "
                      placeholder="截團時間"
                      required
                    />
                  </div>
                </div>
              </div>
              <div id="join-address" className="mb-3">
                <MySelect />
              </div>
              <div className="mb-3">
                <Tag
                  label="活動標籤"
                  placeholder="輸入活動＃標籤，最多三個"
                  tagLength={3}
                />
              </div>
              {/* Tag 輸入框區 */}
            </div>
          </div>
          <div className="d-flex justify-content-center my-5">
            <button
              id="send"
              type="submit"
              className="btn btn-primary rounded-2 ji-pr-btn"
            >
              預覽
            </button>
          </div>
        </form>
      </div>

      <div className="input-group mt-2">
        <button className="btn btn-primary ms-auto" onClick={saveToDb}>
          送出
        </button>
      </div>
    </>
  );
};
export default Publish;
