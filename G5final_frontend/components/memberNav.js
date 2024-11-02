import React, { useState, useEffect } from 'react';
export default function MemberNav(props) {
  return (
    <>
      <ul className="nav nav-tabs member-nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            進行中
            <span className="tab-count">10</span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            歷史
            <span className="tab-count">10</span>
          </button>
        </li>
      </ul>
    </>
  );
}
