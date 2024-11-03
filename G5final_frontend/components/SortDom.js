import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
export function SortDom({ chooseSort, needSort }) {
  // 存儲select的值隨著選項狀態改變
  const [nowValue, setNowValue] = useState();

  // 處理選項有改變時觸發並存入新值
  function ifChange(event) {
    const value = event.target.value;
    setNowValue(value);
    // 調用父層傳入的排序函數
    chooseSort(event);
  }
  return (
    <div>
      <select
        value={nowValue}
        onChange={ifChange}
        className="form-select text-body-tertiary"
      >
        {needSort.map((v) => {
          return (
            <option key={uuidv4()} value={v.way}>
              {v.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
