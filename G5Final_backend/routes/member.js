import express from 'express'
const router = express.Router()
// 資料庫使用，使用原本的mysql2 + sql
import db from '##/configs/mysql.js'
// jwttoken
import jwt from 'jsonwebtoken'
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'
// 新增會員，亂數生成會員編號用
import crypto from 'crypto'
// 加密密碼字串用
import { generateHash } from '#db-helpers/password-hash.js'
// 驗証加密密碼字串用
import { compareHash } from '#db-helpers/password-hash.js'
// 日期格式化
import moment from 'moment'
// 上傳檔案用使用multer
import path from 'path'
import multer from 'multer'

// multer的設定值 - START
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // 存放目錄
    callback(null, 'public/member/')
  },
  filename: function (req, file, callback) {
    // 經授權後，req.user帶有會員的id
    const newFilename = req.user.id
    // 新檔名由表單傳來的req.body.newFilename決定
    callback(null, newFilename + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
// multer的設定值 - END

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// 會員資料查詢統一管理函數
function getMemberQuery(condition = '') {
  return `SELECT *, EXISTS (SELECT 1 FROM PetCommunicator WHERE PetCommunicator.MemberID = Member.ID) AS isPetCom FROM Member ${condition}`
}

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/', authenticate, async function (req, res) {
  // id可以用jwt的存取令牌(accessToken)從authenticate中得到
  const id = req.user.id

  const [results] = await db.execute(getMemberQuery('WHERE ID = ?'), [id])
  console.log('取得會員資料:', results)

  if (results.length === 0) {
    return res.json({ status: 'error', message: '沒有找到會員資料' })
  }

  const dbMember = results[0]

  delete dbMember.Password

  return res.json({ status: 'success', memberData: dbMember })
})

// 登入
router.post('/login', async (req, res) => {
  const loginMember = req.body
  // { email: '123', password: '456' }

  const [results] = await db.execute(getMemberQuery('WHERE eMail = ?'), [
    loginMember.email,
  ])
  if (results.length === 0) {
    return res.json({ status: 'error', message: '此信箱尚未註冊' })
  }
  const dbMember = results[0]
  // console.log(`dbMember`, dbMember)

  if (dbMember.Password === null) {
    return res.json({
      status: 'error',
      message:
        '此帳號原為Google快速登入，若欲使用傳統登入，請透過「忘記密碼」功能來設定一次您的密碼。',
    })
  }

  // 比對密碼hash是否相同
  const isValid = await compareHash(loginMember.password, dbMember.Password)
  // console.log(`isValid`, isValid)

  if (!isValid) {
    return res.json({ status: 'error', message: '密碼錯誤' })
  }

  // 存取令牌(access token)只需要id和email就足夠，其它資料可以再向資料庫查詢
  const returnUser = {
    id: dbMember.ID,
    email: dbMember.eMail,
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
    message: '登入成功',
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

// POST - 新增會員資料 (不經過OTP)
router.post('/register', async function (req, res) {
  const { name, email, password } = req.body

  // 檢查從前端來的資料哪些為必要
  if (!name || !email || !password) {
    return res.json({ status: 'error', message: '缺少必要資料' })
  }
  // 密碼加密
  const hashpassword = await generateHash(password)

  try {
    // 檢查email是否已經存在
    const [emailCheck] = await db.execute(
      'SELECT * FROM Member WHERE eMail= ?',
      [email]
    )
    if (emailCheck.length > 0) {
      return res.json({ status: 'error', message: '信箱已被註冊' })
    }
    // 獲取唯一的帳號代碼，為使用者生成一不重複亂數帳號，若使用者沒有填寫暱稱時，提供給其他功能顯示在畫面上
    const accountCode = await generateUniqueCode()

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

// PUT - 更新會員資料(排除更新密碼)同時上傳與更新會員檔案用，使用multer(設定值在此檔案最上面)
router.put(
  '/profile/:id',
  authenticate,
  upload.single('avatar'),
  async function (req, res) {
    const id = Number(req.params.id)
    // 檢查是否為授權會員，只有授權會員可以存取自己的資料
    // req.user.id是從authenticate中token得到的, id 是從前端req.params.id取回
    if (req.user.id !== id) {
      return res.json({ status: 'error', message: '不可存取其他會員資料' })
    }

    // 上傳檔案(頭像)的處理
    if (req.file) {
      const avatar = req.file.filename
      // filename 已經在storage中設定好為userid + 原檔名

      // 更新至db
      const [updateResults] = await db.execute(
        'UPDATE Member SET Avatar=? WHERE ID= ?',
        [avatar, id]
      )

      if (!updateResults) {
        return res.json({
          status: 'error',
          message: '頭像更新失敗',
        })
      }
    }

    // user為來自前端的會員資料(準備要修改的資料)
    const user = req.body
    // console.log(user)

    // 檢查從前端瀏覽器來的資料，哪些為必要(name, ...)
    if (!id || !user.account || !user.email || !user.name) {
      return res.json({ status: 'error', message: '缺少必要資料' })
    }

    // 判斷日期欄位為假值要轉為null存回db
    user.birth = user.birth || null

    // 檢查該id的db資料
    const [results] = await db.execute('SELECT * FROM Member WHERE ID= ?', [id])

    if (results.length === 0) {
      return res.json({ status: 'error', message: '沒有找到會員資料' })
    }

    // 更新至db
    const [updateResults] = await db.execute(
      'UPDATE Member SET Name=?, Nickname=?, Phone=?, Gender=?, Birth=? WHERE ID= ?',
      [user.name, user.nickname, user.phone, user.gender, user.birth, id]
    )

    if (!updateResults) {
      return res.json({ status: 'error', message: '更新失敗或沒有資料被更新' })
    }

    //傳回最新會員資料
    const [updatedMember] = await db.execute(getMemberQuery('WHERE ID = ?'), [
      id,
    ])
    const dbMember = updatedMember[0]

    return res.json({
      status: 'success',
      message: '更新成功',
      memberData: dbMember,
    })
  }
)

// GET - 取得單一訂單資料
router.get(
  '/:memberId/order/:orderId',
  authenticate,
  async function (req, res) {
    try {
      const memberId = Number(req.params.memberId)
      const orderId = Number(req.params.orderId)
      // console.log(memberId)
      // console.log(orderId)

      // 檢查是否為授權會員，只有授權會員可以存取自己的資料
      // req.user.id是從authenticate中token得到的, id 是從前端req.params.id取回
      if (req.user.id !== memberId) {
        return res.json({ status: 'error', message: '不可存取其他會員資料' })
      }

      const [orderMain] = await db.execute(
        // 'SELECT * FROM `Order` WHERE MemberID = ? AND ID = ?'
        'SELECT o.*, d.Name as CouponName FROM `Order` o LEFT JOIN `Discount` d ON o.CouponID = d.ID WHERE o.MemberID = ? AND o.ID = ?',
        [memberId, orderId]
      )

      // console.log('orderMain', orderMain)

      if (orderMain.length === 0) {
        return res.json({ status: 'error', message: '沒有找到訂單資料' })
      }

      const [orderDetail] = await db.execute(
        'SELECT od.*,p.Img as ProductImg FROM OrderDetail od JOIN Product p ON  od.ProductID = p.ID WHERE od.OrderId = ?',
        [orderId]
      )

      // 合併訂單主檔與訂單明細一起回傳
      const [order] = orderMain.map((main) => ({
        ...main,
        OrderDetail: orderDetail,
      }))
      // console.log(order)

      return res.json({ status: 'success', order: order })
    } catch (error) {
      console.error(error)
      return res.json({ status: 'error', message: '伺服器錯誤，請稍後再試' })
    }
  }
)

// GET - 取得會員所有訂單主檔
router.get('/:id/orders', authenticate, async function (req, res) {
  try {
    const id = Number(req.params.id)

    // 檢查是否為授權會員，只有授權會員可以存取自己的資料
    // req.user.id是從authenticate中token得到的, id 是從前端req.params.id取回
    if (req.user.id !== id) {
      return res.json({ status: 'error', message: '不可存取其他會員資料' })
    }

    const [orders] = await db.execute(
      'SELECT * FROM `Order` WHERE MemberID = ? ORDER BY Date DESC',
      [id]
    )

    console.log(orders)
    if (orders.length === 0) {
      return res.json({ status: 'error', message: '沒有找到訂單資料' })
    }
    return res.json({ status: 'success', orders: orders })
  } catch (error) {
    console.error(error)
    return res.json({ status: 'error', message: '伺服器錯誤，請稍後再試' })
  }
})

// GET - 取得會員所有優惠券資料
router.get('/:id/coupons', authenticate, async function (req, res) {
  try {
    const memberid = Number(req.params.id)

    // 檢查是否為授權會員，只有授權會員可以存取自己的資料
    // req.user.id是從authenticate中token得到的, id 是從前端req.params.id取回
    if (req.user.id !== memberid) {
      return res.json({ status: 'error', message: '不可存取其他會員資料' })
    }

    let [coupons] = await db.execute(
      'SELECT d.*,m.* FROM Discount d JOIN MemberDiscountMapping m ON m.DiscountID = d.ID WHERE m.MemberID = ? ORDER BY d.EndTime DESC',
      [memberid]
    )

    if (coupons.length === 0) {
      return res.json({ status: 'success', message: '查無優惠券' })
    }
    console.log(coupons)

    return res.json({ status: 'success', coupons: coupons })
  } catch (error) {
    console.error(error)
    return res.json({ status: 'error', message: '伺服器錯誤，請稍後再試' })
  }
})

export default router
