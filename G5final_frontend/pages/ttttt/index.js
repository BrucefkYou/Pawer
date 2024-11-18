import React, { useState, useEffect } from 'react';
import GoogleMapComponent from '@/components/join/googleMap/GoogleMapComponent.js';
import AreaSelect from '@/components/join/form/area-select';

export default function Index(props) {
  const [city, setCity] = useState('');
  const [township, setTownship] = useState('');
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState({
    lat: 25.033964,
    lng: 121.562321,
  });
  const markers = []; // 根據需要設置標記數據

  const handleUserLocationChange = (newLocation) => {
    console.log('User location changed:', newLocation);
    setUserLocation(newLocation);
  };

  useEffect(() => {
    if (city && township && location) {
      const address = `${city}${township}${location}`;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setUserLocation({ lat, lng });
          }
        })
        .catch((error) => console.error('Error fetching geocode:', error));
    }
  }, [city, township, location]);

  return (
    <>
      <div>index</div>
      <AreaSelect
        city={city}
        township={township}
        location={location}
        setCity={setCity}
        setTownship={setTownship}
        setLocation={setLocation}
        required={true}
      />
      <GoogleMapComponent
        markers={markers}
        userLocation={userLocation}
        onUserLocationChange={handleUserLocationChange}
      />
    </>
  );
}
