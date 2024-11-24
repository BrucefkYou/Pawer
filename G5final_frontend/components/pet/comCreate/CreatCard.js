import React, { useState, useEffect } from 'react';
import CreateCardOne from '@/components/pet/comCreate/CreateCardOne';
import CreateCardTwo from '@/components/pet/comCreate/CreateCardTwo';
import Message from '../message';
import { useAuth } from '@/hooks/use-auth';
import { usePagination } from '@/hooks/usePagination';
export default function CreatCard(props) {
  const { auth } = useAuth();
  const memberID = auth.memberData.id;
  const { oldData } = usePagination({
    url: 'http://localhost:3005/api/pet',
  });
  // 提示頁面狀態
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (!oldData || !memberID) return;
    const isCom = oldData.filter((v) => v.MemberID === memberID);
    if (isCom.length > 0) {
      const userValid = isCom[0].valid;
      if (userValid === 3) {
        setMessage('warn');
      } else if (userValid === 1) {
        setMessage('no');
      }
    }
  }, [oldData, memberID]);
  // 根據 message 狀態條件式渲染頁面
  return (
    <>
      {message === 'ok' && (
        <Message
          status="ok"
          title="註冊完成"
          content="註冊審核時間約7至10工作天"
          button="返回首頁"
          url="/"
        />
      )}
      {message === 'warn' && (
        <Message
          status="warn"
          title="您已註冊,審核中"
          content="註冊審核時間約7至10工作天"
          button="返回首頁"
          url="/"
        />
      )}
      {message === 'no' && (
        <Message
          status="no"
          title="您已經是溝通師"
          content="若註冊未刊登達90天將移除身份需重新申請"
          button="查看師資資料"
          url="/member/communicator/detail"
        />
      )}
      {!message && (
        <>
          <CreateCardOne />
          <CreateCardTwo setMessage={setMessage} />
        </>
      )}
    </>
  );
}
