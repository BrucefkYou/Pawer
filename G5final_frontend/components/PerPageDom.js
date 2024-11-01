import React from 'react';

export function PerPageDom({ itemsperPage, choosePerpage }) {
    return (
        <div>
            每頁筆數：
            <select
                value={itemsperPage}
                className="text-body-tertiary form-select d-none d-md-block"
                onChange={choosePerpage}
            >
                <option>6</option>
                <option>12</option>
                <option>18</option>
                <option>24</option>
            </select>
        </div>
    );
}
