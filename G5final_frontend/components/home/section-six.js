import React, { useState, useEffect } from 'react';

export default function SectionSix(props) {
  return (
    <>
      <section>
        <div className="sec6-layout sec6-bg">
          <div className="row sec6-layout">
            <div className="col mb-5">
              <img src="./home/sec6icon1.png" alt="" />
            </div>
          </div>
          <div className="row sec6-layout">
            <div className="col mb-5">
              <img src="./home/sec6icon2.png" alt="" />
            </div>
          </div>
          <div className="row sec6-layout">
            <div className="col mb-5">
              <img src="./home/sec6icon3.png" alt="" />
            </div>
          </div>
          <div className="row sec6-layout">
            <div className="col mb-5">
              <img src="./home/sec6icon4.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
