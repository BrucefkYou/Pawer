//!以下為排序.分頁.每頁幾筆專用的鉤子yen
import { useState, useEffect } from 'react';
export function usePagination({
  url = '',
  onDataChange,
  needSort = { way: 'asc-ID', name: 'ID由小到大' },
}) {
  // 存放fetch所有容器
  const [data, setData] = useState([]);
  // 如果使用sql的join語法先進行篩遠
  const newdata = data.filter(
    (item, index, oldArr) =>
      // findIndex僅只會保留第一筆相同的資料
      index === oldArr.findIndex((v) => v.ID === item.ID)
  );

  // 存放當前頁數(初始1)
  const [nowPage, setNowPage] = useState(1);
  // 存放每頁顯示的項目數(初始6)
  const [itemsperPage, setItemsperPage] = useState(6);
  // 排序方法(初始asc)
  const [sortWay, setSortWay] = useState('asc');
  // 排序欄位名稱(初始ID)
  const [sortName, setSortName] = useState('ID');
  // 計算當前頁數的最後一筆數
  const nowPageLastItems = nowPage * itemsperPage;
  // 計算當前頁數的第一筆數
  const nowPageFirstItems = nowPageLastItems - itemsperPage;
  // 計算該資料總頁數
  const totalPage = Math.ceil(newdata.length / itemsperPage);
  // 排序邏輯,需帶入參數sortWay排序方式,sortName
  const sortedData = newdata.sort((a, b) => {
    // 如果屬性是數字類型，使用數字排序方式
    if (typeof a[sortName] === 'number' && typeof b[sortName] === 'number') {
      return sortWay === 'asc'
        ? a[sortName] - b[sortName]
        : b[sortName] - a[sortName];
    } else {
      // 如果是字串類型使用中英文進行排序
      return sortWay === 'asc'
        ? a[sortName].localeCompare(b[sortName], ['zh', 'en'], {
            numeric: true,
            sensitivity: 'base',
          })
        : b[sortName].localeCompare(a[sortName], ['zh', 'en'], {
            numeric: true,
            sensitivity: 'base',
          });
    }
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

    const a = selectedSort.split('-')[0];
    const b = selectedSort.split('-')[1];
    console.log(a);

    setSortWay(a);
    setSortName(b);
    setNowPage(1);
  }
  //將參數傳出由父層控制
  return {
    nowPageItems,
    nowPage,
    totalPage,
    itemsperPage,
    sortWay,
    needSort,
    next,
    prev,
    choosePerpage,
    chooseSort,
  };
}
