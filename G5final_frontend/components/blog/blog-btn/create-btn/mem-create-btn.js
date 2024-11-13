import { useRouter } from 'next/router';
import styles from './create-btn.module.scss';

export default function MemCreateBtn({  url = '/', children }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };

  return (
    
    <div
      className={`btn btn-warning ${styles['mem-create-btn']}`}
      type="button"
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
