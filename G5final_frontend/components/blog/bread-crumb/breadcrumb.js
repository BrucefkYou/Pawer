import React from 'react';
import styles from './breadcrumb.module.scss';

export default function BreadCrumb({ breadcrumbs }) {
    return (
        <nav aria-label="breadcrumb">
            <ol className={`breadcrumb ${styles.breadcrumb}`}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={index}
                        className={`breadcrumb-item ${breadcrumb.isActive ? 'active' : ''}`}
                        aria-current={breadcrumb.isActive ? 'page' : ''}
                    >
                        {breadcrumb.isLink && !breadcrumb.isActive ? 
                        (<a href={breadcrumb.link}>{breadcrumb.name}</a>) : (breadcrumb.name)}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

   