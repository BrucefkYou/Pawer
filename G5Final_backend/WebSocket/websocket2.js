// 自己發送所有人
import { WebSocketServer, WebSocket } from 'ws'
export default function testwss2() {
  // 設置 WebSocket 伺服器並配置 noServer 模式
  const wss2 = new WebSocketServer({ noServer: true })
  wss2.on('connection', (ws) => {
    console.log('WebSocket2 連線成功')
    //當收到客戶端訊息時
    ws.on('message', (message) => {
      console.log(JSON.parse(message))
      const getmessage = JSON.parse(message)
      // 回傳訊息給所有連接的客戶端
      wss2.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(getmessage))
        }
      })
    })
    ws.on('error', console.error)
  })
  return wss2
}
