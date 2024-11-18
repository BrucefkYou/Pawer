import React, { useState, useEffect, useMemo } from 'react';
import ChatLayout from '@/components/layout/chat-layout';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
Index.getLayout = function getLayout(page) {
  return <ChatLayout>{page}</ChatLayout>;
};
export default function Index(props) {
  // 透過路由解構私聊對象
  const router = useRouter();
  const callID = router.query.call;
  const [sendID, setSendID] = useState(callID);
  // 透過登入身份判斷發送者
  const { auth } = useAuth();
  const memberID = auth.memberData.id.toString();
  const memberAvatar = auth.memberData.avatar;
  console.log(memberAvatar == '');

  //連線狀態管理
  const host = 'ws://127.0.0.1:3005/ws3';
  const [ws, setWs] = useState(null);
  // 將輸入的內容存放
  const [input, setInput] = useState('');
  function onchange(e) {
    setInput(e.target.value);
  }
  // 累加訊息
  const [message, setMessage] = useState([]);
  function onSubmit() {
    const data = {
      content: input,
      userID: memberID,
      targetUserID: sendID,
    };
    ws.send(JSON.stringify(data));
    setInput('');
  }
  useEffect(() => {
    // 初次進入畫面時建立連線並於後端綁定ＩＤ
    const ws = new WebSocket(host);
    // 設定目前連線狀態
    setWs(ws);
    // 連線開啟時
    ws.onopen = (res) => {
      console.log('WebSocket3連線成功');
      ws.send(
        JSON.stringify({
          // 註冊訊息類型
          type: 'register',
          // 當前使用者的 ID
          userID: memberID,
        })
      );
    };
    // 接收訊息時
    ws.onmessage = (res) => {
      const getmessage = JSON.parse(res.data);
      setMessage((prevMessages) => [
        ...prevMessages,
        { ...getmessage, from: getmessage.from },
      ]);
    };
    //發生錯誤時
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    // WebSocket 連接關閉
    ws.onclose = () => {
      console.log('WebSocket關閉連線');
    };
  }, [memberID]);
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // 阻止換行
      onSubmit(); // 發送訊息
    }
  }
  useEffect(() => {
    const chatContainer = document.querySelector('.chat-card');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [message]);
  return (
    <>
      <div className="pet-onebyone d-flex justify-content-center align-items-center flex-column">
        <div className="z-2 container d-flex flex-column align-items-center justify-content-center">
          {/* 顯示訊息 */}
          <h3 className="title text-center">寵物溝通聊天室</h3>
          <div className="chat-card p-4 ">
            <ul className="d-flex flex-column">
              {message.map((v, i) =>
                v.from === memberID ? (
                  <li
                    key={i}
                    className="text-start m-3 position-relative testsend"
                  >
                    <Image
                      alt="avatar"
                      src={`http://localhost:3005/member/${
                        memberAvatar == '' ? 'default.png' : memberAvatar
                      }`}
                      width={50}
                      height={50}
                      className="avatarsend"
                    />
                    {v.content}
                  </li>
                ) : (
                  <li
                    key={i}
                    className="text-start m-3 position-relative testfrom"
                  >
                    <Image
                      alt="avatar"
                      src={`http://localhost:3005/pet/${callID}.webp`}
                      width={50}
                      height={50}
                      className="avatarfrom"
                    />
                    {v.content}
                  </li>
                )
              )}
            </ul>
          </div>
          {/* 發送訊息 */}
          <div className="row d-flex justify-content-center mt-3 ">
            <input
              type="text"
              className="form-control"
              placeholder="請輸入文字..."
              value={input}
              onChange={onchange}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-primary mt-1 col-4" onClick={onSubmit}>
              發送
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
