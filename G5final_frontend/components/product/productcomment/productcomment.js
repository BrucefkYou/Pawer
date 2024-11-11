/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import toast from 'react-hot-toast';
import logo from 'public/LOGO.svg';
import { FaRegStar, FaStar } from 'react-icons/fa';

const StarToggle = ({ filled }) => (filled ? <FaStar /> : <FaRegStar />);

export default function Productcomment({ fetchOne }) {
  const [comment, setComment] = useState('');
  const { auth } = useAuth();
  const id = auth.memberData.id;
  const nickname = auth.memberData.nickname;
  const Img = auth.memberData.avatar;
  const pdName = fetchOne.Name;
  const productId = fetchOne.ID;

  const [rating, setRating] = useState(1);
  const [commentsList, setCommentsList] = useState([]);
  const [showmore, setShowMore] = useState(3);

  // 獲取評論的函數
  const fetchComments = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3005/api/product/productcomment?productId=${productId}`);
      if (!response.ok) throw new Error('獲取評論失敗');
      const data = await response.json();
      setCommentsList(data);
    } catch (error) {
      console.error(error);
      toast.error('獲取評論時發生錯誤');
    }
  };

  // 進到這個頁面就先撈有沒有人評論過
  useEffect(() => {
    if (productId) {
      fetchComments(productId);
    } else {
      console.error('缺少商品ID');
    }
  }, [productId]);

  const handleCommentSubmit = async () => {
    if (!id) {
      toast('您需要登入才能送出評論', {
        icon: <Image width={95} height={53} src={logo} alt="logo" priority />,
        duration: 1800,
        style: {
          borderRadius: '10px',
          background: 'rgba(34, 53, 92, 1)',
          color: '#fff',
          marginTop: '80px',
        },
      });
      return;
    }

    if (!comment.trim()) {
      toast('請輸入評論內容', { duration: 1800 });
      return;
    }

    if (!fetchOne || !fetchOne.ID) {
      toast('商品ID無效', { duration: 1800 });
      return;
    }

    const newComment = {
      ProductID: fetchOne.ID,
      MemberID: id,
      ProductName: pdName,
      ProductContent: comment,
      StarLevel: rating,
      nickname: nickname,
      rating: rating,
      content: comment,
      id: Date.now(), // 使用當前時間作為唯一ID
    };

    try {
      const response = await fetch(
        'http://localhost:3005/api/product/productcomment',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        }
      );

      if (!response.ok) throw new Error('新增評論失敗');

      await response.json(); // 確保可以獲取到返回的數據

      // 將新評論添加到 commentsList 的開頭
      setCommentsList((prevComments) => [newComment, ...prevComments]);

      setComment('');
      setRating(1);
    } catch (error) {
      console.error(error);
      toast.error('新增評論時發生錯誤');
    }
  };

  const showMore = () => {
    setShowMore((prevCount) => prevCount + 3); // 每次增加3條可見評論
  };

  const starClick = (star) => {
    setRating(star); // 更新評分為所點擊的星星數
  };

  return (
    <>
      <div className="productdetail">
        <div className="container mt-5 mb-5">
          <div>
            <p className="pd-comment" id="comment">商品評論</p>
          </div>
          <div className="row">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommentSubmit();
              }}
            >
              <div className="col d-flex justify-content-center">
                <div className="card mb-3 mt-5 comment-send-range">
                  <div className="row g-0">
                    <div className="col-md-2 d-flex justify-content-center">
                      {Img.Avatar ? (
                        <Image
                          className="commentimg"
                          src={`/member/member-avatar/${Img.Avatar}`}
                          alt="會員頭像"
                          width={808}
                          height={1287}
                          priority
                        />
                      ) : (
                        <Image
                          className="commentimg"
                          src={`/member/member-profile.png`}
                          alt="會員預設頭像"
                          width={808}
                          height={1287}
                          priority
                        />
                      )}
                    </div>
                    <div className="col-md-10 col-12">
                      <div className="card-body">
                        <h5 className="pd-comment-title">{nickname}</h5>
                        <div className="d-flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                              onClick={() => starClick(star)}
                              onMouseEnter={() => setRating(star)}
                              onMouseLeave={() => setRating(rating)}
                            >
                              <StarToggle filled={star <= rating} />
                            </div>
                          ))}
                        </div>
                        <p className="pd-comment-name">{pdName}</p>
                        <div className="d-flex flex-column">
                          <label className="pd-comment-content">留下您的評論</label>
                          <input
                            className="pd-input"
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <div className="d-flex pd-comment-send">
                          <div className="comment-cancel" onClick={() => setComment('')}>
                            清除
                          </div>
                          <div className="comment-send" onClick={handleCommentSubmit}>
                            送出
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="row d-flex justify-content-center">
              {commentsList.slice(0, showmore).map((cmt) => (
                <div key={cmt.id} className="card ms-4 mb-3 mt-5 pd-comment-shadow col-12">
                  <div className="row g-0">
                    <div className="col-md-2 d-flex justify-content-center align-items-center">
                      {Img.Avatar ? (
                        <Image
                          className="commentimgDown"
                          src={`/member/member-avatar/${Img.Avatar}`}
                          alt="會員頭像"
                          width={112}
                          height={112}
                          priority
                        />
                      ) : (
                        <Image
                          className="commentimgDown"
                          src={`/member/member-profile.png`}
                          alt="會員預設頭像"
                          width={112}
                          height={112}
                          priority
                        />
                      )}
                    </div>
                    <div className="col-md-10 col-12">
                      <div className="card-body">
                        <h5 className="pd-comment-title">{cmt.nickname}</h5>
                        <div className="d-flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarToggle key={star} filled={star <= cmt.StarLevel} />
                          ))}
                        </div>
                        <p className="pd-comment-name">{cmt.ProductName}</p>
                        <p className="pd-comment-content">{cmt.ProductContent}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 顯示「看更多」按鈕 */}
          {showmore < commentsList.length && (
            <div className='pd-comment-more d-flex justify-content-center' onClick={showMore}>
              看更多
            </div>
          )}
        </div>
      </div>
    </>
  );
}

