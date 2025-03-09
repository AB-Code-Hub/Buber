import http from 'http'
import { app } from './app.js'
import { PORT } from './config/env.js'


const server = http.createServer(app)

server.listen(PORT || 3000, () => {
    console.log(`server is running on port ${PORT}`)
})