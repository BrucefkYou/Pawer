import React, { useEffect, useState } from 'react';

// Components
import Banner from '@/components/join/banner/banner';
import BlogList from '@/components/blog/blog-list';

export default function Blogindex() {
  return (
    <div className="bl-list">
      <Banner bgImgUrl="/blog/blog-banner.svg" imgCover='none' />
      <BlogList />
    </div>
  );
}
