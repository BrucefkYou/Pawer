import { useEffect, useState } from 'react';
import { citys, townships } from './data-townships';

export default function TWZipCode({
  city,
  township,
  location,
  setCity,
  setTownship,
  setLocation,
}) {
  // 記錄陣列的索引值，預設值是-1，相當於"請選擇xxx"
  const [cityIndex, setCityIndex] = useState(-1);
  const [townshipIndex, setTownshipIndex] = useState(-1);

  return (
    <>
      <div id="joinAddress" className="mb-3">
        <label htmlFor="joinAddress" className="form-label required">
          活動地點
        </label>
        <div className="row g-3">
          <div className="col-md-2">
            <select
              id="joinCity"
              className="form-select"
              value={cityIndex}
              onChange={(e) => {
                // 將字串轉成數字
                const newCityIndex = +e.target.value;
                setCityIndex(newCityIndex);
                // 重置townshipIndex的值
                setTownshipIndex(-1);
                // 更新父層的 city 值
                setCity(citys[newCityIndex]);
              }}
            >
              <option value="-1">選擇縣市</option>
              {citys.map((value, index) => (
                <option key={index} value={index}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <select
              id="joinTownship"
              className="form-select"
              value={townshipIndex}
              onChange={(e) => {
                // 將字串轉成數字
                const newTownshipIndex = +e.target.value;
                setTownshipIndex(newTownshipIndex);
                // 更新父層的 township 值
                setTownship(townships[cityIndex][newTownshipIndex]);
              }}
            >
              <option value="-1">選擇鄉鎮</option>
              {cityIndex !== -1 &&
                townships[cityIndex] &&
                townships[cityIndex].map((value, index) => (
                  <option key={index} value={index}>
                    {value}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="詳細地址"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
