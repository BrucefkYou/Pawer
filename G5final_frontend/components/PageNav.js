/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prettier/prettier */
import React from 'react';


export function PageNav({ nowPage, totalPage, next, prev }) {
  console.log(totalPage);
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination m-0">
        <li className={`page-item page-block ${nowPage === 1 ? 'd-none' : ''}`} onClick={prev}>
          <a className={`page-item page-link ${nowPage === 1 ? 'd-none' : ''}`} aria-label="Previous">
            <span aria-hidden="true">‹</span>
          </a>
        </li>
        <li
          className={`page-item  ${nowPage === 1 ? 'd-none' : ''}`}
          onClick={prev}
        >
          <a className="page-link">{nowPage - 1}</a>
        </li>
        <li className="page-item active page-block">
          <a className="page-link">{nowPage}</a>
        </li>
        <li
          className={`page-item page-block ${nowPage >= totalPage ? 'd-none' : ''}`}
          onClick={next}
        >
          <a className={`page-item page-link ${nowPage >= totalPage ? 'd-none' : ''}`} >{nowPage + 1}</a>
        </li>
        <li className={`page-item page-block ${nowPage >= totalPage ? 'd-none' : ''}`} onClick={next}>
          <a className={`page-item page-link ${nowPage >= totalPage ? 'd-none' : ''}`} aria-label="Next">
            <span aria-hidden="true">›</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
