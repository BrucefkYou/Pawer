import React, { useState, useEffect, useMemo } from 'react';
import ChatLayout from '@/components/layout/chat-layout';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

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
  // 存放預約所有資料
  const [reserveData, setReserveData] = useState();
  // 抓取當前會員預約表
  let fetchMemReserve
  if (reserveData && reserveData.length > 0 && MemberID) {
    fetchMemReserve = reserveData.filter((v) => {
      return v.MemberID == MemberID
    })
    // console.log(fetchMemReserve);
  }
  // 抓取當前師資預約表
  let fetchCommReserve
  if (reserveData && reserveData.length > 0 && PetCommID) {
    fetchCommReserve = reserveData.filter((v) => {
      return v.PetCommID == PetCommID
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
      type: 'message',
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
      // 切換新的連線時清空訊息
      setMessage([]);
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
          type: 'toast', // 添加消息類型
          content: `${loginID == fetchMem.ID ? fetchMem.Name : fetchCom.Name} 加入聊天室`,
          myID: loginID.toString(),
          toID: loginID == PetCommID ? MemberID : PetCommID,
        };
        ws.send(JSON.stringify(data));
      }
      if (fetchMem && loginID && fetchCom) {
        const data = {
          type: 'message',
          content: `${loginID == fetchMem.ID ? fetchMem.Name : fetchCom.Name} 加入聊天室`,
          myID: loginID.toString(),
          toID: loginID == PetCommID ? MemberID : PetCommID,
        };
        ws.send(JSON.stringify(data));
      }
    };
    // 接收訊息時
    ws.onmessage = (res) => {
      const getmessage = JSON.parse(res.data);
      if (getmessage.type === 'toast') {
        toast(getmessage.content)
      }
      if (getmessage.type === 'message') {
        setMessage((prevMessages) => [
          ...prevMessages,
          { ...getmessage, from: getmessage.from },
        ]);
      }
    };
    // 發生錯誤時
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
  //抓預約資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3005/api/pet/allreserve');
        const reserveData = await res.json();
        setReserveData(reserveData)
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
      
      <div className="pet-onebyone d-flex justify-content-center">
        <div className="z-2 container d-flex justify-content-center">
          {/* 左側列表 */}
          <div className='d-md-flex col-md-3 mt-5'>
            <div className="chat-list p-3">
              <ul>
                {loginID == PetCommID && fetchCommReserve && fetchCommReserve.map((v, i) => (
                  <React.Fragment key={ i}>
                    <Link href={`/websocket?MemberID=${v.MemberID}&PetCommID=${v.PetCommID}`} className='text-decoration-none d-flex align-items-center'>
                      <li className={`my-3 p-2 d-flex align-items-center ${MemberID == v.MemberID ? 'active' : ''}`}>
                        <Image
                          alt="avatar"
                          width={50}
                          height={50}
                          src={`http://localhost:3005/member/${v.Avatar ? v.Avatar : 'avatar-default.png'}`}
                          className="avatar"
                        />
                        <div className='d-flex flex-column'>
                          <div className='m-2'>{v.ReserveName}</div>
                          <div className='m-2 little-time'>{v.Time}</div>
                        </div>
                      </li>
                    </Link>
                  </React.Fragment>
                ))
                }
                {loginID == MemberID && fetchMemReserve && fetchMemReserve.map((v, i) => (
                  <>
                    <Link key={i} href={`/websocket?MemberID=${v.MemberID}&PetCommID=${v.PetCommID}`} className='text-decoration-none'>
                      <li className={`my-3 p-2 d-flex align-items-center ${PetCommID == v.PetCommID ? 'active' : ''}`}>
                        <Image alt='avatar' width={50} height={50} src={`http://localhost:3005/pet/${v.Img ? v.Img : 'avatar-default.png'}`} 
                          className='avatar' />
                        <div className='d-flex flex-column'>
                          <div className='m-2'>{v.Name}</div>
                          <div className='m-2 little-time'>{v.Time}</div>
                        </div>
                      </li>
                    </Link>
                  </>
                ))
                }
              </ul>
            </div>
          </div>
          {/* 右側 */}
          <div className='col-12 col-md-9 d-flex flex-column align-items-center mt-5'>
            {/* 標題 */}
            <h3 className="title text-center"><span className='text-primary'>{fetchCom ? fetchCom.Name : ''}</span> <span className='text-black-50'>的寵物溝通聊天室</span></h3>
            {/* 顯示訊息框 */}
            <div className="chat-card p-4 ">
              <ul className="d-flex flex-column">
                {message.map((v, i) =>
                  v.from === 'self' ? (
                    <li
                      key={i}
                      className="align-self-end m-3 position-relative testsend"
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
                      className="text-start m-3 position-relative testfrom align-self-start"
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
                    className="text-start m-3 position-relative testfrom align-self-start"
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
      </div>
    </>
  );
}
