import { BsPencilFill } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import styles from './create-btn.module.scss'
import Link from 'next/link'

export default function CreateBtn({ btnName }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768)
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <Link
      href={`http://localhost:3000/blog/create`}
      className={`btn btn-warning ${styles['create-btn']}`}
      type="button"
    >
      {isMobile ? <BsPencilFill size={20} color="white" /> : btnName}
    </Link>
  )
}
