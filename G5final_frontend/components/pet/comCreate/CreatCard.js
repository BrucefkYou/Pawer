import React, { useState, useEffect } from 'react'
import CreateCardOne from '@/components/pet/comCreate/CreateCardOne';
import CreateCardTwo from '@/components/pet/comCreate/CreateCardTwo';
import Message from '../message';
export default function CreatCard(props) {
    // 提示頁面狀態
    const [message, setMessage] = useState('')
    if (message == 'ok') {
        return <Message status='ok' title='hi' content='' button='返回' url='/member/communicator/comReserve' />
    } else if (message == 'warn') {
        return <Message status='warn' title='hi' content='' button='返回' url='/member/communicator/comReserve' />
    } else if (message == 'no') {
        return <Message status='no' title='hi' content='' button='返回' url='/member/communicator/comReserve' />
    }
  return (
    <>
          <CreateCardOne />
          <CreateCardTwo setMessage={setMessage} />
    </>
  )
}
