import React, { useState, useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { BsFilterSquareFill } from 'react-icons/bs';
import Hotcard from './hotcard';

export default function Hotproduct(props) {
  const [url, setUrl] = useState('http://localhost:3005/api/product');
  const [hotProducts, setHotProducts] = useState([]);
  const { oldData } = usePagination({
    url: url,
    needFilter: [],
  });
  console.log('撈出來是', oldData);

  // 熱門的三筆的鉤子
  useEffect(() => {
    // 因為JOIN所以會有重複的商品ID 只需要撈一個ID 我要確保 oldData 存在且是陣列
    if (oldData && Array.isArray(oldData)) {
      const rePD = oldData.filter(
        (reid, index, oldData) =>
          index === oldData.findIndex((r) => r.ID === reid.ID)
      );

      // 我要的熱們商品
      const hotIndex = [40, 22, 20];
      const filteredPD = rePD.filter((pd) => hotIndex.includes(pd.ID));

      setHotProducts(filteredPD);
      console.log('篩選過後', filteredPD);
    }
  }, [oldData]);

  return (
    <>
      <section className="sec-3">
        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 hotbg-text d-flex flex-column justify-content-center align-items-center">
          {/* 文字區 */}
          <p className="hot-text">熱門商品</p>
          <p className="BestSale">Best Sale</p>
        </div>
        <div className="container">
          <div className="row">
            {/* 卡片區 react RWD時只顯示一個變成輪播*/}
            <div className="d-flex sec-3-gap">
              {hotProducts.map((pd) => {
                return <Hotcard key={pd.ID} pd={pd} />;
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
