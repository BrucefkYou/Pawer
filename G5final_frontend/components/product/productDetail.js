/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import { BsPersonPlusFill, BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import ClickIcon from '@/components/icons/click-icon/click-icon';
import { useCart } from '@/hooks/use-cart/use-cart-state';
import style from '@/components/product/productDetail.module.scss';

export default function ProductDetail(props) {
  // 建立購物車物件
  const { cart, addItem } = useCart();
  // 使用路由判斷當前動態路由id
  const router = useRouter();
  // 抓取當前動態路由參數
  const myId = router.query.id;
  // 抓取單筆物件存放容器
  const [fetchOne, setFetchOne] = useState([]);
  const [fetchData, setFetchData] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/product');
        if (!response.ok) {
          throw new Error('網路回應不成功：' + response.status);
        }
        const data = await response.json();
        setFetchData(data);
        // 過濾出符合的資料
        const idData = data.find((pd) => pd.ID == myId);
        // 設定進容器
        setFetchOne(idData);
      } catch (err) {
        console.log(err);
      }
    };
    // 確保外部有抓取到當前路由id
    if (myId) {
      fetchData();
    }
  }, [myId]);
  // 篩選image資料表ProductID為相同product資料表ID的資訊
  const productImages = fetchData.filter((pd) => pd.ProductID === myId);
  // 處理減少數量的函數
  const handleDecrease = () => {
    setProductQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1
    );
  };

  // 處理增加數量的函數
  const handleIncrease = () => {
    setProductQuantity((prevQuantity) => prevQuantity + 1);
  };

  // 導航到購物車
  const cartLink = () => {
    router.push('/cart');
  };

  // 先確保有資料在解構
  if (!fetchOne) {
    return <p>Loading...</p>;
  }
  // 解構資料
  const { Name, Img, SalePrice, Stock, Info, ProductSummary } = fetchOne;
  // 要加入購物車的資料
  return (
    <>
      {/* 商品細節 */}
      <div className="container d-flex detail-layout-up">
        {/* 圖片輪播 */}
        <div className="row detail-left">
          {/* 主視圖 */}
          <div className="row">
            <div className="col">
              <div>
                {Img && (
                  <Image
                    className="detailimg-rwd"
                    src={`/product/sqlimg/${Img}`}
                    alt={Name}
                    width={510}
                    height={456}
                  />
                )}
              </div>
            </div>
          </div>
          {/* 輪播點選圖 RWD 圖片隱藏 換成箭頭輪播*/}
          <div className="row mt-3 detail-rwd-none">
            <div className="col d-flex detail-left-turn">
              {productImages.length > 0 &&
                productImages.map(
                  (image, index) =>
                    image.ImageName && ( // 確認 ImageName 有圖才渲染
                      <div className="col" key={index}>
                        <Image
                          className="detailimg-rwd"
                          src={`/product/sqlimg/${image.ImageName}`}
                          alt={Name}
                          width={112}
                          height={138}
                        />
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
        {/* 商品簡介 */}
        <div className="row detail-right">
          {/* 簡介內容 */}
          <div className="row detail-size">
            {/* 商品名稱 */}
            <div className="col">
              <h1 className="detail-title">{Name}</h1>
              {/* 星級 與 售出 收藏 */}
              <div className="d-flex mt-4">
                <div className="col d-flex align-items-center">
                  {/* 星級文字 */}
                  {/* <div>
                    <p className="star-text">5&nbsp;&nbsp;</p>
                  </div> */}
                  {/* 星級圖示 */}
                  <div className="star-rwd">
                    <img src="../product/star=1.png" alt="1" />
                    <img src="../product/star=1.png" alt="1" />
                    <img src="../product/star=1.png" alt="1" />
                    <img src="../product/star=1.png" alt="1" />
                    <img src="../product/star=1.png" alt="1" />
                  </div>
                  <div>
                    <a
                      className="sell-how"
                      onClick={() =>
                        document
                          .querySelector('#comment')
                          .scrollIntoView({ behavior: 'smooth' })
                      }
                    >
                      &nbsp;|&nbsp;我要評論
                    </a>
                  </div>
                </div>
                {/* 收藏圖 */}
                <div className="col d-flex justify-content-end">
                  <div className={`${style['pdsvg-favorite']}`}>
                    <ClickIcon
                      IconFilled={BsBookmarkFill}
                      IconOutline={BsBookmark}
                    />
                  </div>
                </div>
              </div>
              {/* 文字內容簡介 */}
              <div className="detail-text-layout">
                <div className="col">
                  <p className="detail-text">{Info}</p>
                </div>
              </div>
              {/* 價格 加入購物車 */}
              <div className="d-flex flex-column align-items-star add-card">
                <div className="col ">
                  <form action="true">
                    <div>
                      <p className="detail-nt">NT${SalePrice}</p>
                    </div>
                    <div className="d-flex align-items-star detail-buy">
                      <div>
                        <p className="detail-p">數量</p>
                      </div>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          type="button"
                          className="btn border buy-dash"
                          onClick={handleDecrease}
                        >
                          -
                        </button>
                        <div className="many border">
                          <p className="detail-p">{productQuantity}</p>
                        </div>
                        <button
                          type="button"
                          className="btn border m-0 buy-add"
                          onClick={handleIncrease}
                        >
                          +
                        </button>
                      </div>
                      {/* <div>
                        <p className="detail-p detail-rwd-none">
                          還剩{Stock}件
                        </p>
                      </div> */}
                    </div>
                    <div className="d-flex mt-5 detail-brt-gap">
                      <button
                        type="button"
                        className="detail-btn1"
                        onClick={() => {
                          addItem({
                            id: myId,
                            name: Name,
                            price: SalePrice,
                            img: Img,
                            quantity: productQuantity,
                            checked: '',
                          });
                        }}
                      >
                        加入購物車
                      </button>
                      <button
                        type="button"
                        className="detail-btn2"
                        onClick={() => cartLink()}
                      >
                        立即結帳
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary comment-detail-shadow">
        <div className="d-flex justify-content-center align-items-center mt-5">
          <a
            onClick={() =>
              document
                .querySelector('#detail')
                .scrollIntoView({ behavior: 'smooth' })
            }
            className="no-underline me-5"
          >
            商品內容
          </a>
          <a
            onClick={() =>
              document
                .querySelector('#comment')
                .scrollIntoView({ behavior: 'smooth' })
            }
            className="no-underline"
          >
            商品評論
          </a>
        </div>
      </div>
      {/* 商品內容 */}
      <div className="container mt-3" id="detail">
        <div className="d-flex justify-content-center pd-content-me5">
          {Img && (
            <Image
              className="productdetail-img"
              src={`/product/sqlimg/${ProductSummary}`}
              alt={Name}
              width={998}
              height={175}
            />
          )}
        </div>
      </div>
    </>
  );
}
