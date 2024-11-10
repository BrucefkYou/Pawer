import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router';
export default function ComListButton({ v }) {
    const router = useRouter()
    async function cancelReserve (event){
        try {
            await fetch('http://localhost:3005/api/pet/cancelReserve', {
                method: "DELETE",
                headers: {
                    "Content-Type":"Application/json"
                },
                body: JSON.stringify({ ID:v.ID })
            })
            router.push('/member/communicator/message')
        }
        catch (err) {
            console.log(err);
        }
    }
  return (
    <>
          <div className="col d-flex btnn-group-position align-items-center">
              <div className="btnn-group me-3">
                  <button className={`btnn btnn-1 m-0 ${v.Status == 1 ? 'PT-sp-block' : 'PT-sp-none'}`} onClick={cancelReserve}>
                      取消預約
                  </button>
                  <button className={`btnn btnn-2 m-0 ${v.Status == 1 ? 'PT-sp-block' : 'PT-sp-none'}`}>
                      聯繫毛孩爸媽
                  </button>
                  <button className={`btnn btnn-3 m-0 ${v.Status == 1 ? 'PT-sp-none' : 'PT-sp-block'} PT-sp-none-rwd`}>
                      聯繫毛孩爸媽
                  </button>
              </div>
          </div>
    </>
  )
}
