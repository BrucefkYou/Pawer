import express from 'express'
import db2 from '../configs/mysql.js'
import multer from 'multer'
const router = express.Router()
const upload = multer()
// 全部資料抓取
router.get('/', async function (req, res, next) {
  try {
    const [rows] = await db2.query('SELECT * FROM `PetCommunicator`')
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 溝通師受預約列表
router.get('/comreserve', async function (req, res, next) {
  try {
    const [rows] = await db2.query(
      'SELECT PetCommunicatorReserve.*, Member.Avatar FROM PetCommunicatorReserve LEFT JOIN Member ON PetCommunicatorReserve.MemberID = Member.ID;'
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 會員預約列表
router.get('/memreserve', async function (req, res, next) {
  try {
    const [rows] = await db2.query(`SELECT 
    PetCommunicatorReserve.*,PetCommunicator.Name,PetCommunicator.Img,Member.Avatar
    FROM 
    PetCommunicatorReserve 
    LEFT JOIN 
    PetCommunicator ON PetCommunicator.ID = PetCommunicatorReserve.PetCommID
    LEFT JOIN 
    Member ON Member.ID = PetCommunicator.MemberID`)
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 預約表單填寫
router.post('/reserve', upload.none(), async function (req, res, next) {
  const {
    petCommID,
    memberID,
    ReservName,
    Phone,
    PetType,
    PetName,
    Approach,
    Time,
    Remark,
  } = req.body
  const dateTime = Time.replace('T', ' ') + ':00'
  try {
    const [rows] = await db2.query(
      `INSERT INTO PetCommunicatorReserve 
    (PetCommID, MemberID, ReserveName, Phone, PetType, PetName, Approach, Time, Remark, Status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        petCommID,
        memberID,
        ReservName,
        Phone,
        PetType,
        PetName,
        Approach,
        dateTime,
        Remark,
        '1',
      ]
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

export default router
