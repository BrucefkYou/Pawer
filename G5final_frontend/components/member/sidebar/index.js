import React, { useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';

export default function MbSideBar({activeMenu,setActiveMenu,handleCloseOffcanvas}) {
  const router = useRouter();
  const { auth } = useAuth();
  const isPetCom = auth.memberData.isPetCom;
  useEffect(() => {
    // 初始化 activeMenu
    const currentMenu = menuItems.find(
      (menu) =>
        router.pathname === menu.href ||
        menu.subMenu.some((sub) => router.pathname.includes(sub.href))
    );
    // console.log(`currentMenu`,currentMenu);
    
    if (currentMenu) {
      setActiveMenu(currentMenu.id);
    }
  }, []); 
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
      subMenu: [],
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
      href: '#',
      subMenu: [
        { id: 1, title: '已報名活動', href: '/member/join' },
        { id: 2, title: '已收藏活動', href: '/member/join/favorite' },
        { id: 3, title: '已發起活動', href: '/member/join/release' },
      ],
    },
    {
      id: 6,
      title: '我的部落格',
      href: '#',
      subMenu: [
        { id: 1, title: '部落格紀錄', href: '/member/blog' },
        { id: 2, title: '收藏部落格', href: '/member/blog/favorite' },
      ],
    },
    {
      id: 7,
      title: '寵物溝通師',
      href: '#',
      subMenu: [
        {
          id: 1,
          title: '師資專區 預約清單',
          href: '/member/communicator/comReserve',
          isPetCom: isPetCom,
        },
        {
          id: 2,
          title: '師資專區 刊登資料',
          href: '/member/communicator/detail',
          isPetCom: isPetCom,
        },
        {
          id: 3,
          title: '會員預約清單',
          href: '/member/communicator/memReserve',
        },
        {
          id: 4, 
          title: '我要成為溝通師', 
          href: '/member/communicator/create',
        },
      ],
    },
  ];
  // console.log(menuItems);

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
              className={`nav-link ${activeMenu === v.id ? 'active' : ''} `}
              href={v.href}
              onClick={() => {
                setActiveMenu(v.id);
                {v.subMenu.length === 0 && handleCloseOffcanvas()}
              }}
            >
              {v.subMenu.length > 0 && activeMenu === v.id ? (
                <IoIosArrowDown className="me-1" />
              ) : (
                <IoIosArrowForward className="me-1" />
              )}

              {v.title}
            </Link>
            {v.subMenu.length > 0 && activeMenu === v.id && (
              <ul className="nav flex-column gap-1 p-1">
                {v.subMenu
                .filter((sub) => sub.isPetCom !== 0) // 過濾掉 isPetCom = 0 的項目
                .map((sub) => (
                  <li key={sub.id} className={`ps-4`}>
                    <Link
                      className={`nav-link ms-1 ${router.pathname === sub.href ? 'text-warning' : ''
                        }`}
                      href={sub.href}
                      onClick={()=>{handleCloseOffcanvas()}}
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
