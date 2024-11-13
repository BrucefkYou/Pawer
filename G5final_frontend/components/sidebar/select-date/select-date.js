import React, { useState, useEffect } from 'react';
import SideBarCard from '../sidebar-card/sidebar-card';
import pawButton from '@/assets/pawButton.svg';

export default function SelectDate({ oldData, updateData }) {

  // 將輸入值裝進狀態
  const [firstDate, setFirstDate] = useState('');
  const [lastDate, setLastDate] = useState('');
  // 比較值
  const [newLastDate, setNewLastDate] = useState('');
  const [newFirstDate, setNewFirstDate] = useState('');
  const [newDatas, setNewData] = useState([]);

  function changefirst(e) {
    const selectedDate = new Date(e.target.value);
    setNewFirstDate(selectedDate);

    if (lastDate && selectedDate > new Date(lastDate)) {
      alert('起始時間不得大於結束時間');
    } else {
      setFirstDate(e.target.value);
      console.log("First date:", e.target.value);
    }
  }

  function changelast(e) {
    const selectedDate = new Date(e.target.value);
    setNewLastDate(selectedDate);

    if (firstDate && new Date(firstDate) > selectedDate) {
      alert('起始時間不得大於結束時間');
    } else {
      setLastDate(e.target.value);
      console.log("Last date:", e.target.value);
    }
  }

  useEffect(() => {
    if (oldData && firstDate && lastDate) {
      const newData = oldData.filter((v) => {
        const fetch = new Date(v.StartTime);
        const start = new Date(firstDate);
        const end = new Date(lastDate);
        return start <= fetch && fetch <= end;
      });
      setNewData(newData);
      updateData(newData);
    }
  }, [firstDate, lastDate, oldData]);

  return (
    <>
      <SideBarCard
        title="活動日期"
        img={pawButton}
        content={
          <div className="row text-center justify-content-center">
            <input className="col-5 text-body-tertiary" type="date" onChange={changefirst} value={firstDate} />
            <span className="col-1 text-center">-</span>
            <input className="col-5 text-body-tertiary" type="date" onChange={changelast} value={lastDate} />
          </div>
        }
      />
    </>
  );
}
