import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
export default function Index(props) {
  const { auth } = useAuth()
  const memberID = auth.memberData.id.toString();
  const host = 'ws://127.0.0.1:3005/ws3';
  //連線狀態管理
  const [ws, setWs] = useState(null);
  // 將輸入的內容存放
  const [input, setInput] = useState('');
  function onchange(e) {
    setInput(e.target.value);
  }
  //
  const [sendID,setSendID]=useState('')
  function onchange2(e) { 
    setSendID(e.target.value)
  }
  
  
  // 累加訊息
  const [message, setMessage] = useState([]);
  function onSubmit() {
    const data = {
      content: input,
      userID: memberID,
      targetUserID: sendID
    }
    ws.send(JSON.stringify(data));
    setInput('');
  }
  

  useEffect(() => {
    // 初次進入畫面時建立連線
    const ws = new WebSocket(host);
    // 設定目前連線狀態
    setWs(ws);
    // 連線開啟時
    ws.onopen = (res) => {
      console.log('WebSocket3連線成功');
      ws.send(JSON.stringify({
        type: 'register', // 註冊訊息類型
        userID: memberID   // 當前使用者的 ID
      }));
    };
    // 接收訊息時
    ws.onmessage = (res) => {
      const getmessage = JSON.parse(res.data);
      console.log(getmessage);
      
      setMessage((prevMessages) => [...prevMessages, getmessage]);
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
  return (
    <>
      <div className="container">
        <h1 className='text-danger'>WebSocket自己發送指定</h1>
        <input type="text" defaultValue={memberID} readOnly/>
        <input type="text" placeholder="你想發送的對象ID" onChange={onchange2} />
        <input type="text" value={input} onChange={onchange}/>
        <button onClick={onSubmit}>發送</button>
        <ul>
          {message.map((v, i) => {
            return <li key={i}>From {v.from} say: {v.content}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
