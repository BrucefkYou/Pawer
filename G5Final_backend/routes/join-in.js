import express from 'express'
import db2 from '../configs/mysql.js'
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
const router = express.Router()
import sequelize from '#configs/db.js'
const { Joinin } = sequelize.models
import { QueryTypes, Op } from 'sequelize'

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const [rows] = await db2.query(`
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
        WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) + 5 >= Joinin.ParticipantLimit THEN '即將成團'
        WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) >= Joinin.ParticipantLimit THEN '已額滿'
        WHEN CURRENT_TIMESTAMP > Joinin.SignEndTime THEN '截止報名'
        WHEN CURRENT_TIMESTAMP BETWEEN Joinin.CreateDate AND Joinin.SignEndTime THEN '報名中'
        ELSE '未開放'
    END AS newStatus
FROM 
    Joinin
LEFT JOIN 
    Image ON Image.JoininID = Joinin.ID
WHERE 
    Joinin.Valid = 1
    `)

    res.json(rows)
    console.log(rows)
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
        WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) + 5 >= Joinin.ParticipantLimit THEN '即將成團'
        WHEN (SELECT COUNT(*) FROM Joined WHERE Joined.JoininID = Joinin.ID AND Status = 1) >= Joinin.ParticipantLimit THEN '已額滿'
        WHEN CURRENT_TIMESTAMP > Joinin.SignEndTime THEN '截止報名'
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

router.put('/:id', async function (req, res, next) {
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

export default router
