import React, { useState } from 'react';
import styles from './searchbar.module.scss';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import { BsSearch } from 'react-icons/bs';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    // console.log('點擊搜尋，關鍵字為', keyword);

    router.push({
      pathname: router.pathname,
      query: { keyword },
    });
  };

  return (
    <div className={`${styles.searchBar}`}>
      <SideBarCard
        content={
          <div className={styles['search-bar']}>
            <input
              type="text"
              className={`form-control`}
              placeholder="搜尋..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div
              className={`btn btn-primary ${styles.search}`}
              type="button"
              onClick={handleSearch}
            >
              <BsSearch />
            </div>
          </div>
        }
      />
    </div>
  );
}
