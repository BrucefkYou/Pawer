import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { BsCheckCircle, BsExclamationCircle } from 'react-icons/bs';
import { BiXCircle } from "react-icons/bi";
export default function Message({ status = 'warn', title = 'hi', content = '', button = '返回', url='' }) {
    const router = useRouter()
    function goback() { 
        if (router.asPath == url) {
            router.reload()
        } else { 
            router.push(url)
        }
    }
  return (
    <>
          <div className="message-card">
              <div className="pic mb-4">
                  {status == 'ok' ? <BsCheckCircle style={{ fontSize: '80px', color: '#5AAC4D' }} /> : ''}
                  {status == 'warn' ? <BsExclamationCircle style={{ fontSize: '80px', color: '#F4B13E' }} /> : ''}
                  {status == 'no' ? <BiXCircle style={{ fontSize: '80px', color: '#C14545' }} /> : ''}
              </div>
              <h3>{title}</h3>
              <hr />
              <p>{ content}</p>
              <p className="text1">相關問題請洽客服</p>
              <button className="message-btn" onClick={goback}>
                  {button}
              </button>
          </div>
    </>
  )
}
