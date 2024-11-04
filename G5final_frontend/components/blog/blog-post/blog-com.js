import React from 'react'
import Image from 'next/image'

// Components
import Account from '@/components/blog/account/account'
import BlogDate from '@/components/blog/date/blog-date'
import ClickIcon from '@/components/icons/click-icon/click-icon'

// react-Bs-icon
import {
  BsHeartFill,
  BsHeart,
  BsBookmarkFill,
  BsBookmark,
  BsArrowLeft,
  BsArrowRight,
} from 'react-icons/bs'

export default function PostCom(props) {
  return (
    <div className="commit-container">
      <div className="comment-section">
        <Image
          className="avatar"
          src=""
          alt="帳號頭像"
          width={73}
          height={73}
        />
        <div className="content">
          <div className="user-info">
            <div className="user-name">帳號名稱</div>
          </div>
          <textarea
            className="comment-input"
            placeholder="評論"
            rows="4"
          ></textarea>
          <div className="button-group">
            <div className="btn btn-outline-primary">取消</div>
            <div className="btn btn-primary">送出</div>
          </div>
        </div>
      </div>
      <div className="comment-count">5則留言</div>
      <div className="comments-list">
        <div className="shadow rounded-1 comment">
          <Image
            className="avatar"
            src=""
            alt="帳號頭像"
            width={50}
            height={50}
          />{' '}
          <div className="comment-content">
            <div className="comment-header">
              <div className="comment-name">北部小辣椒</div>
              <div className="comment-time">2024/99/99 99:99</div>
            </div>
            <div className="comment-text">
              商品很不錯，孩子們都很喜歡！值得回購！
            </div>
          </div>
        </div>
        <a href="" className="see-more">
          查看更多
        </a>
      </div>
    </div>
  )
}
