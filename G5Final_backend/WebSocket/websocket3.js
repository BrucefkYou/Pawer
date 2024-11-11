import { WebSocketServer, WebSocket } from 'ws'
export default function testwss3() {
  // 設置 WebSocket 伺服器並配置 noServer 模式
  const wss3 = new WebSocketServer({ noServer: true })
  const clients = new Map()

  wss3.on('connection', (ws) => {
    console.log('WebSocket3 連線成功')

    // 接收來自客戶端的訊息
    ws.on('message', (message) => {
      const data = JSON.parse(message)
      console.log('收到的訊息:', data)
      // 處理註冊訊息
      if (data.type === 'register') {
        clients.set(data.userID, ws)
        console.log(`User ${data.userID} registered`)
        return // 註冊完成後直接返回，不進行後續操作
      }
      // 確認 targetUserID 是否存在
      const targetUser = clients.get(data.targetUserID)
      const senderUser = clients.get(data.userID)

      if (targetUser && targetUser.readyState === WebSocket.OPEN) {
        // 將訊息發送給指定的 targetUserID
        targetUser.send(
          JSON.stringify({
            from: data.userID,
            content: data.content,
          })
        )
      } else {
        console.log(`User ${data.targetUserID} 不存在或連線已關閉`)
      }
      // 發送訊息給自己
      if (senderUser && senderUser.readyState === WebSocket.OPEN) {
        senderUser.send(
          JSON.stringify({
            from: data.userID,
            content: data.content,
          })
        )
      }
    })
    console.log('已註冊的用戶:', [...clients.keys()])
    // 處理 WebSocket 錯誤
    ws.on('error', console.error)
    // 當 WebSocket 關閉時，從 `clients` Map 中移除用戶
    ws.on('close', () => {
      for (const [userID, clientWs] of clients.entries()) {
        if (clientWs === ws) {
          clients.delete(userID)
          console.log(`User ${userID} disconnected`)
          break
        }
      }
    })
  })
  return wss3
}
