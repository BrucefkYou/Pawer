import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Banner from '@/components/blog/banner';
import SortedCard from '@/components/sidebar/sorted-card/sorted-card';
import BlogDetail from '@/components/blog/blog-post/blog-detail';
import CreateBtn from '@/components/blog/blog-btn/create-btn/create-btn';
import BlogBtn from '@/components/blog/blog-btn/myBlog-btn';

import { BsHeartFill } from 'react-icons/bs';

export default function BlogPost(props) {
  const [blogData, setBlogData] = useState(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const updateImageTags = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img');

    images.forEach((img) => {
      img.classList.add('img-fluid');
    });

    return doc.body.innerHTML;
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://localhost:3005/api/blog/${id}`);
        const data = await response.json();

        if (data[0].Status === 1) {
          const updatedData = {
            ...data[0],
            Content: updateImageTags(data[0].Content),
          };
          setBlogData(updatedData);
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
    <>
      <Head>
        <title>Pawer寶沃-部落格明細</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bl-post">
        <Banner
          bgImgUrl="/blog/blog-banner.svg"
          url="http://localhost:3005/api/blog"
          imgCover="none"
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
                <SortedCard
                  title="熱門文章"
                  id="ID"
                  api="http://localhost:3005/api/blog"
                  link="http://localhost:3000/blog"
                  img="blogImg"
                  content="Title"
                  date="UpdateDate"
                  count="likeCount"
                  IconComponent={BsHeartFill}
                  sorted="count"
                  limit={5}
                />
              </div>
              <div className="m-none">
                <SortedCard
                  title="最新發佈"
                  id="ID"
                  api="http://localhost:3005/api/blog"
                  link="http://localhost:3000/blog"
                  img="blogImg"
                  content="Title"
                  date="UpdateDate"
                  count="likeCount"
                  IconComponent={BsHeartFill}
                  sorted="date"
                  limit={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
