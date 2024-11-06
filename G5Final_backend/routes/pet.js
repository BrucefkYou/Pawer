import express from 'express'
import db2 from '../configs/mysql.js'
import authenticate from '##/middlewares/authenticate.js'
const router = express.Router()

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const [rows] = await db2.query('SELECT * FROM `PetCommunicator`') // 確認資料表名稱是否正確
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})
router.get('/comreserve', async function (req, res, next) {
  try {
    const [rows] = await db2.query('SELECT * FROM `PetCommunicatorReserve`') // 確認資料表名稱是否正確
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

router.post('/p', async function (req, res, next) {
  const { ID } = req.body
  try {
    const [rows] = await db2.query(
      'SELECT * FROM `PetCommunicator` WHERE ID = ?',
      [ID]
    ) // 確認資料表名稱是否正確
    res.json(rows)
  } catch (err) {
    console.error('查詢錯誤：', err)
    res.status(500).send(err)
  }
})

export default router
