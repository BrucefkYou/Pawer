/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// SearchBar.js
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from '@/components/searchBar/searchbar.module.scss';

export default function SearchBar({ inputValue, setInputValue, onSearch }) {
  // 監聽 Enter 鍵觸發搜尋
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue); // 調用父層傳入的搜尋方法
    }
  };

  return (
    <div className={`rounded-1 ${styles['sidebar-card']}`}>
      <div className={styles['search-bar']}>
        <input
          type="text"
          className="form-control"
          placeholder="搜尋..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div
          className={`btn btn-primary me-3 ${styles.search}`}
          type="button"
          onClick={() => onSearch(inputValue)}
        >
          <BsSearch />
        </div>
      </div>
    </div>
  );
}
