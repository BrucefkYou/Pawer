import express from 'express'
const router = express.Router()

// 資料庫使用，使用原本的mysql2 + sql
import db from '##/configs/mysql.js'
import jwt from 'jsonwebtoken'
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/', authenticate, async function (req, res) {
  // id可以用jwt的存取令牌(accessToken)從authenticate中得到(如果有登入的話)
  const id = req.user.id

  // 檢查是否為授權會員，只有授權會員可以存取自己的資料
  if (req.user.id !== id) {
    return res.json({ status: 'error', message: '存取會員資料失敗' })
  }

  const [rows] = await db.query('SELECT * FROM Member WHERE ID= ?', [id])

  if (rows.length === 0) {
    return res.json({ status: 'error', message: '沒有找到會員資料' })
  }

  const dbMember = rows[0]

  return res.json({ status: 'success', memberData: dbMember })
})

// 登入
router.post('/login', async (req, res) => {
  const loginMember = req.body
  // console.log(loginMember) { email: '123', password: '456' }
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
    token: { accessToken },
    memberData: dbMember,
  })
})

// 登出
router.post('/logout', authenticate, (req, res) => {
  // 清除cookie
  res.clearCookie('accessToken', { httpOnly: true })
  res.json({ status: 'success', data: null })
})

export default router
