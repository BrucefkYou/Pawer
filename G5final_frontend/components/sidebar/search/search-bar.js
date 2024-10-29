import React from 'react';
import styles from './searchbar.module.scss';
import SideBarCard from '@/components/sidebar/sidebar-card/sidebar-card';
import { BsSearch } from 'react-icons/bs';

const SearchBar = () => {
  return (
    <div className={` ${styles.searchBar}`}>
      <SideBarCard
        content={
          <div className={styles['search-bar']}>
            <input
              type="text"
              className={`form-control`}
              placeholder="搜尋..."
            />
            <button
              className={`btn btn-primary ${styles.search}`}
              type="button"
            >
              <BsSearch />
            </button>
          </div>
        }
      />
      {/*  */}
    </div>
  );
};

export default SearchBar;
