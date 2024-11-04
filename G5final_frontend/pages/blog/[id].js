import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Components
import LatestCard from '@/components/sidebar/latest-post/latest-post';
import TagCard from '@/components/sidebar/tags/tags';
import Banner from '@/components/join/banner/banner';
import SearchBar from '@/components/sidebar/search/search-bar';
import POPCard from '@/components/blog/pop-post/pop-post';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import CreateBtn from '@/components/blog/create-btn/create-btn';
import PostDetail from '@/components/blog/blog-post/blog-post';

export default function BlogPost(props) {
  const [blogData, setBlogData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://localhost:3005/api/blog/${id}`);
        const data = await response.json();

        if (data.status === 'success') {
          setBlogData(data.data);
        } else {
          console.error('無法獲取資料');
        }
      } catch (error) {
        console.error('無法獲取資料:', error);
      }
    };

    fetchBlogData();
  }, [id]);

  if (!blogData) return <p>文章已下架</p>;

  return (
    <div className="bl-post">
      <Banner title="文章標題" />
      <div className="post-container container">
        <Breadcrumbs className="breadcrumb" />
        <div className="main-section">
          <PostDetail
            title={blogData.Title ? blogData.Title : ''}
            blogImg={blogData.blogImg}
            content={blogData.Content}
            tags={blogData.tags ? blogData.tags.split(',') : []}
            updateDate={blogData.UpdateDate}
            likeCount={blogData.likeCount}
            favoriteCount={blogData.favoriteCount}
            id={blogData.ID}
            maxId={blogData.ID}
          />{' '}
          {/* 側邊欄 */}
          <div className="sidebar">
            <div className="btn-sec">
              <button className="btn btn-primary my-blog m-none">
                我的部落格
              </button>
              <CreateBtn btnName={'建立文章'} />
            </div>
            <div className="s-card">
              <SearchBar />
            </div>
            <div className="m-none">
              <TagCard />
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
