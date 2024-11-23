import authenticate from '##/middlewares/authenticate.js'
import express from 'express'
import db from '##/configs/mysql.js'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { sendMail } from '../emails/emailService.js'
import { generateOrderMailHtml } from '../emails/orderMail.js'
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
  let PaymentStatus = '未付款'
  if (selectedPayment === 'credit-card') {
    PaymentMethod = '信用卡'
  } else if (selectedPayment === 'store') {
    PaymentMethod = '超商取貨付款'
  } else if (selectedPayment === 'LinePay') {
    PaymentMethod = 'LinePay'
  }

  // 檢查運送方式
  let DeliveryAddress
  let DeliveryWay = ''
  if (selectedDelivery === 'convenience') {
    DeliveryWay = '超商取貨'
    DeliveryAddress = storeAddress
  } else if (selectedDelivery === 'home') {
    DeliveryAddress = deliveryHome
    DeliveryWay = '宅配'
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
  const now = moment().format('YYYY-MM-DD HH:mm:ss')

  // 生成流水編號
  // 使用 Date.now() 生成當前的毫秒級時間戳
  const timestamp = Date.now()

  // 隨機數部分（3位數）
  const random = Math.floor(Math.random() * 900) + 100 // 生成 100-999 的隨機數

  const OrderNumber = `EC${timestamp}${random}`

  const uuid = uuidv4()

  // 開始資料庫事務
  const connection = await db.getConnection()
  await connection.beginTransaction()

  try {
    // 執行訂單插入
    const orderSql =
      'INSERT INTO `Order` (OrderNumber, UUID, MemberID, Date, ProductsAmount, OriginPrice, DiscountPrice, TotalPrice, CouponID, PaymentMethod, PaymentStatus, Receiver, ReceiverPhone, DeliveryWay, DeliveryAddress, DeliveryStatus, ReceiptType, ReceiptCarrier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const orderValues = [
      OrderNumber,
      uuid,
      MemberID,
      now,
      ProductsAmount,
      checkedPrice,
      DiscountPrice,
      TotalPrice,
      CouponID || 0,
      PaymentMethod,
      PaymentStatus,
      Receiver,
      ReceiverPhone,
      DeliveryWay,
      DeliveryAddress,
      '未出貨',
      Receipt,
      ReceiptCarrier,
    ]
    const [orderResult] = await connection.query(orderSql, orderValues)

    console.log(orderResult)

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

    let lineProductName = ''
    if (!CouponID || CouponID == 0) {
      lineProductName = 'Pawer的訂單'
    } else {
      lineProductName = '使用了優惠券的Pawer訂單'
    }

    // 如果是LinePay的話將資料寫進Linepayinfo
    if (selectedPayment === 'LinePay') {
      const order = {
        orderId: uuid,
        currency: 'TWD',
        amount: TotalPrice,
        packages: [
          {
            id: OrderNumber, // 使用 OrderNumber 作为 package ID
            amount: TotalPrice,
            products: [
              {
                name: lineProductName,
                quantity: 1,
                price: TotalPrice,
              },
            ],
          },
        ],
        options: { display: { locale: 'zh_TW' } },
      }
      const linePayInfoSql =
        'INSERT INTO LinepayInfo (OrderID, status, order_info) VALUES (?, ?, ?)'
      const linePayInfoValues = [orderId, 'pending', JSON.stringify(order)]
      await connection.query(linePayInfoSql, linePayInfoValues)
    }

    await connection.commit()

    console.log('orderID: ' + orderId)
    // 這裡的result.insertId是插入的訂單的ID
    // 只要該欄位事設定為自動遞增，就可以透過result.insertId取得
    res.status(201).json({
      message: '訂單已成功創建',
      orderId: orderId,
      OrderNumber: OrderNumber,
    })
  } catch (error) {
    // 如果有錯誤，則回滾。回滾會撤銷所有的操作
    await connection.rollback()
    console.error('插入訂單時出錯：', error)
    res.status(500).json({ error: '伺服器錯誤，無法創建訂單' })
  }
})

// 寄送Email
router.post('/orderEmail', async (req, res, next) => {
  const { orderNum, name, email } = req.body
  console.log('naem: ' + name)
  console.log('email:' + email)
  console.log('orderNum: ' + orderNum)

  try {
    const orderInfoSql =
      'SELECT * FROM `Order` WHERE OrderNumber = ? AND SendEmail = 0'
    const orderValue = orderNum
    const [rows, fields] = await db.query(orderInfoSql, [orderValue])
    console.log('orderInfo' + rows[0])

    // 檢查是否有訂單
    if (rows.length === 0) {
      console.error('No order found with OrderNumber:', orderNum)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Order not found' })
    }

    const orderData = rows[0]
    console.log('orderData' + orderData.Receiver)

    const orderNumber = orderNum
    const receiver = orderData.Receiver
    const deliveryAddress = orderData.DeliveryAddress
    const totalPrice = orderData.TotalPrice
    const paymentMethod = orderData.PaymentMethod
    const url = '/member/order'
    const mailHTML = generateOrderMailHtml(
      name,
      orderNumber,
      receiver,
      deliveryAddress,
      totalPrice,
      paymentMethod,
      url
    )

    const mailSubject = 'Pawer 訂單成立通知'
    const result = await sendMail(email, mailSubject, mailHTML)

    // 更新訂單的寄送Email狀態
    const updateEmailSql =
      'UPDATE `Order` SET SendEmail = 1 WHERE OrderNumber = ?'
    const updateEmailValues = [orderNum]
    const [updateResult] = await db.query(updateEmailSql, updateEmailValues)
    console.log(updateResult)
    if (result.status === 'success') {
      return res.json({ status: 'success', message: '訂單通知信已寄出' })
    } else if (result.status === 'error') {
      return res.json({ status: 'error', message: result.message })
    }
  } catch (e) {
    console.error('Error sending order email:', e)
    return res.json({ status: 'error', message: '無法寄出訂單通知信' })
  }
})

export default router
