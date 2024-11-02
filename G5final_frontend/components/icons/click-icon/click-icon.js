import { useEffect, useState } from 'react';
import styles from './click-icon.module.scss';

const IconToggle = ({ iconStatus, IconFilled, IconOutline }) =>
  iconStatus ? <IconFilled /> : <IconOutline />;

export default function ClickIcon({ IconFilled, IconOutline, count }) {
  const [iconStatus, setIconStatus] = useState(false);
  const [currentCount, setCurrentCount] = useState(count);

  const CountIcon = () => {
    setIconStatus(!iconStatus);
    setCurrentCount((prevCount) =>
      iconStatus ? prevCount - 1 : prevCount + 1
    );
  };

  useEffect(() => {
    setCurrentCount(count);
  }, [count]);

  return (
    <div className={styles['click-icon']}>
      <div type="button" className={styles['icon-btn']} onClick={CountIcon}>
        <IconToggle
          iconStatus={iconStatus}
          IconFilled={IconFilled}
          IconOutline={IconOutline}
        />
      </div>
      <span className={styles['count']}>{currentCount}</span>
    </div>
  );
}
