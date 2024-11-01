// Index.js
import React, { useState } from 'react';
import data from '@/data/routerList.json';
import Test1 from '@/components/test1/test1';

export default function Index(props) {
  const [tableData, setTableData] = useState([]); // 當前頁面的資料
  const [handleSort, setHandleSort] = useState(() => {}); // 排序函數
  const [currentPage, setCurrentPage] = useState(1); // 當前頁面
  const [itemsPerPage, setItemsPerPage] = useState(5); // 每頁顯示筆數
  const [indexOfLastItem, setIndexOfLastItem] = useState(0); // 當前頁最後一筆資料的 index

  const handleDataChange = (
    currentData,
    sortFn,
    page,
    itemsPerPage,
    setItemsFn,
    setPageFn,
    lastItemIndex
  ) => {
    setTableData(currentData);
    setHandleSort(() => sortFn);
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
    setIndexOfLastItem(lastItemIndex);
  };

  return (
    <div>
      <Test1 data={data} onDataChange={handleDataChange} />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('title')}>title</th>
            <th onClick={() => handleSort('href')}>Age</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.href}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <label>
          每頁顯示：
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          上一頁
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= data.length}
        >
          下一頁
        </button>
      </div>
    </div>
  );
}
