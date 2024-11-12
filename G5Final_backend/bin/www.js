/**
 * Module dependencies.
 */

import app from '../app.js'
import debugLib from 'debug'
import http from 'http'
const debug = debugLib('node-express-es6:server')
import { exit } from 'node:process'

// 導入dotenv 使用 .env 檔案中的設定值 process.env
import 'dotenv/config.js'

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '6005')
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}

// WebSocket
//自己發送自己
import testwss1 from '##/WebSocket/websocket1.js'
const wss1 = testwss1()
//自己發送全部
import testwss2 from '##/WebSocket/websocket2.js'
const wss2 = testwss2()
//發送給指定
import testwss3 from '##/WebSocket/websocket3.js'
const wss3 = testwss3()

server.on('upgrade', (request, socket, head) => {
  // 動態地基於請求的 host 生成 URL
  const { pathname } = new URL(request.url, `http://${request.headers.host}`)

  if (pathname === '/ws1') {
    wss1.handleUpgrade(request, socket, head, (ws) => {
      wss1.emit('connection', ws, request)
    })
  } else if (pathname === '/ws2') {
    wss2.handleUpgrade(request, socket, head, (ws) => {
      wss2.emit('connection', ws, request)
    })
  } else if (pathname === '/ws3') {
    wss3.handleUpgrade(request, socket, head, (ws) => {
      wss3.emit('connection', ws, request)
    })
  } else {
    socket.destroy() // 非 /ws 路徑則關閉連接
  }
})
