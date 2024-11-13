import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const GoogleMapComponent = dynamic(
  () => import('@/components/join/googleMap/GoogleMapComponent.js'),
  { ssr: false }
);

export default function Test() {
  const router = useRouter();
  const [locationData, setLocationData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [filteredMarkers, setFilteredMarkers] = useState([]);

  const handleUserLocationChange = (newLocation) => {
    setUserLocation(newLocation);
    console.log('新的使用者位置:', newLocation);
    updateFilteredMarkers(newLocation.lat, newLocation.lng);
  };

  // 獲取活動地點資料
  const fetchEventLocation = async () => {
    try {
      const url = 'http://localhost:3005/api/join-in/location';
      const res = await fetch(url);
      const resData = await res.json();
      console.log('Fetched location data:', resData);
      if (res.status === 200 && resData.status === 'success') {
        setLocationData(resData.rows);
      } else if (res.status === 500) {
        console.log('伺服器錯誤');
      }
    } catch (error) {
      console.error('請求出錯:', error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchEventLocation();
    }

    // 獲取使用者的當前位置
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(currentLocation);
          console.log('獲取到的使用者位置:', currentLocation);
        },
        (error) => {
          console.error('獲取使用者位置失敗:', error);
        }
      );
    } else {
      console.error('您的瀏覽器不支援地理定位。');
    }
  }, [router.isReady]);

  // 更新 filteredMarkers 的函式
  const updateFilteredMarkers = (lat, lng) => {
    const nearbyMarkers = locationData.filter((marker) => {
      const distance = getDistanceFromLatLonInKm(
        lat,
        lng,
        parseFloat(marker.PositionX),
        parseFloat(marker.PositionY)
      );
      return distance <= 10; // 在這裡設定範圍（公里）
    });

    setFilteredMarkers(nearbyMarkers);
  };

  // 當 userLocation 或 locationData 改變時，更新 filteredMarkers
  useEffect(() => {
    if (userLocation && locationData.length > 0) {
      updateFilteredMarkers(userLocation.lat, userLocation.lng);
    }
  }, [userLocation, locationData]);

  // 處理地址搜尋
  const handleSearch = async () => {
	if (!searchAddress.trim()) {
		console.warn('請輸入有效的地址');
		return;
	  }

    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        searchAddress
      )}&key=${apiKey}`;
      const res = await fetch(geocodeUrl);
      const data = await res.json();
      console.log('Geocoding 資料:', data);
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        const searchedLocation = { lat, lng };
        setUserLocation(searchedLocation);
        console.log('搜尋到的位置:', searchedLocation);
      } else {
        console.error('Geocoding 失敗:', data.status);
      }
    } catch (error) {
      console.error('Geocoding 錯誤:', error);
    }
  };

  // Haversine 公式計算兩點之間的距離（公里）
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 地球半徑（公里）
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  console.log('test.js userLocation:', userLocation);

  return (
    <div>
      <h1>測試地圖顯示</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          placeholder="輸入地點地址"
          style={{ padding: '8px', width: '300px' }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: '8px 16px', marginLeft: '10px' }}
        >
          搜尋
        </button>
      </div>
      <GoogleMapComponent
        markers={filteredMarkers}
        userLocation={userLocation}
        onUserLocationChange={handleUserLocationChange}
      />
    </div>
  );
}
