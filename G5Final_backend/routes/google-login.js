import express from 'express'
// 日期格式化
import moment from 'moment'
// 資料庫使用，使用原本的mysql2 + sql
import db from '##/configs/mysql.js'
import jsonwebtoken from 'jsonwebtoken'
// 存取`.env`設定檔案使用
import 'dotenv/config.js'
// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
// 新增會員，亂數生成會員編號用
import crypto from 'crypto'
// 生成唯一帳號代碼函數
async function generateUniqueCode() {
  const code = crypto.randomBytes(4).toString('hex')
  const [result] = await db.query('SELECT * FROM Member WHERE Account = ?', [
    code,
  ])
  // 如果找到重複的代碼，再次遞迴調用 generateUniqueCode
  if (result.length > 0) {
    return await generateUniqueCode()
  }
  // 若無重複，返回生成的唯一代碼
  return code
}
const router = express.Router()

router.post('/', async function (req, res, next) {
  // providerData =  req.body
  let message = ''

  console.log(JSON.stringify(req.body))

  // 檢查從react來的資料
  if (!req.body.providerId || !req.body.uid) {
    return res.json({ status: 'error', message: '缺少google登入資料' })
  }

  const { uid, displayName, email, photoURL } = req.body
  const google_uid = uid
  const google_mail = email
  const google_avatar = photoURL

  // 以下流程:
  // 1. 先查詢資料庫是否有同google_uid的資料
  // 2-1. 有存在 -> 執行登入工作
  // 2-2. 不存在 -> 建立一個新會員資料(無帳號與密碼)，只有google來的資料 -> 執行登入工作

  // 1. 先查詢資料庫是否有同google_uid的資料
  const [result] = await db.execute(
    'SELECT * FROM Member WHERE google_uid= ?',
    [google_uid]
  )
  const dbMember = result[0]

  // 要加到access token中回傳給前端的資料
  // 存取令牌(access token)只需要id和username就足夠，其它資料可以再向資料庫查詢
  let returnUser = {
    id: 0,
    name: '',
    google_uid: '',
  }

  if (result.length > 0) {
    //設定已註冊過google會員的提示訊息
    message = '登入成功'

    // 回傳給前端的資料
    returnUser = {
      id: dbMember.ID,
      name: dbMember.Name,
      google_uid: dbMember.google_uid,
    }
  } else {
    // 2-2. 不存在 -> 建立一個新會員資料(無帳號與密碼)，只有google來的資料 -> 執行登入工作
    // 生成唯一帳號代碼函數

    // 獲取唯一的帳號代碼，為使用者生成一不重複亂數帳號，若使用者沒有填寫暱稱時，提供給其他功能顯示在畫面上
    const accountCode = await generateUniqueCode()

    // 新增會員資料
    const [insertResults] = await db.execute(
      'INSERT INTO Member (Name,Account, google_uid, eMail, google_avatar) VALUES (?,?,?,?,?)',
      [displayName, accountCode, google_uid, google_mail, google_avatar]
    )
    // console.log(insertResults)
    if (!insertResults) {
      return res.json({ status: 'error', message: '新增Google會員失敗' })
    }

    // google會員註冊成功，自動發給優惠券
    const memberId = insertResults.insertId
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    const [couponResult] = await db.execute(
      'INSERT INTO MemberDiscountMapping (MemberID, DiscountID, Received_Date, Status) VALUES (?, ?, ?, 0)',
      [memberId, 21, now]
    )

    if (!couponResult) {
      return res.json({
        status: 'error',
        message: 'Google會員新增成功但新增優惠券失敗',
      })
    }

    // 回傳給前端的資料
    returnUser = {
      id: insertResults.insertId,
      name: displayName,
      google_uid: google_uid,
    }

    message = '恭喜Google會員註冊成功並獲得註冊禮優惠券'
  }

  // 產生存取令牌(access token)，其中包含會員資料
  const accessToken = jsonwebtoken.sign(returnUser, accessTokenSecret, {
    expiresIn: '3d',
  })

  // 使用httpOnly cookie來讓瀏覽器端儲存access token
  res.cookie('accessToken', accessToken, { httpOnly: true })

  // 傳送access token回應(react可以儲存在state中使用)
  return res.json({
    status: 'success',
    data: {
      accessToken,
      message: message,
    },
  })
})

export default router
