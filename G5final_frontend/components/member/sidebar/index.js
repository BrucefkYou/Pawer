import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function MbSideBar(props) {
  const router = useRouter();
  const [openSubMenu, setOpenSubMenu] = useState(null); // 控制子選單開關狀態

  const menuItems = [
    {
      id: 1,
      title: '會員資料',
      href: '/member',
      subMenu: [],
    },
    {
      id: 2,
      title: '訂單查詢',
      href: '/member/order',
      subMenu: [
        { id: 1, title: '訂單明細', href: '/member/order/detail' },
        { id: 2, title: '測試', href: '/member/order/detail2' },
      ],
    },
    {
      id: 3,
      title: '我的優惠券',
      href: '/member/coupon',
      subMenu: [],
    },
    {
      id: 4,
      title: '收藏商品',
      href: '/member/favorite',
      subMenu: [],
    },
    {
      id: 5,
      title: '我的活動',
      href: '',
      subMenu: [
        { id: 1, title: '已報名活動', href: '/member/join' },
        { id: 2, title: '已收藏活動', href: '/member/join/favorite' },
        { id: 3, title: '已發起活動', href: '/member/join/release' },
      ],
    },
    {
      id: 6,
      title: '我的部落格',
      href: '',
      subMenu: [
        { id: 1, title: '部落格紀錄', href: '/member/blog' },
        { id: 2, title: '收藏部落格', href: '/member/blog/favorite' },
      ],
    },
    {
      id: 7,
      title: '寵物溝通師',
      href: '/member/communicator',
      subMenu: [
        {
          id: 1,
          title: '(師資)預約清單',
          href: '/member/communicator/comReserve',
        },
        {
          id: 2,
          title: '(師資)溝通師資料',
          href: '/member/communicator/detail',
        },
        { id: 3, title: '(師資)資料編輯', href: '/member/communicator/edit' },
        {
          id: 4,
          title: '(會員)預約清單',
          href: '/member/communicator/memReserve',
        },
        { id: 5, title: '(會員)師資註冊', href: '/member/communicator/create' },
      ],
    },
  ];

  const toggleSubMenu = (id) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  return (
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
        {menuItems.map((v) => (
          <li key={v.id} className={`nav-item`}>
            <Link
              className={`nav-link ${
                router.pathname === v.href ? 'active' : ''
              } ${openSubMenu === v.id ? 'active' : ''}`}
              href={v.href}
              onClick={() => toggleSubMenu(v.id)}
            >
              {v.subMenu.length > 0 && openSubMenu === v.id ? (
                <IoIosArrowDown className="me-1" />
              ) : (
                <IoIosArrowForward className="me-1" />
              )}

              {v.title}
            </Link>
            {v.subMenu.length > 0 && openSubMenu === v.id && (
              <ul className="nav flex-column gap-1 p-1">
                {v.subMenu.map((sub) => (
                  <li key={sub.id} className={`ps-4`}>
                    <Link
                      className={`nav-link ms-1 ${
                        router.pathname === sub.href ? 'text-warning' : ''
                      }`}
                      href={sub.href}
                    >
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
