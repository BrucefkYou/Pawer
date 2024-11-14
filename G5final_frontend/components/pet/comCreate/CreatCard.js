import React, { useState, useEffect } from 'react'
import CreateCardOne from '@/components/pet/comCreate/CreateCardOne';
import CreateCardTwo from '@/components/pet/comCreate/CreateCardTwo';
import Message from '../message';
import { useAuth } from '@/hooks/use-auth';
import { usePagination } from '@/hooks/usePagination';
export default function CreatCard(props) {
    const { auth } = useAuth()
    const memberID = auth.memberData.id
    const { oldData } = usePagination({
        url: 'http://localhost:3005/api/pet'
    })
    // 提示頁面狀態
    const [message, setMessage] = useState('')
    useEffect(() => {
        if (oldData) {
            const isCom = oldData.some((v) => v.MemberID === memberID);
            if (isCom) {
                setMessage('warn'); // 當無匹配時設置提示
            }
        }
    }, [oldData, memberID]);
    // 根據 message 狀態條件式渲染頁面
    return (
        <>
            {message === 'ok' && (
                <Message status='ok' title='註冊完成' content='註冊審核時間約7至10工作天' button='返回首頁' url='/' />
            )}
            {message === 'warn' && (
                <Message status='warn' title='您已經註冊過' content='註冊審核時間約7至10工作天' button='返回首頁' url='/' />
            )}
            {message === 'no' && (
                <Message status='no' title='錯誤' content='' button='返回' url='/' />
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
