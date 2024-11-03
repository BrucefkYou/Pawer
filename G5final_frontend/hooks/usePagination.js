//!以下為排序.分頁.每頁幾筆專用的鉤子yen

import { useState, useEffect } from 'react';
export function usePagination({
  url = '',
  needSort = [{ way: 'asc-ID', name: 'ID由小到大' }],
  needFilter = [{ id: 1, label: '進行中', filterRule: '1', filterName: 'ID' }]
}) {
  // 存放fetch所有容器
  const [data, setData] = useState([]);
  // 篩選掉重複物件
  const newdata = data.filter(
    (item, index, oldArr) =>
      // findIndex僅只會保留第一筆相同的資料
      index === oldArr.findIndex((v) => v.ID === item.ID)
  );
  // 存放篩選過的資料/存放篩選條件
  const [filterData, setFilterData] = useState([]);
  const [filterRuleArry, setfilterRuleArry] = useState(needFilter.length > 0
    ? {
      filterName: needFilter[0].filterName,
      filterRule: needFilter[0].filterRule,
    }
    : null);

  // 存放當前頁數(初始1)/存放每頁顯示的項目數(初始6)
  const [nowPage, setNowPage] = useState(1);
  const [itemsperPage, setItemsperPage] = useState(6);

  // 排序方法(初始asc)  // 排序欄位名稱(初始ID)
  const [sortWay, setSortWay] = useState('asc');
  const [sortName, setSortName] = useState('ID');

  // 計算當前頁數的最後一筆數 // 計算當前頁數的第一筆數
  const nowPageLastItems = nowPage * itemsperPage;
  const nowPageFirstItems = nowPageLastItems - itemsperPage;

  // 計算該資料總頁數
  const totalPage = Math.ceil(filterData.length / itemsperPage);

  // 排序邏輯,需帶入參數sortWay排序方式,sortName
  const sortedData = filterData.sort((a, b) => {
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
  // 若data資料變動隨之改變狀態
  useEffect(() => {
    // 確保每次篩選都重新渲染
    if (!filterRuleArry) {
      setFilterData(newdata);
    } else {
      const filtered = newdata.filter(
        (item) => item[filterRuleArry.filterName] == filterRuleArry.filterRule
      );
      setFilterData(filtered);
    }
    setNowPage(1);
  }, [data, filterRuleArry]);
  // 執行當前頁碼+1 // 執行當前頁碼-1
  function next() {
    setNowPage((prevPage) => Math.min(prevPage + 1, totalPage));
  }
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

    setSortWay(a);
    setSortName(b);
    setNowPage(1);
  }
  //篩選
  function chooseFilter(filterName, filterRule) {
    setfilterRuleArry({ filterName, filterRule });
    setNowPage(1);
  }
  //將參數傳出由父層控制
  return {
    nowPageLastItems,//當前頁的最後一筆數
    nowPageFirstItems,//當前頁的第一筆數
    totalPage,//總頁數
    nowPageItems,//當前頁應出現的物件陣列
    nowPage,//目前頁數
    itemsperPage,//每頁筆數
    sortWay,//升降序
    needSort,//客製化需要的排序陣列
    needFilter,//客製化需要的篩選陣列
    newdata,//使用sql join語法會重複過濾用
    filterData,//需要篩選時會使用到的新資料
    next,//執行下一頁函式
    prev,//執行上一頁函式
    choosePerpage,//執行指定頁函式
    chooseSort,//執行排序函式
    chooseFilter,//執行篩選函式
  };
}
