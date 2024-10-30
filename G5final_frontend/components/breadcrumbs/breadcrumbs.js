import React, { useState, useEffect } from 'react';
import styles from '@/components/breadcrumbs/breadcrumbs.module.scss';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import routerList from '@/data/routerList.json';
import Link from 'next/link';

export default function Breadcrumbs(props) {
  const router = useRouter();
  // 抓取當前路由
  const nowRouter = router.pathname;
  // 分解當前路由為陣列,過濾空值
  const nowRouterArr = nowRouter.split('/').filter(Boolean);
  // 比對當前路由符合json檔內的物件取出
  const breadcrumbItems = nowRouterArr
    .map((_, index) => {
      // 累加路由
      const path = `/${nowRouterArr.slice(0, index + 1).join('/')}`;
      return routerList.find((v) => v.href === path);
    })
    // 過濾空值
    .filter(Boolean);
  return (
    <>
      <nav className={styles['pt-breadcrumb']}>
        <ol className="breadcrumb">
          <li key={1} className="breadcrumb-item">
            <Link
              href="/"
              className={`${router.pathname === '/' ? styles['active'] : ''}`}
            >
              首頁
            </Link>
          </li>
          {breadcrumbItems.map((v, i) => {
            return (
              <li key={uuidv4()} className="breadcrumb-item">
                <a
                  href={v.href}
                  className={`${
                    router.pathname === v.href ? styles['active'] : ''
                  }`}
                >
                  {v.title}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
