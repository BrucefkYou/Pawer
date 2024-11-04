import React from 'react'
import Link from 'next/link'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

export default function BlogPageBtn({ id, maxId, preTitle, nextTitle }) {
  const prevId = id > 1 ? id - 1 : null
  const nextId = id < maxId ? id + 1 : null

  return (
    <div className="prev-next">
      {prevId && (
        <Link href={`/blog/${prevId}`} className="prev">
          <div className="arrow-container">
            <BsArrowLeft className="arrow-icon" />
          </div>
          <div className="prev-content">
            <div className="prev-title">
              <span>上一篇</span>
            </div>
            <h5 className="article-title">{preTitle}</h5>
          </div>
        </Link>
      )}
      {nextId && (
        <Link href={`/blog/${nextId}`} className="next">
          <div className="arrow-container">
            <BsArrowRight className="arrow-icon" />
          </div>
          <div className="next-content">
            <div className="next-title">下一篇</div>
            <h5 className="article-title">{nextTitle}</h5>
          </div>
        </Link>
      )}
    </div>
  )
}
