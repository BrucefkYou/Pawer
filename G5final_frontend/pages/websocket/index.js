import React, { useState, useEffect, useMemo } from 'react';
import ChatLayout from '@/components/layout/chat-layout';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { BsCircleFill, BsChevronCompactRight, BsChevronCompactLeft } from 'react-icons/bs';
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
    // 存放溝通師所有資料
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
        fetchMemReserve = reserveData
            .filter((v) => v.MemberID == MemberID) // 先篩選符合 PetCommID 的資料
            .filter((v, index, self) =>
                index === self.findIndex((t) => t.PetCommID === v.PetCommID)
            ); // 去除 MemberID 重複的資料
    }
    // 抓取當前師資預約表
    let fetchCommReserve
    if (reserveData && reserveData.length > 0 && PetCommID) {
        fetchCommReserve = reserveData
            .filter((v) => v.PetCommID == PetCommID) // 先篩選符合 PetCommID 的資料
            .filter((v, index, self) =>
                index === self.findIndex((t) => t.MemberID === v.MemberID)
            ); // 去除 MemberID 重複的資料
    }
    // 在線狀態管理
    const [onlineUsers, setOnlineUsers] = useState([]);
    // 連線狀態管理
    const host = 'ws://127.0.0.1:3005/ws3';
    const [ws, setWs] = useState(null);
    // 將輸入的內容存放
    const [input, setInput] = useState('');
    function onchange(e) {
        setInput(e.target.value);
    }
    // 累加全域訊息
    const [message, setMessage] = useState([]);
    // toast發送一次
    const [toastSent, setToastSent] = useState(false);
    // 發送訊息
    function onSubmit() {
        const data = {
            type: 'message',
            content: input,
            myID: loginID.toString(),
            toID: loginID == PetCommID ? MemberID : PetCommID,
        };
        ws.send(JSON.stringify(data));
        // 寫入資料庫
        const writeMessage = async () => {
            try {
                const res = await fetch('http://localhost:3005/api/pet/chatupdate', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
            } catch (err) {
                console.error('Fetch Error:', err);
            }
        };
        writeMessage();
        // 清空狀態
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
    // 手機版側邊欄顯示按鈕
    const [showWindow, setShowWindow] = useState(false)
    function handSideWindow() {
        setShowWindow(!showWindow)
    }
    // 建立連線
    useEffect(() => {
        if (!router.isReady || !MemberID || !PetCommID || !loginID) {
            return;
        }
        // 初次進入畫面時建立連線並於後端綁定ＩＤ
        const ws = new WebSocket(host);
        // 設定目前連線狀態
        setWs(ws);
        // 連線開啟時
        ws.onopen = (res) => {
            console.log('WebSocket3連線成功');
            // 切換新的連線時清空訊息
            if (MemberID) {
                ws.send(
                    JSON.stringify({
                        // 註冊訊息類型
                        type: 'register',
                        // 當前使用者的 ID
                        myID: loginID.toString(),
                    })
                )
            }
            if (!toastSent && fetchMem && loginID && fetchCom) {
                const data = {
                    type: 'toast', // 添加消息類型
                    content: `${loginID == fetchMem.ID ? fetchMem.Name : fetchCom.Name} 已上線`,
                    myID: loginID.toString(),
                    toID: loginID == PetCommID ? MemberID : PetCommID,
                };
                ws.send(JSON.stringify(data));
                setToastSent(true)
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
            if (getmessage.type === 'onlineUsers') {
                setOnlineUsers(getmessage.users);
            }
        };
        // 發生錯誤時
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        // WebSocket 連接關閉
        ws.onclose = () => {
            console.log('WebSocket關閉連線');
        }
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                if (fetchMem && loginID && fetchCom) {
                    const data = {
                        type: 'toast', // 添加消息類型
                        content: `${loginID == fetchMem.ID ? fetchMem.Name : fetchCom.Name} 離開聊天室`,
                        myID: loginID.toString(),
                        toID: loginID == PetCommID ? MemberID : PetCommID,
                    };
                    ws.send(JSON.stringify(data));
                    setToastSent(false)
                }
                if (fetchMem && loginID && fetchCom) {
                    const data = {
                        type: 'message',
                        content: `${loginID == fetchMem.ID ? fetchMem.Name : fetchCom.Name} 離開聊天室`,
                        myID: loginID.toString(),
                        toID: loginID == PetCommID ? MemberID : PetCommID,
                    };
                    ws.send(JSON.stringify(data));
                }
            }
            ws.close(); // 確保連線關閉
        };
    }, [MemberID, PetCommID, loginID, router.query, router.isReady, fetchMem, fetchCom]);
    // 抓溝通師資料
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
    }, [MemberID, PetCommID]);
    // 抓會員資料
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
    }, [MemberID, PetCommID]);
    // 抓預約資料
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
    // 抓所有歷史訊息
    useEffect(() => {
        if (!loginID, !PetCommID, !MemberID) {
            return
        }
        const toID = String(loginID) == String(MemberID) ? PetCommID : MemberID
        const myID = loginID
        const fetchStoryData = async () => {
            try {
                const res = await fetch(`http://localhost:3005/api/pet/chatstory?toID=${toID}&myID=${myID}`);
                const storyData = await res.json();
                const updatedStoryData = await storyData.map((item) => {
                    if (item.from) {
                        return item;
                    }
                    if (item.myID === loginID) {
                        return { ...item, from: 'self' };
                    } else if (item.toID == PetCommID) {
                        return { ...item, from: MemberID };
                    } else if (item.toID == MemberID) {
                        return { ...item, from: PetCommID };
                    }
                });
                setMessage(updatedStoryData);
            } catch (err) {
                console.error('Fetch Error:', err);
            }
        };
        fetchStoryData();
    }, [loginID, PetCommID, MemberID, router.isReady]);
    // 保持訊息置底
    useEffect(() => {
        const chatContainer = document.querySelector('.message-list');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [message]);
    const readyToRender = useMemo(() => {
        return fetchCom && fetchMem && PetCommID && MemberID && message.length > 0;
    }, [fetchCom, fetchMem, PetCommID, MemberID, message, onlineUsers]);
    return (
        <>
            {/* 背景 */}
            <div className="pet-chat d-flex justify-content-center align-items-center ">
                <div className="container">
                    {/* 外框 */}
                    <div className="chat-card p-2 p-md-4 row mx-0 shadow ">
                        {/* 左 */}
                        <div className={`col-md-3 left col-10 d-flex flex-column ${showWindow ? 'left-show' : 'left-close'}`}>
                            <div className="text-primary fs-5 position-relative">
                                <div>預約紀錄名單</div>
                                <button className={`btn position-absolute btn-position d-md-none d-flex justify-content-center align-items-center`} onClick={handSideWindow}>
                                    <span>{showWindow ? <BsChevronCompactLeft /> : <BsChevronCompactRight />}</span>
                                </button>
                            </div>
                            {/* 兩個面向的列表 */}
                            <ul className="ul-bar flex-grow-1 overflow-auto">
                                {/* 師資受預約列表 */}
                                {loginID == PetCommID && fetchCommReserve && fetchCommReserve.map((v, i) => (
                                    <React.Fragment key={i}>
                                        <Link href={`/websocket?MemberID=${v.MemberID}&PetCommID=${v.PetCommID}`} className='text-decoration-none d-flex align-items-center'>
                                            <li className={`chat-list-card my-2 p-3 position-relative ${MemberID == v.MemberID ? 'active' : ''}`}>
                                                <div className={`d-flex justify-content-center align-items-center position-absolute status ${onlineUsers.includes(String(v.MemberID)) ? 'text-success' : 'text-body-tertiary'}`}>
                                                    <div className='d-flex justify-content-center align-items-center me-1'>
                                                        <BsCircleFill style={{ fontSize: '8px' }} />
                                                    </div>
                                                    <div>
                                                        {onlineUsers.includes(String(v.MemberID)) ? '在線' : '離線'}
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    {/* 頭像 */}
                                                    <Image
                                                        alt="avatar"
                                                        src={`http://localhost:3005/member/${v.Avatar ? v.Avatar : 'avatar-default.png'}`}
                                                        width={50}
                                                        height={50}
                                                        className='object-fit-cover'
                                                        style={{ borderRadius: '50%' }}
                                                    />
                                                    <div className='mx-3'>
                                                        <div className="my-0 text-primary fs-5">{v.ReserveName}</div>
                                                        <div className=" text-primary list-text ">預約日期：{v.Time}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    </React.Fragment>
                                ))}
                                {/* 會員預約列表 */}
                                {loginID == MemberID && fetchMemReserve && fetchMemReserve.map((v, i) => (
                                    <React.Fragment key={i}>
                                        <Link href={`/websocket?MemberID=${v.MemberID}&PetCommID=${v.PetCommID}`} className='text-decoration-none d-flex align-items-center'>
                                            <li className={`chat-list-card my-2 p-3 position-relative ${PetCommID == v.PetCommID ? 'active' : ''}`}>
                                                <div className={`d-flex justify-content-center align-items-center position-absolute status ${onlineUsers.includes(String(v.PetCommID)) ? 'text-success' : 'text-body-tertiary'}`}>
                                                    <div className='d-flex justify-content-center align-items-center me-1'>
                                                        <BsCircleFill style={{ fontSize: '8px' }} />
                                                    </div>
                                                    <div>
                                                        {onlineUsers.includes(String(v.PetCommID)) ? '在線' : '離線'}
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    {/* 頭像 */}
                                                    <Image
                                                        alt="avatar"
                                                        src={`http://localhost:3005/pet/${v.Img ? v.Img : 'avatar-default.png'}`}
                                                        width={50}
                                                        height={50}
                                                        className='object-fit-cover'
                                                        style={{ borderRadius: '50%' }}
                                                    />
                                                    <div className='mx-3'>
                                                        <div className="my-0 text-primary fs-5">{v.Name}</div>
                                                        <div className=" text-primary list-text ">預約日期：{v.Time}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                        {/* 右 */}
                        <div className="col right d-flex flex-column">
                            <div className="text-primary fs-5">聊天室</div>
                            <div className="chat-talk-card p-2 my-3 d-flex flex-column justify-content-between flex-grow-1">
                                {/* 標頭 */}
                                <div>
                                    {fetchMem && fetchCom && loginID == PetCommID ?
                                        // 溝通師取向
                                        <div className="d-flex align-items-center justify-content-start">
                                            <Image
                                                alt="avatar"
                                                src={`http://localhost:3005/member/${fetchMem.Avatar ? fetchMem.Avatar : 'avatar-default.png'}`}
                                                width={80}
                                                height={80}
                                                style={{ borderRadius: '50%' }}
                                            />
                                            <div className="fs-5 text-primary ms-3">
                                                {fetchMem.Name}
                                            </div>
                                            <div className={`ms-2 d-flex ${onlineUsers.includes(String(fetchMem.ID)) ? 'text-success' : 'text-body-tertiary'}`}>
                                                <BsCircleFill style={{ fontSize: '12px' }} />
                                            </div>
                                        </div>
                                        : fetchMem && fetchCom && loginID == MemberID ?
                                            // 會員取向
                                            <div className="d-flex align-items-center justify-content-start">
                                                <Image
                                                    alt="avatar"
                                                    src={`http://localhost:3005/pet/${fetchCom.Img ? fetchCom.Img : 'avatar-default.png'}`}
                                                    width={80}
                                                    height={80}
                                                    style={{ borderRadius: '50%' }}
                                                />
                                                <div className="fs-5 text-primary ms-3">
                                                    {fetchCom.Name}
                                                </div>
                                                <div className={`ms-2 d-flex ${onlineUsers.includes(String(fetchCom.ID)) ? 'text-success' : 'text-body-tertiary'}`}>
                                                    <BsCircleFill style={{ fontSize: '12px' }} />
                                                </div>
                                            </div>
                                            : ''}
                                    <hr />
                                </div>
                                {/* 訊息內容 */}
                                <ul className="message-list flex-grow-1 overflow-auto">
                                    {/* 未上線狀態 */}
                                    {!readyToRender ? <div className='text-center'>對方未在線</div> : fetchCom && fetchMem && PetCommID && MemberID && message.length > 0 && message.map((v, i) => {
                                        if (!v || typeof v.from === 'undefined') {
                                            console.warn('Invalid message item:', v);
                                            return null; // 跳過無效項目
                                        }
                                        {/* 發送者靠右 */ }
                                        if (v.from == 'self') {
                                            return <li className="px-3 py-2 mt-2 ">
                                                <div className='my-message d-flex align-items-end'>
                                                    <span className='my-time my-message'>{v.creat_at && v.creat_at.slice(11, 16)}</span>
                                                    <div className=' ms-2 my-message-content p-2'>{v.content}</div>
                                                </div>
                                                </li>
                                        }
                                        {/* 接收者靠左 */ }
                                        if (String(v.from) == String(PetCommID)) {
                                            return <li className="px-3 py-2 mt-2">
                                                <div className='d-flex align-items-end'>
                                                    <div className=' me-2 my-message-content p-2'>{v.content}</div>
                                                    <span className='to-time'>{v.creat_at && v.creat_at.slice(11, 16)}</span>
                                                </div>
                                            </li>
                                        }
                                        if (String(v.from) == String(MemberID)) {
                                            return <li className="px-3 py-2 mt-2">
                                                <div className='d-flex align-items-end'>
                                                    <div className='me-2 my-message-content p-2'>{v.content}</div>
                                                    <span className='to-time'>{v.creat_at && v.creat_at.slice(11, 16)}</span>
                                                </div>
                                            </li>
                                        }
                                    })}
                                </ul>
                                {/* 發送按鈕 */}
                                <div>
                                    <hr />
                                    <div className="d-flex">
                                        <input
                                            className="form-control"
                                            placeholder="請輸入訊息..."
                                            value={input}
                                            onChange={onchange}
                                            onKeyDown={handleKeyDown}
                                            onCompositionStart={handleCompositionStart}
                                            onCompositionEnd={handleCompositionEnd}
                                        />
                                        <button className="btn p-0 m-2" onClick={onSubmit}>
                                            <Image
                                                alt="send"
                                                src={'/pet/icon/Vector.svg'}
                                                width={40}
                                                height={40}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
