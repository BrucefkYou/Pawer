import React, { useState, useEffect } from 'react';
import { BsClock, BsGeoAlt } from 'react-icons/bs';
import style from '@/components/join/card/around-join-card/around-join-card.module.scss';
import Image from 'next/image';

export default function AroundJoinCard(props) {
  return (
    <>
      <div className="col-md-6 col-lg-4 mb-3 ">
        <div
          className={`card shadow border border-secondary ${style['ji-around-card']}`}
        >
          <div className="card-body py-4">
            <div className="d-flex justify-content-between mb-3">
              <h4
                className={`card-title ${style['card-title-mg']} text-secondary-emphasis m-0`}
              >
                快樂小狗的聚會
              </h4>
              <span className="bg-primary text-white px-2 py-1 rounded-1 my-auto">
                開團中
              </span>
            </div>
            <div className="ji-info">
              <p className="card-text mb-3 ji-info-content text-secondary-emphasis">
                <BsClock className="ms-1 me-2" />
                2024.10.09 14:00 - 2024.10.09 16:00
              </p>
              <p className="card-text m-0 ji-info-content text-secondary-emphasis">
                <BsGeoAlt className="ms-1 me-2" />
                2024.10.09 14:00 - 2024.10.09 16:00
              </p>
            </div>
            <div className="ji-member d-flex align-items-center gap-2">
              <div className={`rounded-circle ${style['ji-img']}`}>
                <Image
                  width={100}
                  height={100}
                  className="object-fit-cover"
                  src="/#"
                  alt="1"
                />
              </div>
              <p className="my-auto text-primary">想哭的我戴上貓的面具</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
