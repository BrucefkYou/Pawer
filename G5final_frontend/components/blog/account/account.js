import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './account.module.scss';

export default function Account({img,w,h,name}) {
  
    return (
        <div className={styles['blog-account']}>
            <Image src={img} alt="帳號頭像" className={styles['avatar']} width={w} height={h} />
            <div>
                <p className={styles['text']}>{name}</p>
            </div>
    </div>
        // <div className={styles['blog-header']}>
        //     <div className={styles['blog-account']}>
        //         <Image src={img} alt="帳號頭像" className={styles['avatar']} width={57} height={57} />
        //         <div>
        //             <p className={styles['text']}>{name}</p>
        //         </div>
        //         <div>
        //             <p className={`${styles['text']} ${styles['blog-date']}`}>
        //                 {date}
        //             </p>
        //         </div>
        //     </div>
        // </div>
    );
}
