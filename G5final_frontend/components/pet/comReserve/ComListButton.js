import React, { useState, useEffect } from 'react';
import Link from 'next/link';
export default function ComListButton({ v, setMessage }) {
  
  //取消預約
  async function cancelReserve(event) {
    try {
      await fetch('http://localhost:3005/api/pet/cancelReserve', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ ID: v.ID }),
      });
      setMessage('ok');
    } catch (err) {
      console.log(err);
      setMessage('no');
    }
  }
  const [showConfirm, setShowConfirm] = useState(false);
  // 顯示確認視窗
  const handleCancelClick = () => {
    setShowConfirm(true);
  };
  // 執行取消預約的邏輯
  const handleConfirm = () => {
    cancelReserve();
    setShowConfirm(false);
  };
  // 關閉確認視窗
  const handleCancel = () => {
    setShowConfirm(false);
  };
  return (
    <>
      <div className="col d-flex btnn-group-position align-items-center">
        <div className="btnn-group mx-3">
          {/* 取消預約按鈕 */}
          <button
            className={`btnn btnn-1 m-0 ${
              v.Status == 1 ? 'PT-sp-block' : 'PT-sp-none'
            }`}
            onClick={handleCancelClick}
          >
            取消預約
          </button>
          {/* 再次確認提示框 */}
          {showConfirm && (
            <div className="pt-modal-overlay">
              <div className="pt-modal-content">
                <h4>確認取消預約</h4>
                <p>您確定要取消這個預約嗎？</p>
                <button className="btn btn-danger" onClick={handleConfirm}>
                  確認
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  取消
                </button>
              </div>
            </div>
          )}
          <Link
            href={`/websocket?MemberID=${v.MemberID}&PetCommID=${v.PetCommID}`}
            className={`btnn btnn-2 m-0 text-decoration-none ${
              v.Status == 1 ? 'PT-sp-block' : 'PT-sp-none'
            }`}
          >
            聯繫毛孩爸媽
          </Link>
          <Link
            href={`/websocket?MemberID=${v.MemberID}&PetCommID=${v.PetCommID}`}
            className={`btnn btnn-3 m-0 text-decoration-none ${
              v.Status == 1 ? 'PT-sp-none' : 'PT-sp-block'
            } PT-sp-none-rwd`}
          >
            聯繫毛孩爸媽
          </Link>
        </div>
      </div>
    </>
  );
}
