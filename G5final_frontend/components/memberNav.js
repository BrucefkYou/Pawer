import React, { useState, useEffect } from 'react';
export default function MemberNav({ chooseFilter, needFilter, newdata }) {
  // 存放總比數
  const [filterCounts, setFilterCounts] = useState({});
  useEffect(() => {
    // 依照按鈕數量逐一加入篩選結果的容器
    const counts = {};
    // 按鈕數量跑回圈,逐一計算
    needFilter.forEach((button) => {
      // 計算篩選後的比數
      const filterData = newdata.filter(
        (item) => item[button.filterName] == button.filterRule
      );
      // 將篩選數量存入對應按鈕的`id`
      counts[button.id] = filterData.length;
    });
    // 設定進容器
    setFilterCounts(counts);
    // 隨著button更新時重新計算
  }, [needFilter, newdata]);
  return (
    <>
      <ul
        className="nav nav-tabs member-nav-tabs justify-content-center"
        id="myTab"
        role="tablist"
      >
        {needFilter.map((button, index) => {
          return (
            <li key={button.id} className="nav-item m-auto" role="presentation">
              <button
                className={`nav-link m-1 ${index === 0 ? 'active' : ''}`}
                data-bs-toggle="tab"
                onClick={() => {
                  chooseFilter(button.filterName, button.filterRule);
                }}
              >
                {button.label}
                <span className="tab-count">{filterCounts[button.id]}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
