import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
// import styles from './search.module.scss';

export default function SearchSideBar(props) {
  return (
    <>
      <div className="input-group mb-3 ">
        <input
          type="text"
          className="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />

        <button
          className="btn btn-primary ms-2"
          type="button"
          id="button-addon2"
        >
          <BsSearch />
        </button>
      </div>
    </>
  );
}
