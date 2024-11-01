// usePagination.js
import { useState, useEffect } from 'react';

export function usePagination({ url = '', onDataChange }) {
    // 存放fetch所有容器
    const [data, setData] = useState([]);
    // 存放當前頁數(初始1)
    const [nowPage, setNowPage] = useState(1);
    // 存放每頁顯示的項目數(初始5)
    const [itemsperPage, setItemsperPage] = useState(6);
    // 排序鉤子(初始id-asc)
    const [sort, setSort] = useState('id-asc');

    // 計算當前頁數的最後一筆數
    const nowPageLastItems = nowPage * itemsperPage;
    // 計算當前頁數的第一筆數
    const nowPageFirstItems = nowPageLastItems - itemsperPage;
    // 計算該資料總頁數
    const totalPage = Math.ceil(data.length / itemsperPage);
    // 排序邏輯
    const sortedData = [...data].sort((a, b) => {
        const [field, order] = sort.split('-');
        if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
        return 0;
    });
    // 重新整理已經處理過排序的新陣列,計算當前頁數應取得的資料
    const nowPageItems = sortedData.slice(nowPageFirstItems, nowPageLastItems);
    // 抓取資料庫資料
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('網路回應不成功：' + response.status);
                }
                const data = await response.json();
                setData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [url]);
    // 使用 useEffect 傳遞 nowPageItems 給父元件
    useEffect(() => {
        if (onDataChange) {
            onDataChange(nowPageItems);
        }
    }, [nowPageItems]);
    // 執行當前頁碼+1
    function next() {
        setNowPage((prevPage) => Math.min(prevPage + 1, totalPage));
    }
    // 執行當前頁碼-1
    function prev() {
        setNowPage((prevPage) => Math.max(prevPage - 1, 1));
    }
    // 筆數調整
    function choosePerpage(event) {
        const choosePerpage = Number(event.target.value);
        setItemsperPage(choosePerpage);
        setNowPage(1);
    }
    // 排序調整
    function chooseSort(event) {
        const selectedSort = event.target.value;
        setSort(selectedSort);
        setNowPage(1);
    }

    return {
        nowPageItems,
        nowPage,
        totalPage,
        itemsperPage,
        sort,
        next,
        prev,
        choosePerpage,
        chooseSort,
    };
}
