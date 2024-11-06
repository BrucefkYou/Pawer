import express from 'express'
import db2 from '../configs/mysql.js'
const router = express.Router()
import multer from 'multer'

const upload = multer()

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const { keyword } = req.query
    const { sd } = req.query
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
    END AS newStatus
FROM 
    Joinin
LEFT JOIN 
    Image ON Image.JoininID = Joinin.ID
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

// router.get('/qs', async function (req, res) {
//   try {
//     const { keyword } = req.query

//     // 這邊帶要查找的資料
//     let sql = `
//     SELECT
//       Joinin.*,
//       (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.JoininID = Joinin.ID) AS favoriteCount,
//       Image.ImageUrl AS joininImg
//     FROM Joinin
//     LEFT JOIN Image ON Joinin.ID = Image.JoininID
//     WHERE Joinin.Status = 1
//   `
//     const conditions = []

//     // 搜尋條件
//     if (keyword) {
//       conditions.push(`Joinin.Title LIKE '%${keyword}%'`)
//     }

//     if (conditions.length > 0) {
//       sql += ' AND ' + conditions.join(' AND ')
//     }

//     const [results] = await db2.query(sql)
//     res.status(200).json({ status: 'success', data: { blogs: results } })
//   } catch (error) {
//     res.status(500).json({ error: '搜尋失敗' })
//   }
// })

//CKEditor 圖片上傳
// router.put('/:id', upload.none(), async (req, res) => {
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

// router.put('/:id', async function (req, res, next) {
//   try {
//     // 使用 WHERE 子句來篩選指定 id 的資料
//     const [rows] = await db2.query(
//       `SELECT
//     Joinin.*,
//     Image.ImageID,
//     Image.ImageName,
//     Image.ImageUrl,
//     (SELECT COUNT(*) FROM MemberFavoriteMapping WHERE MemberFavoriteMapping.JoininID = Joinin.ID) AS joinFavCount,
//     (SELECT COUNT(*)
//     FROM Joined
//     WHERE Joined.JoininID = Joinin.ID AND Status = 1) AS SignCount,
//     LEFT JOIN
//     Image ON Image.JoininID = Joinin.ID
//      WHERE ID = ?`,
//       [req.params.id]
//     )
//     // 檢查是否有找到資料
//     if (rows.length === 0) {
//       return res.status(404).json({ message: '找不到指定的資料' })
//     }
//     res.json(rows[0]) // 因為只會有一筆資料，所以直接返回第一個元素
//   } catch (err) {
//     console.error('查詢錯誤：', err)
//     res.status(500).send(err)
//   }
// })

export default router
