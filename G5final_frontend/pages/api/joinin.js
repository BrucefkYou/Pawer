import { createRouter } from 'next-connect';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';

// 這隻 API 用來處理文章的新增與查詢
// defaultData 是 lowdb 的預設資料格式，{ joinins: [] } 代表有一個陣列 art -->可以自己改名稱
const defaultData = { joinins: [] };
const db = new Low(new JSONFile('./data/db.json'), defaultData);
await db.read();

const router = createRouter();

router.post(async (req, res) => {
  const { title, author, joinin } = req.body;
  const createTime = new Date();
  const id = uuidv4();
  try {
    // 此處是push到 joinin(自定義的名字) 這個陣列
    db.data.joinins.push({ id, title, author, joinin, createTime });
    await db.write();
    res.status(200).json({ message: '寫入成功' });
  } catch (error) {
    console.error('處理過程中發生錯誤:', error);
    console.error('id:', id);
    res.status(500).json({ message: '伺服器錯誤', id });
  }
});

router.get(async (req, res) => {
  const { id } = req.query;
  try {
    if (!db.data) {
      db.data = { joinins: [] };
    }

    const joinin = db.data.joinins.find((joinin) => joinin.id === id);
    if (joinin) {
      res.status(200).json(joinin);
    } else {
      res.status(404).json({ message: '活動未找到' });
    }
  } catch (error) {
    console.error('處理過程中發生錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
