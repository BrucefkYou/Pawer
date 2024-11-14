/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import { Inter } from 'next/font/google';
import Banner from '@/components/home/banner/banner';
import SectionTwo from '@/components/home/section-two';
import SectionSix from '@/components/home/section-six';
import Hotproduct from '@/components/home/hotproduct/hotproduct';
import HomeBlCard from '@/components/blog/home-bl-sec';
import HomeJoinCard from '@/components/join/home-join-card';
import HomePet from '@/components/home/pet/HomePet';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="height">
          {/* section-one  */}
          <Banner />
          {/* section-two */}
          <SectionTwo />
          {/* section-three */}
          <Hotproduct />
          {/* section-four */}
          <section>
            <div className="container sec4-con">
              {/* 活動會是輪播 RWD 顯示一個 變成輪播*/}
              <div className="sec4-event-text">
                <p className="sec4-newtext">
                  最新的<span className="sec4-pet">寵物聚會</span>
                </p>
                <p className="PetParty">Pet Party</p>
              </div>
              <div className="row sec4-card-group">
                {/* 活動卡片父層 */}
                <div className="row sec4-event-card">
                  {/* 活動卡片 */}
                  <div className="sec4-event">
                    <p className="sec4-event-title">快樂小狗的聚會</p>
                    <span className="sec4-event-status">開團中</span>
                  </div>
                  <div className="sec4-event-details">
                    <div className="sec4-event-time">
                      <img src="./home/icon_clock_.png" alt="" />
                      2024.10.09 14:00 - 2024.10.09 16:00
                    </div>
                    <div className="sec4-event-location">
                      <img src="./home/icon_place_.png" alt="" />
                      台北市大安區大安森林公園
                    </div>
                  </div>
                  <div className="sec4-event-image">
                    <img
                      src="./home/eventImg.png"
                      alt="Description Image"
                      className="event-image"
                    />
                    <p className="sec4-event-imgtext">想哭的我戴上貓的面具</p>
                  </div>
                </div>
                <div className="row sec4-event-card sec4-none">
                  {/* 活動卡片 */}
                  <div className="sec4-event">
                    <p className="sec4-event-title">快樂小狗的聚會</p>
                    <span className="sec4-event-status">開團中</span>
                  </div>
                  <div className="sec4-event-details">
                    <div className="sec4-event-time">
                      <img src="./home/icon_clock_.png" alt="" />
                      2024.10.09 14:00 - 2024.10.09 16:00
                    </div>
                    <div className="sec4-event-location">
                      <img src="./home/icon_place_.png" alt="" />
                      台北市大安區大安森林公園
                    </div>
                  </div>
                  <div className="sec4-event-image">
                    <img
                      src="./home/eventImg.png"
                      alt="Description Image"
                      className="event-image"
                    />
                    <p className="sec4-event-imgtext">想哭的我戴上貓的面具</p>
                  </div>
                </div>
                <div className="row sec4-event-card sec4-none">
                  {/* 活動卡片 */}
                  <div className="sec4-event">
                    <p className="sec4-event-title">快樂小狗的聚會</p>
                    <span className="sec4-event-status">開團中</span>
                  </div>
                  <div className="sec4-event-details">
                    <div className="sec4-event-time">
                      <img src="./home/icon_clock_.png" alt="" />
                      2024.10.09 14:00 - 2024.10.09 16:00
                    </div>
                    <div className="sec4-event-location">
                      <img src="./home/icon_place_.png" alt="" />
                      台北市大安區大安森林公園
                    </div>
                  </div>
                  <div className="sec4-event-image">
                    <img
                      src="./home/eventImg.png"
                      alt="Description Image"
                      className="event-image"
                    />
                    <p className="sec4-event-imgtext">想哭的我戴上貓的面具</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section-five */}
          <HomePet />
          {/* section-six */}
          <SectionSix />
          {/* section-seven */}
          <HomeBlCard />
        </div>
      </div>
    </>
  );
}
