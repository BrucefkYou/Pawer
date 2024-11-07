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

// tag貓咪
router.get('/tagcat', async function (req, res, next) {
  try {
    const [rows] = await db2.query(
      "SELECT * FROM product WHERE CategoryName IN ('貓皇保健', '犬貓通用')"
    ) // 確認資料表名稱是否正確
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

// tag狗狗
router.get('/tagdog', async function (req, res, next) {
  try {
    const [rows] = await db2.query(
      "SELECT * FROM product WHERE CategoryName IN ('犬寶保健', '犬貓通用')"
    ) // 確認資料表名稱是否正確
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

// tag其他
router.get('/tagother', async function (req, res, next) {
  try {
    const [rows] = await db2.query(
      "SELECT * FROM product WHERE CategoryName IN ('沐洗口腔護理', '犬貓通用')"
    ) // 確認資料表名稱是否正確
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

// 貓咪類別
router.get('/cat', async function (req, res, next) {
  const category = req.query.category
  try {
    const [rows] = await db2.query(
      "SELECT * FROM product WHERE CategoryName IN ('貓皇保健', '犬貓通用') AND SubCategory = ? LIMIT 0, 25",
      [category]
    ) // 確認資料表名稱是否正確
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

// 狗狗類別
router.get('/dog', async function (req, res, next) {
  const category = req.query.category
  try {
    const [rows] = await db2.query(
      "SELECT * FROM product WHERE CategoryName IN ('犬寶保健', '犬貓通用') AND SubCategory = ? LIMIT 0, 25",
      [category]
    ) // 確認資料表名稱是否正確
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

// 其他類別
router.get('/other', async function (req, res, next) {
  const category = req.query.category
  try {
    const [rows] = await db2.query(
      "SELECT * FROM product WHERE CategoryName IN ('沐洗口腔護理', '犬貓通用') AND SubCategory = ? LIMIT 0, 25",
      [category]
    ) // 確認資料表名稱是否正確
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

// :id 這個要在最底下不然會讀不到他下面的
//明細
router.get('/:id', async function (req, res, next) {
  try {
    // 使用 WHERE 子句來篩選指定 id 的資料
    const [rows] = await db2.query(
      `SELECT Product.*, Image.ProductID, Image.ImageName FROM Product LEFT JOIN Image ON Product.ID = Image.ProductID
     WHERE ID = ?`,
      [req.params.id]
    )
    // 檢查是否有找到資料
    if (rows.length === 0) {
      return res.status(404).json({ message: '找不到指定的資料' })
    }
    res.json(rows[0]) // 因為只會有一筆資料，所以直接返回第一個元素
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

export default router
