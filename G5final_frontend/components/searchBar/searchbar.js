import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from '@/components/searchBar/searchbar.module.scss';

export default function SearchBar({ updateSearch }) {
    const [inputValue, setInputValue] = useState('');
    //監聽input欄位隨時更新狀態
    const handleSearch = () => {
        updateSearch(inputValue);
        
    };
    //監聽enter鍵觸發搜尋扭
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <>
            <div className={`rounded-1 ${styles['sidebar-card']}`}>
                    <div className={styles['search-bar']}>
                        <input
                            type="text"
                            className={`form-control`}
                            placeholder="搜尋..."
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        />
                        <div
                            className={`btn btn-primary ${styles.search}`}
                        type="button"
                        onClick={handleSearch}
                        >
                            <BsSearch />
                        </div>
                </div>
            </div>
        </>
    );
}