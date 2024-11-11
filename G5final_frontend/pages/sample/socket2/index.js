import React, { useState, useEffect } from 'react';

export default function Index(props) {
  const host = 'ws://localhost:3005/ws2';
  //連線狀態管理
  const [ws, setWs] = useState(null);

  // 將輸入的內容存放
  const [myInput, setMyInput] = useState('');
  function onchange(e) {
    setMyInput(e.target.value);
  }
  // 累加訊息
  const [message, setMessage] = useState([]);
  function onSubmit() {
    ws.send(JSON.stringify(myInput));
    setMyInput('');
  }
  

  useEffect(() => {
    // 初次進入畫面時建立連線
    const ws = new WebSocket(host);
    // 設定目前連線狀態
    setWs(ws);
    // 連線開啟時
    ws.onopen = (res) => {
      console.log('WebSocket2連線成功');
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
  }, []);
  return (
    <>
      <div className="container">
        <h1 className='text-danger'>WebSocket自己發送給所有</h1>
        <input type="text" onChange={onchange} value={myInput} />
        <button onClick={onSubmit}>發送</button>

        <ul>
          {message.map((v, i) => {
            return <li key={i}>{v}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
