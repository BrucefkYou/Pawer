import React, { useState, useEffect } from 'react';
import SideBarCard from '../sidebar-card/sidebar-card';
import pawButton from '@/assets/pawButton.svg';

export default function SelectDate(props) {
  return (
    <>
      <SideBarCard
        title="活動日期"
        img={pawButton}
        content={
          <div className=" row text-center justify-content-center">
            <input className=" col-5 text-body-tertiary" type="date" />
            <span className="col-1 text-center">-</span>
            <input className="col-5 text-body-tertiary" type="date" />
          </div>
        }
      />
    </>
  );
}
