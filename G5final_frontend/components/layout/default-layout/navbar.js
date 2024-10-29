/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { BsPerson, BsCart2 } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/LOGO.svg';
export default function Navbar() {
  // 狀態管理下拉選單的顯示與隱藏
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 切換下拉選單
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 點擊頁面其他地方時關閉下拉選單
  const handleClickOutside = (e) => {
    if (!e.target.closest(`.customDropdown`)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <>
      <header className="header">
        <div className="navbar">
          <div className="navbar-leftbtn">
            {/* 手機版下拉選單按鈕 */}
            <div className="navbar-rwd-listbar">
              <div className="customDropdown">
                <button
                  className="customDropdownToggle"
                  onClick={toggleDropdown}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                  aria-label="切換下拉選單"
                >
                  {/* 下拉選單 SVG 圖示 */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={25}
                    height={25}
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 21C2 20.7348 2.10536 20.4804 2.29289 20.2929C2.48043 20.1054 2.73478 20 3 20H23C23.2652 20 23.5196 20.1054 23.7071 20.2929C23.8946 20.4804 24 20.7348 24 21C24 21.2652 23.8946 21.5196 23.7071 21.7071C23.5196 21.8946 23.2652 22 23 22H3C2.73478 22 2.48043 21.8946 2.29289 21.7071C2.10536 21.5196 2 21.2652 2 21ZM2 13C2 12.7348 2.10536 12.4804 2.29289 12.2929C2.48043 12.1054 2.73478 12 3 12H23C23.2652 12 23.5196 12.1054 23.7071 12.2929C23.8946 12.4804 24 12.7348 24 13C24 13.2652 23.8946 13.5196 23.7071 13.7071C23.5196 13.8946 23.2652 14 23 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13ZM2 5C2 4.73478 2.10536 4.48043 2.29289 4.29289C2.48043 4.10536 2.73478 4 3 4H23C23.2652 4 23.5196 4.10536 23.7071 4.29289C23.8946 4.48043 24 4.73478 24 5C24 5.26522 23.8946 5.51957 23.7071 5.70711C23.5196 5.89464 23.2652 6 23 6H3C2.73478 6 2.48043 5.89464 2.29289 5.70711C2.10536 5.51957 2 5.26522 2 5Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <div
                  className={`customDropdownMenu ${
                    isDropdownOpen ? 'showMenu' : ''
                  }`}
                >
                  <ul className="dropdownUl">
                    <li className="dropdownli">
                      <Link
                        type="button"
                        className="customDropdownItem"
                        href="./product"
                      >
                        貓貓商品
                      </Link>
                    </li>
                    <li className="dropdownli">
                      <Link
                        type="button"
                        className="customDropdownItem"
                        href="./product"
                      >
                        狗狗商品
                      </Link>
                    </li>
                    <li className="dropdownli">
                      <Link
                        type="button"
                        className="customDropdownItem"
                        href="./blog"
                      >
                        部落格專
                      </Link>
                    </li>
                    <li className="dropdownli">
                      <Link
                        type="button"
                        className="customDropdownItem"
                        href="./join"
                      >
                        萌寵聚會
                      </Link>
                    </li>
                    <li className="dropdownli">
                      <Link
                        type="button"
                        className="customDropdownItem"
                        href="./communicator"
                      >
                        寵物溝通
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <div className="navbar-rwd-listbar">
              <button className="dropdown-btn" onClick={setDropdownToggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 21C2 20.7348 2.10536 20.4804 2.29289 20.2929C2.48043 20.1054 2.73478 20 3 20H23C23.2652 20 23.5196 20.1054 23.7071 20.2929C23.8946 20.4804 24 20.7348 24 21C24 21.2652 23.8946 21.5196 23.7071 21.7071C23.5196 21.8946 23.2652 22 23 22H3C2.73478 22 2.48043 21.8946 2.29289 21.7071C2.10536 21.5196 2 21.2652 2 21ZM2 13C2 12.7348 2.10536 12.4804 2.29289 12.2929C2.48043 12.1054 2.73478 12 3 12H23C23.2652 12 23.5196 12.1054 23.7071 12.2929C23.8946 12.4804 24 12.7348 24 13C24 13.2652 23.8946 13.5196 23.7071 13.7071C23.5196 13.8946 23.2652 14 23 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13ZM2 5C2 4.73478 2.10536 4.48043 2.29289 4.29289C2.48043 4.10536 2.73478 4 3 4H23C23.2652 4 23.5196 4.10536 23.7071 4.29289C23.8946 4.48043 24 4.73478 24 5C24 5.26522 23.8946 5.51957 23.7071 5.70711C23.5196 5.89464 23.2652 6 23 6H3C2.73478 6 2.48043 5.89464 2.29289 5.70711C2.10536 5.51957 2 5.26522 2 5Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div> */}
            <Link type="button" className="navbar-logo" href="/">
              <Image width={115} height={84} src={logo} alt="logo" priority />
            </Link>
          </div>
          <div className="navbar-list">
            <Link type="button" className="text-secondary" href="./product">
              貓貓商品
            </Link>
            <Link type="button" className="text-secondary" href="./product">
              狗狗商品
            </Link>
            <Link type="button" className="text-secondary" href="./blog">
              部落格專區
            </Link>
            <Link type="button" className="text-secondary" href="./join">
              萌寵聚會
            </Link>
            <Link
              type="button"
              className="text-secondary"
              href="./communicator"
            >
              寵物溝通
            </Link>
          </div>

          <div className="navbar-rightbtn">
            <button className="navbar-member">
              <Link href="/member">
                <BsPerson className="text-secondary" />
              </Link>
            </button>
            <button className="navbar-cart">
              {/* <img src="./images/icon/cart.svg" alt="1"> */}
              <Link href="/cart">
                <BsCart2 className="text-secondary BsCart2" />
              </Link>
            </button>
            <button className="navbar-logout">
              <Link href="/logout">
                <IoIosLogOut className="text-secondary" />
              </Link>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
