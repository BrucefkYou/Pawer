import React from 'react';
import Image from 'next/image';
import { BsPersonPlusFill } from 'react-icons/bs';
import ColIcon from './col-icon';
import { useRouter } from 'next/router';
import styles from '@/components/join/card/join-card/join-card.module.scss';
import Link from 'next/link';

export default function JiCard({
  iconfillcolor = `${iconfillcolor}`,
  data = {},
  handleToggleFav = () => {},
}) {
  const router = useRouter();
  const StartTime = data.StartTime
    ? data.StartTime.replace(/-/g, '/').slice(0, 16)
    : '';
  const EndTime = data.StartTime
    ? data.StartTime.replace(/-/g, '/').slice(0, 16)
    : '';
  // console.log(data.ID, data.SignCount);
  return (
    <>
      <div className={`card shadow ${styles['ji-card']}`}>
        <Image
          className={`${styles['card-image']}`}
          width={367}
          height={321}
          src={`/join/${data.ImageName}`}
          alt={data.Title}
        />
        <div className={`card-body ${styles['card-body']}`}>
          <div className="d-flex justify-content-between">
            <div
              className={`text-secondary d-flex justify-content-start column-gap-2 ${styles.status}`}
            >
              <p className="bg-warning px-2 mb-2 rounded-1">{data.City}</p>
              <p className="bg-primary px-2 mb-2 rounded-1">{data.newStatus}</p>
              <p className="text-body-tertiary mb-2">
                <BsPersonPlusFill className="me-1" />
                <span className="align-middle">
                  {data.SignCount}/ {data.ParticipantLimit}
                </span>
              </p>
            </div>
            <div
              type="button"
              className={`text-body-tertiary  ${styles['colicon']}`}
            >
              <ColIcon
                color={`${iconfillcolor}`}
                id={data.ID}
                fav={data.fav}
                handleToggleFav={handleToggleFav}
              />
            </div>
          </div>
          <p className="card-text mb-4 text-body-tertiary">
            {StartTime}&nbsp;-&nbsp;{EndTime}
          </p>
          <h4
            className={`card-title text-primary mb-4 ${styles['card-title']}`}
          >
            {data.Title}
          </h4>
          <div className="text-end">
            <Link
              href={`./join/${data.ID}`}
              // onClick={() => router.push(`./join/${data.ID}`)}
              className="btn text-warning p-0"
            >
              查看更多
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
