import express from 'express'
import cors from 'cors'
import {dbConnect} from "./db/db.js"
import cookieparser from 'cookie-parser'
import { router as userRoutes } from './routes/user.route.js'
import { router as captainRoutes } from './routes/captain.route.js'
export const app = express()
dbConnect();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieparser())


app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/users', userRoutes)
app.use('/captins', captainRoutes)


