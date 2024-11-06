import { createRouter } from 'next-connect';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const defaultData = { joinins: [] };
const db = new Low(new JSONFile('./data/db.json'), defaultData);
await db.read();

const router = createRouter();

router.get(async (req, res) => {
  try {
    const joinins = db.data.joinins;
    res.status(200).json(joinins);
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
