/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from 'react';
import style from './img-put-area.module.scss';
import { useDropzone } from 'react-dropzone';

export default function ImgPutArea(props) {
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = () => {
    setImage(null);
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
          <p className="align-middle">點擊或拖放文件到這裡上傳</p>
        )}
      </div>
    </>
  );
}
