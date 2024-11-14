import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/use-auth';

export default function BlogCom({ id }) {
  const { auth } = useAuth();
  const memberId = auth?.memberData?.id;
  const nickname = auth?.memberData?.nickname;
  const avatar = auth?.memberData?.avatar;

  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [showMore, setShowMore] = useState(3);

  // 取得留言列表
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3005/api/blog/${id}`);
      if (!response.ok) throw new Error('無法取得留言');
      const data = await response.json();
      //   console.log('取得的文章:', data);

      if (data.length > 0) {
        const blog = data[0];
        setComments(blog.comments || []);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error('無法取得留言:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // 發送留言
  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) {
      toast('請輸入評論的內容', {
        duration: 1800,
        style: {
          borderRadius: '10px',
          borderTop: '15px #22355C solid',
          background: '#F5F5F5',
          color: '#646464',
          marginTop: '80px',
          width: '300px',
          height: '100px',
        },
      });
      return;
    }

    const newComment = {
      ID: id,
      MemberID: memberId,
      CommentContent: commentContent,
    };

    try {
      const response = await fetch(
        'http://localhost:3005/api/blog/create-comment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        }
      );

      if (!response.ok) throw new Error('留言發送失敗');
      const result = await response.json();
      // console.log('留言發送成功:', result);

      setCommentContent('');
      fetchComments();
    } catch (error) {
      console.error('無法發送留言:', error);
    }
  };

  // 顯示更多留言
  const showMoreComments = () => {
    setShowMore((prevCount) => prevCount + 3); 
  };

  //   登入者的留言頭像
  const avatarPath = auth.memberData.avatar
    ? `http://localhost:3005/member/${auth.memberData.avatar}`
    : auth.memberData.google_avatar
    ? auth.memberData.google_avatar
    : `http://localhost:3005/member/avatar-default.png`;

  return (
    <div className="commit-container">
      {/* 留言輸入區 */}
      <div className="comment-section">
        {memberId ? (
          <>
            <Image
              className="avatar"
              src={avatarPath}
              alt="帳號頭像"
              width={73}
              height={73}
            />
            <div className="content">
              <div className="user-info">
                <div className="user-name">{nickname}</div>
              </div>
              <textarea
                className="comment-input"
                placeholder="評論"
                rows="4"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              ></textarea>
              <div className="button-group">
                <div
                  className="btn btn-outline-primary"
                  onClick={() => setCommentContent('')}
                >
                  取消
                </div>
                <div className="btn btn-primary" onClick={handleCommentSubmit}>
                  送出
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h6 d-flex justify-content-center">
            <Link
              href={'http://localhost:3000/member/login'}
              className="text-decoration-none"
            >
              登入會員即可開始評論
            </Link>
          </div>
        )}
      </div>

      <div className="comments-list">
        {comments.slice(0, showMore).map((comment) => {
          // 留言列表裡的頭像
          const commentAvatarPath = comment.MemberAvatar
            ? `http://localhost:3005/member/${comment.MemberAvatar}`
            : `http://localhost:3005/member/avatar-default.png`;

          return (
            <div key={comment.CommentID} className="shadow rounded-1 comment">
              <Image
                className="avatar"
                src={commentAvatarPath}
                alt="帳號頭像"
                width={50}
                height={50}
              />
              <div className="comment-content">
                <div className="comment-header">
                  <div className="comment-name">{comment.Nickname}</div>
                  <div className="comment-time">
                    {moment(comment.created_at).format('YYYY/MM/DD HH:mm')}
                  </div>
                </div>
                <div className="comment-text">{comment.CommentContent}</div>
              </div>
            </div>
          );
        })}
        {/* 查看更多 */}
        <div className="comment-count d-flex gap-2">
          共 {comments.length} 則留言
          {comments.length > showMore && (
            <div type="button" onClick={showMoreComments}>
              查看更多
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
