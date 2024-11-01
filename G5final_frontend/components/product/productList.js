import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductList(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3005/api/productList/productList'
        );
        if (!response.ok) {
          throw new Error('網路回應不成功：' + response.status);
        }
        const data = await response.json();
        // 過濾掉image資料表重複的ProductID
        const repeatID = data.filter(
          (product, index, repeat) =>
            index === repeat.findIndex((p) => p.ID === product.ID)
        );
        setProducts(repeatID);
      } catch (err) {
        console.log(err);
      }
      console.log(products);
    };
    fetchData();
  }, []);
  return (
    <>
      {products.map((pd) => {
        return (
          <Link
            className="col card-layout no-underline"
            key={`${pd.ID}-${pd.Name}`}
            href={`/product/${pd.ID}`}
          >
            <div className="card shadow card-size">
              <Image
                className="card-img-top card-img-topme"
                alt="商品列表圖"
                src={`/product/sqlimg/${pd.Img}`}
                width={640}
                height={640}
                priority
              />
              <div className="card-body">
                <div className="pd-card-text">{pd.Name}</div>
                <div className="pd-card-textD">{pd.Name}</div>
                <div className="d-flex justify-content-between mt-3">
                  <div className="card-text">
                    <small className="be-nt">{'NT$' + pd.OriginPrice}</small>
                  </div>
                  {/* 收藏icon */}
                  <svg
                    className="rwd-none"
                    xmlns="http://www.w3.org/2000/svg"
                    width={25}
                    height={26}
                    viewBox="0 0 25 26"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_6088_3313)">
                      <path
                        d="M3.12463 4.02539C3.12463 3.19659 3.45387 2.40173 4.03992 1.81568C4.62598 1.22963 5.42083 0.900391 6.24963 0.900391H18.7496C19.5784 0.900391 20.3733 1.22963 20.9593 1.81568C21.5454 2.40173 21.8746 3.19659 21.8746 4.02539V25.1191C21.8746 25.2605 21.8362 25.3991 21.7635 25.5203C21.6909 25.6415 21.5867 25.7408 21.4621 25.8075C21.3376 25.8742 21.1972 25.9058 21.0561 25.8991C20.9149 25.8923 20.7782 25.8474 20.6606 25.7691L12.4996 21.3707L4.3387 25.7691C4.22105 25.8474 4.08437 25.8923 3.94321 25.8991C3.80206 25.9058 3.66172 25.8742 3.53713 25.8075C3.41255 25.7408 3.30839 25.6415 3.23575 25.5203C3.16311 25.3991 3.12471 25.2605 3.12463 25.1191V4.02539ZM6.24963 2.46289C5.83523 2.46289 5.4378 2.62751 5.14478 2.92054C4.85175 3.21356 4.68713 3.61099 4.68713 4.02539V23.6598L12.0668 19.7816C12.195 19.6963 12.3456 19.6508 12.4996 19.6508C12.6536 19.6508 12.8042 19.6963 12.9324 19.7816L20.3121 23.6598V4.02539C20.3121 3.61099 20.1475 3.21356 19.8545 2.92054C19.5615 2.62751 19.164 2.46289 18.7496 2.46289H6.24963Z"
                        fill="#888888"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_6088_3313">
                        <rect
                          width={25}
                          height={25}
                          fill="white"
                          transform="translate(0 0.901367)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="new-nt">{'NT$' + pd.OriginPrice}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
