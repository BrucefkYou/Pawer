import express from 'express'
import db2 from '../configs/mysql.js'
import multer from 'multer'
const router = express.Router()
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/pet', // 儲存資料夾
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // 唯一檔名
  }),
})

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
//師資刊登修改
router.post(
  '/communicatorEdit',
  upload.none(),
  async function (req, res, next) {
    // 先處理checkbox陣列成字串
    let Approach = ''
    if (Array.isArray(req.body.Approach)) {
      Approach = req.body.Approach.join(',')
    } else {
      Approach = req.body.Approach
    }
    //解構
    const { ID, Name, Service, Email, Fee, Introduction } = req.body

    try {
      const [rows] = await db2.query(
        `UPDATE PetCommunicator SET Name = ?, Service = ?, Approach = ?, Fee = ?, Email = ?, Introduction = ? WHERE ID = ?`,
        [Name, Service, Approach, Fee, Email, Introduction, ID]
      )
      res.json(rows)
    } catch (err) {
      console.error('查詢錯誤：', err)
      res.status(500).send(err)
    }
  }
)
router.post(
  '/communicatorCreate',
  upload.single('pic'),
  async function (req, res, next) {
    const { MemberID, RealName, Certificateid, CertificateDate } = req.body
    console.log(req.file.path)

    try {
      // const [rows] = await db2.query(
      //   `INSERT INTO PetCommunicator
      // (MemberID, RealName, Certificateid, CertificateDate, Status)
      // VALUES (?, ?, ?, ?, ?)`,
      //   [MemberID, RealName, Certificateid, CertificateDate, '未刊登']
      // )
      // res.json([rows])
      // console.log(req.body)
      console.log('ok')
    } catch (err) {
      console.error('查詢錯誤：', err)
      res.status(500).send(err)
    }
  }
)

export default router
