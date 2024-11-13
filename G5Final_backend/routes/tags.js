import express from 'express'
import db2 from '../configs/mysql.js'
const router = express.Router()

// Tag Options 讀取
router.get('/', async function (req, res, next) {
  try {
    const [rows] = await db2.query('SELECT * FROM `Tag`')
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

export default router
