import authenticate from '##/middlewares/authenticate.js'
import express from 'express'
import db from '##/configs/mysql.js'
const router = express.Router()

/* GET home page. */
// 獲得全部訂單
router.get('/', function (req, res, next) {})

// 成立訂單
router.post('/createOrder', authenticate, async function (req, res, next) {
  // const ID = req.user.id
  const {
    MemberID,
    ProductsAmount,
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
    Products,
  } = req.body

  //   if (MemberID !== ID) {
  //     return res.json({ status: 'error', message: '存取會員資料失敗' })
  //   }
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
  let Receipt
  if (ReceiptType === 'donate') {
    Receipt = '捐贈發票'
  } else if (ReceiptType === 'phone') {
    Receipt = '手機載具'
  } else {
    Receipt = '紙本發票'
  }

  // 獲得現在時間
  const now = new Date()
  // 轉換格式為 'YYYY-MM-DD HH:MM:SS'
  const today = now.toISOString().slice(0, 19).replace('T', ' ')

  // 開始資料庫事務
  const connection = await db.getConnection()
  await connection.beginTransaction()

  try {
    // 執行訂單插入
    const orderSql =
      'INSERT INTO `Order` (MemberID, ProductsAmount, TotalPrice, CouponID, PaymentMethod, PaymentStatus, Receiver, ReceiverPhone, DeliveryAddress, DeliveryStatus, ReceiptType, ReceiptCarrier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const orderValues = [
      MemberID,
      ProductsAmount,
      TotalPrice,
      CouponID,
      PaymentMethod,
      PaymentStatus,
      Receiver,
      ReceiverPhone,
      DeliveryAddress,
      '未出貨',
      Receipt,
      ReceiptCarrier,
    ]
    const [orderResult] = await connection.query(orderSql, orderValues)

    // 執行訂單明細插入
    // 資料庫驅動的佔位符
    // 當我們傳遞一個包含多組值的二維數組時，? 會自動展開為多組 (?, ?, ..., ?)。
    const orderDetailsSql =
      'INSERT INTO OrderDetail (OrderID, ProductID, ProductName, ProductOriginPrice, ProductAmount) VALUES ?'
    const orderId = orderResult.insertId

    const orderDetailsValues = Products.map((product) => [
      orderId,
      product.ProductID,
      product.ProductName,
      product.Price,
      product.Quantity,
    ])

    await connection.query(orderDetailsSql, [orderDetailsValues])

    // 這邊需要將MemberDiscountMapping表中使用過的優惠券設定為已使用
    const updateCouponSql =
      'UPDATE MemberDiscountMapping SET Used_Date = ?, Status = 1 WHERE MemberID = ? AND DiscountID = ?'
    const updateCouponValues = [today, MemberID, CouponID]

    await connection.query(updateCouponSql, updateCouponValues)

    await connection.commit()

    // 這裡的result.insertId是插入的訂單的ID
    // 只要該欄位事設定為自動遞增，就可以透過result.insertId取得
    res.status(201).json({ message: '訂單已成功創建', orderId: orderId })
  } catch (error) {
    // 如果有錯誤，則回滾。回滾會撤銷所有的操作
    await connection.rollback()
    console.error('插入訂單時出錯：', error)
    res.status(500).json({ error: '伺服器錯誤，無法創建訂單' })
  }
})

export default router
