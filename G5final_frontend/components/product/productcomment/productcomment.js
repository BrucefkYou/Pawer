/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import style from '@/components/product/productcomment/productcomment.module.scss';
import Image from 'next/image';
import toast from 'react-hot-toast';


const StarToggle = ({ filled }) => (filled ? <FaStar /> : <FaRegStar />);

export default function Productcomment({ fetchOne }) {
  const [comment, setComment] = useState(''); // 評論input輸入
  const [rating, setRating] = useState(5); // 預覽星星狀態
  const [finalRating, setFinalRating] = useState(5); // 最終星星狀態
  const [commentsList, setCommentsList] = useState([]); // 輸入評論後的顯示
  const [showmore, setShowMore] = useState(3); // 看更多
  const { auth, setNextRoute } = useAuth();
  const router = useRouter();
  const id = auth.memberData.id;
  const nickname = auth.memberData.nickname;
  const mail = auth.memberData.email;
  const Img = auth.memberData.avatar;
  const pdName = fetchOne.Name;
  const productId = fetchOne.ID;

  const showMore = () => {
    setShowMore((prevCount) => prevCount + 3); // 每次增加3條可見評論
  };

  const starClick = (star) => {
    setFinalRating(star); // 更新最終評分
    setRating(star); // 同時更新預覽評分
  };

  // 獲取評論
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

  // 登入後 導回
  const goLoginBackCmt = () => {
    if (!id) {
      toast('前往登入頁面', {
        duration: 1500,
      });
      setTimeout(() => {
        router.push('/member/login');
      }, 1000);
      setNextRoute(`/product/${productId}`);
    } else {
      router.push(`/product/${productId}`);
    }
  };

  // 評論
  const comSubmit = async () => {
    if (!comment.trim()) {
      toast.error('請您輸入評論內容', {
        duration: 1500,
      });
      return;
    }
    if (!fetchOne || !fetchOne.ID) {
      toast('商品ID無效', { duration: 1800 });
      return;
    }
    // 檢查會員是否已經購買過該商品
    const alreadyBuy = await fetch(`http://localhost:3005/api/product/check-productcomment?memberId=${id}&productId=${productId}`);
    if (!alreadyBuy.ok) {
      toast.error('檢查購買記錄時發生錯誤');
      return;
    }
    const neverBuy = await alreadyBuy.json();
    if (neverBuy.length === 0) {
      toast.error(<>
        您尚未購買此商品，
        <br />
        購買後即可評論。
        </>, {
        duration: 1500,
      });
      return;
    }
    // 新增評論
    const newComment = {
      ProductID: fetchOne.ID,
      MemberID: id,
      ProductName: pdName,
      ProductContent: comment,
      StarLevel: finalRating,
      eMail: mail,
      Nickname: nickname,
      MemberAvatar: Img,
      id: Date.now(), // 讓剛評論完的內容當下顯示在最上面
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
      await response.json();
      // 將新評論添加到 commentsList 的開頭
      setCommentsList((prevComments) => [newComment, ...prevComments]);
      setComment('');
      setRating(5);
      setFinalRating(5);
      toast.success('您的評論已成功送出！', {
        duration: 1500,
      });
    } catch (error) {
      console.error(error);
      toast.error('新增評論時發生錯誤');
    }
  };
  // 進到這個頁面就先撈有沒有人評論過
  useEffect(() => {
    if (productId) {
      fetchComments(productId);
    } 
  }, [productId]);

  return (
    <>
      <div className="productdetail">
        <div className="container mt-5 mb-5">
          <div>
            <p className="pd-comment" id="comment">商品評論</p>
          </div>
          {id ? ( // 如果會員已登入，顯示評論表單
            <div className="row">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  comSubmit();
                }}
              >
                <div className="col d-flex justify-content-center">
                  <div className="card mb-3 mt-5 comment-send-range">
                    <div className="row g-0">
                      <div className="col-md-2 d-flex justify-content-center">
                        <Image
                          className="commentimg"
                          src={Img ? `http://localhost:3005/member/${Img}` : 'http://localhost:3005/member/avatar-default.png'}
                          alt="會員頭像"
                          width={808}
                          height={1287}
                          priority
                        />
                      </div>
                      <div className="col-md-10 col-12">
                        <div className="card-body">
                          <h5 className="pd-comment-title">{nickname ? nickname : mail.slice(0, 3)}</h5>
                          <div className={`d-flex ${style['star']}`}>
                          {[1, 2, 3, 4, 5].map((star) => (
                              <div
                                key={star}
                                onClick={() => starClick(star)} // 點擊時更新最終評分
                                onMouseEnter={() => setRating(star)} // 滑動時更新預覽評分
                                onMouseLeave={() => setRating(finalRating)} // 滑出時恢復最終評分
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
                            <div className="comment-send" onClick={comSubmit}>
                              送出
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="d-flex justify-content-center mt-5">
              <b>
                <span className='pd-dl-login-text'>登入會員即可評論，</span><a className='pd-dl-login' onClick={goLoginBackCmt}>點此登入</a>
              </b>
            </div>
          )}
          <div className="row d-flex justify-content-center pd-comment-shadow-rwd">
            {commentsList.length === 0 ? (
              <div className={`d-flex justify-content-center mt-4 ${style['noComment']}`}>此商品暫無評論</div>
            ) : (
              commentsList.slice(0, showmore).map((cmt) => (
                <div key={cmt.id} className="card mb-3 mt-5 pd-comment-shadow col-12">
                  <div className="row g-0">
                    <div className="col-md-2 d-flex justify-content-center align-items-center">
                      <Image
                        className="commentimgDown"
                        src={cmt.MemberAvatar ? `http://localhost:3005/member/${cmt.MemberAvatar}` : 'http://localhost:3005/member/avatar-default.png'}
                        alt="會員頭像"
                        width={112}
                        height={112}
                        priority
                      />
                    </div>
                    <div className="col-md-10 col-12">
                      <div className="card-body">
                        <h5 className="pd-comment-title">{cmt.Nickname}</h5>
                        <div className={`d-flex ${style['star']}`}>
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
              ))
            )}
          </div>
          {/* 顯示「看更多」按鈕 */}
          {showmore < commentsList.length && (
            <div className='pd-comment-more d-flex justify-content-center'>
              <button onClick={showMore}>查看更多</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}



