// Test1.js
import React, { useState, useEffect } from 'react';

export default function Test1({ data, onDataChange }) {
  const [currentPage, setCurrentPage] = useState(1); // 當前頁面
  const [itemsPerPage, setItemsPerPage] = useState(5); // 每頁顯示的筆數
  const [sortField, setSortField] = useState(null); // 排序的欄位
  const [sortOrder, setSortOrder] = useState('asc'); // 排序順序 ('asc' 或 'desc')

  // 根據排序欄位和順序進行排序
  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField];
    const valueB = b[sortField];
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc'
        ? valueA.localeCompare(valueB, 'zh-Hant')
        : valueB.localeCompare(valueA, 'zh-Hant');
    }
    return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
  });

  // 計算分頁資料
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    onDataChange(
      currentData,
      handleSort,
      currentPage,
      itemsPerPage,
      setItemsPerPage,
      setCurrentPage,
      indexOfLastItem
    );
  }, [currentPage, itemsPerPage, sortField, sortOrder]);

  // 排序處理函數
  function handleSort(field) {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  }

  return null; // 不渲染任何 DOM 元素
}
