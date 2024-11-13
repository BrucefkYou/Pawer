import React, { useState, useEffect } from 'react';

export default function SectionTwo(props) {
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            {/* 開頭文字區 */}
            <div className="textCP-wei col-12 d-flex justify-content-center align-items-center">
              <p className="textCaring-wei">Caring for every&nbsp;</p>
              <p className="textPaw-wei">paw</p>
            </div>
            <div className="col d-flex justify-content-center">
              <p className="textLife-wei">健康生活，從爪爪呵護</p>
            </div>
          </div>
        </div>
        <div className="container sctNone-wei">
          {/* 圖文區 */}
          <div className="row pdgap10-wei">
            {/* 關於 PAWER */}
            <div className="col d-flex mat50">
              <div className="col">
                <div className="col d-flex align-items-center">
                  <img src="./home/light.png" alt="" />
                  <div className="col secms-4">
                    <p className="mb-2 textAB-wei">關於 PAWER</p>
                    <p className="mt-2 textAB-content-wei">
                      PAWER致力於成為寵物與主人之間的橋樑，提供高品質的犬貓保健產品。通過提供高品質的寵物保健食品、專業的寵物溝通服務，以及豐富的社群互動，打造一個讓寵物和主人都能健康快樂生活的專屬平台，讓每一隻「爪子」都充滿力量與健康。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row servings-wei">
              {/* 服務 */}
              <div className="col d-flex mat50">
                <div className="col">
                  <div className="col d-flex align-items-center">
                    <img src="./home/bow.png" alt="" />
                    <div className="col secms-4">
                      <p className="mb-2 textAB-wei">服務</p>
                      <div className="d-flex">
                        <p className="mt-2 serving-wei">
                          寵物保健 |&nbsp;
                          <span className="serving-content-wei">
                            &nbsp;提供多樣化且經過嚴格審核的寵物保健食品，滿足不同品種與年齡層的寵物需求。
                          </span>
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mt-2 serving-wei">
                          寵物聚會 |&nbsp;
                          <span className="serving-content-wei">
                            &nbsp;會員可創建專屬活動，提供平台讓寵物主人互相交流與學習，共同提升飼養技巧與寵物關懷知識。
                          </span>
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mt-2 serving-wei">
                          寵物溝通 |&nbsp;
                          <span className="serving-content-wei">
                            &nbsp;提供專業寵物溝通師預約服務，協助會員了解寵物的需求與情感，並與寵物建立更深層的聯繫。
                          </span>
                        </p>
                      </div>
                      <div className="d-flex">
                        <p className="mt-2 serving-wei">
                          部落格區 |&nbsp;
                          <span className="serving-content-wei">
                            &nbsp;會員可發表與寵物相關的文章、分享經驗與心得，並透過按讚與收藏功能，促進社群互動與知識交流。
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row servings-wei">
              {/* 願景 */}
              <div className="col d-flex mat50">
                <div className="col">
                  <div className="col d-flex align-items-center">
                    <img src="./home/heart.png" alt="" />
                    <div className="col secms-4">
                      <p className="mb-2 textAB-wei">願景</p>
                      <p className="mt-3 serving-content-wei">
                        提供全方位的寵物健康與交流平台，不僅滿足會員在寵物健康上的需求，還提供一個溫暖的社群環境，讓寵物主
                        <span className="serving-contents-wei">
                          人可以互相支持、學習，並通過與專業寵物溝通師的合作，深入了解寵物的內心世界，提升彼此的生活品質。
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* 貓咪圖片 */}
            <div className="col rcat-wei">
              <img src="./home/rightCat.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
