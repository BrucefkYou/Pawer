import React from 'react';

export function PageNav({ nowPage, totalPage, next, prev }) {
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination m-0">
                <li className="page-item" onClick={prev}>
                    <a className="page-link" aria-label="Previous">
                        <span aria-hidden="true">‹</span>
                    </a>
                </li>
                <li
                    className={`page-item ${nowPage === 1 ? 'd-none' : ''}`}
                    onClick={prev}
                >
                    <a className="page-link">{nowPage - 1}</a>
                </li>
                <li className="page-item active">
                    <a className="page-link">{nowPage}</a>
                </li>
                <li
                    className={`page-item ${nowPage >= totalPage ? 'd-none' : ''}`}
                    onClick={next}
                >
                    <a className="page-link">{nowPage + 1}</a>
                </li>
                <li className="page-item" onClick={next}>
                    <a className="page-link" aria-label="Next">
                        <span aria-hidden="true">›</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
