import React from 'react';
import Image from 'next/image';

export default function BlogPreview(props) {
  return (
    <div className="bl-preview">
      <div className="blog-preview-container">
        <div className="blog-post">
          <div className="shadow rounded-1 blog-cover-container">
            <Image src="" alt="文章封面預覽" className="img-fluid blog-cover" />
          </div>
          <div className="blog-header">
            <div className="blog-account">
              <Image src="" alt="帳號頭像" className="avatar" />
              <div>
                <p className="text">帳號名稱</p>
              </div>
            </div>
            <div>
              <p className="text blog-date">2024/09/19</p>
            </div>
          </div>
          <h2 className="blog-title">身為一隻狗，要怎麼變有錢？</h2>
          <div className="blog-content">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium vitae corporis porro ducimus voluptate voluptatibus
              beatae, nostrum est molestiae, aliquid itaque autem quidem, fuga
              eaque repellendus laudantium totam adipisci iure.
            </p>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <button className="btn btn-warning">返回編輯</button>
        <div className="button-group">
          <button className="btn btn-outline-primary">儲存草稿</button>
          <button className="btn btn-primary">發佈文章</button>
        </div>
      </div>
    </div>
  );
}
