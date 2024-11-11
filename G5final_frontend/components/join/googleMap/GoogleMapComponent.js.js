// components/join/googleMap/GoogleMapComponent.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// 地圖容器樣式
const containerStyle = {
  width: '500px',
  height: '500px', // 根據需要調整高度
};

// 預設地圖中心點（可根據需求調整）
const defaultCenter = {
  lat: 25.033964, // 台北市緯度
  lng: 121.562321, // 台北市經度
};

function GoogleMapComponent({ markers }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
          markers.length > 0
            ? { lat: parseFloat(markers[0].PositionX), lng: parseFloat(markers[0].PositionY) }
            : defaultCenter
        }
        zoom={10}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(marker.PositionX), // PositionX 作為 Latitude
              lng: parseFloat(marker.PositionY), // PositionY 作為 Longitude
            }}
            title={marker.FullLocation || marker.Place} // 根據後端返回的欄位名稱
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(GoogleMapComponent);
