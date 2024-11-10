import React, { useState, useEffect } from 'react';
import Select from 'react-dropdown-select';
import { useRouter } from 'next/router';

export default function TagsSelect({ maxTags = 3 }) {
  const router = useRouter();
  const [tags, setTags] = useState({});
  const [options, setOptions] = useState([]);
  const [selected, setSelect] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/tags');
        if (!response.ok) {
          throw new Error('網路回應不成功：' + response.status);
        }
        const tags = await response.json();
        // console.log(data);
        setTags(tags);

        const options = tags.map((item) => ({
          id: item.ID,
          name: item.Name,
        }));
        setOptions(options);
      } catch (err) {
        console.error('錯誤：', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (selected) => {
    if (selected.length > maxTags) {
      selected = selected.slice(0, maxTags);
    }
    setSelect(selected);
  };

  return (
    <>
      <Select
        multi={true}
        options={options}
        labelField="name"
        placeholder="Select"
        color="#f4b13e"
        create={true}
        searchable={true}
        valueField="name"
        values={selected}
        onChange={handleChange}
      />
      ;
    </>
  );
}
