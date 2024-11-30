// components/join/googleMap/GoogleMapComponent.js
import React, { useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import styles from './GoogleMapComponent.module.scss';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 25.033964,
  lng: 121.562321,
};

const GoogleMapComponent = ({
  markers,
  userLocation,
  onUserLocationChange,
  onMarkerClick,
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const handleDragEnd = useCallback(
    (event) => {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      onUserLocationChange({ lat: newLat, lng: newLng });
    },
    [onUserLocationChange]
  );

  const svgMarkerMain = useMemo(
    () => ({
      path: 'M12.6339 0C10.0301 0.00308953 7.53375 1.03884 5.69254 2.88004C3.85134 4.72125 2.81559 7.21757 2.8125 9.82143C2.8125 18.2251 11.7411 24.5728 12.1212 24.8387C12.2716 24.9437 12.4505 25 12.6339 25C12.8173 25 12.9963 24.9437 13.1466 24.8387C13.5268 24.5728 22.4554 18.2251 22.4554 9.82143C22.4523 7.21757 21.4165 4.72125 19.5753 2.88004C17.7341 1.03884 15.2378 0.00308924 12.6339 0ZM12.6346 6.25032C13.3409 6.25032 14.0314 6.45978 14.6188 6.85222C15.2061 7.24465 15.6638 7.80243 15.9342 8.45503C16.2045 9.10762 16.2752 9.82571 16.1374 10.5185C15.9996 11.2113 15.6594 11.8477 15.16 12.3471C14.6605 12.8466 14.0241 13.1868 13.3313 13.3246C12.6385 13.4624 11.9204 13.3916 11.2679 13.1213C10.6153 12.851 10.0575 12.3932 9.66505 11.8059C9.27261 11.2186 9.06315 10.5281 9.06315 9.82175C9.06314 9.35274 9.15551 8.88832 9.33499 8.45501C9.51446 8.0217 9.77753 7.62798 10.1092 7.29634C10.4408 6.9647 10.8345 6.70163 11.2678 6.52215C11.7012 6.34268 12.1656 6.25031 12.6346 6.25032Z',
      fillColor: 'rgba(244, 177, 62, 1)',
      fillOpacity: 1,
      strokeColor: '#000000',
      strokeOpacity: 0.0,
      strokeWeight: 0,
      rotation: 0,
      scale: 1.25,
      anchor: { x: 12, y: 24 },
    }),
    []
  );

  const svgMarkerNearby = useMemo(
    () => ({
      path: 'M12.6339 0C10.0301 0.00308953 7.53375 1.03884 5.69254 2.88004C3.85134 4.72125 2.81559 7.21757 2.8125 9.82143C2.8125 18.2251 11.7411 24.5728 12.1212 24.8387C12.2716 24.9437 12.4505 25 12.6339 25C12.8173 25 12.9963 24.9437 13.1466 24.8387C13.5268 24.5728 22.4554 18.2251 22.4554 9.82143C22.4523 7.21757 21.4165 4.72125 19.5753 2.88004C17.7341 1.03884 15.2378 0.00308924 12.6339 0ZM12.6346 6.25032C13.3409 6.25032 14.0314 6.45978 14.6188 6.85222C15.2061 7.24465 15.6638 7.80243 15.9342 8.45503C16.2045 9.10762 16.2752 9.82571 16.1374 10.5185C15.9996 11.2113 15.6594 11.8477 15.16 12.3471C14.6605 12.8466 14.0241 13.1868 13.3313 13.3246C12.6385 13.4624 11.9204 13.3916 11.2679 13.1213C10.6153 12.851 10.0575 12.3932 9.66505 11.8059C9.27261 11.2186 9.06315 10.5281 9.06315 9.82175C9.06314 9.35274 9.15551 8.88832 9.33499 8.45501C9.51446 8.0217 9.77753 7.62798 10.1092 7.29634C10.4408 6.9647 10.8345 6.70163 11.2678 6.52215C11.7012 6.34268 12.1656 6.25031 12.6346 6.25032Z',
      fillColor: 'rgba(244, 177, 62, 0.7)', //附近活動的顏色
      fillOpacity: 1,
      strokeColor: 'rgba(244, 177, 62, 0.8)',
      strokeOpacity: 1,
      strokeWeight: 1,
      rotation: 0,
      scale: 1,
      anchor: { x: 12, y: 24 },
    }),
    []
  );
  console.log(markers);
  const center = userLocation
    ? { lat: userLocation.lat, lng: userLocation.lng }
    : markers.length > 0
    ? {
        lat: parseFloat(markers[0].PositionX),
        lng: parseFloat(markers[0].PositionY),
      }
    : defaultCenter;
  console.log(markers);

  if (!isLoaded) {
    return <div>地圖載入失敗，請稍候重試。</div>;
  }
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
      {userLocation && (
        <Marker
          position={userLocation}
          title="您的位置"
          draggable={true}
          onDragEnd={handleDragEnd}
          icon={svgMarkerMain}
        />
      )}

      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{
            lat: parseFloat(marker.PositionX),
            lng: parseFloat(marker.PositionY),
          }}
          title={marker.title || `${marker.PositionX}＆${marker.PositionY}`}
          icon={marker.type === 'main' ? svgMarkerMain : svgMarkerNearby}
          onClick={() => onMarkerClick(marker)}
        />
      ))}
    </GoogleMap>
  );
};

export default React.memo(GoogleMapComponent);
