import authenticate from '##/middlewares/authenticate.js'
import express from 'express'
import db2 from '##/configs/mysql.js'
const router = express.Router()

/* GET home page. */
// 獲得全部訂單
router.get('/', function (req, res, next) {})

// 成立訂單
router.post('/createOrder', authenticate, async function (req, res, next) {
  const ID = req.user.id
  if (req.user.id !== ID) {
    return res.json({ status: 'error', message: '存取會員資料失敗' })
  }
  const {
    MemberID,
    name,
    CouponID,
    Receiver,
    ReceiverPhone,
    // 這三個會組合成一個地址
    country,
    township,
    address,
    storeAddress,
    selectedDelivery,
    selectedPayment,
    ReceiptType,
    checkedPrice,
    DiscountPrice,
    ReceiptCarrier,
  } = req.body

  // 組合地址
  const deliveryHome = `${country}${township}${address}`
  const TotalPrice = checkedPrice - DiscountPrice

  //  檢查付款方式
  // 如果是信用卡刷卡，則直接設定為已付款(0是為付款，1是已付款)
  let PaymentMethod
  let PaymentStatus = 0
  if (selectedPayment === 'credit-card') {
    PaymentMethod = '信用卡'
    PaymentStatus = 1
  } else if (selectedPayment === 'store') {
    PaymentMethod = '超商取貨付款'
  }

  // 檢查運送方式
  let DeliveryAddress
  if (selectedDelivery === 'convenience') {
    DeliveryAddress = storeAddress
  } else if (selectedDelivery === 'home') {
    DeliveryAddress = deliveryHome
  }
  // 檢查發票種類
  let ReceiptTtpe
  if (ReceiptType === 'donate') {
    ReceiptTtpe = '捐贈發票'
  } else if (ReceiptType === 'phone') {
    ReceiptTtpe = '手機載具'
  } else if (ReceiptType === 'paper') {
    ReceiptTtpe = '紙本發票'
  }

  try {
    const sql =
      'INSERT INTO `order` (MemberID, TotalPrice, CouponID, PaymentMethod, PaymentStatus, Receiver, ReceiverPhone, DeliveryAddress, DeliveryStatus, ReceiptType, ReceiptCarrier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const VALUES = [
      MemberID,
      TotalPrice,
      CouponID,
      PaymentMethod,
      PaymentStatus,
      Receiver,
      ReceiverPhone,
      DeliveryAddress,
      '未出貨',
      ReceiptTtpe,
      ReceiptCarrier,
    ]
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
