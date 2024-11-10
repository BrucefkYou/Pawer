import React, { useState, useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import ProductList from '@/components/product/productList';
import Link from 'next/link';

Index.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Index() {
  const [favorites, setFavorites] = useState([]);
  const [url, setUrl] = useState(
    'http://localhost:3005/api/product/member/favorite'
  );

  // setUrl 第一層在父層 帶下去商品卡片頁第二層子層

  const { nowPageItems } = usePagination({
    url: url,
    needFilter: [],
  });

  return (
    <div>
      <div className="card">
        <PageTitle title={'收藏商品'} subTitle={'Favorite'} />
      </div>

      <div className="productList">
        {nowPageItems.length === 0 ? (
          <>
            <p className="mt-2">您沒有收藏的商品</p>
            <Link href="/product" className="pet-choose-status no-underline">
              去逛逛
            </Link>
          </>
        ) : (
          <div className="row ms-4 d-flex justify-content-start">
            {nowPageItems.map((pd) => (
              <ProductList key={pd.id} pd={pd} setUrl={setUrl} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
