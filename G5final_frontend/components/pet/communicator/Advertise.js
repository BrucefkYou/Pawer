import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { BsChevronRight } from "react-icons/bs";
import { useAuth } from '@/hooks/use-auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
export default function PetAdvertise(props) {
    const router = useRouter()
    const { auth } = useAuth()
    function notAuth(e) {
        if (auth.isAuth === true) {
            router.push('/member/communicator/create')
        } else {
            toast.error('尚未登入會員無法申請')
        }
    }
    return (
        <>
            <div className="pet-advertise-yen py-5 px-4">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-4">
                            <div className="text-center">
                                <Image
                                    width={100}
                                    height={100}
                                    src="/pet/images/1.png"
                                    alt="1"
                                />
                                <Image
                                    width={100}
                                    height={100}
                                    src="/pet/images/2.png"
                                    alt="1"
                                />
                                <Image
                                    width={100}
                                    height={100}
                                    src="/pet/images/3.png"
                                    alt="1"
                                />
                                <Image
                                    className="Image-none"
                                    width={100}
                                    height={100}
                                    src="/pet/images/4.png"
                                    alt="1"
                                />
                                <Image
                                    width={100}
                                    height={100}
                                    src="/pet/images/5.png"
                                    alt="1"
                                />
                                <Image
                                    width={100}
                                    height={100}
                                    src="/pet/images/6.png"
                                    alt="1"
                                />
                                <Image
                                    width={100}
                                    height={100}
                                    src="/pet/images/7.png"
                                    alt="1"
                                />
                                <Image
                                    className="Image-none"
                                    width={100}
                                    height={100}
                                    src="/pet/images/8.png"
                                    alt="1"
                                />
                                <Image
                                    width={100}
                                    height={100}
                                    src="/pet/images/9.png"
                                    alt="1"
                                />
                                <Image
                                    width={100}
                                    height={100}
                                    src="/pet/images/10.png"
                                    alt="1"
                                />
                                <Image
                                    width={100}
                                    height={100}
                                    src="/pet/images/11.png"
                                    alt="1"
                                />
                                <Image
                                    className="Image-none"
                                    width={100}
                                    height={100}
                                    src="/pet/images/12.png"
                                    alt="1"
                                />
                            </div>
                        </div>
                        <div className="col-lg-8 mt-3">
                            <div className="">
                                <h3 className="text-white my-2">Become a Pet Communicator</h3>
                                <p className="text-white">
                                    寵物溝通師擁有神奇的魔力，只要透過一張照片，就能解讀寵物內心真實的想法，讓飼主得到解答。甚至已離世的寵物，也能夠接收到牠們生前想對飼主說的話寵物內心世界有夠難猜！
                                    <br />
                                    <br />
                                    家裡的兔子為什麼突然不喜歡吃飼料了？貓貓總是到處亂尿尿、狗狗狂吠一整晚害我睡不好….毛小孩到底在想什麼？成為寵物溝通師,幫助毛小孩的爸媽們了解牠們的內心吧！
                                </p>

                                <button onClick={notAuth} className="pet-btnApply-yen">
                                    申請成為寵物溝通師{' '} <BsChevronRight />

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
