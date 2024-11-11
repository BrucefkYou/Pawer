import express from 'express'
import db2 from '../configs/mysql.js'
import { getIdParam } from '#db-helpers/db-tool.js'
import authenticate from '#middlewares/authenticate.js'
import sequelize from '#configs/db.js'
const { Favorite } = sequelize.models
import path from 'path'
import moment from 'moment'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/blog')
  },
  filename: function (req, file, callback) {
    const newFilename = uuidv4() + path.extname(file.originalname)
    callback(null, newFilename)
  },
})
const upload = multer({ storage: storage })

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
      LEFT JOIN Tag ON tagmappings.TagID = Tag.ID
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
      conditions.push(`tag.Name LIKE '%${tag}%'`)
    }

    if (conditions.length > 0) {
      sql += ' AND ' + conditions.join(' AND ')
    }

    sql += ' GROUP BY Blog.ID ORDER BY Blog.ID ASC '

    const [results] = await db2.query(sql)
    res.status(200).json(results)
  } catch (error) {
    console.error('error', error)
    res.status(500).json({ error: '獲取資料失敗' })
  }
})

router.get('/status', async function (req, res) {
  try {
    const [rows] = await db2.query(`
      SELECT 
          Blog.*,
          (SELECT COUNT(*) FROM BlogLike WHERE BlogLike.ID = Blog.ID) AS likeCount,
          (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.BlogID = Blog.ID) AS favoriteCount,
          GROUP_CONCAT(Tag.Name) AS tags,
          Image.ImageUrl AS blogImg,
          Member.Nickname AS Nickname, 
          Member.Avatar AS MemberAvatar
      FROM Blog
      LEFT JOIN Tagmappings ON Blog.ID = Tagmappings.BlogID
      LEFT JOIN Tag ON Tagmappings.TagID = Tag.ID
      LEFT JOIN Image ON Blog.ID = Image.BlogID
      LEFT JOIN Member ON Blog.MemberID = Member.ID
      GROUP BY Blog.ID 
      ORDER BY Blog.UpdateDate DESC
    `)

    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: '獲取資料失敗' })
  }
})

// tags
router.get('/tags', async function (req, res) {
  try {
    const { tag } = req.query
    let sql = `
      SELECT 
          Name,
          COUNT(*) AS tagCount
      FROM tag
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
    console.error('error', error)
    res.status(500).json({ error: '無法獲取標籤' })
  }
})

// 按讚
router.put('/likes', async function (req, res) {
  const { blogId, uid } = req.body
  console.log(req.body)
  try {
    const [rows] = await db2.query(
      `INSERT INTO BlogLike (ID, MemberID) VALUES (?, ?)`,
      [blogId, uid]
    )
    res.json(rows)
  } catch (error) {
    console.error('error', error)
    res.status(500).json({ error: '無法按讚' })
  }
})

router.delete('/likes', async function (req, res) {
  const { blogId, uid } = req.body
  try {
    const [rows] = await db2.query(
      `DELETE FROM BlogLike WHERE ID = ? AND MemberID = ?`,
      [blogId, uid]
    )
    res.json(rows)
  } catch (error) {
    console.error('error', error)
    res.status(500).json({ error: '無法取消按讚' })
  }
})

router.get('/likes-status', async (req, res) => {
  const { blogId, uid } = req.query
  try {
    const [rows] = await db2.query(
      `SELECT * FROM BlogLike WHERE ID = ? AND MemberID = ?`,
      [blogId, uid]
    )
    res.json({ Liked: rows.length > 0 })
  } catch (error) {
    console.error('error', error)
    res.status(500).json({ error: '無法確認按讚狀態' })
  }
})

// 收藏
router.put('/favorite', async function (req, res) {
  const { blogId, uid } = req.body
  console.log(req.body)
  try {
    const [rows] = await db2.query(
      `INSERT INTO memberfavoritemapping (BlogID, MemberID) VALUES (?, ?)`,
      [blogId, uid]
    )
    res.json(rows)
  } catch (error) {
    console.error('error', error)
    res.status(500).json({ error: '無法按讚' })
  }
})

router.delete('/favorite', async function (req, res) {
  const { blogId, uid } = req.body
  try {
    const [rows] = await db2.query(
      `DELETE FROM memberfavoritemapping WHERE BlogID = ? AND MemberID = ?`,
      [blogId, uid]
    )
    res.json(rows)
  } catch (error) {
    console.error('error', error)
    res.status(500).json({ error: '無法取消按讚' })
  }
})

router.get('/favorite-status', async (req, res) => {
  const { blogId, uid } = req.query
  try {
    const [rows] = await db2.query(
      `SELECT * FROM memberfavoritemapping WHERE BlogID = ? AND MemberID = ?`,
      [blogId, uid]
    )
    res.json({ Favorite: rows.length > 0 })
  } catch (error) {
    console.error('error', error)
    res.status(500).json({ error: '無法確認收藏狀態' })
  }
})

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

// 圖片上傳
router.post('/upload', upload.single('imageFile'), (req, res) => {
  try {
    const file = req.file
    if (!file) {
      console.log('未上傳圖片')
      return res.status(400).json({ message: '未上傳圖片' })
    }
    const imageUrl = `/blog/${file.filename}`
    console.log('上傳的圖片:', file)
    res.status(200).json({ url: imageUrl, name: file.filename })
  } catch (error) {
    console.error('圖片上傳錯誤:', error)
    res.status(500).json({ message: '圖片上傳失敗', error })
  }
})

router.post('/create', upload.single('imageFile'), async (req, res) => {
  const { status, title, info = '無內容', memberId, tags, imageName } = req.body
  console.log('獲取的資料', { status, title, info, memberId, tags, imageName })
  console.log('提交的表單:', req.body)
  console.log('上傳的文件', req.file)

  const createTime = moment().format('YYYY-MM-DD HH:mm:ss')
  const updateTime = moment().format('YYYY-MM-DD HH:mm:ss')
  try {
    // 新增到 Blog
    const [result] = await db2.execute(
      `INSERT INTO blog (Status, Title, Content, CreateDate, MemberID, UpdateDate, Valid) VALUES (?, ?, ?, ?,?, ?, ?)`,
      [status, title, info, createTime, memberId, updateTime, 1]
    )
    console.log('新增', result)
    const blogId = result.insertId

    // 處理標籤
    console.log('Raw tags input:', tags)
    const tagsArray = JSON.parse(tags || '[]')
    await handleTags(tagsArray, createTime, memberId, blogId)

    // 新增圖片到image
    const imgurl = `/blog/${imageName}`
    const imgType = path.extname(imageName).slice(1)
    const imgUploadDate = moment().format('YYYY-MM-DD HH:mm:ss')
    await db2.execute(
      `INSERT INTO Image (BlogID, ImageName, ImageUrl, ImageUploadDate, ImageType) VALUES (?, ?, ?, ?, ?)`,
      [blogId, imageName, imgurl, imgUploadDate, imgType]
    )

    res.status(200).json({ message: '文章發佈成功', blogId })
    // console.log('Status:', status)
    // console.log('MemberID:', memberId)
    // console.log('Title:', title)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ message: '伺服器錯誤', error: error.message })
  }
})

// 處理標籤
const handleTags = async (tagsArray, createTime, memberId, blogId) => {
  try {
    for (const tag of tagsArray) {
      const [existingTagResult] = await db2.execute(
        `SELECT ID FROM Tag WHERE Name = ?`,
        [tag]
      )

      let tagId
      if (existingTagResult.length > 0) {
        // 標籤已存在
        tagId = existingTagResult[0].ID
        console.log(`Tag "${tag}" ID: ${tagId}`)
      } else {
        // 標籤不存在，新增標籤
        const [insertResult] = await db2.execute(
          `INSERT INTO Tag (Name, CreateDate, CreateUserID) VALUES (?, ?, ?)`,
          [tag, createTime, memberId]
        )

        if (insertResult.affectedRows === 0) {
          console.error(`新增失敗 ${tag}`)
          continue
        }

        const [newTagResult] = await db2.execute(
          `SELECT ID FROM Tag WHERE Name = ?`,
          [tag]
        )
        tagId = newTagResult[0].ID
        console.log(`新增 "${tag}"  ID: ${tagId}`)
      }

      await db2.execute(
        `INSERT INTO Tagmappings (BlogID, TagID) VALUES (?, ?)`,
        [blogId, tagId]
      )
      console.log(`Tagmappings 新增 BlogID = ${blogId}, TagID = ${tagId}`)
    }
  } catch (error) {
    console.error('Error', error)
    throw new Error('處理標籤時發生錯誤')
  }
}

export default router
