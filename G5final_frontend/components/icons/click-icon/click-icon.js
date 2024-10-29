import { useState } from 'react'
import styles from './click-icon.module.scss'

const IconToggle = ({ iconStatus, IconFilled, IconOutline }) =>
  iconStatus ? <IconFilled /> : <IconOutline />

export default function ClickIcon({ IconFilled, IconOutline }) {
  const [iconStatus, setIconStatus] = useState(false)
  const [count, setCount] = useState(0)

  const CountIcon = () => {
    setIconStatus(!iconStatus)
    setCount((prevCount) => (iconStatus ? prevCount - 1 : prevCount + 1))
  }

  return (
    <div className={styles['click-icon']}>
      <div
        type="button"
        className={styles['icon-btn']}
        onClick={CountIcon}
      >
        <IconToggle iconStatus={iconStatus} IconFilled={IconFilled} IconOutline={IconOutline} />
      </div>
      <span className={styles['count']}>{count}</span>
    </div>
  )
}
