import React, { useState, useEffect } from 'react';
import TWZipCode from './tw-zipcode';

export default function MySelect(props) {
  const [city, setCity] = useState('');

  // 郵遞區號元件使用
  const [data, setData] = useState({
    country: '',
    township: '',
    address: '',
  });

  return (
    <>
      <TWZipCode
        initPostcode={data.postcode}
        onPostcodeChange={(country, township, address) => {
          setData({
            country,
            township,
            address,
          });
        }}
      />
    </>
  );
}
