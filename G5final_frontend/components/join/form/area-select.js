import React from 'react';
import CityData from './city-data';

export default function AreaSelect({
  city,
  township,
  location,
  setCity,
  setTownship,
  setLocation,
  required,
}) {
  const handleCityChange = (e) => {
    setCity(e.target.value);
    setTownship('');
  };

  const handleDistrictChange = (e) => {
    setTownship(e.target.value);
  };

  const handleAddressChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <>
      <div id="join-address" className="mb-3">
        <label
          htmlFor="joinAddress"
          className={`form-label ${required ? 'required' : ''}`}
        >
          活動地點
        </label>
        <div className="row g-3">
          <div className="col-md-2">
            <select
              className="form-select"
              value={city}
              onChange={handleCityChange}
            >
              <option value="">選擇城市</option>
              {Object.keys(CityData).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={township}
              onChange={handleDistrictChange}
            >
              <option value="">選擇區域</option>
              {city &&
                CityData[city] &&
                CityData[city].map((township) => (
                  <option key={township} value={township}>
                    {township}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={handleAddressChange}
              placeholder="請輸入詳細地址"
            />
          </div>
        </div>
      </div>
    </>
  );
}
