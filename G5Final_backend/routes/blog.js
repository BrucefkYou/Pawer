import express from 'express'
const router = express.Router()
import db2 from '../configs/mysql.js'

// blog首頁
router.get('/', async function (req, res) {
  try {
    const { keyword, tag } = req.query
    let sql = `
    SELECT 
        Blog.*,
        (SELECT COUNT(*) FROM BlogLike WHERE BlogLike.ID = Blog.ID) AS likeCount,
        (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.BlogID = Blog.ID) AS favoriteCount,
        GROUP_CONCAT(tag.Name) AS tags,
        Image.ImageUrl AS blogImg,
        Member.Nickname AS Nickname, 
        Member.Avatar AS MemberAvatar

      FROM Blog
      LEFT JOIN Tagmappings ON Blog.ID = Tagmappings.BlogID
      LEFT JOIN Tag ON Tagmappings.TagID = Tag.ID
      LEFT JOIN Image ON Blog.ID = Image.BlogID
      LEFT JOIN Member ON Blog.MemberID = Member.ID
      WHERE Blog.Status = 1
    `

    const conditions = []

    // 搜尋
    if (keyword) {
      conditions.push(`Blog.Title LIKE '%${keyword}%'`)
    }

    // tag
    if (tag) {
      conditions.push(`Tag.Name LIKE '%${tag}%'`)
    }

    // 把條件加起來
    if (conditions.length > 0) {
      sql += ' AND ' + conditions.join(' AND ')
    }

    sql +=
      ' GROUP BY Blog.ID ORDER BY likeCount DESC, Blog.Title DESC, Blog.UpdateDate '

    const [results] = await db2.query(sql)
    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ error: '獲取資料失敗' })
  }
})

router.get('/tags', async function (req, res) {
  try {
    const { tag } = req.query
    let sql = `
      SELECT 
          Name,
          COUNT(*) AS tagCount
      FROM Tag
    `

    if (tag) {
      sql += ` WHERE Name = ?`
    }

    sql += `
      GROUP BY Name
      ORDER BY tagCount DESC
      LIMIT 5
    `

    const [results] = await db2.query(sql, tag ? [tag] : [])
    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ error: '無法獲取標籤' })
  }
})

// 明細頁

router.get('/:id', async function (req, res) {
  try {
    const [rows] = await db2.query(
      `
      SELECT
        Blog.*,
        (SELECT COUNT(*) FROM BlogLike WHERE BlogLike.ID = Blog.ID) AS likeCount,
        (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.BlogID = Blog.ID) AS favoriteCount,
        GROUP_CONCAT(tag.Name) AS tags,
        Image.ImageUrl AS blogImg,
        Member.Nickname AS Nickname,
        Member.Avatar AS MemberAvatar

      FROM Blog
      LEFT JOIN Tagmappings ON Blog.ID = tagmappings.BlogID
      LEFT JOIN Tag ON tagmappings.TagID = tag.ID
      LEFT JOIN Image ON Blog.ID = Image.BlogID
      LEFT JOIN Member ON Blog.MemberID = Member.ID

  WHERE Blog.ID = ? AND Blog.Status = 1
      GROUP BY Blog.ID
    `,
      [id]
    )

    // 評論
    const [comments] = await db2.query(
      `
        SELECT
        BlogComment.CommentID,
        BlogComment.CommentContent,
        BlogComment.MemberID,

        Member.Nickname AS Nickname,
        Member.Avatar AS MemberAvatar
        FROM BlogComment
        JOIN Member ON BlogComment.MemberID = Member.ID
        WHERE BlogComment.ID = ?
      `,
      [id]
    )

    const blogData = rows.length > 0 ? rows[0] : null
    if (blogData) {
      blogData.comments = comments
    }

    res.status(200).json(blogData ? [blogData] : [])
  } catch (error) {
    res.status(500).json({ error: { error } })
  }
})

export default router
