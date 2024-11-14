/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from 'react';
import style from './img-put-area.module.scss';
import { BsCardImage } from 'react-icons/bs';
import { useDropzone } from 'react-dropzone';
import { useEffect } from 'react';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export default function ImgPutArea({ onImageChange, imageUrl }) {
  const [image, setImage] = useState(imageUrl);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      const formData = new FormData();
      formData.append('joinImage', file);

      try {
        const response = await fetch(
          'http://localhost:3005/api/join-in/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        if (response.ok) {
          onImageChange(data.url, data.name); // 傳遞檔案名稱
        } else {
          console.error('上傳失敗:', data.message);
        }
      } catch (error) {
        console.error('上傳過程中發生錯誤:', error);
      }
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDelete = () => {
    setImage(null);
    onImageChange(null, null);
  };

  return (
    <>
      <div {...getRootProps()} className={`rounded-1 ${style['dropbox']}`}>
        <input {...getInputProps()} />
        {image ? (
          <div>
            <img src={image} alt="預覽" className={`${style['view-img']}`} />
            <button
              className={`btn btn-primary ${style['change-img-button']}`}
              onClick={handleDelete}
            >
              換一張
            </button>
          </div>
        ) : (
          <>
            <p className={`${style['droptext']} text-body-tertiary`}>
              點擊此處或拖放圖片上傳
            </p>
            <p className={`${style['photo']} text-body-tertiary`}>
              <BsCardImage />
            </p>
          </>
        )}
      </div>
    </>
  );
}
