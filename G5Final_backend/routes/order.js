import authenticate from '##/middlewares/authenticate.js'
import express from 'express'
import db2 from '##/configs/mysql.js'
const router = express.Router()

/* GET home page. */
// 獲得全部訂單
router.get('/', function (req, res, next) {})

// 成立訂單
router.post('/createOrder', authenticate, async function (req, res, next) {
  const MemberID = req.user.id
  if (req.user.id !== MemberID) {
    return res.json({ status: 'error', message: '存取會員資料失敗' })
  }
  const {
    name,
    CouponID,
    Receiver,
    ReceiverPhone,
    // 這三個會組合成一個地址
    country,
    township,
    address,
    store,
    selectedDelivery,
    selectedPayment,
    ReceiptType,
    checkedPrice,
    DiscountPrice,
  } = req.body
  const DeliveryAddress = `${country}${township}${address}`
  const TotalPrice = checkedPrice - DiscountPrice
  //  檢查付款方式
  let PaymentMethod
  if (selectedPayment === 'credit-card') {
    PaymentMethod = '信用卡'
  } else if (selectedPayment === 'store') {
    PaymentMethod = '超商取貨付款'
  }

  try {
    const sql =
      'INSERT INTO `order` (MemberID, TotalPrice, CouponID, PaymentMethod, PaymentStatus, Receiver, ReceiverPhone, DeliveryAddress, DeliveryStatus, ReceiptType, ReceiptCarrier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const VALUES = [MemberID, TotalPrice, CouponID]
    const result = await db2.query(sql, VALUES)
    res
      .status(201)
      .json({ message: '訂單已成功創建', orderId: result.insertId })
  } catch (error) {
    console.error('插入訂單時出錯：', error)
    res.status(500).json({ error: '伺服器錯誤，無法創建訂單' })
  }
})

export default router
