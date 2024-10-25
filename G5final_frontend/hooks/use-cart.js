import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';

// 1. 建立(與導出)Context
// 傳入參數為defaultValue，是在套用context時錯誤或失敗才會得到的值。
// 可以使用有意義的預設值，或使用null(通常目的是為了除錯)
const CartContext = createContext(null);
// 可以設定displayName，這是搭配react devtools開發時用的
CartContext.displayName = 'CartContext';

// 2. 建立Provider(供應者)元件
// 使用有開頭/結尾的特殊元件，共用狀態在其中進行集中管理
// 提供在MyApp(_app.js)階層最上層元件中套用的context
// props.children指的是包裹在其中的所有子女元件
export function CartProvider({ children }) {
  // 宣告路由器狀態
  // const router = useRouter()
  // 購物車中的購買項目
  const [items, setItems] = useState([]);
  // 宣告一個是否次元件已經完成初次渲染的布林值
  const [firstRender, setFirstRender] = useState(false);

  // 新增商品到購物車
  const onAdd = (product) => {
    // 先判斷此商品是否已經在購物車中
    const foundIndex = items.findIndex((v) => v.id === product.id);

    if (foundIndex !== -1) {
      // 有找到 --> 遞增商品數量
      const nextItems = items.map((v, i) => {
        if (v.id === product.id) {
          return { ...v, qty: v.qty + 1 };
        } else {
          return v;
        }
      });
      setItems(nextItems);
    } else {
      // 否則 ---> 新增商品到購物車
      // 注意購買項目和商品物件間差了一個數量qty屬性
      const newItem = { ...product, qty: 1 };
      const nextItems = [newItem, ...items];
      setItems(nextItems);
    }
  };

  // 處理遞增
  const onIncrease = (productId) => {
    const nextItems = items.map((v, i) => {
      if (v.id === productId) {
        return { ...v, qty: v.qty + 1 };
      } else {
        return v;
      }
    });
    setItems(nextItems);
  };

  // 處理遞減
  const onDecrease = (productId) => {
    const nextItems = items.map((v, i) => {
      if (v.id === productId) {
        return { ...v, qty: v.qty - 1 };
      } else {
        return v;
      }
    });
    setItems(nextItems);
  };

  // 處理刪除
  const onRemove = (productId) => {
    const nextItems = items.filter((v) => v.id !== productId);
    setItems(nextItems);
  };

  // 計算總數量與總金額
  const totalQty = items.reduce((acc, v) => acc + v.qty, 0);
  const totalPrice = items.reduce((acc, v) => acc + v.qty * v.price, 0);

  // 初次渲染執行
  // 工作：購物車頁一開始時，要從localStorage中讀取資料，設定到items狀態中
  useEffect(() => {
    // 從localStorage
    setItems(JSON.parse(localStorage.getItem('cart')) || []);
    // 初次渲染已完成了
    setFirstRender(true);
  }, []);

  // 初次渲染執行+items有更動時執行
  // 工作：當應用中購物車的資料有更動時，同步化寫入localStorage中
  useEffect(() => {
    // 如果初次渲染已完成
    if (firstRender) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
    // 不需要加入firstRender到監聽的相依辯書陣列中
    // eslint-disable-next-line
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        totalQty,
        onAdd,
        onDecrease,
        onIncrease,
        onRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 3. 建立一個包裝useContext的專用名稱勾子
// 提高閱讀性(專屬名稱)，簡化使用context的程式語法
export const useCart = () => useContext(CartContext);
// 正常在專案開發的時候，購物車的資料需要被寫進資料庫中，才不會造成使用者在切換裝置時，讀取不到紀錄
