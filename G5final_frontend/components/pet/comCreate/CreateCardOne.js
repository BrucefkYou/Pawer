import React, { useState, useEffect } from 'react';
export default function CreateCardOne(props) {
  return (
    <>
      <div className="title-card">
        <h4 className="title">註冊成為溝通師</h4>
        <div className="title-text">
          <p>1.需持有亞洲動物溝通師證照者</p>
          <p>2.提供證照正本照片以供審核</p>
          <p>3.刊登內容不得有不當文字.影像等...</p>
          <p>
            4.成功註冊後可自行設定是否刊登但未刊登達90日將移除溝通師身分，須另行重新申請審核
          </p>
          <p>
            5.若期間遭遇客戶反饋.過程中異常.假冒.或其餘等非法行為.經證實者將永久移除資格
          </p>
        </div>
      </div>
    </>
  );
}
