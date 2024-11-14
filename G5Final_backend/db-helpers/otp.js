// 資料庫查詢處理函式
import { generateToken } from '##/configs/otp-token.js'
// 資料庫使用，使用原本的mysql2 + sql
import db from '##/configs/mysql.js'

// 判斷是否可以重設token, true代表可以重設
const shouldReset = (expTimestamp, exp, limit = 60) => {
  const createdTimestamp = expTimestamp - exp * 60 * 1000
  return Date.now() - createdTimestamp > limit * 1000
}

//新增otp, 或是更新otp
// exp = 是 30 分到期,  limit = 60 是 60秒內不產生新的token
const createOTP = async (email, user_id = null, exp = 30, limit = 60) => {
  // console.log(`email`, email, `creatotp user_id`, user_id)

  const query = user_id
    ? 'SELECT * FROM otp WHERE user_id = ? AND email = ?'
    : 'SELECT * FROM otp WHERE email = ?'

  const params = user_id ? [user_id, email] : [email]

  const [foundOtpResult] = await db.execute(query, params)

  const foundOtp = foundOtpResult[0]
  // console.log('foundOtp:', foundOtp)

  // 找到記錄，因為在60s(秒)內限制，所以"不能"產生新的otp token
  if (foundOtp && !shouldReset(foundOtp.exp_timestamp, exp, limit)) {
    console.log('ERROR - 60s(秒)內要求重新產生otp'.bgRed)
    return {}
  }

  // 找到記錄，超過60s(秒)內限制，所以可以產生新的otp token
  if (foundOtp && shouldReset(foundOtp.exp_timestamp, exp, limit)) {
    // 以使用者輸入的Email作為secret產生otp token
    const token = generateToken(email)

    // 到期時間 預設 exp = 30 分鐘到期
    const exp_timestamp = Date.now() + exp * 60 * 1000

    // 修改Otp
    const [updateOtpResults] = await db.execute(
      'UPDATE otp SET token = ?, exp_timestamp = ? WHERE email = ?',
      [token, exp_timestamp, email]
    )

    if (!updateOtpResults) {
      console.log('修改Otp失敗'.bgRed)
      return {}
    } else {
      return {
        ...foundOtp,
        exp_timestamp,
        token,
      }
    }
  }

  // 以下為"沒找到otp記錄"
  // 以使用者輸入的Email作為secret產生otp token
  const token = generateToken(email)
  // console.log('token:', token)

  // 到期時間 預設 exp = 30 分鐘到期
  const exp_timestamp = Date.now() + exp * 60 * 1000

  // 建立otp物件
  const newOtp = {
    user_id: user_id,
    email,
    token,
    exp_timestamp,
  }
  // console.log('newOtp:', newOtp)

  // 建立新記錄
  const [createOtpResults] = await db.execute(
    'INSERT INTO otp (user_id, email,token,exp_timestamp) VALUE (?,?,?,?)',
    [user_id, email, token, exp_timestamp]
  )

  if (!createOtpResults) {
    console.log('新增Otp失敗'.bgRed)
    return {}
  } else {
    return newOtp
  }
}

// 檢查otp
const checkOTP = async (email, token) => {
  // 檢查otp是否已經存在
  const [otpResult] = await db.execute(
    `SELECT * FROM Otp WHERE email = ? AND token = ? LIMIT 1`,
    [email, token]
  )
  // 沒找到回傳false
  if (otpResult.length === 0) {
    console.log('ERROR - OTP Token資料不存在'.bgRed)
    return { status: 'error', message: 'OTP Token資料不存在' }
  }
  const foundOtp = otpResult[0]

  // 檢查 OTP 是否過期
  if (Date.now() > foundOtp.exp_timestamp) {
    console.log('ERROR - OTP Token已到期'.bgRed)
    return { status: 'error', message: 'OTP Token資料不存在' }
  }

  return { status: 'success', message: 'OTP Token資料通過', otpdata: foundOtp }
}

export { createOTP, checkOTP }
