import styles from './page-title.module.scss';

export default function PageTitle({ title, subTitle }) {
  return (
    <>
      <h5 className={`${styles['title']}`}>
        {title} <span className="text-warning">{subTitle}</span>
        <div className={`${styles['underline']}`}>
          <div className={`${styles['underline-part1']}`}></div>
          <div className={`${styles['underline-part2']}`}></div>
        </div>
      </h5>
    </>
  );
}
