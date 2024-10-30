import React, { useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// components
import BreadCrumb from '@/components/blog/bread-crumb/breadcrumb';

// icons
import { BsBookmarkFill } from 'react-icons/bs';
import { FaUpload, FaEye, FaTrashAlt } from 'react-icons/fa';

// CK
const CKEditor = dynamic(() => import('@/components/blog/CKEditorComponent'), {
  ssr: false,
});

export default function BlogEdit() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageName, setImageName] = useState('尚未選擇封面');
  const [previewImage, setPreviewImage] = useState('/blog/img.png');
  const fileInputRef = useRef(null);
  const uploadCover = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const createData = {
      title,
    };
    console.log('已新增文章：', createData);
  };

  return (
    <div className="bl-create">
      <div className="bl-create-main container">
        <BreadCrumb
          breadcrumbs={[
            { name: '首頁', link: '/', isLink: 'true' },
            { name: '我的部落格', link: '/member/blog', isLink: 'true' },
            { name: '建立文章', isActive: 'page' },
          ]}
        />

        <div className="main-section">
          {/* 標題 */}
          <div className="blog-create-title">
            <h5>建立文章</h5>
            <Image src="/blog/line.svg" alt="" width={64} height={2} />
          </div>

          {/* 文章封面 */}
          <div className="card-section cover shadow rounded-1">
            <div id="image-preview-wrapper" className="image-preview-wrapper">
              <Image src={previewImage} alt="圖片預覽" fill />
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
              <label className="required" htmlFor="content">
                文章內容
              </label>
              <CKEditor />
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
