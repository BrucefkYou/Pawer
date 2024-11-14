import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Banner from '@/components/blog/banner';
import LatestCard from '@/components/sidebar/latest-post/latest-post';
import POPCard from '@/components/blog/pop-post/pop-post';
import BlogDetail from '@/components/blog/blog-post/blog-detail';
import CreateBtn from '@/components/blog/blog-btn/create-btn/create-btn';
import BlogBtn from '@/components/blog/blog-btn/myBlog-btn';

export default function BlogPost(props) {
  const [blogData, setBlogData] = useState(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://localhost:3005/api/blog/${id}`);
        const data = await response.json();

        if (data[0]) {
          if (data[0].Status === 1) {
            setBlogData(data[0]);
          } else {
            setIsRemoved(true);
          }
        } else {
          setIsRemoved(true);
        }

        // console.log('成功讀取資料', data);
      } catch (error) {
        console.error('無法獲取資料:', error);
      }
    };

    fetchBlogData();
  }, [id]);

  if (isRemoved) return <p>文章已下架</p>;

  if (!blogData) return <p>文章載入中</p>;

  return (
    <div className="bl-post">
      <Banner
        bgImgUrl="/blog/blog-banner.svg"
        url="http://localhost:3005/api/blog"
      />
      <div className="post-container container">
        <Breadcrumbs className="breadcrumb" />
        <div className="main-section">
          <BlogDetail
            title={blogData.Title ? blogData.Title : ''}
            blogImg={blogData.blogImg}
            content={blogData.Content}
            tags={blogData.tags ? blogData.tags.split(',') : []}
            updateDate={blogData.UpdateDate}
            likeCount={blogData.likeCount}
            favoriteCount={blogData.favoriteCount}
            id={blogData.ID}
            avatar={blogData.MemberAvatar}
            name={blogData.Nickname}
          />
          {/* 側邊欄 */}
          <div className="sidebar">
            <div className="btn-sec">
              <BlogBtn />
              <CreateBtn />
            </div>
            <div className="m-none">
              <LatestCard />
            </div>
            <div className="m-none">
              <POPCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
