import express from 'express'
import db2 from '../configs/mysql.js'

const router = express.Router()

// 商品列表頁
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

// tag貓貓
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

// 加入收藏
router.put('/favorite', async function (req, res) {
  const { ProductID, MemberID } = req.body
  console.log(req.body)
  try {
    const [rows] = await db2.query(
      `INSERT INTO MemberFavoriteMapping (ProductID, MemberID) VALUES (?, ?)`,
      [ProductID, MemberID]
    )
    res.json(rows)
  } catch (err) {
    console.error('新增收藏時發生錯誤：', err)
    res.status(500).send(err)
  }
})

// 取消收藏
router.delete('/favorite', async function (req, res) {
  const { ProductID, MemberID } = req.body
  try {
    const [rows] = await db2.query(
      `DELETE FROM MemberFavoriteMapping WHERE ProductID = ? AND MemberID = ?`,
      [ProductID, MemberID]
    )
    res.json(rows)
  } catch (err) {
    console.error('刪除收藏時發生錯誤：', err)
    res.status(500).send(err)
  }
})

// 檢查收藏狀態
router.get('/check-favorite', async (req, res) => {
  const { ProductID, MemberID } = req.query
  try {
    const [rows] = await db2.query(
      `SELECT * FROM MemberFavoriteMapping WHERE ProductID = ? AND MemberID = ?`,
      [ProductID, MemberID]
    )
    res.json({ isFavorite: rows.length > 0 })
  } catch (err) {
    console.error('檢查錯誤：', err)
    res.status(500).send(err)
  }
})

// 會員頁撈收藏的商品
router.get('/member/favorite', async function (req, res, next) {
  const MemberID = req.query
  try {
    const [rows] = await db2.query(
      `SELECT 
      MemberFavoriteMapping.*, 
      Product.*
    FROM 
      MemberFavoriteMapping
    LEFT JOIN 
      Product ON MemberFavoriteMapping.ProductID = Product.ID
    WHERE 
      MemberFavoriteMapping.MemberID = ? 
      AND MemberFavoriteMapping.ProductID IS NOT NULL 
      AND MemberFavoriteMapping.ProductID <> 0
    `,
      [MemberID]
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    return res.status(500).json({ error: '伺服器錯誤，請稍後再試' })
  }
})

// 立即移除收藏頁
router.get('/member/favorites', async function (req, res, next) {
  try {
    const [rows] = await db2.query(
      `
      SELECT 
          Favorite.*, 
          Member.ID AS ID, 
          Product.* 
      FROM 
          Favorite 
      LEFT JOIN 
          Member ON Favorite.uid = Member.ID 
      LEFT JOIN 
          Product ON Favorite.pid = Product.ID
      `
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    return res.status(500).json({ error: '伺服器錯誤，請稍後再試' })
  }
})

// 會員是否購買過此商品
router.get('/check-productcomment', async function (req, res, next) {
  const memberId = req.query.memberId // 會員ID
  const productId = req.query.productId // 商品ID
  console.log(productId)
  console.log(memberId)

  if (!memberId || !productId) {
    return res
      .status(400)
      .json({ error: '缺少必要的參數：memberId 或 productId' })
  }

  try {
    const [rows] = await db2.query(
      `
       SELECT 
        \`Order\`.ID
      FROM 
        \`Order\`
      JOIN 
        OrderDetail ON \`Order\`.ID = OrderDetail.OrderID
      WHERE 
        \`Order\`.MemberID = ? AND OrderDetail.ProductID = ? AND \`Order\`.PaymentStatus = "已付款";
      `,
      [memberId, productId]
    )

    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    return res.status(500).json({ error: '伺服器錯誤，請稍後再試' })
  }
})

// 評論
router.put('/productcomment', async function (req, res) {
  const {
    ProductID,
    MemberID,
    ProductName,
    ProductContent,
    StarLevel,
    eMail,
    Nickname,
    MemberAvatar,
  } = req.body

  try {
    const [rows] = await db2.query(
      `INSERT INTO productcomment (ProductID, MemberID, ProductName, ProductContent, StarLevel, eMail, Nickname, MemberAvatar) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ProductID,
        MemberID,
        ProductName,
        ProductContent,
        StarLevel,
        eMail,
        Nickname,
        MemberAvatar,
      ]
    )
    res.json(rows)
  } catch (err) {
    console.error('新增評論時發生錯誤：', err)
    res.status(500).send(err)
  }
})

// 撈評論資料顯示在評論下方
router.get('/productcomment', async function (req, res, next) {
  const productId = req.query.productId // 從請求的查詢參數中獲取 productId

  if (!productId) {
    return res.status(400).json({ error: '缺少商品ID' })
  }

  try {
    const [rows] = await db2.query(
      `SELECT * FROM productcomment WHERE ProductID = ?`,
      [productId]
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    return res.status(500).json({ error: '伺服器錯誤，請稍後再試' })
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
      return res.status(404).json({ message: '這裡是最後一個路由' })
    }
    res.json(rows[0]) // 因為只會有一筆資料，所以直接返回第一個元素
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

export default router
