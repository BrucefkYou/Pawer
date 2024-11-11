import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

// components
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Myeditor from '@/components/join/CKEditorTest';

// icons
import { BsBookmarkFill } from 'react-icons/bs';
import { FaUpload, FaEye, FaTrashAlt } from 'react-icons/fa';

export default function BlogCreate() {
  const { auth } = useAuth();
  const uid = auth.memberData.id;

  // 圖
  const [imageName, setImageName] = useState('尚未選擇封面');
  const [previewImage, setPreviewImage] = useState('/blog/img.png');
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  // 標題
  const [title, setTitle] = useState('');

  // ck
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState('');

  // 標籤
  const [tags, setTags] = useState('');

  const router = useRouter();

  // 圖片預覽上傳
  const uploadCover = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('沒有選擇任何檔案');
      return;
    }

    console.log('選擇的檔案:', file);

    // 預覽圖片
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      console.log('預覽成功:', reader.result);
    };
    reader.onerror = () => {
      console.error('預覽失敗:', reader.error);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('imageFile', file);

    console.log('準備上傳的圖片:', formData.get('imageFile'));

    try {
      const response = await fetch('http://localhost:3005/api/blog/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        const fullImageUrl = `http://localhost:3005${data.url}`;
        setUploadedImageUrl(fullImageUrl);
        setImageName(data.name);
        console.log('上傳成功:', fullImageUrl);
      } else {
        console.error('上傳失敗:', data.message);
      }
    } catch (error) {
      console.error('發生錯誤:', error);
    }
  };

  // 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadedImageUrl) {
      toast.error('請上傳封面', {
        duration: 1800,
        style: {
          borderRadius: '10px',
          borderTop: '15px #22355C solid',
          background: '#F5F5F5',
          color: '#646464',
          marginTop: '80px',
          width: '300px',
          height: '100px',
        },
      });
      return;
    }
    if (!title) {
      toast.error('標題是必填欄位', {
        duration: 1800,
        style: {
          borderRadius: '10px',
          borderTop: '15px #22355C solid',
          background: '#F5F5F5',
          color: '#646464',
          marginTop: '80px',
          width: '300px',
          height: '100px',
        },
      });
      return;
    }

    if (!data) {
      toast.error('內容是必填欄位', {
        duration: 1800,
        style: {
          borderRadius: '10px',
          borderTop: '15px #22355C solid',
          background: '#F5F5F5',
          color: '#646464',
          marginTop: '80px',
          width: '300px',
          height: '100px',
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append('status', 1);
    formData.append('memberId', uid);
    formData.append('title', title);
    formData.append('info', data);
    const tagsArray = tags
      .split(/[\s,]+/)
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    formData.append('tags', JSON.stringify(tagsArray));
    formData.append('imageName', imageName);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await fetch('http://localhost:3005/api/blog/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast('文章發布成功!', {
          duration: 1800,
          style: {
            borderRadius: '10px',
            borderTop: '15px #22355C solid',
            background: '#F5F5F5',
            color: '#646464',
            marginTop: '80px',
            width: '300px',
            height: '100px',
          },
        });
        router.push('/blog');
      } else {
        throw new Error('發佈失敗');
      }
    } catch (error) {
      toast('文章發布失敗', {
        duration: 1800,
        style: {
          borderRadius: '10px',
          borderTop: '15px #22355C solid',
          background: '#F5F5F5',
          color: '#646464',
          marginTop: '80px',
          width: '300px',
          height: '100px',
        },
      });
      console.error(error);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div className="bl-create">
      <div className="bl-create-main container">
        <Breadcrumbs />
        <div className="main-section">
          {/* 標題 */}
          <div className="blog-create-title">
            <h5>建立文章</h5>
            <Image src="/blog/line.svg" alt="" width={64} height={2} />
          </div>

          {/* 文章封面 */}
          <div className="card-section cover shadow rounded-1">
            <div id="image-preview-wrapper" className="image-preview-wrapper">
              <Image
                src={uploadedImageUrl || previewImage}
                alt="圖片預覽"
                fill
              />
            </div>

            <div className="cover-info">
              <label className="required" htmlFor="imageName">
                文章封面
              </label>
              <div className="upload-section">
                <div className="input-group">
                  <button
                    className="btn btn-primary"
                    onClick={() => fileInputRef.current.click()}
                  >
                    選擇封面
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    id="imageName"
                    name="imageName"
                    style={{ display: 'none' }}
                    onChange={uploadCover}
                  />
                  <input
                    className="form-control"
                    placeholder={imageName}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 輸入標題 */}
          <div className="card-section shadow rounded-1">
            <div className="blog-input">
              <label className="required" htmlFor="title">
                文章標題
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="請填寫文章標題"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 文章編輯器 */}
            <div className="blog-input">
              <label className="required" htmlFor="editor-container">
                文章內容
              </label>
              <div id="full"></div>
              <input type="hidden" id="EventInfo" name="EventInfo" />
              <Myeditor
                name="article"
                onChange={(data) => {
                  setData(data);
                }}
                editorLoaded={editorLoaded}
              />
            </div>

            {/* 標籤 */}
            <div className="blog-input">
              <label htmlFor="tags">文章標籤</label>
              <input
                type="text"
                className="form-control mb-3"
                id="tags"
                name="tags"
                placeholder="#輸入標籤"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          {/* 底部按鈕 */}
          <div className="blog-bottom-btn">
            <button type="button" className="btn btn-danger">
              捨棄
            </button>
            <div className="btn-group">
              <button type="button" className="btn btn-outline-primary">
                預覽
              </button>
              <button type="button" className="btn btn-outline-primary">
                儲存草稿
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                發佈文章
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-bottom-btn-mobile">
        <button type="button" className="col btn-mobile">
          <FaTrashAlt className="icon" />
          捨棄
        </button>

        <button className="col btn-mobile">
          <FaEye className="icon" />
          預覽
        </button>

        <button className="col btn-mobile">
          <BsBookmarkFill className="icon" />
          儲存草稿
        </button>

        <button className="col btn-mobile" onClick={handleSubmit}>
          <FaUpload className="icon" />
          發佈文章
        </button>
      </div>
    </div>
  );
}
