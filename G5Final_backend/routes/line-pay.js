import moment from 'moment'
import express from 'express'
const router = express.Router()

// 資料庫使用
// import sequelize from '#configs/db.js'
// const { Purchase_Order } = sequelize.models

// 資料庫使用
import db from '##/configs/mysql.js'

// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// line pay使用npm套件
import { createLinePayClient } from 'line-pay-merchant'
// 產生uuid用
import { v4 as uuidv4 } from 'uuid'

// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 定義安全的私鑰字串
const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: process.env.NODE_ENV,
})

// 獲得現在時間
const now = moment().format('YYYY-MM-DD HH:mm:ss')

// 在資料庫建立order資料(需要會員登入才能使用)
router.post('/LinePayOrder', authenticate, async (req, res) => {
  // 會員id由authenticate中介軟體提供
  const OrderID = req.body.orderID

  // 開始資料庫事務
  const connection = await db.getConnection()
  await connection.beginTransaction()

  const orderSql = 'SELECT * FROM `Order` WHERE ID = ?'
  const [rows, fields] = await connection.query(orderSql, OrderID)
  const orderRecord = rows[0]

  const productsSql =
    'SELECT od.ProductID, od.ProductName, od.ProductOriginPrice, od.ProductAmount FROM `Order` o JOIN OrderDetail od ON o.ID = od.OrderID WHERE o.ID = ?'
  const productValues = []

  //產生 orderId與packageId
  const orderId = uuidv4()
  const packageId = orderRecord.OrderNumber
  const orderAmount = orderRecord.ProductsAmount

  // 要傳送給line pay的訂單資訊
  const order = {
    orderId: orderId,
    currency: 'TWD',
    amount: orderAmount,
    packages: [
      {
        id: packageId,
        amount: req.body.amount,
        products: req.body.products,
      },
    ],
    options: { display: { locale: 'zh_TW' } },
  }

  //console.log(order)

  // 要儲存到資料庫的order資料
  const dbOrder = {
    id: orderId,
    // user_id: userId,
    amount: req.body.amount,
    status: 'pending', // 'pending' | 'paid' | 'cancel' | 'fail' | 'error'
    order_info: JSON.stringify(order), // 要傳送給line pay的訂單資訊
  }

  // 儲存到資料庫
  // await Purchase_Order.create(dbOrder)

  // 回傳給前端的資料
  res.json({ status: 'success', data: { order } })
})

// 重新導向到line-pay，進行交易(純導向不回應前端)
// 資料格式參考 https://enylin.github.io/line-pay-merchant/api-reference/request.html#example
router.get('/reserve', authenticate, async (req, res) => {
  if (!req.query.orderId || req.query.orderId == 0) {
    return res.json({ status: 'error', message: 'order id不存在' })
  }

  const orderId = req.query.orderId

  // 設定重新導向與失敗導向的網址
  const redirectUrls = {
    confirmUrl: process.env.REACT_REDIRECT_CONFIRM_URL,
    cancelUrl: process.env.REACT_REDIRECT_CANCEL_URL,
  }

  // 從資料庫取得訂單資料
  const orderSql = 'SELECT * FROM `LinepayInfo` WHERE OrderID = ?'
  const [rows, fields] = await db.query(orderSql, orderId)
  const orderRecord = rows[0]
  const orderData = JSON.parse(orderRecord.order_info)

  // const orderRecord = await findOne('orders', { order_id: orderId })

  // order_info記錄要向line pay要求的訂單json
  // const order = JSON.parse(orderRecord.order_info)

  //const order = cache.get(orderId)
  console.log(`獲得訂單資料，內容如下：`)
  console.log(orderData)
  try {
    // 向line pay傳送的訂單資料
    const linePayResponse = await linePayClient.request.send({
      body: { ...orderData, redirectUrls },
    })

    // 深拷貝一份order資料
    const reservation = JSON.parse(JSON.stringify(orderData))

    reservation.return_code = linePayResponse.body.returnCode
    reservation.returnMessage = linePayResponse.body.returnMessage
    reservation.transaction_id = linePayResponse.body.info.transactionId
    reservation.paymentAccessToken =
      linePayResponse.body.info.paymentAccessToken

    console.log(`預計付款資料(Reservation)已建立。資料如下:`)
    console.log(reservation)

    // 在db儲存reservation資料
    const linepayinfoSql =
      'UPDATE LinepayInfo SET reservation = ?, transaction_id = ? WHERE OrderID = ?'
    const linepayinfoValues = [
      JSON.stringify(reservation),
      reservation.transaction_id,
      orderId,
    ]
    await db.query(linepayinfoSql, linepayinfoValues)

    // 導向到付款頁面， line pay回應後會帶有info.paymentUrl.web為付款網址
    res.redirect(linePayResponse.body.info.paymentUrl.web)
  } catch (e) {
    console.log('error', e)
  }
})

// 向Line Pay確認交易結果
// 格式參考: https://enylin.github.io/line-pay-merchant/api-reference/confirm.html#example
router.get('/confirm', async (req, res) => {
  // 網址上需要有transactionId
  const transactionId = req.query.transactionId

  // 從資料庫取得交易資料
  const linepayInfoSql = 'SELECT * FROM `LinepayInfo` WHERE transaction_id = ?'
  const [rows, fields] = await db.query(linepayInfoSql, transactionId)
  const dbOrder = rows[0]

  // 交易資料

  const transaction = JSON.parse(dbOrder.reservation)

  console.log('transaction:')
  console.log(transaction)

  // 交易金額
  const amount = transaction.amount

  try {
    // 最後確認交易
    console.log('確認交易')
    const linePayResponse = await linePayClient.confirm.send({
      transactionId: transactionId,
      body: {
        currency: 'TWD',
        amount: amount,
      },
    })
    console.log('確認完成')

    // linePayResponse.body回傳的資料
    console.log('linePayResponse')
    console.log(linePayResponse)

    // transaction.confirmBody = linePayResponse.body

    // status: 'pending' | 'paid' | 'cancel' | 'fail' | 'error'
    let status = 'paid'

    if (linePayResponse.body.returnCode !== '0000') {
      status = 'fail'
    }

    // 更新資料庫的訂單狀態
    const linepayinfoSql =
      'UPDATE LinepayInfo SET status = ?, confirm = ? WHERE OrderID = ?'
    const linepayinfoValues = [
      status,
      JSON.stringify(linePayResponse.body),
      dbOrder.OrderID,
    ]
    console.log('linepayinfoValues')
    console.log(linepayinfoValues)
    const result = await db.query(linepayinfoSql, linepayinfoValues)

    console.log(result)

    if (status == 'paid') {
      // 開始資料庫事務
      const connection = await db.getConnection()
      await connection.beginTransaction()

      // 更新訂單的付款狀態
      const updataOrderSql = 'UPDATE `Order` SET PaymentStatus = ? WHERE ID = ?'
      const updataOrderValues = ['已付款', dbOrder.OrderID]
      await connection.query(updataOrderSql, updataOrderValues)

      // 取得訂單資料
      const orderSql = 'SELECT * FROM `Order` WHERE ID = ?'
      const orderValues = [dbOrder.OrderID]
      const [rows, fields] = await connection.query(orderSql, orderValues)
      const orderRecord = rows[0]

      // 將MemberDiscountMapping表中使用過的優惠券設定為已使用
      const updateCouponSql =
        'UPDATE MemberDiscountMapping SET Used_Date = ?, Status = 1 WHERE MemberID = ? AND DiscountID = ?'
      const updateCouponValues = [
        now,
        orderRecord.MemberID,
        orderRecord.CouponID,
      ]

      await connection.query(updateCouponSql, updateCouponValues)

      await connection.commit()
    }

    return res.json({ status: 'success', data: linePayResponse.body })
  } catch (error) {
    return res.json({ status: 'fail', data: error.data })
  }
})

// 檢查交易用
router.get('/check-transaction', async (req, res) => {
  const transactionId = req.query.transactionId

  try {
    const linePayResponse = await linePayClient.checkPaymentStatus.send({
      transactionId: transactionId,
      params: {},
    })

    // 範例:
    // {
    //   "body": {
    //     "returnCode": "0000",
    //     "returnMessage": "reserved transaction."
    //   },
    //   "comments": {}
    // }

    res.json(linePayResponse.body)
  } catch (e) {
    res.json({ error: e })
  }
})

export default router
