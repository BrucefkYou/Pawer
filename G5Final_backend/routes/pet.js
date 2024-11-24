import express from 'express'
import db2 from '../configs/mysql.js'
// 中介軟體處理上傳檔案
import multer from 'multer'
// 取副檔名工具
import { extname } from 'path'
const router = express.Router()
const upload = multer({
  storage: multer.diskStorage({
    // 儲存資料夾路徑
    destination: 'public/pet',
    filename: (req, file, cb) =>
      // 檔名修改
      cb(null, `${Date.now()}${extname(file.originalname)}`),
  }),
})
// 全部資料抓取
router.get('/', async function (req, res, next) {
  try {
    const [rows] = await db2.query(`SELECT * FROM PetCommunicator `)
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 會員資料
router.get('/member', async function (req, res, next) {
  try {
    const [rows] = await db2.query(`SELECT * FROM Member`)
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 已刊登列表
router.get('/list', async function (req, res, next) {
  try {
    const [rows] = await db2.query(
      `SELECT * FROM PetCommunicator WHERE Status = '已刊登'`
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 溝通師受預約列表
router.get('/comreserve', async function (req, res, next) {
  try {
    // 先執行比照當前時間更新狀態是否過期
    await db2.query(`
      UPDATE PetCommunicatorReserve
      SET Status = '0'
      WHERE Time < NOW();
    `)
    await db2.query(`
      UPDATE PetCommunicatorReserve
      SET Status = '1'
      WHERE Time > NOW();
    `)

    // 再執行查詢
    const [rows] = await db2.query(`
      SELECT PetCommunicatorReserve.*, Member.Avatar 
      FROM PetCommunicatorReserve 
      LEFT JOIN Member ON PetCommunicatorReserve.MemberID = Member.ID
      ORDER BY Time ASC;
    `)
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 全部預約表
router.get('/allreserve', async function (req, res, next) {
  try {
    const [rows] = await db2.query(`
    SELECT 
    PetCommunicatorReserve.*, 
    Member.Avatar, 
    PetCommunicator.Img, 
    PetCommunicator.Name 
    FROM 
    PetCommunicatorReserve 
    JOIN 
    Member 
    ON 
    PetCommunicatorReserve.MemberID = Member.ID 
    JOIN 
    PetCommunicator 
    ON 
    PetCommunicatorReserve.PetCommID = PetCommunicator.ID 
    ORDER BY 
    PetCommunicatorReserve.Time DESC;
    `)
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 會員預約列表
router.get('/memreserve', async function (req, res, next) {
  try {
    // 先執行比照當前時間更新狀態是否過期
    await db2.query(`
      UPDATE PetCommunicatorReserve
      SET Status = '0'
      WHERE Time < NOW();
    `)
    await db2.query(`
      UPDATE PetCommunicatorReserve
      SET Status = '1'
      WHERE Time > NOW();
    `)
    // 再執行查詢
    const [rows] = await db2.query(`SELECT 
    PetCommunicatorReserve.*,PetCommunicator.Name,PetCommunicator.Img,Member.Avatar
    FROM 
    PetCommunicatorReserve 
    LEFT JOIN 
    PetCommunicator ON PetCommunicator.ID = PetCommunicatorReserve.PetCommID
    LEFT JOIN 
    Member ON Member.ID = PetCommunicator.MemberID
    ORDER BY Time ASC;`)
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
    ReserveName,
    Phone,
    PetType,
    PetName,
    Approach,
    Time,
    Remark,
  } = req.body
  try {
    const [rows] = await db2.query(
      `INSERT INTO PetCommunicatorReserve 
    (PetCommID, MemberID, ReserveName, Phone, PetType, PetName, Approach, Time, Remark, Status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        petCommID,
        memberID,
        ReserveName,
        Phone,
        PetType,
        PetName,
        Approach,
        Time,
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
// 師資刊登修改
router.post(
  '/communicatorEdit',
  upload.single('pic'),
  async function (req, res, next) {
    // 先處理checkbox陣列成字串
    let Approach = ''
    if (Array.isArray(req.body.Approach)) {
      Approach = req.body.Approach.join(',')
    } else {
      Approach = req.body.Approach
    }
    // 如果有上傳照片
    let Img = ''
    if (req.file) {
      Img = req.file.filename
    }
    //解構
    const { ID, Name, Service, Email, Fee, Introduction } = req.body

    try {
      const [rows] = await db2.query(
        `UPDATE PetCommunicator 
     SET 
        Name = ?, 
        Service = ?, 
        Approach = ?, 
        Fee = ?, 
        Email = ?, 
        Introduction = ?, 
        Img = CASE WHEN ? IS NULL OR ? = '' THEN Img ELSE ? END 
     WHERE ID = ?`,
        [Name, Service, Approach, Fee, Email, Introduction, Img, Img, Img, ID]
      )
      res.json(rows)
    } catch (err) {
      console.error('查詢錯誤：', err)
      res.status(500).send(err)
    }
  }
)
// 師資刊登狀態修改
router.post('/setStatus', async function (req, res, next) {
  //解構
  const { ID, status } = req.body
  let Status
  if (status) {
    Status = '已刊登'
  } else {
    Status = '未刊登'
  }
  try {
    const [rows] = await db2.query(
      `UPDATE PetCommunicator
     SET
        Status = ?
     WHERE MemberID = ?`,
      [Status, ID]
    )
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 註冊成爲溝通師
router.post(
  '/communicatorCreate',
  upload.single('pic'),
  async function (req, res, next) {
    const { MemberID, RealName, Certificateid, CertificateDate } = req.body
    let Img = ''
    if (req.file) {
      Img = req.file.filename
    }
    try {
      const [rows] = await db2.query(
        `INSERT INTO PetCommunicator
      (MemberID, RealName, Certificateid, CertificateDate, Status, PetCommCertificateImg, valid)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [MemberID, RealName, Certificateid, CertificateDate, '未刊登', Img, 3]
      )
      res.json([rows])
      console.log('資料上傳成功')
    } catch (err) {
      console.error('查詢錯誤：', err)
      res.status(500).send(err)
    }
  }
)
// 取消預約
router.delete('/cancelReserve', upload.none(), async function (req, res, next) {
  const ID = req.body.ID
  try {
    const [rows] = await db2.query(
      `DELETE FROM PetCommunicatorReserve WHERE ID = ?`,
      [ID]
    )
    res.json('ok')
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 聊天室紀錄寫入
router.post('/chatupdate', async function (req, res, next) {
  const { myID, toID, content } = req.body
  try {
    const [rows] = await db2.query(
      `INSERT INTO Chat (myID, toID, content, creat_at)
VALUES (?, ?, ?,NOW())`,
      [myID, toID, content]
    )
    res.json([rows])
    console.log('資料上傳成功')
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
// 聊天室歷史讀取
router.get('/chatstory', async function (req, res, next) {
  const myID = req.query.myID
  const toID = req.query.toID
  console.log('toID:', toID)
  console.log('myID:', myID)

  try {
    const [rows] = await db2.query(
      `SELECT * FROM chat 
      WHERE (toID = ? AND myID = ?) 
      OR (toID = ? AND myID = ?) 
      ORDER BY creat_at ASC`,
      [toID, myID, myID, toID]
    )
    res.json(rows)
    console.log('資料上傳成功')
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
export default router
