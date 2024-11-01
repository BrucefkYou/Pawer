import express from 'express'
import db2 from '../configs/mysql.js'
const router = express.Router()

/* GET home page. */
// 獲得全部discount資料
router.get('/getValidDiscount', async function (req, res, next) {
  const now = new Date()
  // 獲得現在時間，格式為 'YYYY-MM-DD HH:MM:SS'
  const today = now.toISOString().slice(0, 19).replace('T', ' ')

  try {
    const [rows] = await db2.query(`SELECT * FROM Discount WHERE EndTime > ?`, [
      today,
    ])
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

// 根據id從mapping表裡面撈資料，篩選條件為日期、id、status
// status設定用過的優惠券為0，未使用的為1
router.get('/:id', function (req, res, next) {})

export default router
