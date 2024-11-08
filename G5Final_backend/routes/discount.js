import express from 'express'
import db2 from '../configs/mysql.js'
import authenticate from '##/middlewares/authenticate.js'
import moment from 'moment'
const router = express.Router()
// 獲得現在時間
const now = moment().format('YYYY-MM-DD HH:mm:ss')

/* GET home page. */
// 獲得全部discount資料
router.get('/getValidDiscount', async function (req, res, next) {
  try {
    const [rows] = await db2.query(`SELECT * FROM Discount WHERE EndTime > ?`, [
      now,
    ])
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

//! 暫時用不到
// 註冊時獲得優惠券
router.post('/registerDiscount', authenticate, async function (req, res, next) {
  const { MemberID } = req.body

  // 21是會員註冊禮的優惠券ID
  const DiscountID = 21
  const sql = `
  INSERT INTO MemberDiscountMapping (MemberID, DiscountID, 	Received_Date, Status)
  VALUES (?, ?, ?, 0)
`
  const value = [MemberID, DiscountID, now]
  try {
    const [rows] = await db2.query(sql, value)
    res.status(200).json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
  }
})

// 從mapping表裡面撈會員擁有的優惠券
router.post('/getMemberDicount', authenticate, async function (req, res, next) {
  const memberID = req.user.id
  const sql = `
  SELECT d.ID, d.Name, d.EndTime, d.PromotionCondition, d.ConditionMinValue, d.Value, d.PromotionType, d.CalculateType
  FROM MemberDiscountMapping mdm
  JOIN Discount d ON mdm.DiscountID = d.ID
  WHERE mdm.MemberID = ?
    AND d.EndTime > ?
    AND mdm.Status = 0
    AND d.IsValid = 1
`
  const value = [memberID, now]
  try {
    const [rows] = await db2.query(sql, value)
    res.status(200).json(rows)
    console.log(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
  }
})

// 根據id從mapping表裡面撈資料，篩選條件為日期、id、status
// status設定用過的優惠券為0，未使用的為1
// router.get('/:id', function (req, res, next) {})

export default router
