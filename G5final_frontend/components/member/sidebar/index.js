import React from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function MbSideBar(props) {
  const router = useRouter();
  const menuItems = [
    {
      id: 1,
      title: '會員資料',
      href: '/member',
    },
    {
      id: 2,
      title: '訂單查詢',
      href: '/member/order',
    },
    {
      id: 3,
      title: '我的優惠券',
      href: '/member/my-coupon',
    },
    {
      id: 4,
      title: '收藏商品',
      href: '/member/likes',
    },
    {
      id: 5,
      title: '我的活動',
      href: '/member/join',
    },
    {
      id: 6,
      title: '我的部落格',
      href: '/member/blog',
    },
    {
      id: 7,
      title: '寵物溝通師',
      href: '/member/communicator',
    },
  ];

  return (
    <>
      <div className="mb-sidebar">
        <h5 className="title">會員中心</h5>
        <Image
          src="/pawButton.png"
          alt="1"
          className="img"
          width={59}
          height={59}
        />
        <ul className="nav flex-column gap-3 mt-3">
          {menuItems.map((v, i) => {
            return (
              <li
                key={v.id}
                className={`nav-item ${
                  router.pathname === v.href ? 'active' : ''
                }`}
              >
                <Link className="nav-link" href={v.href}>
                  <MdOutlineArrowForwardIos />
                  {v.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
