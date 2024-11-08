import { createRouter } from 'next-connect'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import express from 'express'
import moment from 'moment'
import db2 from '../configs/mysql.js'
import authenticate from '#middlewares/authenticate.js'
import multer from 'multer'
import Joined from '##/models/Joined.js'

const router = express.Router()
const upload = multer()

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
WHERE 
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
    END AS newStatus,
    GROUP_CONCAT(Tag.Name) AS Tags
FROM 
    Joinin
LEFT JOIN 
    Image ON Image.JoininID = Joinin.ID
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

//CKEditor 圖片上傳
router.post('/create', async (req, res) => {
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
  } = req.body
  const createTime = moment().format('YYYY-MM-DD HH:mm')
  const updateTime = moment().format('YYYY-MM-DD HH:mm')
  try {
    // 將資料寫入 joinin 表
    const [result] = await db2.execute(
      `INSERT INTO Joinin (MemberID,Title, Info, StartTime, EndTime,SignEndTime, ParticipantLimit, City, Township, Location, CreateDate,UpdateDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      await db2.execute(
        `INSERT INTO Tag (Name,CreateDate,CreateUserID) VALUES (?,?,?)`,
        [tag, createDate, memberId]
      )
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
// router.post(async (req, res) => {
//   const {
//     imageName,
//     title,
//     info,
//     startTime,
//     endTime,
//     count,
//     signEndDate,
//     city,
//     township,
//     location,
//     tags,
//   } = req.body
//   const createTime = moment().format('YYYY-MM-DD HH:mm')
//   try {
//     // 將資料寫入 joinin 表
//     const [result] = await db2.execute(
//       `INSERT INTO joinin (id, imageName, title, info, startTime, endTime, count, signEndDate, city, township, location, tags, createTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         imageName,
//         title,
//         info,
//         startTime,
//         endTime,
//         count,
//         signEndDate,
//         city,
//         township,
//         location,
//         tags,
//         createTime,
//       ]
//     )
//     res.status(200).json({ message: '寫入成功' })
//   } catch (error) {
//     console.error('處理過程中發生錯誤:', error)
//     res.status(500).json({ message: '伺服器錯誤', error })
//   }
// })

// router.post('/create', upload.none(), async (req, res) => {
//   // 檢查有沒有在登入狀態
//   // 檢查登入狀態的使用者和修改的對象是否一致
//   // 還可以做檢查帳號權限
//   // upload.none()會將物件存放在req.body內
//   // const 將物件內容取出
//   const { password, name, mail, head } = req.body
//   const { id } = req.params
//   const user = db.data.user.find((u) => (u.account = id))
//   Object.assign(user, { password, name, mail, head })
//   const message = `資料更新成功`
//   await db2.write()
//   res.status(200).json({ result: 'success', message })
// })
export default router
