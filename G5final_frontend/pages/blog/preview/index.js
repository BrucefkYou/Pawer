import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import moment from 'moment';
import Account from '@/components/blog/account/account';
import { handleSubmit } from '@/components/blog/utils/handleSubmit ';
import { handleSaveDraft } from '@/components/blog/utils/handleSaveDraft';


export default function BlogPreview() {
  const { auth } = useAuth();
  const uid = auth.memberData.id;
  const router = useRouter();
  const { title, content, tags, imageName, previewImage, memberId } = router.query;
  const [userData, setUserData] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = moment().format('YYYY/MM/DD');
        setCurrentDate(formattedDate);

        if (memberId) {
          const response = await fetch(
            `http://localhost:3005/api/blog/member/${memberId}`
          );
          const data = await response.json();
          setUserData(data);
          setAvatarLoaded(true);
        }
      } catch (error) {
        console.error('error:', error);
      }
    };

    fetchData();
  }, [memberId, previewImage]);

  const handleBack = () => {
    router.push({
      pathname: '/blog/create',
      query: {
        title,
        content,
        tags,
        imageName,
        previewImage,
      },
    });
  };

  const user = userData?.[0];
  const username = user?.Nickname || '';
  const userAvatar = user?.Avatar
    ? `http://localhost:3005/member/${user.Avatar}`
    : auth.memberData.google_avatar
      ? auth.memberData.google_avatar
      : `http://localhost:3005/member/avatar-default.png`;
    

  return (
    <div className="bl-preview">
      <div className="blog-preview-container">
        <div className="blog-post">
          <div id="image-preview-wrapper" className="image-preview-wrapper ">
            <Image src={previewImage || ''} alt="圖片預覽" fill priority />
          </div>
          <div className="blog-header">
            <div className="blog-account">
              {userData && (
                <Account avatar={userAvatar} w={50} h={50} name={username} />
              )}
            </div>
            <div>
              <p className="text blog-date">{currentDate}</p>
            </div>
          </div>
          <h2 className="blog-title">{title}</h2>
          <div className="blog-content">
            <div
              dangerouslySetInnerHTML={{
                __html: content ? decodeURIComponent(content) : '',
              }}
            ></div>
          </div>
          <div className="tag-section">
            <div>標籤：</div>
            {tags &&
              tags.split(',').map((tag, index) => (
                <div key={index} className="tag" type="button">
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <button className="btn btn-warning" onClick={handleBack}>
          返回編輯
        </button>
        <div className="button-group">
          <button type="button" className="btn btn-outline-primary" 
          onClick={(e) => handleSaveDraft(e, uid, title, decodeURIComponent(content), tags, imageName, router)} >儲存草稿</button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) =>
              handleSubmit(
                e,
                uid,
                title,
                decodeURIComponent(content),
                tags,
                imageName,
                router,
                previewImage
              )
            }
          >
            發佈文章
          </button>
        </div>
      </div>
    </div>
  );
}
