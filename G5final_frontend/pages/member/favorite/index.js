import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import ProductList from '@/components/product/productList';
import { useAuth } from '@/hooks/use-auth';

Index.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Index() {
  const [favorites, setFavorites] = useState([]);
  const { auth } = useAuth();
  const uid = auth.memberData.id;

  useEffect(() => {
    const favorites = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/member/favorite?uid=${uid}`
        );

        if (!response.ok) throw new Error('無法取得收藏的商品');
        const data = await response.json();
        setFavorites(data.favorites);
        console.log('取得的收藏商品:', data.favorites);
      } catch (error) {
        console.error('取得收藏商品失敗:', error);
      }
    };

    favorites();
  }, [uid]);

  return (
    <div>
      <PageTitle title="我的收藏" />
      {favorites.length === 0 ? (
        <p className="mt-2">您沒有收藏的商品</p>
      ) : (
        <div>
          {favorites.map((pd) => (
            <ProductList key={pd.id} pd={pd} />
          ))}
        </div>
      )}
    </div>
  );
}
