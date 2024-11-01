import express from 'express'
const router = express.Router()

// 資料庫使用，使用原本的mysql2 + sql
import db from '##/configs/mysql.js'
import jwt from 'jsonwebtoken'
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

import { generateHash, compareHash } from '##/db-helpers/password-hash.js'

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// 登入用
router.post('/login', async (req, res, next) => {
  console.log(req.body)

  const loginMember = req.body
  console.log(generateHash(loginMember.password))

  const [rows] = await db.query(
    'SELECT * FROM Member WHERE eMail = ? and Password = ?',
    [loginMember.email, loginMember.password]
  )

  if (rows.length === 0) {
    return res.json({ status: 'error', message: '該會員不存在' })
  }

  const dbMember = rows[0]

  // 2. 比對密碼hash是否相同(返回true代表密碼正確)
  // const isValid = await compareHash(loginMember.password, dbMember.password)

  // if (!isValid) {
  //   return res.json({ status: 'error', message: '密碼錯誤' })
  // }

  // 存取令牌(access token)只需要id和username就足夠，其它資料可以再向資料庫查詢
  const returnUser = {
    id: dbMember.ID,
    Name: dbMember.Name,
  }

  // 產生存取令牌(access token)，其中包含會員資料
  const accessToken = jwt.sign(returnUser, accessTokenSecret, {
    expiresIn: '3d',
  })

  // 使用httpOnly cookie來讓瀏覽器端儲存access token
  res.cookie('accessToken', accessToken, { httpOnly: true })

  // 傳送access token回應(例如react可以儲存在state中使用)
  return res.json({
    status: 'success',
    data: { accessToken },
  })
})

export default router
