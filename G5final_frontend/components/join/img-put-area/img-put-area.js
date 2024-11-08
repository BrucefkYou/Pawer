/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from 'react';
import style from './img-put-area.module.scss';
import { BsCardImage } from "react-icons/bs";
import { useDropzone } from 'react-dropzone';

export default function ImgPutArea({ onImageChange }) {
  const [image, setImage] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      // URL.createObjectURL() 會建立一個創建一個臨時的 URL，在不將檔案上傳到伺服器的情況下，能夠在前端顯示圖片的預覽
      const imageUrl = URL.createObjectURL(file);
      const imageName = file.name;
      setImage(imageUrl);
      onImageChange(imageUrl, imageName); // 修改這行代碼來傳遞圖片 URL 和檔名
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = () => {
    setImage(null);
    onImageChange(null, null); // 修改這行代碼來傳遞 null 值
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
          <p className={`${style['droptext']} text-body-tertiary`}>點擊此處或拖放圖片上傳
          </p>
          <p className={`${style["photo"]} text-body-tertiary`} ><BsCardImage/></p>
          </>
        )}
      </div>
    </>
  );
}
