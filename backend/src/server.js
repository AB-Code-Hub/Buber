import http from 'http'
import { app } from './app.js'
import { PORT } from './config/env.js'
import { initializeSocket } from './socket.js'

const server = http.createServer(app)
const io = initializeSocket(server)

server.listen(PORT || 3000, () => {  
    console.log(`server is running on port ${PORT}`)
})