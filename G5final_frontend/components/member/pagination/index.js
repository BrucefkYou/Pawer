import React, { useState, useEffect, useMemo } from 'react';

export default function Pagination({ filterData, onPageChange }) {
  const [nowPage, setNowPage] = useState(1);
  const itemsperPage = 6;

  const totalPage = useMemo(
    () => Math.max(Math.ceil(filterData.length / itemsperPage), 1),
    [filterData, itemsperPage]
  );

  const handlePageChange = (newPage) => {
    const page = Math.min(Math.max(newPage, 1), totalPage);
    setNowPage(page);
    const startIdx = (page - 1) * itemsperPage;
    const endIdx = startIdx + itemsperPage;
    onPageChange(filterData.slice(startIdx, endIdx)); // 回傳當前分頁的資料
  };

  useEffect(() => {
    handlePageChange(1); // 當 filterData 變化時重置到第一頁
  }, [filterData]);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination m-0 justify-content-center">
        <li className={`page-item ${nowPage === 1 ? 'd-none' : ''}`}>
          <a
            className="page-link"
            aria-label="Previous"
            onClick={() => handlePageChange(nowPage - 1)}
          >
            <span aria-hidden="true">‹</span>
          </a>
        </li>
        {nowPage > 1 && (
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => handlePageChange(nowPage - 1)}
            >
              {nowPage - 1}
            </a>
          </li>
        )}
        <li className="page-item active">
          <a className="page-link">{nowPage}</a>
        </li>
        {nowPage < totalPage && (
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => handlePageChange(nowPage + 1)}
            >
              {nowPage + 1}
            </a>
          </li>
        )}
        <li className={`page-item ${nowPage >= totalPage ? 'd-none' : ''}`}>
          <a
            className="page-link"
            aria-label="Next"
            onClick={() => handlePageChange(nowPage + 1)}
          >
            <span aria-hidden="true">›</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
