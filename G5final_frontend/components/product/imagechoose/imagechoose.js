import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import style from '@/components/product/imagechoose/Imagechoose.module.scss';

export default function Imagechoose({ Img, productImages, Name }) {
  const [currentImage, setCurrentImage] = useState(Img);

  // 確保當 Img 改變時更新 currentImage
  useEffect(() => {
    setCurrentImage(Img);
  }, [Img]);

  // 點擊輪播圖時更新顯示的圖片
  const changeImage = (image) => {
    setCurrentImage(image);
  };

  // RWD 時 輪播改成左右點選
  const left = () => {
    const turnIndex = productImages.findIndex(
      (img) => img.ImageName === currentImage
    );
    const prevIndex =
      (turnIndex - 1 + productImages.length) % productImages.length;
    setCurrentImage(productImages[prevIndex].ImageName);
  };

  const right = () => {
    const turnIndex = productImages.findIndex(
      (img) => img.ImageName === currentImage
    );
    const nextIndex = (turnIndex + 1) % productImages.length;
    setCurrentImage(productImages[nextIndex].ImageName);
  };

  return (
    <div>
      {/* 主視圖圖片 */}
      <div className="position-relative">
        <Image
          className="detailimg-rwd"
          src={`/product/sqlimg/${currentImage}`}
          alt={Name}
          width={510}
          height={456}
        />
        {/* 左右切換按鈕 */}
        {productImages.length > 1 && ( // 只有在有多於一張圖片時顯示按鈕
          <>
            <Image
              className={`${style.arrow} ${style.leftArrow}`}
              src="/product/sqlimg/rwdDetailrow1.png"
              alt="左"
              width={30}
              height={30}
              onClick={left}
            />
            <Image
              className={`${style.arrow} ${style.rightArrow}`}
              src="/product/sqlimg/rwdDetailrow2.png"
              alt="右"
              width={30}
              height={30}
              onClick={right}
            />
          </>
        )}
      </div>

      {/* 輪播圖 */}
      <div className="row mt-3 detail-rwd-none">
        <div className="col d-flex detail-left-turn">
          {productImages.length > 0 &&
            productImages.map((image, index) =>
              image.ImageName ? (
                <div className="col" key={index}>
                  <Image
                    className="detailimg-rwd detailimg-576up"
                    src={`/product/sqlimg/${image.ImageName}`}
                    alt={Name}
                    width={112}
                    height={138}
                    onClick={() => changeImage(image.ImageName)} // 更新主視圖
                  />
                </div>
              ) : null
            )}
        </div>
      </div>
    </div>
  );
}
