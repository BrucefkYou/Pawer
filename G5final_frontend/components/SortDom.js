import React from 'react';

export function SortDom({ sort, chooseSort }) {
    return (
        <div>
            排序：
            <select
                value={sort}
                onChange={chooseSort}
                className="form-select text-body-tertiary"
                aria-label="Default select example"
            >
                <option value="id-desc">ID由大到小</option>
                <option value="id-asc">ID由小到大</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="href-asc">Href A-Z</option>
                <option value="href-desc">Href Z-A</option>
            </select>
        </div>
    );
}
