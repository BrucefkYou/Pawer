/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// ClearSearchContainer.js
import React, { useState } from 'react';
import SearchBar from './SearchBar';

export default function Clean({ updateSearch }) {
  const [inputValue, setInputValue] = useState('');

  // 搜尋方法，觸發時更新搜尋結果
  const handleSearch = (searchTerm) => {
    updateSearch(searchTerm);
  };

  // 清除搜尋內容並重置狀態
  const handleClear = () => {
    setInputValue(''); // 清空搜尋框內容
    updateSearch(''); // 重置搜尋結果
  };

  return (
    <div>
      <SearchBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSearch={handleSearch}
      />
      <div className="btn p-0 mt-3" onClick={handleClear}>
        <p className="clean">清除搜尋</p>
      </div>
    </div>
  );
}
