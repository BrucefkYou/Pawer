import React, { useState, useEffect } from 'react';
import AroundJoinCard from './detail/around-join-card/around-join-card';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function HomeJoinCard(props) {
  const [joinin, setJoinin] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/join-in');
        if (!response.ok) {
          throw new Error('網路回應不成功：' + response.status);
        }
        const data = await response.json();
        const sortJoin = data
          .filter((v) => v.Status === 1 || v.Status === '即將成團')
          .sort((a, b) => b.SignCount - a.SignCount)
          .slice(0, 7);

        console.log(sortJoin);
        setJoinin(sortJoin);
      } catch (err) {
        console.error('錯誤：', err);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    accessibility: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="container sec4-con">
        <div className="sec4-event-text">
          <p className="sec4-newtext">
            最新的<span className="sec4-pet">寵物聚會</span>
          </p>
          <p className="PetParty mb-5">Pet Party</p>
        </div>
        <Slider {...settings}>
          {joinin.map((data) => {
            return (
              <AroundJoinCard
                key={uuidv4()}
                iconfillcolor="#FFD700"
                data={data}
              />
            );
          })}
        </Slider>
      </section>
    </>
  );
}
