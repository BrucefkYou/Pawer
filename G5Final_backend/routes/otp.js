import express from 'express'
const router = express.Router()
// 資料庫使用，使用原本的mysql2 + sql
import db from '##/configs/mysql.js'
// 加密密碼字串用
import { generateHash } from '#db-helpers/password-hash.js'
// 日期格式化
import moment from 'moment'
// 新增會員，亂數生成會員編號用
import crypto from 'crypto'
// OTPtoken產生與檢查
import { createOTP, checkOTP } from '#db-helpers/otp.js'
// 寄送email
import transporter from '#configs/mail.js'
import 'dotenv/config.js'

// 電子郵件文字訊息樣版
let mailFor = ''
const forgetPasswordMailText = (otpToken, mailFor) => `親愛的網站會員 您好，
通知 ${mailFor} 所需要的驗証碼，
請輸入以下的6位數字，重設密碼頁面的"電子郵件驗証碼"欄位中。
請注意驗証碼將於寄送後30分鐘後到期，如有任何問題請洽網站客服人員:
    
${otpToken}
    
敬上

台灣 NextJS Inc. 網站`

// 忘記密碼-產生OTP並寄信
router.post('/forget-password-mail', async (req, res, next) => {
  const { email } = req.body
  if (!email) return res.json({ status: 'error', message: 'email為必要欄位' })

  // 檢查使用者email是否存在
  const [userResult] = await db.execute(
    'SELECT * FROM Member WHERE eMail = ?',
    [email]
  )

  if (userResult.length === 0) {
    console.log('ERROR - 此信箱未註冊'.bgRed)
    return res.json({ status: 'error', message: '此信箱未註冊' })
  }
  const user = userResult[0]
  const user_id = user.ID
  // console.log('user:', user)

  // 建立otp資料表記錄，成功回傳otp記錄物件，失敗為空物件{}
  const otp = await createOTP(email, user_id)
  console.log(otp)

  if (!otp.token)
    return res.json({ status: 'error', message: 'Email錯誤或期間內重覆要求' })

  // 寄送email
  mailFor = '重設密碼'
  const mailOptions = {
    // 這裡要改寄送人名稱，email在.env檔中代入
    from: `"support"<${process.env.SMTP_TO_EMAIL}>`,
    to: email,
    subject: '重設密碼要求的電子郵件驗証碼',
    text: forgetPasswordMailText(otp.token, mailFor),
  }

  // 寄送email
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      // 失敗處理
      // console.log(err)
      return res.json({ status: 'error', message: '發送電子郵件失敗' })
    } else {
      // 成功回覆的json
      return res.json({
        status: 'success',
        data: null,
        message: '驗証碼已寄送到電子郵件中',
      })
    }
  })
})

// 重設密碼-檢查OTP並更新密碼
router.post('/reset-password', async (req, res) => {
  const { email, token, password } = req.body

  if (!token || !email || !password) {
    return res.json({ status: 'error', message: '缺少必要資料' })
  }

  // 驗証otp的存在與合法性(是否有到期)
  const checkResult = await checkOTP(email, token)
  if (checkResult.status !== 'success') {
    return res.json({ status: 'error', message: checkResult.message })
  }

  const otpdata = checkResult.otpdata

  // 密碼加密
  const hashpassword = await generateHash(password)

  // 修改密碼
  const [resetResult] = await db.execute(
    `UPDATE Member
         SET Password = ?
         WHERE ID = ?`,
    [hashpassword, otpdata.user_id]
  )
  console.log('resetResult:', resetResult)

  if (resetResult.affectedRows === 0) {
    return res.json({ status: 'error', message: '修改密碼失敗' })
  }

  // 刪除otp
  const [deleteResult] = await db.execute(`DELETE FROM otp WHERE id = ?`, [
    otpdata.id,
  ])

  if (!deleteResult) {
    return res.json({ status: 'error', message: '刪除otp失敗' })
  }

  // 成功
  return res.json({ status: 'success', data: null, message: '密碼修改成功' })
})

// 註冊會員-產生OTP並寄信
router.post('/register-mail', async (req, res, next) => {
  const { email } = req.body
  if (!email) return res.json({ status: 'error', message: 'email為必要欄位' })

  // 建立otp資料表記錄，成功回傳otp記錄物件，失敗為空物件{}
  const otp = await createOTP(email)
  // console.log('otp', otp)
  // {user_id: user_id,email,token,exp_timestamp,}

  if (!otp.token)
    return res.json({ status: 'error', message: 'Email錯誤或期間內重覆要求' })

  // 寄送email
  mailFor = '註冊Pawer會員帳號'
  const mailOptions = {
    // 這裡要改寄送人名稱，email在.env檔中代入
    from: `"support"<${process.env.SMTP_TO_EMAIL}>`,
    to: email,
    subject: '註冊帳號要求的電子郵件驗証碼',
    text: forgetPasswordMailText(otp.token, mailFor),
  }

  // 寄送email
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      // 失敗處理
      // console.log(err)
      return res.json({ status: 'error', message: '發送電子郵件失敗' })
    } else {
      // 成功回覆的json
      return res.json({
        status: 'success',
        data: null,
        message: '驗証碼已寄送到電子郵件中',
      })
    }
  })
})

// 註冊會員-檢查OTP並進行註冊
router.post('/register', async (req, res) => {
  try {
    const { name, email, token, password } = req.body

    if (!name || !token || !email || !password) {
      return res.json({ status: 'error', message: '缺少必要資料' })
    }

    // 檢查email是否已經存在
    const [emailCheck] = await db.execute(
      'SELECT * FROM Member WHERE eMail= ?',
      [email]
    )
    if (emailCheck.length > 0) {
      return res.json({ status: 'error', message: '信箱已被註冊' })
    }

    // 驗証otp的存在與合法性(是否有到期)
    const checkResult = await checkOTP(email, token)
    if (checkResult.status !== 'success') {
      return res.json({ status: 'error', message: checkResult.message })
    }
    // 可以取回otp資料
    const otpdata = checkResult.otpdata

    // 獲取唯一的帳號代碼，為使用者生成一不重複亂數帳號，若使用者沒有填寫暱稱時，提供給其他功能顯示在畫面上
    const accountCode = await generateUniqueCode()
    // 密碼加密
    const hashpassword = await generateHash(password)

    // 新增會員資料
    const [insertResults] = await db.execute(
      'INSERT INTO Member (Name,Account,Password, eMail) VALUES (?,?,?,?)',
      [name, accountCode, hashpassword, email]
    )
    // console.log(insertResults)
    if (!insertResults) {
      return res.json({ status: 'error', message: '新增失敗' })
    }
    // 註冊成功，自動發給優惠券
    const memberId = insertResults.insertId
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    const [couponResult] = await db.execute(
      'INSERT INTO MemberDiscountMapping (MemberID, DiscountID, Received_Date, Status) VALUES (?, ?, ?, 0)',
      [memberId, 21, now]
    )

    if (!couponResult) {
      return res.json({
        status: 'error',
        message: '註冊成功但新增優惠券失敗',
      })
    }

    // 刪除otp
    const [deleteResult] = await db.execute(`DELETE FROM otp WHERE id = ?`, [
      otpdata.id,
    ])

    if (!deleteResult) {
      return res.json({ status: 'error', message: '刪除otp失敗' })
    }

    // 成功回應
    return res.json({
      status: 'success',
      message: '恭喜註冊成功並獲得註冊禮優惠券',
    })
  } catch (error) {
    console.error(error)
    return res.json({ status: 'error', message: '伺服器錯誤，請稍後再試' })
  }
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
})

export default router
