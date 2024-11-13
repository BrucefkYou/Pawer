/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from '@/components/home/banner/banner.module.scss';

export default function Banner(props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const slides = [
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

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="position-relative">
              <div className="bg-banner">
                <Slider {...settings}>
                  {slides.map((slide, index) => (
                    <div key={index}>
                      <img src={slide.imgSrc} alt={`slide ${index}`} />
                    </div>
                  ))}
                </Slider>
                <button
                  className={style.leftArrow}
                  onClick={() =>
                    setCurrentSlide(
                      (currentSlide - 1 + slides.length) % slides.length
                    )
                  }
                >
                  <img src="/product/sqlimg/rwdDetailrow1.png" alt="左" />
                </button>
                <button
                  className={style.rightArrow}
                  onClick={() =>
                    setCurrentSlide((currentSlide + 1) % slides.length)
                  }
                >
                  <img src="/product/sqlimg/rwdDetailrow2.png" alt="右" />
                </button>
              </div>
              <div className="d-flex btnGap-wei">
                {slides[currentSlide].buttons.map((button, index) => (
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
