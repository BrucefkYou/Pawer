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
          <HomeJoinCard />
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
