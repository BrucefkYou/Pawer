import React, { useState, useEffect } from 'react';

export default function SectionOne(props) {
  return (
    <>
      <section>
        <div className="container">
          {/* banner react時只顯示一個變成輪播 */}
          <div className="row">
            <div className="position-relative">
              <div className="bg-banner">
                <img src="./home/aboutBanner.png" alt="" />
              </div>
              <div className="d-flex btnGap-wei">
                <div className="btn btnPrimary-wei">關於我們</div>
                <div className="btn btnWhite-wei">連絡我們</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
