import React, { useState, useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';
import Hotcard from './hotcard';
import Image from 'next/image';
import style from '@/components/home/hotproduct/hotproduct.module.scss';

export default function Hotproduct(props) {
  const [url, setUrl] = useState('http://localhost:3005/api/product');
  const [hotProducts, setHotProducts] = useState([]); // 過濾重複ID
  const [showCard, setShowCard] = useState(3); // RWD時要變輪播點選狀態
  const [showIndex, setShowIndex] = useState(0); // 用索引製作輪播點選
  const { oldData } = usePagination({
    url: url,
    needFilter: [],
  });

  // 切到左邊商品
  const left = () => {
    setShowIndex(
      (prevIndex) => (prevIndex - 1 + hotProducts.length) % hotProducts.length
    );
  };
  // 切到右邊商品
  const right = () => {
    setShowIndex((prevIndex) => (prevIndex + 1) % hotProducts.length);
  };

  // 熱門的三筆的鉤子
  useEffect(() => {
    if (oldData && Array.isArray(oldData)) {
      const rePD = oldData.filter(
        (reid, index, oldData) =>
          index === oldData.findIndex((r) => r.ID === reid.ID)
      );

      const hotIndex = [40, 22, 20];
      const filteredPD = rePD.filter((pd) => hotIndex.includes(pd.ID));
      setHotProducts(filteredPD);
      setShowIndex(0); // 重置當前索引
    }
  }, [oldData]);

  // RWD 時變成輪播點選
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowCard(1); // 小螢幕時只顯示一個
        setShowIndex(0); // 重置當前索引
      } else {
        setShowCard(3); // 大螢幕時顯示三個
        setShowIndex(0); // 重置當前索引
      }
    };
    handleResize(); // 初次渲染時用一次
    window.addEventListener('resize', handleResize); // 監聽螢幕大小變化
    return () => {
      window.removeEventListener('resize', handleResize); // 清理監聽
    };
  }, []);

  return (
    <>
      <section className="sec-3">
        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 hotbg-text d-flex flex-column justify-content-center align-items-center">
          <p className="hot-text">熱門商品</p>
          <p className="BestSale">Best Sale</p>
        </div>
        <div className="container">
          <div className="row">
            <div className="d-flex sec-3-gap">
              {/* 在小螢幕上只顯示一個商品 */}
              {showCard === 1 ? (
                <>
                  {hotProducts.length > 0 && (
                    <Hotcard
                      key={hotProducts[showIndex]?.ID} // ?. 鏈接運算符 要避免初次渲染還沒找到索引回傳undefined或null
                      pd={hotProducts[showIndex]}
                    />
                  )}
                  {hotProducts.length > 1 && ( // 只有在有多於一個商品時顯示按鈕
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
                </>
              ) : (
                // 在大螢幕上顯示三個商品
                hotProducts
                  .slice(0, showCard)
                  .map((pd) => <Hotcard key={pd.ID} pd={pd} />)
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
