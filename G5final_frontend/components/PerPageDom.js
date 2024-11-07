import React from 'react';

export function PerPageDom({ itemsperPage, choosePerpage }) {
  return (
    <div>
      <select
        value={itemsperPage}
        className="text-body-tertiary form-select d-md-block"
        onChange={(e) => choosePerpage(Number(e.target.value))}
      >
        <option value={6}>每頁 6 筆</option>
        <option value={12}>每頁 12 筆</option>
        <option value={18}>每頁 18 筆</option>
        <option value={24}>每頁 24 筆</option>
      </select>
    </div>
  );
}
