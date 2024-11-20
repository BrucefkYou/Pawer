import React, { useState, useEffect } from 'react';
import BlogCard from './blog-card/blog-card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function HomeBlCard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/blog');
        const allBlogs = await response.json();

        const sortedBlogs = allBlogs
          .filter((blog) => blog.Status === 1)
          .sort((a, b) => b.likeCount - a.likeCount)
          .slice(0, 9);

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchBlogs();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    accessibility: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="sec7-layout">
      <div className="container">
        <div className="row sec7-hot-layout">
          {/* 文字區 */}
          <div className="col sec7-text-layout">
            <p className="sec7-text-hot">
              熱門<span className="sec7-span">文章</span>
            </p>
          </div>
          <div className="col sec7-text-layout">
            <h3 className="PopularArticle">Popular Article</h3>
          </div>
        </div>
        <div className="row">
          <div className={'sec7-row-card-layout'}>
            <Slider {...settings}>
              {blogs.map((blog) => (
                <div key={blog.ID}>
                  <BlogCard
                    id={blog.ID}
                    title={blog.Title}
                    blogImg={blog.blogImg}
                    createDate={blog.CreateDate}
                    likeCount={blog.likeCount}
                    favoriteCount={blog.favoriteCount}
                    avatar={blog.MemberAvatar || 'avatar-default.png'}
                    name={blog.Nickname}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
