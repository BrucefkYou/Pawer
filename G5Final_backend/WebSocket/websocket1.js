// 自己發送自己
import { WebSocketServer } from 'ws'
export default function testwss1() {
  // 設置 WebSocket 伺服器並配置 noServer 模式
  const wss1 = new WebSocketServer({ noServer: true })
  wss1.on('connection', (ws) => {
    console.log('WebSocket1 連線成功')
    ws.on('message', (message) => {
      console.log(JSON.parse(message))
      const getmessage = JSON.parse(message)
      ws.send(JSON.stringify(getmessage))
    })
    ws.on('error', console.error)
  })
  return wss1
}
