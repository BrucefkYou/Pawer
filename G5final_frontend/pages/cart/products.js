// 測試從資料庫拉資料出來
import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart/use-cart-state';

export default function Products(props) {
  const [products, setProducts] = useState([]);
  // 將商品加入購物車
  const {
    cart,
    items,
    addItem,
    removeItem,
    updateItem,
    updateItemQty,
    clearCart,
    isInCart,
    increment,
    decrement,
  } = useCart();
  // 獲得全部商品資料
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/data/aa');
      if (!response.ok) {
        throw new Error('網路回應不成功：' + response.status);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 進入頁面時，取得全部商品資料
  useEffect(() => {
    fetchData();
  }, []);
  //! 當使用xxx.map(() => {});需要加上return
  // 如果是用xxx.map(() => ());則不需要加上return
  // 兩種方法可以用，但是當今天需要使用條件判斷時，需要用return
  // 如:
  // const filteredItems = items.map(item => {
  //   if (item.isActive) {
  //     return <ActiveItem key={item.id} {...item} />;
  //   } else {
  //     return <InactiveItem key={item.id} {...item} />;
  //   }
  // });
  return (
    <>
      <div>products</div>
      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            {product.Name} <br />
            {'price: $' + product.OriginPrice}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                addItem({
                  id: product.ID,
                  name: product.Name,
                  price: product.OriginPrice,
                  img: product.Img,
                  quantity: 1,
                  checked: '',
                });
              }}
            >
              加入購物車
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
