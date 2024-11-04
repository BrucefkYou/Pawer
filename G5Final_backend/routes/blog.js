import express from 'express'
const router = express.Router()
import db2 from '../configs/mysql.js'

// blog首頁
router.get('/', async function (req, res) {
  try {
    const [blogs] = await db2.query(`
      SELECT 
        Blog.*, 
        (SELECT COUNT(*) FROM BlogLike WHERE BlogLike.ID = Blog.ID) AS likeCount,
        (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.BlogID = Blog.ID) AS favoriteCount,
        Image.ImageUrl AS blogImg
       FROM Blog
       LEFT JOIN Image ON Blog.ID = Image.BlogID
      WHERE Status = 1 
    `)

    res.status(200).json({ status: 'success', data: { blogs } })
  } catch (error) {
    res.status(500).json({ error: '讀取資料失敗' })
  }
})

// 搜尋
router.get('/qs', async function (req, res) {
  try {
    const { keyword } = req.query

    // 這邊帶要查找的資料
    let sql = `
    SELECT 
      Blog.*, 
      (SELECT COUNT(*) FROM BlogLike WHERE BlogLike.ID = Blog.ID) AS likeCount,
      (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.BlogID = Blog.ID) AS favoriteCount,
      Image.ImageUrl AS blogImg
    FROM Blog
    LEFT JOIN Image ON Blog.ID = Image.BlogID
    WHERE Blog.Status = 1
  `
    const conditions = []

    // 搜尋條件
    if (keyword) {
      conditions.push(`Blog.Title LIKE '%${keyword}%'`)
    }

    if (conditions.length > 0) {
      sql += ' AND ' + conditions.join(' AND ')
    }

    const [results] = await db2.query(sql)
    res.status(200).json({ status: 'success', data: { blogs: results } })
  } catch (error) {
    res.status(500).json({ error: '搜尋失敗' })
  }
})

// // 搜尋
// router.get('/qs', async function (req, res) {
//   console.log('關鍵字', req.query.search)

//   // const eachPath = req.path
//   // let tableName
//   // if (eachPath.includes('/product')) {
//   //   tableName = 'Product'
//   // } else if (eachPath.includes('/join')) {
//   //   tableName = 'Join-in'
//   // } else if (eachPath.includes('/blog')) {
//   //   tableName = 'Blog'
//   // } else if (eachPath.includes('/communicator')) {
//   //   tableName = 'PetCommunicator'
//   // } else {
//   //   return res.status(400).json({ error: '路徑錯誤' })
//   // }
//   try {
//     const { search } = req.query

//     let sql = `SELECT * FROM Blog WHERE Status = 1`
//     const conditions = []

//     if (search) {
//       conditions.push(`Blog.Title LIKE '%${search}%'`)
//     }

//     if (conditions.length > 0) {
//       sql += ' AND ' + conditions.join(' AND ')
//     }

//     const [results] = await db2.query(sql)
//     res.status(200).json({ status: 'success', data: results })
//   } catch (error) {
//     console.error('無法搜尋', error)
//     res.status(500).json({ error: '搜尋失敗' })
//   }
// })

// 明細頁

router.get('/:id', async function (req, res) {
  try {
    const id = Number(req.params.id)

    const [rows] = await db2.query(
      `
      SELECT
        Blog.*,
        (SELECT COUNT(*) FROM BlogLike WHERE BlogLike.ID = Blog.ID) AS likeCount,
        (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.BlogID = Blog.ID) AS favoriteCount,
        GROUP_CONCAT(tag.Name) AS tags,
        Image.ImageUrl AS blogImg

      FROM Blog
      LEFT JOIN tagmappings ON Blog.ID = tagmappings.BlogID
      LEFT JOIN tag ON tagmappings.TagID = tag.ID
      LEFT JOIN Image ON Blog.ID = Image.BlogID

  WHERE Blog.ID = ? AND Blog.Status = 1
      GROUP BY Blog.ID
    `,
      [id]
    )
    const blog = rows[0] || null

    res.status(200).json({ status: 'success', data: blog })
  } catch (error) {
    res.status(500).json({ error: { error } })
  }
})

export default router
