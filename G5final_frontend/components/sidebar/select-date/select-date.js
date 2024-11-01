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
          <div className="d-flex justify-content-between">
            <input className="flex-fill text-body-tertiary" type="date" />-
            <input className="flex-fill text-body-tertiary" type="date" />
          </div>
        }
      />
    </>
  );
}
