import React, { useState, useEffect } from 'react';

export default function PageTitle({ title, subTitle }) {
  return (
    <>
      <h5 className="title">
        {title} <span className="text-warning">{subTitle}</span>
        <div className="underline">
          <div className="underline-part1"></div>
          <div className="underline-part2"></div>
        </div>
      </h5>
    </>
  );
}
