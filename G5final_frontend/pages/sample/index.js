import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Index(props) {
  return (
    <>

      <div className='container d-flex flex-column'>
        <h1> 範例區</h1>
        <Link href={'/sample/sample-memberNav'}>會員頁籤範例</Link>
        <Link href={'/sample/sample-Perpage'}>頁碼/每頁幾筆/排序範例</Link>
        <Link href={'/sample/sample-searchbar'}>搜尋框範例</Link>
        <Link href={'/sample/socket1'}>WebSocket1自己發送自己</Link>
        <Link href={'/sample/socket2'}>WebSocket2自己發送所有</Link>
        <Link href={'/sample/socket3'}>WebSocket3自己發送指定</Link>
      </div>

    </>
  )
}
