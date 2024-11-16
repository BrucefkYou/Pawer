import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsCamera } from 'react-icons/bs';

export default function PreviewUploadImage({
  avatarImg = '',
  googleAvatarImg = '',
  avatarBaseUrl = '',
  defaultImg = 'avatar-default.png',
  setSelectedFile,
  selectedFile,
}) {
  // 預覽圖片
  const [preview, setPreview] = useState('');

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const showImg = () => {
    if (selectedFile) {
      return preview;
    }

    if (avatarImg) {
      return avatarBaseUrl + '/' + avatarImg;
    }

    if (googleAvatarImg) {
      return googleAvatarImg;
    }

    return avatarBaseUrl + '/' + defaultImg;
  };

  return (
    <div>
      <label
        className="mb-3 position-relative cursor-pointer avatar-container"
        htmlFor="avatar-input"
      >
        <Image
          className="avatar-img"
          src={showImg()}
          alt=""
          width={150}
          height={150}
        />
        <div className="camera-icon">
          <BsCamera />
        </div>
      </label>
      <input
        id="avatar-input"
        type="file"
        name="file"
        className="d-none"
        onChange={handleFileChange}
      />
    </div>
  );
}
