import moment from 'moment'
import { WebSocketServer, WebSocket } from 'ws'
export default function testwss3() {
  // 設置 WebSocket 伺服器並配置 noServer 模式
  const wss3 = new WebSocketServer({ noServer: true })
  const clients = new Map()
  // 廣播已註冊用戶清單給所有連線用戶
  function broadcastRegisteredUsers() {
    const registeredUsers = [...clients.keys()] // 取得所有已註冊用戶的 ID
    for (const ws of clients.values()) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: 'onlineUsers',
            users: registeredUsers,
          })
        )
      }
    }
  }
  wss3.on('connection', (ws) => {
    console.log('WebSocket3 連線成功')
    // 接收來自客戶端的訊息
    ws.on('message', async (message) => {
      const data = JSON.parse(message)
      console.log('收到的訊息:', data)
      // 處理註冊訊息
      if (data.type === 'register') {
        clients.set(data.myID, ws)
        console.log(`User ${data.myID} registered`)
        console.log('已註冊的用戶:', [...clients.keys()])
        broadcastRegisteredUsers()
        return // 註冊完成後直接返回，不進行後續操作
      }
      // 確認 targetUserID 是否存在
      const toID = clients.get(data.toID)
      const myID = clients.get(data.myID)
      if (!toID || !myID) {
        console.error('Invalid WebSocket connection for toID or myID')
        return
      }
      if (data.type === 'toast') {
        toID.send(
          JSON.stringify({
            type: 'toast',
            from: data.myID,
            content: data.content,
          })
        )
        myID.send(
          JSON.stringify({
            type: 'toast',
            from: data.myID,
            content: data.content,
          })
        )
      }
      // 將訊息發送給指定的 toID
      if (
        data.type === 'message' &&
        toID &&
        toID.readyState === WebSocket.OPEN
      ) {
        toID.send(
          JSON.stringify({
            type: 'message',
            from: data.myID,
            content: data.content,
            creat_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          })
        )
      } else {
        console.log(`User ${data.toID} 不存在或連線已關閉`)
      }
      // 發送訊息給自己
      if (
        data.type === 'message' &&
        myID &&
        myID.readyState === WebSocket.OPEN
      ) {
        myID.send(
          JSON.stringify({
            type: 'message',
            from: 'self',
            content: data.content,
            creat_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          })
        )
      }
    })
    // 處理 WebSocket 錯誤
    ws.on('error', console.error)
    // 當 WebSocket 關閉時，從 `clients` Map 中移除用戶
    ws.on('close', () => {
      for (const [userID, clientWs] of clients.entries()) {
        if (clientWs === ws) {
          clients.delete(userID)
          console.log(`User ${userID} disconnected`)
          broadcastRegisteredUsers() // 廣播更新的用戶清單
          break
        }
      }
    })
  })
  return wss3
}
