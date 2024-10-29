import React from 'react';
import { BsTelephone, BsEnvelope, BsMap } from 'react-icons/bs';
import Image from 'next/image';
// eslint-disable-next-line import/no-unresolved
import logo from 'public/LOGO.svg';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-wrapper">
          <div className="footer-section">
            <div className="d-flex footer-col">
              <div className="col footer-col footer-endcontent footer-left-content-text">
                <p>
                  Pawer致力於提供高品質的犬貓保健產品，讓每一隻「爪子」都充滿力量與健康。從營養補充品到護理用品，每一項產品都經嚴格測試，符合最高標準。我們深知寵物健康的重要性，因此每一款產品都選用安全成分，提供全面而可靠的健康支持。
                  <br />
                  <br />
                  在Pawer，我們不僅追求卓越的產品品質，更注重專業與關愛。我們的目標是讓每一個家庭成員──不論是人還是毛孩都能享受無憂的生活。選擇Pawer，選擇讓寵物擁有最優質的呵護。讓我們與您一起，守護每一隻毛孩的健康與幸福。
                </p>
              </div>
              <div className="col footer-col d-flex">
                <div className="col-auto footer-box">
                  <ul>
                    <li className="title">關於我們</li>
                    <li>品牌故事</li>
                    <li>最新消息</li>
                    <li>隱私權聲明</li>
                  </ul>
                </div>
                <div className="col-auto footer-box">
                  <ul>
                    <li className="title">購物須知</li>
                    <li>會員優惠制度</li>
                    <li>購物結帳問題</li>
                    <li>政策與條款</li>
                  </ul>
                </div>
                <div className="col-auto footer-box">
                  <ul>
                    <li className="title">追蹤與聯繫</li>
                    <li>LINE客服 | @pawerrrrr</li>
                    <li>信箱聯絡 | pawerrrrr@TESTMAIL.COM</li>
                    <hr />
                    <div className="d-flex flex-row mb-3">
                      <div className="p-3">
                        <BsTelephone size={35} color="#f4b13e" />
                      </div>
                      <div className="p-3">
                        <BsEnvelope size={35} color="#f4b13e" />
                      </div>
                      <div className="p-3">
                        <BsMap size={35} color="#f4b13e" />
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-section-svg">
            <div className="powerSvg pb-2">
              <Image width={64} height={35} src={logo} href="/" alt="1" />
            </div>
            {/* <div>拋瓦股份有限公司 | 統編 09487561</div> */}
            <div>
              <div className="footer-down">
                {/* Fix Css */}
                <span>寶沃股份有限公司 | 統編 09487561</span>
                <br />
                COPYRIGHT © 2020-2024 PAWER.COM.TW All RIGHTS RESERVED PRIVACY
                POLICYTERMS AND CONDITIONS.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
