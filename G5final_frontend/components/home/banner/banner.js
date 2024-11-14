/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from '@/components/home/banner/banner.module.scss';

export default function Banner(props) {
  const [changeBanner, setChangeBanner] = useState(0);
  const sliderRef = useRef(null); // 不要一直重新渲染所以使用 ref 來控制 Slider
  const autoSlideRef = useRef(null); // 用於自動切換的計時器

  // Slider 套件設定
  const settings = {
    dots: true, // banner下方的點點圖
    arrows: false, // 關閉預設箭頭樣式及功能
    infinite: true, // 是否無限循環
    speed: 1000, // 切換速度
    slidesToShow: 1, // 每次切換顯示數量
    slidesToScroll: 1, // 滾動的數量
    beforeChange: (prev, next) => setChangeBanner(next), // beforeChange套件函式,prev, next參數可以自定義 當前顯示,下一個顯示
  };

  // 陣列物件的各位內容可以自己更改
  const banner = [
    {
      imgSrc: './home/banner/about.png',
      buttons: [
        { text: '關於我們', link: '/', style: 'btnPrimary-wei' },
        { text: '聯繫我們', link: '/', style: 'btnWhite-wei' },
      ],
    },
    {
      imgSrc: './home/banner/HealthSupplements.png',
      buttons: [
        { text: '開始購物', link: '/product', style: 'btnPrimary-wei' },
        { text: '聯繫我們', link: '/', style: 'btnWhite-wei' },
      ],
    },
    {
      imgSrc: './home/banner/Blog.png',
      buttons: [
        { text: '開始閱讀', link: '/blog', style: 'btnPrimary-wei' },
        { text: '聯繫我們', link: '/', style: 'btnWhite-wei' },
      ],
    },
    {
      imgSrc: './home/banner/PetParty.png',
      buttons: [
        { text: '開始揪團', link: '/join', style: 'btnPrimary-wei' },
        { text: '聯繫我們', link: '/', style: 'btnWhite-wei' },
      ],
    },
    {
      imgSrc: './home/banner/PetCommunication.png',
      buttons: [
        { text: '預約溝通', link: '/communicator', style: 'btnPrimary-wei' },
        { text: '聯繫我們', link: '/', style: 'btnWhite-wei' },
      ],
    },
  ];

  // 自動切換功能
  const startAuto = () => {
    autoSlideRef.current = setInterval(() => {
      sliderRef.current.slickNext();
    }, 3000); // 每多少毫秒切換一次
  };
  // 點擊切換時清除自動切換並重新啟動
  const next = () => {
    clearInterval(autoSlideRef.current);
    sliderRef.current.slickNext();
    setTimeout(startAuto, 3000); // 3秒後重新啟動自動切換
  };
  const prev = () => {
    clearInterval(autoSlideRef.current);
    sliderRef.current.slickPrev();
    setTimeout(startAuto, 3000); // 3秒後重新啟動自動切換
  };

  useEffect(() => {
    startAuto(); // 啟動自動切換
    return () => {
      clearInterval(autoSlideRef.current); // 清除計時器
    };
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="position-relative">
              <div className="bg-banner">
                <Slider ref={sliderRef} {...settings}>
                  {banner.map((slide, index) => (
                    <div key={index}>
                      <img src={slide.imgSrc} alt={`slide ${index}`} />
                    </div>
                  ))}
                </Slider>
                {/* 左右按鈕可以自己用想用的樣子 */}
                <button className={style.leftArrow} onClick={prev}>
                  <img src="/product/sqlimg/rwdDetailrow1.png" alt="左" />
                </button>
                <button className={style.rightArrow} onClick={next}>
                  <img src="/product/sqlimg/rwdDetailrow2.png" alt="右" />
                </button>
              </div>
              <div className="d-flex btnGap-wei">
                {banner[changeBanner].buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.link}
                    className={`btn ${button.style}`}
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
