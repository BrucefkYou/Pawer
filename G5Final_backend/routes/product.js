import express from 'express'
import db2 from '../configs/mysql.js'
const router = express.Router()

// 商品資料
router.get('/', async function (req, res, next) {
  try {
    const [rows] = await db2.query(
      'SELECT Product.*, Image.ProductID, Image.ImageName FROM Product LEFT JOIN Image ON Product.ID = Image.ProductID'
    ) // 確認資料表名稱是否正確
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

// 搜尋
router.get('/qs', async function (req, res) {
  try {
    const { keyword } = req.query

    let sql = `
    SELECT p.*, i.ProductID, i.ImageName 
    FROM Product p 
    LEFT JOIN Image i ON p.ID = i.ProductID
    WHERE 1=1
    `
    const conditions = []

    if (keyword) {
      conditions.push(`Product.Name LIKE '%${keyword}%'`)
    }

    if (conditions.length > 0) {
      sql += ' AND ' + conditions.join(' AND ')
    }

    const [results] = await db2.query(sql)
    res.status(200).json({ status: 'success', data: { product: results } })
  } catch (error) {
    console.error('搜尋失敗：', error)
    res.status(500).json({ error: '搜尋失敗' })
  }
})

export default router
