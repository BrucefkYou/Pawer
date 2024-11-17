import express from 'express'
import db2 from '../configs/mysql.js'
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
        Member.Avatar AS MemberAvatar,
        Member.ID AS MemberId

      FROM Blog
      LEFT JOIN Tagmappings ON Blog.ID = Tagmappings.BlogID
      LEFT JOIN Tag ON tagmappings.TagID = Tag.ID
      LEFT JOIN Image ON Blog.ID = Image.BlogID
      LEFT JOIN Member ON Blog.MemberID = Member.ID
      WHERE Blog.Status = 1 AND    
      Blog.Valid = 1   
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

// tags
router.get('/tags', async function (req, res) {
  try {
    const { tag } = req.query
    let sql = `
      SELECT 
          tag.Name,
          COUNT(tagmappings.TagID) AS tagCount
      FROM tagmappings
      JOIN tag ON tagmappings.TagID = tag.ID
    `

    if (tag) {
      sql += ` WHERE tag.Name = ?`
    }

    sql += `
      GROUP BY tag.Name
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

// 會員
router.get('/member/:id', async function (req, res) {
  try {
    const id = Number(req.params.id)

    const [memberData] = await db2.query(
      `
      SELECT
        Member.*
      FROM Member
      WHERE Member.ID = ? AND Member.Valid = 1
      `,
      [id]
    )

    res.json(memberData)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 會員頁
router.get('/mem-blog', async function (req, res) {
  try {
    const { memberId } = req.query

    const [rows] = await db2.query(
      `
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
      WHERE Blog.MemberID = ? 
        AND Blog.Valid = 1
      GROUP BY Blog.ID 
      ORDER BY Blog.UpdateDate DESC
    `,
      [memberId]
    )
    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: '獲取資料失敗' })
  }
})

// 會員收藏頁
router.get('/mem-favorite', async function (req, res) {
  const { memberId } = req.query

  try {
    const [rows] = await db2.query(
      `
      SELECT 
        Blog.*,
        (SELECT COUNT(*) FROM BlogLike WHERE BlogLike.ID = Blog.ID) AS likeCount,
        (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.BlogID = Blog.ID) AS favoriteCount,
        GROUP_CONCAT(Tag.Name) AS tags,
        Image.ImageUrl AS blogImg,
        Member.Nickname AS Nickname,
        Member.Avatar AS MemberAvatar
      FROM MemberFavoriteMapping
      LEFT JOIN Blog ON MemberFavoriteMapping.BlogID = Blog.ID
      LEFT JOIN Tagmappings ON Blog.ID = Tagmappings.BlogID
      LEFT JOIN Tag ON Tagmappings.TagID = Tag.ID
      LEFT JOIN Image ON Blog.ID = Image.BlogID
      LEFT JOIN Member ON Blog.MemberID = Member.ID
      WHERE 
        MemberFavoriteMapping.MemberID = ? 
        AND Blog.Valid = 1 
      GROUP BY Blog.ID 
      ORDER BY Blog.UpdateDate DESC
      `,
      [memberId]
    )

    res.status(200).json(rows)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: '無法獲取收藏的資料' })
  }
})

// 按讚
router.put('/likes', async function (req, res) {
  const { blogId, uid } = req.body
  console.log(req.body)
  try {
    const [rows] = await db2.query(
      `INSERT INTO BlogLike(ID, MemberID) VALUES(?, ?)`,
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
      `DELETE FROM BlogLike WHERE ID = ? AND MemberID = ? `,
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
      `SELECT * FROM BlogLike WHERE ID = ? AND MemberID = ? `,
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
      `INSERT INTO memberfavoritemapping(BlogID, MemberID) VALUES(?, ?)`,
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
      `DELETE FROM memberfavoritemapping WHERE BlogID = ? AND MemberID = ? `,
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
      `SELECT * FROM memberfavoritemapping WHERE BlogID = ? AND MemberID = ? `,
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
        Image.ImageName AS imageName,
          Member.Nickname AS Nickname,
            Member.Avatar AS MemberAvatar

      FROM Blog
      LEFT JOIN Tagmappings ON Blog.ID = tagmappings.BlogID
      LEFT JOIN Tag ON tagmappings.TagID = tag.ID
      LEFT JOIN Image ON Blog.ID = Image.BlogID
      LEFT JOIN Member ON Blog.MemberID = Member.ID

  WHERE Blog.ID = ? AND Blog.Valid = 1   
      GROUP BY Blog.ID
  `,
      [id]
    )

    // 評論
    const [comments] = await db2.query(
      `SELECT
      BlogComment.CommentID,
      BlogComment.CommentContent,
       BlogComment.MemberID,
        BlogComment.created_at,

       Member.Nickname AS Nickname,
          Member.Avatar AS MemberAvatar
        FROM BlogComment
        JOIN Member ON BlogComment.MemberID = Member.ID
        WHERE BlogComment.ID = ?
         ORDER BY BlogComment.created_at DESC
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

// 刪除
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    const [rows] = await db2.execute('UPDATE Blog SET Valid = 0 WHERE ID = ?', [
      id,
    ])
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({ error: { error } })
  }
})

// 新增留言
router.post('/create-comment', async (req, res) => {
  const { MemberID, ID, CommentContent } = req.body
  // console.log('留言:', { MemberID, ID, CommentContent })

  const createDate = moment().format('YYYY-MM-DD HH:mm:ss')

  try {
    const [rows] = await db2.execute(
      `INSERT INTO blogcomment (MemberID, ID, CommentContent, created_at) VALUES (?, ?, ?, ?)`,
      [MemberID, ID, CommentContent, createDate]
    )

    console.log('留言新增成功:', rows)
    res.status(200).json({ message: '新增成功', commentId: rows.insertId })
  } catch (error) {
    console.error('error:', error)
    res.status(500).json({ error: { error } })
  }
})

// 圖片上傳
router.post('/upload', upload.single('imageFile'), (req, res) => {
  // console.log(req.file)
  try {
    const file = req.file
    if (!file) {
      console.log('未上傳圖片')
      return res.status(400).json({ message: '未上傳圖片' })
    }
    const imgUrl = `http://localhost:3005/blog/${file.filename}`

    // const imageUrl = `/blog/${file.filename}`
    console.log('上傳的圖片:', file)
    console.log('圖片名稱:', file.filename)
    console.log('url:', imgUrl)

    res.status(200).json({ url: imgUrl, name: file.filename })
  } catch (error) {
    console.error('圖片上傳錯誤:', error)
    res.status(500).json({ message: '圖片上傳失敗', error })
  }
})

router.post('/create', upload.single('imageFile'), async (req, res) => {
  const { status, title, content, memberId, tags, imageName } = req.body
  console.log('獲取的資料', {
    status,
    title,
    content,
    memberId,
    tags,
    imageName,
  })
  console.log('提交的表單:', req.body)
  console.log('上傳的文件', req.file)

  const createDate = moment().format('YYYY-MM-DD HH:mm:ss')
  const updateDate = moment().format('YYYY-MM-DD HH:mm:ss')
  try {
    // 新增到 Blog
    const [result] = await db2.execute(
      `INSERT INTO blog (Status, Title, Content, CreateDate, MemberID, UpdateDate, Valid) VALUES (?, ?, ?, ?,?, ?, ?)`,
      [status, title, content, createDate, memberId, updateDate, 1]
    )
    console.log('新增', result)
    const blogId = result.insertId

    // 處理標籤
    console.log('標籤:', tags)
    const tagsArray = JSON.parse(tags || '[]')
    await handleTags(tagsArray, createDate, memberId, blogId)

    // 新增圖片到image
    // const imgurl = `/blog/${imageName}`
    const imgUrl = `http://localhost:3005/blog/${imageName}`
    const imgType = path.extname(imageName).slice(1)
    const imgUploadDate = moment().format('YYYY-MM-DD HH:mm:ss')
    await db2.execute(
      `INSERT INTO Image (BlogID, ImageName, ImageUrl, ImageUploadDate, ImageType) VALUES (?, ?, ?, ?, ?)`,
      [blogId, imageName, imgUrl, imgUploadDate, imgType]
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

// 編輯
router.put('/edit/:id', upload.single('imageFile'), async (req, res) => {
  const { status, title, content, memberId, tags, imageName, blogId } = req.body
  console.log('獲取的資料', {
    status,
    title,
    content,
    memberId,
    tags,
    imageName,
  })
  // console.log('提交的表單:', req.body)
  // console.log('上傳的文件', req.file)

  const createDate = moment().format('YYYY-MM-DD HH:mm:ss')
  const updateDate = moment().format('YYYY-MM-DD HH:mm:ss')

  try {
    // 更新 Blog 資料
    await db2.execute(
      `UPDATE blog SET Status = ?, Title = ?, Content = ?,  MemberID = ?, UpdateDate = ?, Valid = ? WHERE id = ?`,
      [status, title, content, memberId, updateDate, 1, blogId]
    )

    console.log('Blog 更新成功:', blogId)

    // 更新標籤
    const tagsArray = JSON.parse(tags || '[]')
    if (tagsArray.length > 0) {
      await handleTags(tagsArray, createDate, memberId, blogId)
    } else {
      console.log('沒有標籤可處理')
    }

    const [existingTags] = await db2.execute(
      `SELECT TagID FROM tagmappings WHERE BlogID = ?`,
      [blogId]
    )
    const existingTagIds = existingTags.map((tag) => tag.TagID)

    for (const tagId of existingTagIds) {
      if (!tagsArray.includes(tagId)) {
        await db2.execute(
          `DELETE FROM tagmappings WHERE TagID = ? AND BlogID = ?`,
          [tagId, blogId]
        )
        console.log(`標籤已刪除: TagID ${tagId}`)
      }
    }

    await handleTags(tagsArray, createDate, memberId, blogId)

    // 更新圖
    // if (imageName && req.file) {
    const imgurl = `http://localhost:3005/blog/${imageName}`
    const imgType = path.extname(imageName).slice(1)
    const imgUploadDate = moment().format('YYYY-MM-DD HH:mm:ss')
    // console.log(imgurl)
    // console.log(imgType)
    // console.log(imgUploadDate)

    if (imageName) {
      await db2.execute(
        `UPDATE Image SET ImageName = ?, ImageUrl = ?, ImageUploadDate = ?, ImageType = ? WHERE BlogID = ?`,
        [imageName, imgurl, imgUploadDate, imgType, blogId]
      )
    }
    res.status(200).json({ message: '文章更新成功', blogId })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ message: '伺服器錯誤', error: error.message })
  }
})

// 處理標籤
const handleTags = async (tagsArray, createDate, memberId, blogId) => {
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
          [tag, createDate, memberId]
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
