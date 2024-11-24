import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import toast from 'react-hot-toast';

import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Myeditor from '@/components/join/CKEditorTest';
import Tag from '@/components/join/form/tag';

import { handleSubmit } from '@/components/blog/utils/handleSubmit ';
import { handleSaveDraft } from '@/components/blog/utils/handleSaveDraft';

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
  const [tags, setTags] = useState([]);
  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const router = useRouter();

  // 圖片預覽上傳
  const uploadCover = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('沒有選擇任何檔案');
      return;
    }

    // console.log('選擇的檔案:', file);

    const imageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/jfif',];
    if (!imageTypes.includes(file.type)) {
      toast('請選擇有效的圖片檔案 (.jpg, .jpeg, .png, .webp, .svg, .jfif)');
      return;
    }
    // 預覽圖片
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      // console.log('預覽成功:', reader.result);
    };
    reader.onerror = () => {
      console.error('預覽失敗:', reader.error);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('imageFile', file);

    // console.log('準備上傳的圖片:', formData.get('imageFile'));

    try {
      const response = await fetch('http://localhost:3005/api/blog/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        // const fullImageUrl = `${data.url}`;
        // setUploadedImageUrl(fullImageUrl);
        setUploadedImageUrl(data.url);

        setImageName(data.name);
        // console.log('上傳成功:', data.url);
        // console.log('圖片名稱:', data.name);
      } else {
        console.error('上傳失敗:', data.message);
      }
    } catch (error) {
      console.error('發生錯誤:', error);
    }
  };


  const handlePreview = () => {
    const previewData = {
      title,
      content: data,
      tags: tags.join(','),
      imageName,
      previewImage: uploadedImageUrl || previewImage,
      memberId: uid,
    };
    localStorage.setItem('blogPreviewData', JSON.stringify(previewData));
    // console.log(localStorage.getItem('blogPreviewData'))

    router.push('/blog/preview');
  };

  useEffect(() => {
    const saveBlogData = localStorage.getItem('blogTemData');
    // console.log('從預覽頁回來的資料', saveBlogData);
    if (saveBlogData) {
      const { title, content, tags, imageName, previewImage } =
        JSON.parse(saveBlogData);

      if (title) setTitle(title);
      if (content) setData(decodeURIComponent(content));
      if (tags) {
        const tagsArray = tags.split(',');
        setTags(tagsArray);
      }
      if (imageName) setImageName(imageName);
      if (previewImage) setUploadedImageUrl(previewImage);

      // localStorage.removeItem('blogTemData')

    }
  }, []);

  
  const handleSaveDraftClean = (e) => {
    handleSaveDraft(e, uid, title, data, tags, imageName, router, uploadedImageUrl);
    localStorage.removeItem('blogTemData');
  };

  const handleSubmitClean = (e) => {
    handleSubmit(e, uid, title, data, tags, imageName, router, uploadedImageUrl);
    localStorage.removeItem('blogTemData');
  }
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Pawer寶沃-部落格創建</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                  style={{
                    objectFit: uploadedImageUrl ? 'cover' : 'scale-down',
                  }}
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
                <div id="editor-container"></div>
                <input type="hidden" id="edit" name="edit" />
                <Myeditor
                  name="article"
                  onChange={(data) => {
                    setData(data);
                  }}
                  value={data}
                  editorLoaded={editorLoaded}
                />
              </div>

              <Tag
                label="文章標籤"
                placeholder="輸入文章＃標籤，最多五個"
                tagLength={5}
                tags={tags}
                setTags={handleTagsChange}
              />
            </div>

            {/* 底部按鈕 */}
            <div className="blog-bottom-btn">
              <Link
                href={`http://localhost:3000/member/blog`}
                className="btn btn-danger text-decoration-none"
                type="button"
              >
                捨棄
              </Link>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handlePreview}
                >
                  預覽
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleSaveDraftClean}                 >
                  儲存草稿
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmitClean}
                >
                  發佈文章
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-bottom-btn-mobile">
          <Link
            href={`http://localhost:3000/member/blog`}
            className="col btn-mobile text-decoration-none"
            type="button"
          >
            <FaTrashAlt className="icon" />
            捨棄
          </Link>
          <button className="col btn-mobile" onClick={handlePreview}>
            <FaEye className="icon" />
            預覽
          </button>

          <button className="col btn-mobile">
            <BsBookmarkFill
              className="icon "
              onClick={handleSaveDraftClean}
            />
            儲存草稿
          </button>

          <button
            className="col btn-mobile"
            onClick={handleSubmitClean}
          >
            <FaUpload className="icon" />
            發佈文章
          </button>
        </div>
      </div>
    </>
  );
}
