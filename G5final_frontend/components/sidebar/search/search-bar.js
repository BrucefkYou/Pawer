import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './searchbar.module.scss';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';

import { BsSearch } from 'react-icons/bs';
import { RiCloseCircleLine } from 'react-icons/ri';

export default function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  // 更新搜尋的關鍵字
  useEffect(() => {
    setKeyword(router.query.keyword || '');
  }, [router.query.keyword]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { keyword, tag: '' },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleClear = () => {
    setKeyword('');
    router.push({
      pathname: router.pathname,
      query: { keyword: '', tag: '' },
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
              onKeyDown={handleKeyDown}
            />

            <div
              className={`btn btn-primary ${styles.search} rounded-2`}
              type="button"
              onClick={handleSearch}
            >
              <BsSearch />
            </div>

            {keyword && (
              <RiCloseCircleLine
                className={styles['clear-icon']}
                onClick={handleClear}
              />
            )}
          </div>
        }
      />
    </div>
  );
}

