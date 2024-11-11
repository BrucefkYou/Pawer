import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth'
import { useEffect } from 'react'

import { firebaseConfig } from './firebase-config'

// TODO: 目前不需要從firebase登出，firebase登出並不會登出google
const logoutFirebase = () => {
  const auth = getAuth()

  signOut(auth)
    .then(function () {
      // Sign-out successful.
      console.log('Sign-out successful.')
      // window.location.assign('https://accounts.google.com/logout')
    })
    .catch(function (error) {
      // An error happened.
      console.log(error)
    })
}

const loginGoogle = async (callback) => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user
      console.log(user)

      // user後端寫入資料庫等等的操作
      callback(user.providerData[0])
    })
    .catch((error) => {
      console.log(error)
    })
}

export default function useFirebase() {
  useEffect(() => {
    // 初始化
    initializeApp(firebaseConfig)
  }, [])

  return {
    loginGoogle,
    logoutFirebase,
  }
}
