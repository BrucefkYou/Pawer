import React, { useState, useEffect, useMemo } from 'react';
import ChatLayout from '@/components/layout/chat-layout';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
Index.getLayout = function getLayout(page) {
  return <ChatLayout>{page}</ChatLayout>;
};
export default function Index(props) {
  // 抓取登入者
  const { auth } = useAuth();
  const loginData = auth.memberData
  const loginID = loginData.id
  // 透過路由抓取私聊對象
  const router = useRouter();
  const MemberID = router.query.MemberID;
  const PetCommID = router.query.PetCommID;
  //存放溝通師所有資料
  const [comData, setComData] = useState([]);
  // 抓取當前溝通師
  let fetchCom
  if (comData && comData.length > 0 && PetCommID) {
    [fetchCom] = comData.filter((v) => {
      return v.ID == PetCommID
    })
  }
  // 存放會員所有資料
  const [memData, setmemData] = useState([]);
  // 抓取當前會員
  let fetchMem
  if (memData && memData.length > 0 && MemberID) {
    [fetchMem] = memData.filter((v) => {
      return v.ID == MemberID
    })
  }
  // 連線狀態管理
  const host = 'ws://127.0.0.1:3005/ws3';
  const [ws, setWs] = useState(null);
  // 將輸入的內容存放
  const [input, setInput] = useState('');
  function onchange(e) {
    setInput(e.target.value);
  }
  // 累加訊息
  const [message, setMessage] = useState([]);
  // 發送訊息
  function onSubmit() {
    const data = {
      content: input,
      myID: loginID.toString(),
      toID: loginID == PetCommID ? MemberID : PetCommID,
    };
    ws.send(JSON.stringify(data));
    setInput('');
  }
  // 發送按鈕
  const [isComposing, setIsComposing] = useState(false);
  // 組字開始
  function handleCompositionStart() {
    setIsComposing(true);
  }
  // 組字結束
  function handleCompositionEnd() {
    setIsComposing(false);
  }
  // 按下按鍵時處理
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault(); // 阻止預設行為
      onSubmit(); // 發送訊息
    }
  }
  // 建立連線
  useEffect(() => {
    if (!router.isReady || !MemberID || !PetCommID || !loginID) {
      return; // 等待路由與必要資料準備完成
    }
    // 初次進入畫面時建立連線並於後端綁定ＩＤ
    const ws = new WebSocket(host);
    // 設定目前連線狀態
    setWs(ws);
    // 連線開啟時
    ws.onopen = (res) => {
      console.log('WebSocket3連線成功');
      if (MemberID) {
        ws.send(
          JSON.stringify({
            // 註冊訊息類型
            type: 'register',
            // 當前使用者的 ID
            myID: loginID.toString(),
          })
        );
      }
      if (fetchMem && loginID && fetchCom) { 
        const data = {
          content: `${loginID == fetchMem.ID ? fetchMem.Name : fetchCom.Name} 歡迎加入聊天室`,
          myID: loginID.toString(),
          toID: loginID == PetCommID ? MemberID : PetCommID,
        };
        ws.send(JSON.stringify(data));
      }
      
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
  }, [MemberID, PetCommID, loginID, fetchMem, fetchCom]);
  //抓溝通師資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3005/api/pet');
        const comData = await res.json();
        setComData(comData)
      } catch (err) {
        console.error('Fetch Error:', err);
      }
    };
    // 呼叫內部非同步函式
    fetchData();
  }, []);
  //抓會員資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3005/api/pet/member');
        const memData = await res.json();
        setmemData(memData)
      } catch (err) {
        console.error('Fetch Error:', err);
      }
    };
    // 呼叫內部非同步函式
    fetchData();
  }, []);
  // 保持訊息置底
  useEffect(() => {
    const chatContainer = document.querySelector('.chat-card');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [message]);
  return (
    <>
      <div className="pet-onebyone d-flex justify-content-center align-items-center flex-column">
        <div className="z-2 container d-flex flex-column align-items-center justify-content-center">
          {/* 顯示訊息 */}
          <h3 className="title text-center"><span className='text-primary'>{fetchCom ? fetchCom.Name : ''}</span> <span className='text-black-50'>的寵物溝通聊天室</span></h3>
          <div className="chat-card p-4 ">
            <ul className="d-flex flex-column">
              {message.map((v, i) =>
                v.from === 'self' ? (
                  <li
                    key={i}
                    className="text-start m-3 position-relative testsend"
                  >
                    <Image
                      alt="avatar"
                      src={`http://localhost:3005/member/${!loginData.avatar ||
                        loginData.avatar == '' ? 'default.png' : loginData.avatar
                        }`}
                      width={50}
                      height={50}
                      className="avatarsend"
                    />
                    {v.content}
                  </li>
                ) : v.from === PetCommID ? (
                  <li
                    key={i}
                    className="text-start m-3 position-relative testfrom"
                  >
                    <Image
                      alt="avatar"
                      src={`http://localhost:3005/pet/${fetchCom.Img}`}
                      width={50}
                      height={50}
                      className="avatarfrom"
                    />
                    {v.content}
                  </li>
                ) : (<li
                  key={i}
                  className="text-start m-3 position-relative testfrom"
                >
                  <Image
                    alt="avatar"
                    src={`http://localhost:3005/member/${!fetchMem.Avatar || fetchMem.Avatar == '' ? 'default.png' : fetchMem.Avatar
                      }`}
                    width={50}
                    height={50}
                    className="avatarfrom"
                  />
                  {v.content}
                </li>)
              )}
            </ul>
          </div>
          {/* 發送訊息 */}
          <div className="row d-flex justify-content-center mt-3 ">
            <input
              type="text"
              className="form-control"
              placeholder="請輸入訊息..."
              value={input}
              onChange={onchange}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
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
