import { createRouter } from 'next-connect'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path, { extname } from 'path'
import express from 'express'
import moment from 'moment'
import db2 from '../configs/mysql.js'
import { v4 as uuidv4 } from 'uuid'
// import { createRouter } from 'next-connect';
import authenticate from '#middlewares/authenticate.js'
import multer from 'multer'
// 電子信箱文字訊息樣版
import { generateJoinMailHtml } from '../emails/joinMail.js'
// 寄送email
import { sendMail } from '../emails/emailService.js'
// 環境變數
import 'dotenv/config.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 這裡的路徑是相對於專案根目錄的 public/join
    cb(null, 'public/join')
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname)
    const filename = uuidv4() + fileExt
    cb(null, filename)
  },
})

const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const { keyword, sd } = req.query
    let rows = `
      SELECT 
    Joinin.*,
    Image.ImageID,
    Image.ImageName,
    Image.ImageUrl,
    Member.Account,
    Member.Avatar,
    Member.Nickname,
    (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.JoininID = Joinin.ID) AS joinFavCount,
    (SELECT COUNT(*) 
     FROM Joined 
     WHERE Joined.JoininID = Joinin.ID AND Status = 1) AS SignCount,
    CASE
        WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) >= Joinin.ParticipantLimit THEN '已成團'
        WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) + 5 >= Joinin.ParticipantLimit THEN '即將成團'
        WHEN CURRENT_TIMESTAMP > Joinin.SignEndTime THEN '開團截止'
        WHEN CURRENT_TIMESTAMP BETWEEN Joinin.CreateDate AND Joinin.SignEndTime THEN '開團中'
        ELSE '未開放'
    END AS newStatus
FROM 
    Joinin
LEFT JOIN 
    Image ON Image.JoininID = Joinin.ID
LEFT JOIN
    Member ON Member.ID = Joinin.MemberID    
WHERE
Joinin.Status = 1 AND 
    Joinin.Valid = 1`
    const conditions = []

    if (keyword) {
      conditions.push(`Joinin.Title LIKE '%${keyword}%'`)
    }
    if (sd) {
      conditions.push(`Joinin.StartDate >= '${sd}'`)
    }

    if (conditions.length > 0) {
      rows += ' AND ' + conditions.join(' AND ')
    }
    rows += ' GROUP BY Joinin.ID'
    const [results] = await db2.query(rows)
    res.status(200).json(results)
    // res.json(rows)
    // console.log(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

// 檢查Status 狀態
router.get('/status', async (req, res) => {
  try {
    const { memberId } = req.query
    const [rows] = await db2.query(
      `SELECT 
        Joinin.*,
        Image.ImageID,
        Image.ImageName,
        Image.ImageUrl,
        (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.JoininID = Joinin.ID) AS joinFavCount,
        (SELECT COUNT(*) 
         FROM Joined 
         WHERE Joined.JoininID = Joinin.ID AND Status = 1) AS SignCount,
        CASE
            WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) = Joinin.ParticipantLimit THEN '已成團'
            WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) + 5 >= Joinin.ParticipantLimit THEN '即將成團'
            WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) >= Joinin.ParticipantLimit THEN '已額滿'
            WHEN CURRENT_TIMESTAMP > Joinin.SignEndTime THEN '開團截止'
            WHEN CURRENT_TIMESTAMP BETWEEN Joinin.CreateDate AND Joinin.SignEndTime THEN '報名中'
            ELSE '未開放'
        END AS newStatus
      FROM 
        Joinin
      LEFT JOIN 
        Image ON Image.JoininID = Joinin.ID
      LEFT JOIN Member ON Member.ID = Joinin.MemberID
      WHERE 
        Joinin.MemberID = ? AND Joinin.Valid = 1`,
      [memberId]
    )
    res.json(rows)
  } catch (err) {
    console.error('檢查錯誤：', err)
    res.status(500).json({ error: '伺服器錯誤' })
  }
})

// 檢查報名狀態
router.get('/joined', async (req, res) => {
  const { memberId, joininId } = req.query
  try {
    const [rows] = await db2.query(
      `SELECT * FROM Joined WHERE MemberID = ? AND JoininID = ? AND Status = 1`,
      [memberId, joininId]
    )
    res.json(rows)
  } catch (err) {
    console.error('檢查錯誤：', err)
    res.status(500).send(err)
  }
})

//會員加入報名活動
router.post('/joined', async (req, res) => {
  const { memberId, joininId } = req.body
  const createTime = moment().format('YYYY-MM-DD HH:mm')
  try {
    const [rows] = await db2.query(
      `INSERT INTO Joined (MemberID, JoininID,RegistrationTime) VALUES (?, ?, ?)`,
      [memberId, joininId, createTime]
    )
    res.json(rows)

    // 取得報名會員資料
    const [member] = await db2.query(
      `SELECT 
        Member.Name AS name,
        Member.eMail AS email
      FROM 
        Member
      WHERE 
        Member.ID = ?`,
      [memberId]
    )
    const memberData = member[0]

    // 取得報名活動資料
    const [joinin] = await db2.query(
      `SELECT 
        Joinin.Title AS title, 
        Joinin.StartTime AS startTime, 
        Joinin.EndTime AS endTime,
        Joinin.City,
        Joinin.Township,
        Joinin.Location
      FROM 
        Joinin
      WHERE 
        Joinin.ID = ?`,
      [joininId]
    )
    const joinData = joinin[0]
    const address = `${joinData.City}${joinData.Township}${joinData.Location}`
    const url = `http://localhost:3000/join/${joininId}`

    // 寄送email
    const mailHTML = generateJoinMailHtml(
      memberData.name,
      joinData.title,
      joinData.startTime,
      joinData.endTime,
      address,
      url
    )
    const mailSubject = 'Pawer寶沃 - 活動報名成功通知'

    // 寄送email
    const result = await sendMail(memberData.email, mailSubject, mailHTML)
  } catch (err) {
    console.error('新增報名時發生錯誤：', err)
    res.status(500).send(err)
  }
})

// 會員取消報名活動
router.put('/joined', async (req, res) => {
  const { memberId, joininId } = req.body
  const cancelTime = moment().format('YYYY-MM-DD HH:mm')
  const status = 0
  try {
    const [rows] = await db2.query(
      `UPDATE Joined 
       SET CancelTime = ?, 
           Status = ?
       WHERE MemberID = ? 
         AND JoininID = ?`,
      [cancelTime, status, memberId, joininId]
    )
    res.json(rows)
  } catch (err) {
    console.error('取消報名時發生錯誤：', err)
    res.status(500).send(err)
  }
})
// 會員頁撈報名的活動
router.get('/member/joined', async function (req, res, next) {
  try {
    const { memberId } = req.query
    const [rows] = await db2.query(
      `
      SELECT 
        Joined.*, 
        Member.ID AS ID, 
        Joinin.*, 
        Image.ImageID, 
        Image.ImageName, 
        Image.ImageUrl, 
        (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.JoininID = Joinin.ID) AS joinFavCount, 
        (SELECT COUNT(*) 
         FROM Joined 
         WHERE Joined.JoininID = Joinin.ID AND Status = 1) AS SignCount, 
        CASE 
          WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) = Joinin.ParticipantLimit THEN '已成團' 
          WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) + 5 >= Joinin.ParticipantLimit THEN '即將成團' 
          WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) >= Joinin.ParticipantLimit THEN '已額滿' 
          WHEN CURRENT_TIMESTAMP > Joinin.SignEndTime THEN '開團截止' 
          WHEN CURRENT_TIMESTAMP BETWEEN Joinin.CreateDate AND Joinin.SignEndTime THEN '報名中' 
          ELSE '未開放' 
        END AS newStatus 
      FROM 
        Joined 
      LEFT JOIN 
        Member ON Joined.MemberID = Member.ID 
      LEFT JOIN 
        Joinin ON Joined.JoininID = Joinin.ID 
      LEFT JOIN 
        Image ON Image.JoininID = Joinin.ID 
      WHERE 
        Joined.MemberID = ? AND
        Joinin.Valid = 1 AND
        Joined.Status = 1
      `,
      [memberId]
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    return res.status(500).json({ error: '伺服器錯誤，請稍後再試' })
  }
})

// 檢查收藏狀態
router.get('/favorite', async (req, res) => {
  const { memberId, joininId } = req.query
  try {
    const [rows] = await db2.query(
      `SELECT * FROM MemberFavoriteMapping WHERE MemberID = ? AND JoininID = ?`,
      [memberId, joininId]
    )
    res.json({ isFavorite: rows.length > 0 })
  } catch (err) {
    console.error('檢查錯誤：', err)
    res.status(500).send(err)
  }
})

// 加入收藏
router.put('/favorite', async function (req, res) {
  const { memberId, joininId } = req.body
  console.log(req.body)
  try {
    const [rows] = await db2.query(
      `INSERT INTO MemberFavoriteMapping (MemberID, JoininID) VALUES (?, ?)`,
      [memberId, joininId]
    )
    res.json(rows)
  } catch (err) {
    console.error('新增收藏時發生錯誤：', err)
    res.status(500).send(err)
  }
})

// 取消收藏
router.delete('/favorite', async function (req, res) {
  const { memberId, joininId } = req.body
  try {
    const [rows] = await db2.query(
      `DELETE FROM MemberFavoriteMapping WHERE MemberID = ? AND JoininID = ?`,
      [memberId, joininId]
    )
    res.json(rows)
  } catch (err) {
    console.error('刪除收藏時發生錯誤：', err)
    res.status(500).send(err)
  }
})

// 會員頁撈收藏的商品
router.get('/member/favorite', async function (req, res, next) {
  try {
    const { memberId } = req.query
    const [rows] = await db2.query(
      `
      SELECT 
        MemberFavoriteMapping.*, 
        Member.ID AS ID, 
        Joinin.*, 
        Image.ImageID, 
        Image.ImageName, 
        Image.ImageUrl, 
        (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.JoininID = Joinin.ID) AS joinFavCount, 
        (SELECT COUNT(*) 
         FROM Joined 
         WHERE Joined.JoininID = Joinin.ID AND Status = 1) AS SignCount, 
        CASE 
          WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) = Joinin.ParticipantLimit THEN '已成團' 
          WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) + 5 >= Joinin.ParticipantLimit THEN '即將成團' 
          WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) >= Joinin.ParticipantLimit THEN '已額滿' 
          WHEN CURRENT_TIMESTAMP > Joinin.SignEndTime THEN '開團截止' 
          WHEN CURRENT_TIMESTAMP BETWEEN Joinin.CreateDate AND Joinin.SignEndTime THEN '報名中' 
          ELSE '未開放' 
        END AS newStatus 
      FROM 
        MemberFavoriteMapping 
      LEFT JOIN 
        Member ON MemberFavoriteMapping.MemberID = Member.ID 
      LEFT JOIN 
        Joinin ON MemberFavoriteMapping.JoininID = Joinin.ID 
      LEFT JOIN 
        Image ON Image.JoininID = Joinin.ID 
      WHERE 
        MemberFavoriteMapping.MemberID = ? AND
        Joinin.Valid = 1
      `,
      [memberId]
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    return res.status(500).json({ error: '伺服器錯誤，請稍後再試' })
  }
})

// 抓單筆資料¬
router.get('/:id', async function (req, res, next) {
  try {
    // 使用 WHERE 子句來篩選指定 id 的資料
    const [rows] = await db2.query(
      `SELECT 
    Joinin.*,
    Image.ImageID,
    Image.ImageName,
    Image.ImageUrl,
    Member.Account,
    Member.Avatar,
    Member.Nickname,
    (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.JoininID = Joinin.ID) AS joinFavCount,
    (SELECT COUNT(*) 
     FROM Joined 
     WHERE Joined.JoininID = Joinin.ID AND Status = 1) AS SignCount,
   CASE
        WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) >= Joinin.ParticipantLimit THEN '已成團'
        WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) + 5 >= Joinin.ParticipantLimit THEN '即將成團'
        WHEN CURRENT_TIMESTAMP > Joinin.SignEndTime THEN '開團截止'
        WHEN CURRENT_TIMESTAMP BETWEEN Joinin.CreateDate AND Joinin.SignEndTime THEN '開團中'
        ELSE '未開放'
    END AS newStatus,
    GROUP_CONCAT(Tag.Name) AS Tags
FROM 
    Joinin
LEFT JOIN 
    Image ON Image.JoininID = Joinin.ID
LEFT JOIN
     Member ON Member.ID = Joinin.MemberID    
LEFT JOIN 
    TagMappings ON TagMappings.JoininID = Joinin.ID
LEFT JOIN 
    Tag ON Tag.ID = TagMappings.TagID
WHERE 
    Joinin.ID = ?
GROUP BY 
    Joinin.ID`,
      [req.params.id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ message: '找不到指定的資料' })
    }
    res.json(rows[0]) // 因為只會有一筆資料，所以直接返回第一個元素
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

// 首圖上傳
router.post('/upload', upload.single('joinImage'), (req, res) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).json({ message: '未上傳圖片' })
    }
    const imageUrl = `/join/${file.filename}`
    res.status(200).json({ url: imageUrl, name: file.filename })
  } catch (error) {
    console.error('圖片上傳錯誤:', error)
    res.status(500).json({ message: '圖片上傳失敗', error })
  }
})

// 錯誤處理中間件
router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: '伺服器錯誤' })
})

// 活動創建新增
router.post('/create', upload.single('joinImage'), async (req, res) => {
  const {
    imageName,
    memberId,
    title,
    info,
    startTime,
    endTime,
    count,
    signEndDate,
    city,
    township,
    location,
    tags,
    lat,
    lng,
  } = req.body
  const createTime = moment().format('YYYY-MM-DD HH:mm')
  const updateTime = moment().format('YYYY-MM-DD HH:mm')
  try {
    // 將資料寫入 joinin 表
    const [result] = await db2.execute(
      `INSERT INTO Joinin (MemberID,Title, Info, StartTime, EndTime,SignEndTime, ParticipantLimit, City, Township, Location,PositionX,PositionY, Status,CreateDate,UpdateDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? , 1 , ?, ?)`,
      [
        memberId,
        title,
        info,
        startTime,
        endTime,
        signEndDate,
        count,
        city,
        township,
        location,
        lat,
        lng,
        createTime,
        updateTime,
      ]
    )

    const joininId = result.insertId
    const imgurl = `/join/+${imageName}`
    const imageUploadDate = moment().format('YYYY-MM-DD HH:mm')
    //抓取附檔名 slice(1)是為了去掉.
    const imgType = path.extname(imageName).slice(1)
    // const imgType = imageName.split('.').pop()
    await db2.execute(
      `INSERT INTO Image (JoininId, ImageName,ImageUrl,ImageUploadDate,ImageType) VALUES (?, ?, ?, ?, ?)`,
      [joininId, imageName, imgurl, imageUploadDate, imgType]
    )

    // 將 tags 傳進 tag 表，tags是一個陣列，用for 迴圈將拆解的 tag 一個一個寫入
    const createDate = moment().format('YYYY-MM-DD HH:mm')
    for (const tag of tags) {
      const [existingTag] = await db2.execute(
        `SELECT Name FROM Tag WHERE Name = ?`,
        [tag]
      )

      // 如果不存在 (existingTag 為空陣列) 才新增
      if (existingTag.length === 0) {
        await db2.execute(
          `INSERT INTO Tag (Name, CreateDate, CreateUserID) VALUES (?, ?, ?)`,
          [tag, createDate, memberId]
        )
      }
    }

    // 將 tags 傳進 tagmappings 表中
    for (const tag of tags) {
      const [tagId] = await db2.execute(`SELECT ID FROM Tag WHERE Name = ?`, [
        tag,
      ])
      //  tagId[0].ID 是因為 tagId 是一個陣列，取第一個元素的 ID
      await db2.execute(
        `INSERT INTO Tagmappings (JoininId, TagId) VALUES (?, ?)`,
        [joininId, tagId[0].ID]
      )
    }

    res.status(200).json({ message: '寫入成功' })
  } catch (error) {
    console.error('處理過程中發生錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤', error })
  }
})

// 儲存草稿
router.post('/draft', upload.single('joinImage'), async (req, res) => {
  const {
    imageName,
    memberId,
    status,
    title,
    info,
    startTime,
    endTime,
    count,
    signEndDate,
    city,
    township,
    location,
    tags,
    lat,
    lng,
  } = req.body
  const createTime = moment().format('YYYY-MM-DD HH:mm')
  const updateTime = moment().format('YYYY-MM-DD HH:mm')
  try {
    // 將資料寫入 joinin 表
    const [result] = await db2.execute(
      `INSERT INTO Joinin (MemberID,Title, Info, StartTime, EndTime,SignEndTime, ParticipantLimit, City, Township, Location,PositionX,PositionY,Status, CreateDate,UpdateDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        memberId,
        title,
        info,
        startTime,
        endTime,
        signEndDate,
        count,
        city,
        township,
        location,
        lat,
        lng,
        status,
        createTime,
        updateTime,
      ]
    )

    const joininId = result.insertId
    const imgurl = `/join/+${imageName}`
    const imageUploadDate = moment().format('YYYY-MM-DD HH:mm')
    //抓取附檔名 slice(1)是為了去掉.
    const imgType = path.extname(imageName).slice(1)
    // const imgType = imageName.split('.').pop()
    await db2.execute(
      `INSERT INTO Image (JoininId, ImageName,ImageUrl,ImageUploadDate,ImageType) VALUES (?, ?, ?, ?, ?)`,
      [joininId, imageName, imgurl, imageUploadDate, imgType]
    )

    // 將 tags 傳進 tag 表，tags是一個陣列，用for 迴圈將拆解的 tag 一個一個寫入
    const createDate = moment().format('YYYY-MM-DD HH:mm')
    for (const tag of tags) {
      const [existingTag] = await db2.execute(
        `SELECT Name FROM Tag WHERE Name = ?`,
        [tag]
      )

      // 如果不存在 (existingTag 為空陣列) 才新增
      if (existingTag.length === 0) {
        await db2.execute(
          `INSERT INTO Tag (Name, CreateDate, CreateUserID) VALUES (?, ?, ?)`,
          [tag, createDate, memberId]
        )
      }
    }

    // 將 tags 傳進 tagmappings 表中
    for (const tag of tags) {
      const [tagId] = await db2.execute(`SELECT ID FROM Tag WHERE Name = ?`, [
        tag,
      ])
      //  tagId[0].ID 是因為 tagId 是一個陣列，取第一個元素的 ID
      await db2.execute(
        `INSERT INTO Tagmappings (JoininId, TagId) VALUES (?, ?)`,
        [joininId, tagId[0].ID]
      )
    }

    res.status(200).json({ message: '寫入成功' })
  } catch (error) {
    console.error('處理過程中發生錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤', error })
  }
})

// 草稿內容修改

// 表單內容修改
router.put('/update/:id', upload.single('joinImage'), async (req, res) => {
  const {
    imageName,
    memberId,
    title,
    status,
    info,
    startTime,
    endTime,
    count,
    signEndDate,
    city,
    township,
    location,
    tags,
    lat,
    lng,
  } = req.body
  const updateTime = moment().format('YYYY-MM-DD HH:mm')
  try {
    // 將資料寫入 joinin 表
    const [result] = await db2.execute(
      `UPDATE Joinin SET MemberID = ?,Title = ?, Info = ?, StartTime = ?, EndTime = ?,SignEndTime = ?, ParticipantLimit = ?, City = ?, Township = ?, Location = ?,PositionX = ?,PositionY = ?,Status = ?, UpdateDate = ? WHERE ID = ?`,
      [
        memberId,
        title,
        info,
        startTime,
        endTime,
        signEndDate,
        count,
        city,
        township,
        location,
        lat,
        lng,
        status,
        updateTime,
        req.params.id,
      ]
    )

    const joininId = req.params.id
    const imgurl = `/join/${imageName}`
    const imageUploadDate = moment().format('YYYY-MM-DD HH:mm')
    //抓取附檔名 slice(1)是為了去掉.
    const imgType = path.extname(imageName).slice(1)
    // const imgType = imageName.split('.').pop()
    if (imageName) {
      await db2.execute(
        `UPDATE Image SET ImageName = ?,ImageUrl = ?,ImageUploadDate = ?,ImageType = ? WHERE JoininId = ?`,
        [imageName, imgurl, imageUploadDate, imgType, joininId]
      )
    }

    // 將 tags 傳進 tag 表，tags是一個陣列，用for 迴圈將拆解的 tag 一個一個寫入
    const createDate = moment().format('YYYY-MM-DD HH:mm')
    for (const tag of tags) {
      const [existingTag] = await db2.execute(
        `SELECT Name FROM Tag WHERE Name = ?`,
        [tag]
      )

      // 如果不存在 (existingTag 為空陣列)才新增
      if (existingTag.length === 0) {
        await db2.execute(
          `INSERT INTO Tag (Name, CreateDate, CreateUserID) VALUES (?, ?, ?)`,
          [tag, createDate, memberId]
        )
      }
    }

    // 刪除此 JoininId 的所有現有標籤對應
    await db2.execute(`DELETE FROM Tagmappings WHERE JoininId = ?`, [joininId])
    // 將 tags 傳進 tagmappings 表中
    for (const tag of tags) {
      const [tagId] = await db2.execute(`SELECT ID FROM Tag WHERE Name = ?`, [
        tag,
      ])
      //  tagId[0].ID 是因為 tagId 是一個陣列，取第一個元素的 ID
      await db2.execute(
        `INSERT INTO Tagmappings (JoininId, TagId) VALUES (?, ?)`,
        [joininId, tagId[0].ID]
      )
    }

    res.status(200).json({ message: '寫入成功' })
  } catch (error) {
    console.error('處理過程中發生錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤', error })
  }
})

// 表單內容軟刪除
router.put('/:id', async (req, res) => {
  try {
    const [rows] = await db2.execute(
      'UPDATE Joinin SET  Valid = 0 WHERE ID = ?',
      [req.params.id]
    )
    res.json(rows)
  } catch (err) {
    console.error('刪除錯誤：', err)
    res.status(500).send(err)
  }
})

export default router
