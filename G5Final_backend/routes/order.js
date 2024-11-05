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
  const {
    name,
    receiver,
    phone,
    country,
    township,
    address,
    store,
    selectedDelivery,
    selectedPayment,
    TotalPrice,
    selectedBill,
    checkedPrice,
    discountPrice,
  } = req.body
  try {
    const sql =
      'INSERT INTO `order` (MemberID, TotalPrice, CouponID, PaymentMethod, PaymentStatus, Receiver, ReceiverPhone, DeliveryAddress, DeliveryStatus, ReceiptType, ReceiptCarrier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const VALUES = []
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
