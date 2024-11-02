import express from 'express'
const router = express.Router()
import db2 from '../configs/mysql.js'

router.get('/', async function (req, res) {
  try {
    const [blogs] = await db2.query(`
      SELECT 
        Blog.*, 
        (SELECT COUNT(*) FROM BlogLike WHERE BlogLike.ID = Blog.ID) AS likeCount,
        (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.BlogID = Blog.ID) AS favoriteCount
       FROM Blog
      WHERE Status = 1 
    `)

    res.status(200).json({ status: 'success', data: { blogs } })
  } catch (error) {
    res.status(500).json({ error: '讀取資料失敗' })
  }
})

// router.get('/:id', async function (req, res) {
//   try {
//     const id = Number(req.params.id)

//     const [rows] = await db2.query(
//       `
//       SELECT
//         Blog.*,
//         (SELECT COUNT(*) FROM BlogLike WHERE BlogLike.ID = Blog.ID) AS likeCount,
//         (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.BlogID = Blog.ID) AS favoriteCount
//       FROM Blog
//       WHERE Blog.ID = ?
//     `,
//       [id]
//     )

//     res.status(200).json({ status: 'success', data: rows })
//   } catch (error) {
//     res.status(500).json({ error: { error } })
//   }
// })

export default router
