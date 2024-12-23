import React, { useState, useEffect } from 'react';

export default function Pagination(props) {
  return (
    <>
      <nav aria-label="Page navigation">
        <ul className="pagination m-0">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">‹</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item ">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">›</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
